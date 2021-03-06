---
layout: json
sitemap: false
title: Lets plan a new Arduino based video game console
date: 2015-12-22T00:00:00.000Z
description: "Why do we need a new game system? Because everything made today does too much."
canonical: null
tags: null
category: ['rant', 'frontpage']
assets:
  js:
    - null
  css:
    - null
published: true
---


## WHY make an new old video game system!?!

I saw this video.

<iframe width="420" height="315" src="https://www.youtube.com/embed/6kJV-BdsUWs" frameborder="0" allowfullscreen></iframe>

These videos beg the question; How do I stop my kids from being like this?

 When it's easier to build something in Minecraft than in the real world. How can I keep my kids interested in the physical world when everything is becoming digital.

This got me thinking about how the older generation used to talk about the ["push button" generation](http://www.seattletimes.com/nation-world/is-push-button-age-producing-a-generation-of-simpletons/). And it got me thinking about my kids, a generation behind the generation that has every user interface purpose built for ease of use. Everything I see built today (hardware or software) is about as easy as it can be. Usually nothing more than a single "GO" button.

In general this is a good thing, except I consider this to be a bad thing when it stops us from figuring out how things work. It's easy for physical tools to be re-imaginged and used for other purposes than they're intended; such as using a screw driver to pry up a staple, or some channel locks to pull out a finishing nail. The same thing is true of command line tools. It's the heart of the way \*nix systems work. One purpose built command being piped into another to achieve something possibly unintended. This isn't quite so easy when the system only allows one type of input and the only way to use it is to tap on the giant start button.

[Creativity strives in constraints](http://www.slideshare.net/chesterbr/atari-2600programming). We need constraints, even if the constrains are contrived.

There are two things that are universal with children. Education and Games. Games are considered fun and Education (mostly) is considered not fun. So how do we solve this with games?

### How do we stop this? Games!

Games and open source everything. Kids like to build things (just look at legos), kids like to learn things, and kids like to play games. We used to have cartridge based video games. In other words, we used to have to work for our video games.

Today the only video games systems are ones built for maximum convenience; they all work off of downloadable games. I think this is key. We need cartridges, kids need something that they can control and is physically obvious how it works. We need to put the kids back in control of making things happen.

# What I want to do

A cartridge based open source video game system. I would like this to be around the 16-bit (SNES, Genesis, and Turbo Graphics 16) era of difficulty. I think those consoles gave us a good mix of game-play, game-difficulty and ease-of-use.

## How I think this will work

### Disclaimer

I have not done this before. I have lots of experience programming, but little experience with digital electronics. My hope is that I get something useable working that inspires people that know more about what they are doing to stay within the vision and this becomes its own project.

### Goals

 - Cheap off-the-shelf parts (read easy to access)
 - Games read from cartridge
 - Simple (possibly already existing) Controller
 - Open source

### My plan

This is my current plan, this will change as I attempt to do things and fail at them.

I like the Arduino because it's open source and easy to access. These are available everywhere and it isn't too powerful. I do wonder if it isn't powerful enough, but seeing what people have done with them: [Arduboy](https://www.arduboy.com/), [space invaders](http://apcmag.com/arduino-project-7-build-a-retro-gamebox.htm/), [asteroids](http://nootropicdesign.com/hackvision/games.html#asteroids), etc; I think the Arduino will be good for a processor.

My biggest worry so far is the display, I don't want to use so much of the Arduino's limited power to drive a display. My current plan for this is to use two Arduinos. One for actual processing and another for driving the display. The central processor will feed a frame buffer and the other Arduino will read the frame-buffer and drive the display. My goal is to have several modes for the frame-buffer to pass the info to the Arduino. For example, allow a program to pass a diffed frame-buffer raster and some other info to allow for different special effects.

I still have no real plans for sound, other than the quality I want to aim for is a mix of Sound Blaster 16, SNES, and NES. Input was just going to be handled with the io on the Arduino.

### How am I going to do this

As I said before my plan is to get this far enough along with proof of concepts that other people (that might know more about what they are doing) will gain interest and take care of more of the fine points. I will need to learn a lot about the Arduino in-order-to pull this off. Here is my factored list so far (I will link to new posts from here, and I expect this list to grow as I find out more things I don't know).

 - Two Arduinos talking to each other
 - An Arduino writing/reading from some type of RAM
 - An Arduino reading a program from some type of ROM
 - An Arduino displaying stuff on a TV/Monitor
 - An Arduino getting input from an off the shelf game Controller

I have seen articles where people have done each of these things independently with an Arduino. I hope to pull all this together.
