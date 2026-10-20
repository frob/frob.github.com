---
title: Who benefits from the AI guardrails
date: "2026-10-13"
description: The calls for AI regulation arrived just as the technology plateaued. The danger is people handing too much autonomy to a machine, and the guardrails mostly target local AI.
slug: who-benefits-from-the-ai-guardrails
tags:
    - ai
    - rant
    - frontpage
---

The calls for AI regulation got louder at the exact moment the models stopped getting dramatically better. I don't think that's a coincidence.

## The plateau

For a couple of years every release felt like a leap. Now the leaps are smaller. The newest models are better, but not in the way that justifies the money that went into them. The gains are coming from tooling, context and cost, not from some new kind of capability. That's a fine place for a technology to be. It is a terrible place to be if you've borrowed against the idea that it keeps doubling.

When the product stops improving, the moat has to come from somewhere else.

## It's math

There is no AGI coming. This isn't consciousness. It's a [perceptron](https://en.wikipedia.org/wiki/Perceptron) with a lot more layers and a lot more data. It looks so advanced to the people who built it that they can't tell it from magic anymore, and they've convinced the rest of us that we can't either. It's still math.

The danger is the same one we've always had: people handing too much autonomy to a machine. Yes, it can delete all your email if you give it that authority, the same way a car with a brick on the accelerator can drive off a cliff. Nobody blames the brick for where the car ends up, and we shouldn't blame AI for the dangers that come from handing it the wheel. The fix is not to ban bricks, or to make sure only licensed companies are allowed to own one. It's to stop putting the brick on the pedal. I built [ztd](https://gitlab.com/frob/ztd) to allow for the safe use of autonomous AI. But even with ztd, if you give the AI unlimited access to your email, it could send your boss your resignation and delete everything else.

## Gatekeeping with a safety label

The loudest voice for this comes from the top. In June, Anthropic's CEO told [ABC News](https://abcnews.com/Business/exclusive-anthropic-ceo-calls-stronger-regulation-ai/story?id=133753620) that he is "proposing giving the government the ability to, again, in a narrow way, block deployment of unsafe technology." The letter he published alongside it says the government should be able to block a model "in light of third-party assessment." He said nothing about open weights or local models, and I'm not putting words in his mouth. But think about what a regime like that needs to work: someone has to pass the assessment, someone has to pay for it, and someone has to be big enough to survive being told no. That is a short list.

Look at what the proposals actually ask for. Licensing for anyone who trains a model above some size. Compliance regimes that only a company with a legal department can afford. Restrictions on open weights because they can't be "monitored." Every one of those lands hardest on the same target -- the model that runs on your own machine, that you downloaded once and that doesn't phone home.

A hosted model can be metered, logged, audited and switched off. A local model can't. If you're selling access, that's the thing that scares you, not a rogue chatbot.

I've said for a while that local AI is inevitable. Everyone will have it, the way everyone has a calculator. The people who would prefer that you rent it have noticed too. So the pitch becomes "only trusted providers should run these." It sounds responsible. What it does is turn a tool that anyone can run into a service that a few companies can sell, right when the open models are good enough that nobody has to buy.

I can't prove anyone's motives. I can tell you who ends up holding the keys if it works.

The next time you hear a call for guardrails, ask what happens to the model on your laptop.
