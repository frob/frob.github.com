# Introducing v; the easiest vendor utility

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2026/08/30/introducing-v-the-easiest-vendor-utility/ |
| date | 2026-08-30 |
| tags | git, open source, tutorial, frontpage |
| description | Sometimes you have to copy a library straight into your project. v records exactly which commit you copied and gives you one command to refresh it. |


Every so often you need a library in your project and there is no package manager standing by to hand it to you. Maybe it is a repository you own that was never published anywhere. Maybe the upstream project ships no releases. Maybe the language ecosystem in question has no dependency story worth the name. So you do what people have always done: you copy the source into your project and get on with your day.

That works fine right up until the moment you need to answer a question about it. Which commit did I copy? Has upstream changed since? Did somebody edit these files after they landed here? A ```vendor/``` directory that got there by hand is an undated snapshot of unknown provenance. Six months later it is indistinguishable from code you wrote yourself. I have been handed projects like that and I have been the person to fix it.

I got tired of that, so I wrote [v](https://github.com/frob/v).

## What it does

Three things, and deliberately nothing else:

1. It resolves whatever ref you give it --a branch, a tag, a commit hash --to an exact commit hash.
2. It downloads the repository's contents into ```vendor/```, without the ```.git``` directory.
3. It writes down what it did in a ```vendors.toml``` file in your project root.

That's the whole tool. The interesting part is the third one.

## A real world use case

This blog [runs on Hugo](/posts/2026/04/23/add-a-json-api-to-any-static-site-generator/) with a theme I maintain in a GitLab repository. The theme is not on any registry. It's not a Go module. It is a pile of layouts and CSS that belongs to me and lives somewhere else.

The usual options for that situation are a git submodule or a Hugo module. Both work. Both also mean that anyone who clones this site now has to know about a second dependency system, and that my build has an opinion about network access. I didn't want a dependency system. I wanted the files to be in the repository, the way files are, plus a note saying where they came from.

Here is what that note looks like on this site:

```toml
['git@gitlab.com:frob/frobiovox-theme.git']
url = 'git@gitlab.com:frob/frobiovox-theme.git'
ref = '0.0.x'
commit = 'd0b29bbda2560331ddb849b0dcefc65b709454f4'
path = 'hugo/themes/frobiovox-theme'
```

Four fields. Where it came from, what I asked for, what that actually resolved to, and where it landed. The ```commit``` field is the one doing the real work. A branch name drifts --```0.0.x``` means something different today than it did in June. The hash doesn't. It pins exactly what is sitting in ```hugo/themes/frobiovox-theme``` right now.

Commit that file to your repository and the provenance survives. Someone else can see what you vendored, when it moved, and by how much, just by reading the git history of a four-line TOML entry.

## Using it

Install it with Homebrew:

```bash
brew install frob/v/v
```

Or with the shell script, which detects your OS and package manager and falls back to dropping a binary in ```/usr/local/bin```:

```bash
curl -sSf https://raw.githubusercontent.com/frob/v/0.2.x/install.sh | sh
```

There are ```.deb```, ```.rpm```, and Arch packages on the releases page too.

Vendoring something is one command:

```bash
v add https://github.com/example/repo
```

That resolves the remote's default branch, downloads the contents to ```vendor/github.com/example/repo```, and records the entry. Pin to a tag instead:

```bash
v add https://github.com/example/repo v1.2.3
```

Or put it somewhere that is not ```vendor/```, which is what I do for the theme:

```bash
v add -d hugo/themes/frobiovox-theme git@gitlab.com:frob/frobiovox-theme.git 0.0.x
```

Later, when upstream has moved:

```bash
# everything, to the latest commit on each recorded ref
v update

# just the one
v update https://github.com/example/repo

# and switch it to a different tag while you are at it
v update https://github.com/example/repo v2.0.0
```

```update``` tells you what changed:

```
updated https://github.com/example/repo a1b2c3d -> e4f5a6b
```

Then ```git diff``` shows you exactly what came along with it. That is the part I actually wanted. Not automation --visibility. When a vendored dependency changes under me, I want it to show up in a code review like everything else.

## Why no ```.git``` directory

Because a vendored tree should be files, not a repository. Submodules are a repository inside your repository, and they bring the whole apparatus with them: a second checkout state, detached heads, the ```--recursive``` flag everyone forgets, clones that come down empty. Subtrees avoid some of that and replace it with a merge strategy you have to think about.

```v``` sidesteps both by not being a git integration at all. It downloads the contents and deletes the history. Your repository stays one repository. ```git clone``` gets you everything. There is no second state to be out of sync with, because there is no second state. The metadata a ```.git``` directory would have carried lives in ```vendors.toml``` instead, in four lines you can read.

The tradeoff is real and I will name it: you can't ```git log``` a vendored dependency in place, and if you edit those files, ```v update``` will happily overwrite your edits. Vendored code is read-only code. If you want to change it, change it upstream.

## What it does not do

It is deliberately small. Some things are missing on purpose:

- No integrity check. Nothing currently verifies that a vendored tree still matches its recorded commit. If someone edits a file in ```vendor/```, ```vendors.toml``` will keep insisting everything is fine. This is the next thing I am building.
- No round trip. If you want to fix a bug in a vendored dependency and send it upstream, you are on your own: clone it separately, do the work there, then re-vendor. I would like to make that a single command.
- No selective vendoring. Every entry in ```vendors.toml``` gets its files checked into your tree. There is no way yet to track a dependency's provenance while keeping its source out of your repository, which you might want for license reasons.
- No dependency resolution, ever. If the thing you vendored has its own dependencies, that's your problem. ```v``` copies one repository at one commit. It's not going to grow a solver, and this is a feature.

## Is this for you?

Probably not, most of the time. If your language has a package manager and your dependency is published to it, use the package manager. That is what it is for.

But when you are outside that path --a private repo, an unpublished theme, a library whose maintainer stopped cutting releases in 2019, a language where "just copy it in" is the community norm --you're going to copy the source anyway. All ```v``` does is make sure that when you do, you wrote down where it came from.

The code is at [github.com/frob/v](https://github.com/frob/v). It's MIT licensed, it's a single Go binary with no runtime dependencies, and it is small enough that you can read the whole thing in an afternoon.

