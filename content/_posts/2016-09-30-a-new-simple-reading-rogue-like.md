---
layout: post
title: a new simple reading rogue like
date: 2016-09-30
description: "With everyone's kids being so smart it is a wonder that we don't have machine generated children's book already. This sounds like an oversight to me because computers are already raising our kids."
canonical:
tags:
  - frontpage
  - gaming
  - parenting
  - rouge-like
  - rogue-lite
  - machine generating book
category:
  - frontpage
  - gaming
  - parenting
assets:
  js:
    -
  css:
    -
published: true
---

## My kid is smart&trade;

I am going to say what every parent says, my kid is smart&trade;. We read to her all the time and she loves it. We have been reading to her all her life. Now it's time for her to start to learn to read, and we are struggling. She isn't struggling, we (her parents) are struggling. This is because of the limited amount of material there is in this space. My daughter has a memory that is amazing; she "reads" her Arthur books to us word for word. This is because she has them memorized. Normally this happens after a single reading. Now that we are having her read she is doing the same thing. After one time through she is no longer reading --she is reciting.

## What about a book that writes itself

Inside every computer there is a book just waiting to be generated --or something like that. The solution to this problem is to have a book that writes itself. Easy right, write a program that writes children's books.

## Procedural conversation is hard

Just like we just saw with [Microsoft's Tay bot](https://en.wikipedia.org/wiki/Tay_(bot)) gone [nazi sympathizer](https://twitter.com/geraldmellor/status/712880710328139776).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Tay&quot; went from &quot;humans are super cool&quot; to full nazi in &lt;24 hrs and I&#39;m not at all concerned about the future of AI <a href="https://t.co/xuGi1u9S1A">pic.twitter.com/xuGi1u9S1A</a></p>&mdash; Gerry (@geraldmellor) <a href="https://twitter.com/geraldmellor/status/712880710328139776">March 24, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Procedural conversation generation is hard and it can have unforeseen results. Even with the [bot API's MS announced](https://dev.botframework.com/) at [BUILD](https://build.microsoft.com/). Thankfully, these book need to be simple. They have to be simple so that children can learn to read by reading them. If I keep the structure down to as simple a structure as possible and also template that structure so that it can must build sentences that match the template then I think we will be in a good place in both complexity and safety. This will be just slightly more complicated than a [madlib](https://en.wikipedia.org/wiki/Mad_Libs).

## Book structure

The structure of these book is basically all the same (with some out-layers that we will ignore for now). Here is a sample book that I have just pulled out of my <span title="With the subject matter being children's book">(censored)</span>.

1. This is Tom.
1. Tom has a hat.
1. Tom's hat is on his head.
1. Tom has a cat.
1. Tom's cat is wearing a hat.

So the book's structure as follows should be:

1. Introduction
1. Possession
1. Information
1. Dependent Introduction
1. Dependent Possession

We can add some more variety later, for now we will focus on this.

## Things needed

- [x] a [list of names](https://gist.github.com/frob/0628417b66c543f169c5056ea53dfdfe)
- [ ] a list of things
- [ ] a list of (age appropriate) body parts
- [ ] a list of possessive words
- [ ] a list of nouns
- [ ] a template system
- [ ] a list of templates

Once we have these things we can build this out just like a [madlib](https://en.wikipedia.org/wiki/Mad_Libs).

## How is this a game

This begs the bigger question, what is a game? I am not going to attempt to answer that right now. This post is already long enough. The mechanics of it are as follows.

 - The gameplay is the reading.

 - The level is the sentence.

 - The game is the book.

 - The levels are procedurally generated.

There is the possibility of a sequel. In the sequel the game complexity could scale to the player/user (maybe later). I have thought about this, but it is too early to consider this a feature.
