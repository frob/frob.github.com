---
layout: post
title: Support should not be based on Marketshare
date: 2013-10-06
description: "Some general thoughts on the how and why of Graceful Degradation and Progressive Enhancement. No tutorials here, more philosophical than functional"
canonical:
collection: frontpage
tags: ['web development', rant, frontpage]
category:
assets:
  js:
    -
  css:
    -
---

In web development IE has been the bane of front-end developers everywhere. For a long time it was IE6, and now it is IE8/9 that give the most grief. Every browser has its little issues here and there. Little quirks that make us developers need to test in every conceivable situation. Specifically it is that browsers do things their own way (for better or worse); they may or may not conform to standards and they may do somethings that are completely non-standard.

As web developers we have no control over how anything we ship will be consumed. It could be viewed on a large Apple Cinema display or on an iPhone or any number of thousand Android devices --or heaven forbid a screen reader. So if a site is consumed across four browsers (IE, Firefox, Safari, and Chrome) and we have to support multiple versions of those browsers (IE7/8/9/10/11, Firefox Latest, Safari OSX-7/8/iOS-7-8, Firefox Latest, Chrome Latest and Mobile) and you add in the default of 4 breakpoints per. That means that fully testing these devices would mean QA across: 12 environments on 4 breakpoints and at least 4 OSs (Windows, OSX, Android, iOS) (and yes I know that not all these browsers work on all the OSs) that would make no less than 12 * 4 * 4 = 192 testable environments at launch. This means two things are important, graceful degradation  of features and graceful degradation of design (my PM told me not to call it Graceful Degradation but rather Progressive Enhancement). The way web browsers (and other web enabled devices) work is they make their best effort to display content in the way that it was intended. The problem is that some web portals are more effective at this than others.

So what is “<del>graceful degradation</del> Progressive Enhancement?” This is attempting to control the degradation in a meaningful way. The largest part of this in the management of expectations of the client. The current model of "we fully support these browsers based solely on market share" is a bad idea. Some things are so cost prohibitive that they are basically impossible on some browsers and that shouldn't mean that we shouldn't do them on the browsers that do support it. There are tools that help but all come at a cost. Usually a cost of performance. Sure this makes a site look more like the Photoshop/Fireworks/Sketch design, but it takes a toll and normally it will add small delays and make a site feel sluggish.
