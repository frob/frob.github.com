---
layout: post
title: Making a self writing children's book: step one, making lists
date: 2016-09-27
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

It is time to start getting more done on my reading rouge-like. Thus, as it is with any project for most any software engineer, this means making lists. From my introduction post on why and how I intend to do this, I have this list already.

We start with a simple example book.

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

We can add some more plot later, for now we will focus on this.

## Lists needed

I will be putting these lists into gists.

- [x] a [list of names](https://gist.github.com/frob/0628417b66c543f169c5056ea53dfdfe)
- [ ] a list of things
- [ ] a list of (age appropriate) body parts
- [ ] a list of possessive words
- [ ] a list of nouns
- [ ] a list of templates
- [ ] a template system

## a template system (prerequisite)

Before we can really start to write our templates we will need a template system.

Something else I noticed is that most of the things on these lists have some sort of verbal or (pro)noun or template dependancy. For example: gender of character, place where the thing is (Tom's hat is on his head [generically Tom could be holding his thing]). This doesn't influence the template system as much as the way the next branch is chosen. Many possible choices are not relevant because of a previous choice. I will need to remember this.

## a template system

[Backus Naur Form](Backus–Naur Form - Wikipedia, the free encyclopedia) -- this is my initial thought for a language template system. If you are not familiar with Backus Naur Form, on a high level, is a way of organizing language statements from vague to specific. BNF is used in computer science as a way to define the grammar of a computer language, here is an example:

| Statement | Possibilities       |
|:----------|:--------------------|
| Sentence  | Subject Verb Object |
| Subject   | Noun                |
| Object    | Noun                |
| Verb      | Eat                 |
| Verb      | Like                |
| Noun      | I                   |
| Noun      | Like                |
| Noun      | Python              |

> I know, technically in this case *I* is a pronoun.

It can be difficult to explain in text, so here is a handing video from the folks at [Udacity](https://www.udacity.com/).

<iframe width="560" height="315" src="https://www.youtube.com/embed/B4wMpOhOako" frameborder="0" allowfullscreen></iframe>

Using this form we can organize the possibilities from the lists and organize our sentence structure. Using the simple table above (taken from the video) is not enough to give us more than a single valid very simple sentence. More work will need to be done to better define this as a way of giving use a true series of sentences and more specificity to the type of verb's, noun's, and object, used.

## Sentence series definition

Currently we have this as our list of sentence types.

1. Introduction
1. Possession
1. Information
1. Dependent Introduction
1. Dependent Possession

We could just follow them in a hard coded manner, but that wouldn't be flexible, it would develop a pattern that any intelligent child would pick up on and get board with, and it wouldn't be very fun for me (the guy who is developing all this). So lets do something about this.

### Defining to create a non-repeating pattern

If we distill what is happening in this story structure then we end up with this as the repeating pattern.

1. Introduction ⟶ intro
1. Possession ⟶ posse
1. Information ⟶ info
1. Dependent Introduction ⟶ dintro
1. Dependent Possession ⟶ dpinfo

Let take a closer look at the story structure I wrote earlier. There is something to notice about the dpinfo part and how it relates to the posse and info parts of the above list.

| Sentence Type | Sentence                    |
|:--------------|:----------------------------|
| intro         | This is Tom.                |
| posse         | Tom has a hat.              |
| info          | Tom's hat is on his head.   |
| dintro        | Tom has a cat.              |
| dpinfo        | Tom's cat is wearing a hat. |

Notice that the *dpinfo* part is directly related to the *posse* and *info*. This was intentionally done by me to break up the way that things can be said. Tom **has** a hat and his hat **is on his head**. This is the same a the cat **wearing**. This should be every time, but this tells us two things. First, there needs to be another sentence type; *dhposse*, this will be used in the case that the dependent possession statement doesn't provide and additional information.

This also shows that we have split our story into two parts. Lets call these parts the *Primary* story and *Dependent* story. Both story parts have the same pieces, with the exception that the dependent story part depends on what the primary story part says.

## Add the story structure to the BNF

Now that we have our story structure defined we can organize our BNF table.

| Statement | Possibilities                                         |
|:----------|:------------------------------------------------------|
| Story     | pstory dstory                                         |
| pstory    | intro. posse. info.                                   |
| dstory    | dintro. dposse. dpinfo.                               |
| dstory    | dintro. dpinfo.                                       |
| intro     | itrosen                                               |
| posse     | possesen                                              |
| info      | infosen                                               |
| dintro    | dintrosen                                             |
| dpinfo    | dpinfosen                                             |
| introsen  | This is Pname                                         |
| dintrosen | Pname knows Dname                                     |
| possessen | Pname Verb(possessive|gender) a Object                |
| dpossesen | Dname Verb(possessive|gender) a Object                |
| infosen   | Pname's Object is Adverb Pronoun(possessive) Bodypart |
| dinfosen  | Dname's Object is Adverb Pronoun(possessive) Bodypart |
| Sentence  | Subject Verb Object                                   |
| Subject   | Pronoun                                               |
| Object    | Noun (from list of objects)                           |
| Verb      | Has, Holding                                          |
| Adverb    | On, In                                                |
| Pronoun   | She, He, They, It                                     |
| Bodypart  | Noun (from list of body parts)                        |

I left the generic sentence in the BNF table because it might be useful later as a filler sentence definition.



















<div></div>
