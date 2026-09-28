---
title: A new take on old php in the modern era of web development
date: "2026-09-25"
description: It's funny, I wrote this to complain about the direction php but my LLM keeps wanting to turn this into a positive take on php.
slug: a-new-take-on-old-php-in-the-modern-era-of-web-development
tags:
    - frontpage
    - web development
    - software development
    - rant
draft: true
---

My two most viewed posts are my composer hello world tutorial and my setting up zdebug in zed post. These are followed by artilces on Drupal. My language of choice for doing websites has been php for a very long time. I have seen php grow from a template engine to a full scale object oriented language with some very useful and flexible functional programing nicities. When people suggest that Javascript is the real language of the web it sets off my gag reflex.

I have tried isomorphic programming (the same Javascript running server and client) and it doesn't work. PHP was beautiful in how it didn't try to ever, in production, try to do anything more than respond to requests. Sure, one can script in php, one can write cli's in php, one can even run php's built in webserver, but none of that was ever what one really did with php. The way php works is a webserver see's it is serving a php file and it runs it through the php parser. It could be old-school apache with mod_php or something more fancy like frankenphp but the result is the same `<?php #php goes here ?>`.

php is built into the markup. It isn't another language that is being shoehorned into a wisky server or some other non-sense. Don't get me wrong, any langauge that can respond to a port call can serve html and therefore can be a "web first" language. But not many languages are well suited for the job. php was well suited. that is before it tried to become a more grown up language. I really don't think it's as much the fault of the php developers as the people who use php. Around the same time that composer was released, php was releasing new features that made php easy to use. They made better features, like the elvis operator, and the null-colellescens operator.

While php was trying to be easier and adopt new syntactic sugar, php developers where pushing for standardization. Symfony, laravel, and typo3 pulled the likes of Drupal into a death spiral. Drupal adopted a modern php type of development, and in doing so killed off it's defining feature -- the site builder. The site builder role is what made Druapl accessible to thousands. The adoption of Symfony and "modern" php killed it. Drupal is on life support whither you want to admit it or not. I don't like saying it. I have over 18 on drupal.org. I have been to 13 DrupalCon's and I have spoken at 3 of them. To say Drupal is dead is, of corse, hyperbole. Drupal will, and should, live on in many univercity and publishing websites. It is still very useful when content is king, translations matter, publishing needs workflow rules, and complex and consistant information architecture is needed. But lets be real, not many websites fall into that category. 

If someone wants a simple website, Drupal is too expencive to run and too expensive to build. It is expensive to run because of php and it is too expensive to build because site building is now a complex endevor. Last year I retired a site that I built for a client with Drupal 8, and convinced them to pay for upgrades to 9 and 10. They didn't pay for a Drupal 11 upgrade. Meanwhile, this client is still running a site that was built on Drupal 7, paying for NES.

So what is my current stack? I build static sites. You might be surprised what can be served static. 99% of sites can be static, with serverless. I build a daily bible verse puzzle game, daily breadle, as a static site. It uses my serverless webform relay project for newsletter signups. My estimated costs for hosting will be cents for the lifetime of the site. The only cost is other maintanence, such as domain name. It is a hugo based static site that uses SAM to define a daily build cycle. It uses S3 for webhosting and cloudflare for https and cdn.

I built a static site that has a client side llm. I built a static site that has gated content. I built a static site that has password protected content. While it isn't cryptographically secure, it is secure enough for this content. I could argue that, just like most password protected sites, it would take a brute force attack to get to it so it is better than just security by obscurity. I think I will write a post on that next week.
