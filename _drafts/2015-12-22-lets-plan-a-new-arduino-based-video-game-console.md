---
layout: post
title: Lets plan a new Arduino based video game console
date: 2015-12-22
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

## WHY make an new old video game system!?!

I saw this video.

(video of kids unable to put a cassette into a walkman)

It got me thinking about how old people used to complain about the "push button"
 generation. And it got me thinking about my kids, a generation behind the one that has every user interface purpose built for ease of use. Everything I see built today is about as easy as it can be. I consider this to be a bad thing. Creativity strives in constraints. We need constraints, even if the constrains are contrived.

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

I like the Arduino because it's open source and easy to access. These are available everywhere and it isn't too powerful. I do wonder if it isn't powerful enough, but seeing what people have done with them: Arduboy, space invaders, asteroids, etc; I think the Arduino will be good for a processor.

My biggest worry so far is the display, I don't want to use so much of the Arduino's limited power to drive a display. My current plan for this is to use two Arduinos. One for actual processing and another for driving the display. The central processor will feed a frame buffer and the other Arduino will read the framebuffer and drive the display. My goal is to have several modes for the framebuffer to pass the info to the Arduino. For example, allow a program to pass a diffed framebuffer raster and some other info to allow for different special effects.

I still have no real plans for sound, other than the quality I want to aim for is a mix of Sound Blaster 16, SNES, and NES. Input was just going to be handled with the io on the Arduino.
