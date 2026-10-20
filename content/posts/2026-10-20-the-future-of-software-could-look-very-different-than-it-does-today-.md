---
title: The future of software could look very different than it does today
date: "2026-10-20"
slug: the-future-of-software-could-look-very-different-than-it-does-today-
draft: true
tags: 
  - frontpage
  - ai
  - rant
assets:
  js:
  css:
---

# The future of Software could look very different in 20 years than it does today

Ever since the beginning of the GenAI hype train, I have been convinced that Local AI is inevitable. I have gotten a bit of ridicule for that as well. I have been told "On prem AI will never take off." I hear this more from my aged contemporaries than from the younger engineers, which astounds me. These are fellows just barely too young to remember when it was said by aging executives "why would a normal person want a computer?"

Don't completely misunderstand me, I am not saying everyone needs local AI. I am saying everyone will have local AI and if we are going to bring them the future of software and the future of technology then we should understand that. No one needs a calculator to do basic arithmetic, but everyone uses one. Partly, because they have one on their phone. It is in reach nearly all the time. So why not use it?

> To do anything useful you need 512GB of memory. No one has 512GB of memory.

Yeah, right now 512GB of memory sounds like a lot, but 10 years ago 32GB of memory sounded like a lot. 15 years ago 16GB of memory sounded like a lot. I still remember buying 16MB of memory to put into our computer so we could play Ultima 8 (I also remember being very disappointed). [Moore's law](https://en.wikipedia.org/wiki/Moore%27s_law) might not pan out like it used to and memory might be really expensive right now but you're missing a few things. 

1. The memory shortage will be sorted out within the next 5 years
2. The price of memory is 300% or more inflated
3. Only Software Engineers need 512GB of memory to use AI today --before compression and optimization has been implemented
4. Most people are not Software Engineers and can do most anything they want or need to do with 12GB or less of memory today.

It is important to not be short sighted. We are building something completely new here. We have never before had the oportunity to use these tools in this way for our clients. It begs us not just to build something new but to build it in a new way. We need to think as much about how the tool relates to the product at hand as we are thinking about the product itself.

I built a Proof of Concept that embedded a model in the user's browser. It used [Gemma's edge model](https://ai.google.dev/gemma/docs/gemma-3n) and [lunr](https://lunrjs.com/) (a static site search index) to create a RAG like search based on the content in the site. Context was controlled through the search index and fed to the model when the user queried the search. The downside is that downloading the model took 20 minutes, but Google is already trying to build the model into the browser. Gemma's edge model is less than 4GB. It handily fits in most computer's memory with room to spare. This is cumbersome today, but in 2 years this will likely be as expected a common feature as search. We should be building with this in mind so that when the feature is requested we don't have to rebuild the whole product to incorporate it.

We cannot allow ourselves to be short sited. The products we build now are lasting longer than ever before. Even if the client hasn't asked for it and is unwilling to buy into it, we should have a 10 year plan for anything we launch.
