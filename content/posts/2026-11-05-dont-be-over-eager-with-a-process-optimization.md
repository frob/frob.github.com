---
title: Don't be over eager with a process optimization
date: "2026-11-05"
description: AI lets one developer do the work of a team, and people are stripping Docker out of their workflow because of it. Before you remove a step from a process, make sure you know what the fence was for.
slug: dont-be-over-eager-with-a-process-optimization
tags:
    - ai
    - software development
    - rant
    - frontpage
draft: true
---

AI lets one developer do what used to take a team. A feature that needed a few people and a sprint planning meeting is now an afternoon with a good agent. That's real, and I'm not going to pretend otherwise.

It's also producing a trend I keep noticing, from senior and junior developers alike: people are ripping Docker out of their workflow and going native. The reasoning is that if you're the only one working on a service, "it works on my machine" can't bite you, because your machine is the only machine. Tools like Nix push the argument further. They make natively built services build and deploy deterministically, so the container looks like overhead you no longer need.

Some of those people are right. Some of them are about to find out why the fence was there.

## Chesterton's fence

Chesterton's fence says that if you find a fence across a road and can't see the reason for it, you shouldn't tear it down until you do. Once you know why it was built, you're free to remove it, and you'll know what you're giving up.

"It works on my machine" is the reason people quote for Docker, and it's the smallest part of what Docker does. A container also pins your runtime and system libraries, and it documents how the thing actually runs. It gives you the same artifact in CI and in production that you ran on your laptop. It's also a boundary: whatever happens inside doesn't touch the rest of your host.

Solo today doesn't mean solo forever. Plenty of services I've built by myself ended up with a second person, a contractor, a new laptop, or a deploy target I didn't pick. The container was already there when that happened, so none of it was a problem.

## Three questions

Before you remove a step from your process, answer these:

1. **What are you actually optimizing away?** Name the specific thing the step does, not the reason people usually give for it. If your answer is "it solves a problem I don't have", check that you know all the problems it solves.
2. **What trade-offs are you making?** Every removal moves cost somewhere else. Maybe it moves to a later stage, a different person, or a future version of you who has to reproduce this environment from scratch. Say out loud where it lands.
3. **Does this make the whole process faster, or just your part of it?** This is the one people skip. Your local loop got quicker. Did the build, the deploy, the handoff, the debugging of a production-only bug get quicker too? An optimization that speeds up your terminal and slows down everyone downstream, including you next month, is just a transfer.

If you can't answer all three, you haven't thought it through yet. That doesn't mean the answer is "keep Docker". It might well be "drop it", and Nix is a legitimately good way to get reproducibility without the container. But you should be able to say what you're replacing and what you're giving up when you do it.

## Why AI makes this worse

AI makes the cost of building something small, but it doesn't make the cost of operating it small. When a single developer can produce a service in a day, the pull to also strip the process down to match is strong. It feels consistent: small team, small process. But the process was never only there to coordinate people. A lot of it exists to make failures boring, and that matters more when no second pair of eyes is looking at what you ship.

## What would you add?

I've got the three above. What other questions belong on the list? I'd like to hear what's tripped people up after removing a step they thought was dead weight.
