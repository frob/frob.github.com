# The pfSense Upgrade That Broke Everything: A Post-Mortem, and Why I'm Moving to OPNsense

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2026/07/06/pfsense-upgrade-broke-everything/ |
| date | 2026-07-06 |
| tags | routing, open source |


A point release upgrade should be boring. You click the button, you wait ten minutes, you go back to your life. Instead, upgrading pfSense from 2.7.2 to 2.8.1 turned into a multi-day rescue operation involving a half-dead firewall, a hand-configured recovery network, an emergency router purchase, and a single orphaned config file that turned out to be the root of everything. Here's how it went, what actually broke, and why this experience is the last straw for me and pfSense.

## The Failure

The upgrade appeared to run normally, but the firewall never came back. On the console, boot died with:

```
Fatal error: Uncaught Error: Call to undefined function gettext() in /etc/inc/certs.inc
```

If you search this error, you'll find threads going back years across nearly every major pfSense version transition. The error itself is a symptom, not a cause: it means PHP loaded without its gettext extension, which means the PHP packages didn't finish installing, which means the upgrade died partway through. The system was left in a state where the base OS and the package set no longer agreed with each other — and since pfSense's entire boot process runs through PHP, nothing worked. No interfaces, no web GUI, no routing. Just a console menu sitting on top of a corpse.

## Recovery Attempt: Getting the Patient Breathing

The standard advice for this failure is to get to a shell, get network access, and run `pfSense-upgrade -d` to resume the interrupted upgrade. Simple in theory. In practice, every single layer had to be rebuilt by hand:

**Networking.** The boot failed before interfaces were configured, so `dhclient` was the first stop — which immediately failed with a pidfile error because parts of `/var` hadn't been set up either. Once past that, I had an IP address but 100% packet loss to everything. The eventual realization: this box *was* the network's gateway. From its own recovery shell, it was trying to route internet traffic through itself — a perfect loop. Local devices could still talk to each other by IP (switching doesn't need a router), which made the network look deceptively alive. The fix was buying a cheap router just to give the broken firewall an upstream path that didn't depend on its own corpse.

**DNS, then the clock.** With real connectivity, hostname resolution needed a hand-written `resolv.conf`, and the system clock was 30 minutes off — enough to make me nervous about TLS validation against the package servers, so that got corrected too.

**The trust store.** Package fetches then complained about certificates. Some of that turned out to be harmless noise (`certctl` reporting blacklisted certs it was correctly skipping), but reinstalling `ca_root_nss` and the core pkg tooling was part of getting a working package system back.

**The bootstrap loop.** With everything above fixed, `pfSense-upgrade` still kept demanding `pkg bootstrap -f`, endlessly. Forcing a reinstall of the pkg tooling produced the first real clue: pkg wanted to *downgrade* itself from 1.21.x to 1.20.x. The repo configuration was still pointed at the 2.7.2 branch, so the system kept "repairing" itself backward while the upgrade tooling demanded forward.

**The architecture wall.** Pointing the repo at the 2.8.1 branch produced the second clue, and it was a big one: `wrong architecture: FreeBSD:15:amd64 instead of FreeBSD:14:amd64`. pfSense 2.8.1 is built on FreeBSD 15; the running system reported FreeBSD 14. The box appeared to be wedged *between* operating system versions — exactly the kind of state a package manager cannot repair on its own.

## The Actual Root Cause

The answer was hiding in `/usr/local/etc/pkg.conf`. During a cross-FreeBSD-version upgrade, pfSense's upgrade tooling writes an ABI pin into that file — deliberately holding the *old* FreeBSD version so the first phase of the upgrade can complete against a consistent package set. Once the new base OS is in place, that file has to be removed and the upgrade run a second time to pull in the new-ABI packages and finish the job.

In my case, the upgrade was interrupted after the base OS had already moved to FreeBSD 15, but the pkg.conf ABI pin was left behind, still forcing the old version. Every subsequent repair attempt was sabotaged by it: the pinned ABI blocked the correct packages, produced the architecture mismatch, fed the bootstrap loop, and — going all the way back to the beginning — is why the PHP packages never installed and the boot died on a missing gettext function.

The fix, in the end, was almost insulting in its simplicity: delete one file, run `pfSense-upgrade -d` one more time, reboot. The system completed the upgrade to 2.8.1 and came back to life.

## Lessons Worth Keeping

A few things from this ordeal transfer to any firewall platform:

Snapshot before every upgrade if you're virtualized. A hypervisor snapshot turns this entire saga into a 30-second rollback. I will never skip this again.

Keep a current config export somewhere off the box, and know that a clean install plus config restore is often faster than in-place forensics. I chose the forensic route and learned a lot, but "learned a lot" is not what you want from firewall maintenance.

Have a backup path to the internet that doesn't depend on the firewall you're repairing. When your firewall is also your gateway, its recovery shell cannot route through itself.

And check `/usr/local/etc/pkg.conf` early if a pfSense major upgrade dies partway. A stale ABI pin in that file explains a shocking number of "wrong architecture" and endless-bootstrap symptoms.

## The Conclusion: I'm Done

Here's the thing. I fixed it. The system runs 2.8.1 now. And I'm leaving anyway.

This was supposed to be a routine upgrade, and it left a production firewall unbootable in a way that took days of console surgery to unwind — a failure mode with forum threads stretching back through version after version. The upgrade tooling wrote a critical piece of transitional state to disk and then failed to clean it up, and nothing in the recovery path surfaced that fact. I found it by exhaustion, not by diagnostics.

Layer on top of that Netgate's decision to gate the pfSense CE installer download behind creating an account and completing a $0.00 "purchase" to agree to a license — for the free, open-source edition — and the relationship math stops working for me. When the software breaks this badly and the vendor adds friction to simply obtaining it, loyalty runs out.

So my plan is set: this box runs pfSense 2.8.1 until its next scheduled upgrade window, and then it becomes an OPNsense box. The configs don't convert automatically — the projects diverged too long ago — but the concepts map nearly one-to-one, and since I'm virtualized I can build the OPNsense VM in parallel, test it properly, and cut over with instant rollback available. That's a migration on my terms, which is more than this upgrade ever offered.

I've recommended pfSense to a lot of people over the years. I won't be doing that anymore.

