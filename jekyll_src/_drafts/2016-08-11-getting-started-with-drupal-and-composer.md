---
layout: post
title: Getting started with Drupal and Composer
date: 2016-08-11
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



mikey_p:
Mixologic: is it possible to look at the json for an individual package on d.o composer facade?
Mixologic:
mikey_p: yeah, but it aint terribly simple. do you have a jsonviewer plugin in your browser?
nielsonm has joined (~nielsonm@174-25-178-34.ptld.qwest.net)
Mixologic:
(I use JsonView)
mikey_p:
yeah, i was able to do a search, but I can't figure out that pattern for individual projects
Mixologic:
what project are you trying to inspect?
mikey_p:
better_exposed_filters
mikey_p:
found it via search at packages.drupal.org/8/search.json?s=better_exposed_filters
Mixologic:
so I would do "composer info -a -vvv drupal/better_exposed_filters" and watch for it to say something like "Downloading https://packages.drupal.org/8/drupal/better_exposed_filters%24e1db6ab3ef0bce75c5a05569b1e1b9656d55ab25ea449b86308bd436b2d8d344.json"
Mixologic:
mikey_p: is that what you're trying to find?
Mixologic:
otherwise composer info -a is pretty much parsing the individual package.json and already giving you a prettyfied version of it.
nielsonm has left IRC (Read error: Connection reset by peer)
frob: 
Mixologic: is that json generated?
mikey_p:
looks like it got it from cache, so I'm not seeing that output
Mixologic:
frob: yep. its being generated via the project_composer module
frob: 
cool
Mixologic:
and merged with composer.json if its there.
Mixologic:
essentially what packagist does, except doesnt require a composer.json
mikey_p:
Mixologic: any reason for the weird hash like that?
Mixologic:
mikey_p: yep, its essentially an SHA256 of the json file. its composer's internal caching mechanism that for some reason they built instead of just using something like etags or something.
Mixologic:
composer loads -> packages.json, which lists "provider files". each provider file is a sha256 of its contents: https://packages.drupal.org/8/packages.json
nielsonm has joined (~nielsonm@174-25-178-34.ptld.qwest.net)
Mixologic:
each of those provider files is essentially a quarterly subdivision of the last release.  which means the first time you run composer, ever, you download 24 files or so, so that composer knows where to find the specific metadata for a specific project.
Mixologic:
but each time you run it after that, it only gets the files that have changed. which in this case is most likely to be the 2016-3 file.
Mixologic:
it actually works out kinda nice because we can keep all that data in files, generate new files, and keep the old ones around for 10 minutes and there's never a race condition.
