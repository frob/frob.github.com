---
layout: post
title: I like jekyll, but is it nesesary?
date: 2015-06-15
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

One of the first "Content Management Systems" I ever wrote was a pearl script that took flat text files and wrapped templates around them and gave me html. I cobbled this thing together and thought, huh, it worked. At the time  everything was changing and I hardly ever wrote content. So a script that did this wasn't extremely useful to me. It was more of an academic experience &ndash; especially because, at the time, I wasn't a professional web developer.

For the past 8 or so years I have been working primarily in [Drupal](https://www.drupal.org). I have seen other CMS's [come and go and comeback](http://www.joomla.com). I have seen forks and communities fall apart due to in fighting. I have seen major versions of projects that where worked on for years [get shelved and ultimately abandoned](http://www.exult.sf.net). I have seen much of this in the 8 or so years that I have been working with Drupal.

Drupal has been rock solid. However, every-time I have tried to launch by blog on Drupal I would get stuck in the weeds. I have re-built wordpress 3 times with Drupal. Each time getting the blog to a different 80% mark before other work or obligations would take me away. So this time I launched my blog on Jekyll. I gathered together as much old content as I could find and consolidated here, using the Jekyll Quickstart repo.

I also built the WAPRO meetup website in Jekyll using github pages and the same Jekyll Quickstart fork. It takes 5 minutes (10 if the internet connection is slow). Just fork the quickstart repo, change the _config.yml and you're up and running. All that is left after that is writing content. Also, github is hosting your site for free. If you want [to learn more about Jekyll read my post on Jekyll](/posts/2015/01/27/drupal-or-wordpress-why-not-jekyll.html).

Everything is rainbows. But I am not someone who can just sit back and let a rainbow be a rainbow. (Remember the bit on re-building Wordpress in Drupal over and over?) So I made Jenkins watch my github pages repo and publish my blog on my server every-time I committed and pushed the repository. Easy right? No, that is not enough. I needed a simple way of working with by blog so I started writing some Grunt commands to do things like add a new draft or start Jekyll serve.

Grunt, led me to Gulp. So I have gotten to know Gulp. I like Gulp more than I expected to. When you boil it down Gulp provides an intelligent extraction from disk io. You say Gulp get these files ```gulp.src(*.js)``` and Gulp gets them and asks you what you want to do with them. Oh Gulp, process them and write those files right over there ```gulp.dest('build')```.

## Awesome!

So, Gulp looks for all my files, processes them and then writes them. Why do I need Jekyll now? Personally I like to stream line my dependencies. Ruby is just another dependency now. Currently I am using SASS, but that is only because Jekyll uses Ruby. I can do everything with Less that I need SASS to do (really I can). So I really don't need Ruby for this. Let's see what does it take to make Jekyll with Gulp.

## What Does Jekyll give us?

We have established [[in another post](/posts/2015/01/27/drupal-or-wordpress-why-not-jekyll.html) that Jekyll gives us these things.

 - Centralized configuration and globals **_config.yml**
 - Templates **Liquid Templates**
 - Markdown Parsing
 - YAML Front matter
 - Plug-in input Processing
 - Bonus Points
    - Build Management
    - Drafts
    - Test Web Server

## The plan

I already know that there are gulp plug-ins that say they do, liquid templates, markdown parsing, and yaml parsing. The issue with relying on Gulp is that it is still a relatively new technology. This means that plug-ins sometimes say they do something or they don't do something fully or they are simply empty repositories that show where something was once going to be built. I am going to attempt this. But **no promises**. _This_ is for me. As I complete something I will post a link in the list above.
