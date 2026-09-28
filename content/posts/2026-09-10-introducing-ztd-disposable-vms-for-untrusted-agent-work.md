---
title: Introducing ztd; disposable VMs for untrusted agent work
date: "2026-09-10"
description: Running a coding agent with approvals turned off is only safe if a machine boundary, not a dialog box, protects your host. ztd gives every agent run its own throwaway VM across libvirt, lima, Proxmox, and EC2.
slug: introducing-ztd-disposable-vms-for-untrusted-agent-work
tags:
    - ai
    - open source
    - software development
    - frontpage
---

`--dangerously-skip-permissions` is a flag with an honest name. It's risky, and I don't like it. However, most people who run coding agents claim to use it, because the alternative is worse in a way nobody likes admitting. An agent that stops to ask before every file write and every shell command is an agent you spend the afternoon babysitting, and the babysitting is the part that destroys the value. So you turn the prompts off, or you leave them on and click "yes" two hundred times, which is the same thing with extra steps and a worse outcome -- after the fortieth prompt you are not reading them anymore. You are pattern-matching on the shape of the dialog. That is not a security control. That is a security control's costume.

The honest version of the problem is that the approval prompt is doing a job it was never able to do. It is trying to be a boundary using your attention as the enforcement mechanism, and your attention is a consumable. I [wrote a while back](/posts/2026/04/29/an-experienced-developers-view-on-writing-software-in-the-age-of-vibe-coding-and-generative-ai/) about how the right workflow with these tools depends on what you already know. This is the infrastructure half of that argument: the fix is not to approve more carefully, it is to change what "yes" can possibly reach.

