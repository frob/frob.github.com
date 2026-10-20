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

> I'm an artist, you give me a tuba and I'll get you something out of it.

The issue we have today is more about imagination. How can we use this tech? Content generation is a lazy idea. Using it to build web-pages is a web developer thinking that they are the user they are designing for. An AI help desk is also lazy. This needs to be a case by case issue. Look at [SendCutSend](https://sendcutsend.com/). The site is a metal laser cutting service. They offer quick turn around of custom orders, made to order. They have an AI part generator. You give it a prompt and it gives you a part based on the prompt. It isn't perfect. I asked it to give me a 12 tooth gear that is 22mm across. It didn't get the geometry of the teeth right, but it got all the dimensions correct and it gave me something that looked like a gear. This wasn't edge based, but it was fast and it matches the business. This is an example of a good solution. 

Remote [MCPs](https://modelcontextprotocol.io/) (Model Context Protocol, a standard that lets an AI model call out to external tools and data sources over a defined interface, rather than every app rolling its own integration) are another untapped resource. MCPs offer user authenticated access. This means the content can be controlled or tailored to the user as well as other services. The mistake to avoid is imagining the machine doing what a human is doing today. Instead, imagine what is cost prohibitive to have a human do today. This is why services like [Grammarly](https://www.grammarly.com/) work so well and have gained wide spread adoption. People would prefer to have an AI check their spelling and grammar before they hit send because people don't want to look like an idiot. Everyone wants a copy editor, but no one can afford it.

Someone who is unimaginative cannot see what products can be built that they do not use. Lazy people only see obvious one size fits all solutions. In game design you want someone who has a breadth of knowledge and experience more than a depth of knowledge. This will be more valuable in general product development moving forward.

We cannot allow ourselves to be short sited. The products we build are lasting longer than ever before. Even if the client has asked for it and is unwilling to buy into it, we should have a 10 year plan for anything we launch.
