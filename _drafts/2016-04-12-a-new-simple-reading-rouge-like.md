---
layout: post
title: a new simple reading rouge like
date: 2016-04-12
description: ""
canonical:
tags:
category:
assets:
  js:
    -
  css:
    -
---

## My kid is smart (tm)

I am going to say what every parent says, my kid is smart. We read to her all the time and she loves it. We have been reading to her all her life. Now it's time for her to start to learn to read, and we are struggling. She isn't struggling, we (her parents) are struggling. This is because of the limited amount of material there is in this space. My daughter has a memory that is amazing; she "reads" her turtle books to use word for word. This is because she has them memorized, normally this happens after a single time through. Now that we are having her read she is doing the same thing. After one time through she is no longer reading --she is reciting.

## Procedural conversation is hard

Just like we just saw with Microsoft's Tai bot. Procedural conversation generation is hard and it can have unforeseen results. Even with the API's MS announced at BUILD, doing that is out of scope for this. However, these book need to be simple. They have to be simple so that children can learn to read by reading them. If I keep the structure down to as simple a structure as possible and also template that structure so that it can must build sentences that match the template then I think we will be in a good place in both complexity and safety.

## Book structure

The structure of these book is basically all the same (with some out layers that we will ignore for now). Here is a sample book that I have just pulled out of my <span title="With the subject matter being children's book">(censored)</span>.

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

- [ ] a list of names
- [ ] a list of things
- [ ] a list of body parts
- [ ] a list of possessive words
- [ ] a list of nouns
- [ ] a template system
- [ ] a list of templates

Once we have these things we can build this out just like a madlib.

## How is this a game

The gameplay is the reading.

The level is the sentence.

The game is the book.

The levels are procedurally generated.

The game complexity scales to the player/user (maybe later).