So I wrote [ztd](https://gitlab.com/frob/ztd). It gives me a disposable VM to let my agents run free. You spin one up, you let the agent run completely wide open *inside* it, the work comes back over git, and then you throw the VM away. The blast radius of anything the agent does ends at a machine you were going to delete anyway.

Sandbox escapes do exist, and so long as you're not telling the agent to go off the rails you should be able to get some work done. This isn't a research sandbox tool, it is a work tool.

## The whole loop

```bash
ztd check      # host preflight -- it prints the fix for every gap it finds
ztd init       # writes .ztd/ztd.toml; every key commented, the defaults boot
ztd up         # boot the VM
ztd auth       # sync your existing Claude Code login into the guest
ztd run "port the reporting module off the deprecated client"
```

`ztd run` starts the agent in a tmux session inside the guest, on a fresh `ztd/<run-id>` branch, and attaches you to it. `Ctrl-b d` detaches and leaves it running; `ztd attach` comes back. When it's done:

```bash
ztd fetch      # pull the agent's commits back into your checkout
ztd audit      # export the run record to .ztd/runs/<run-id>/
ztd down       # destroy the VM
```

`ztd cattle "<task>"` composes the whole sequence into one command and leaves it running detached. There are four backends behind the same verbs -- libvirt on Linux, lima on macOS, a Proxmox node, or EC2 -- and `local` resolves to whichever of the first two matches the machine you're on, so a bare `ztd up` does the right thing either way.

The goal here is to build on existing tools. Everything exists already to safely build with an agent on local and cloud hardware. What was missing was the orchestrator to keep everything working together.

## What actually crosses the boundary

This is the part I spent the most time on, because "run it in a VM" is the easy half of the sentence. The interesting question is what you hand the thing inside.

**No forge credentials. Ever.** The guest never clones from your forge and never pushes to it. It holds no GitHub or GitLab token, not even a narrowly scoped one, because a scoped token inside a box you are treating as compromised is still a credential you have handed to an attacker. The agent commits *locally*, `ztd fetch` adds a temporary git remote pointed at the guest and pulls those commits into your checkout, and then **you** push, from your machine, with your own credentials. Git is a distributed version control system and this is the one situation where everybody suddenly remembers that.

**The Anthropic credential does go in,** and I want to be straight about this rather than quiet about it. There is no agent without it. `ztd auth` copies your existing Claude Code login into the guest over the ephemeral key -- only `~/.claude/.credentials.json`, not your whole config -- and it dies when the VM does. It is the same risk class as everything else in there. I made a judgment call that one credential with a spend limit is an acceptable trade for the thing working at all, and a forge token that can rewrite your published history is not. Scope it if that math is different for you.

For now, this project is built on Claude Code. I would like to expand it to more harnesses eventually but I had to start somewhere -- might as well start with the subscription I already have.

**A throwaway SSH key per VM.** ztd generates a keypair before `up`, injects the public half as the guest's only authorized key, and deletes it on a successful `down`. Your personal key is never offered to the guest at all.

**Two independent Docker daemons.** The host runs one for ztd's own tooling -- Terraform and Task live in a container so the host stays clean. The guest runs its own, so the agent can build and run containers all it likes. The host socket is never exposed to the guest, which is the whole ballgame; a mounted Docker socket is a root shell with extra typing.

The repo itself is live-mounted over virtiofs on the local backends, and the detail I'm happiest with is that files the agent creates come out owned by *you* on the host. virtiofsd reflects the guest uid, so there's no ACL shim and no `chown -R` afterward. QEMU stays confined. That one took a while.

## Two things that will bite you, if you run libvirt at all

These are not really ztd problems. They are host problems ztd walked into, and both of them are worth knowing about even if you never touch any of this.

**Docker breaks libvirt's guest networking, silently.** The Docker daemon sets the netfilter `FORWARD` policy to `DROP` and isolates its own bridges. Your VM gets a DHCP lease, reaches its gateway, looks completely healthy, and has no internet -- so cloud-init hangs partway through installing things and you go hunting for a DNS problem that isn't there. The fix is an accept rule for the libvirt bridge in the `DOCKER-USER` chain. The part that took me a second pass: **Docker flushes `DOCKER-USER` every time the daemon restarts.** So the rule alone is a shim that evaporates the next time you reboot, which is a wonderful way to spend two debugging sessions on the same bug. `ztd setup` installs a systemd unit that is `PartOf=docker.service` instead, and `ztd check` asserts the unit is enabled rather than just checking whether the rule happens to be there right now.

**A host firewall kills guest DHCP, and it looks nothing like a firewall problem.** This one is newer and genuinely nasty. The guest gets *no lease at all*, while every visible piece of libvirt is fine: bridge up, dnsmasq listening on the right interface, correct range in the network XML, tap device enslaved, guest sending DISCOVERs into the void. The cause is that libvirt 12 defaults to the nftables firewall backend. The old iptables backend used to insert libvirt's DHCP accept rules directly into the iptables `INPUT` chain, ahead of ufw's default deny -- libvirt was punching through your firewall for you and nobody mentioned it. With the nftables backend those accepts live in libvirt's own table, no longer in front of ufw, and a DROP anywhere in netfilter still wins.

```bash
sudo ufw allow in on virbr0 comment 'libvirt guest DHCP/DNS'
```

That took a machine from no lease to an IP address immediately. Note it is a completely different failure from the Docker one -- that's `FORWARD` and you get a lease with no internet, this is `INPUT` and you get no lease at all -- so the Docker fix does not help you here, which cost me an evening.

## What it doesn't do

- **It protects the host from the guest. That's the only direction.** Not guest-from-host, not tenant-from-tenant. If you need a boundary that survives a determined hypervisor escape, this is not that, and I would rather say so than imply a guarantee I can't back.
- **On the local backends the result branch lands in your real working tree.** The repo share is live, so `ztd run` checking out `ztd/<run-id>` switches the branch in the directory you're sitting in. The genuinely isolated cattle model is the remote backends, where there is no shared tree at all. This is a real caveat and not a small one.
- **`ztd auth` doesn't work on a macOS host.** It needs the login as a file, and macOS keeps it in the Keychain. Log in inside the guest instead. The `vz` backend is otherwise validated end to end on Apple Silicon.
- **No egress allowlist yet.** The guest has ordinary outbound internet. Filtering it through a DNS resolver, so the agent can reach a package registry and not much else, is the next piece of work and it is not built.
- **No TTL or auto-destroy.** Teardown is a thing you run. `ztd down` is deliberately never automatic, because I have not yet been in a situation where I wanted a machine holding an unfinished run to delete itself on a timer.
- **Run caps are only most of a seatbelt.** There's a wall-clock cap that always applies. The turn cap is enforced through an agent hook, because there is no native flag for it in subscription mode, so if a future build drops that hook the turn cap quietly stops working and the clock is your real backstop.

Mostly these are compromises, getting the most security while still trying to be useful. The most secure computer is the one that isn't turned on, but it isn't very useful.

## Is this for you?

If you don't run agents with approvals off, no. You already have a boundary, it's you, and it's working.

If you do -- if you've caught yourself approving a command because it was the fortieth one and it looked roughly like the previous thirty-nine, or if you want to hand something a task and go to bed -- then the machine boundary is the piece you're missing, and it turns out to be cheap. A VM per task, the agent completely unrestricted inside it, and a git branch as the only thing that comes out.

It's at [gitlab.com/frob/ztd](https://gitlab.com/frob/ztd), AGPLv3, with the docs published from the same repo. On Linux it's a tarball off the releases page. On macOS it's a Homebrew cask, from my own tap:

```bash
brew tap frob/ztd https://gitlab.com/frob/homebrew-ztd.git
brew trust frob/ztd
brew install --cask ztd
```

Which is a fine moment to point out the obvious: that first line is you deciding to trust a stranger's tap. It is a third-party repository that Homebrew will install software from, nobody at Homebrew has looked at it, and the binaries inside are unsigned -- the cask strips the Gatekeeper quarantine attribute at install, which is precisely the kind of thing you would want to know before running it. It's four lines. [Read it](https://gitlab.com/frob/homebrew-ztd/-/blob/main/Casks/ztd.rb). If you'd rather not extend that trust, the archives and a `checksums.txt` are on the releases page and building from source is a `go build`.

I would find it a bit rich to write a whole post about not trusting things and then ask you to `curl | bash` me on faith.

Then `ztd check`, which is the first thing to run and the thing to trust -- it will tell you exactly what your host is missing, including both of the firewall traps above, with the command to fix each one.
