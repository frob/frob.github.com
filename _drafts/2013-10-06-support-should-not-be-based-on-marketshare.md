---
layout: post
title: Support should not be based on Marketshare
canonical:
tags:
category:
assets:
  js:
    -
  css:
    -
---

In web development IE has been the bane of front-end developers everywhere. For a long time it was IE6, and now it is IE8/9 that give the most greiff. Every browser has its little issues here and there. Little quirks that make us developers need to test in every conceivable situation. Specifically it is that these browsers do things their own way; they do not conform to the standards to which other browsers conform.

As web developers we have no control over how anything we ship will be consumed. It could be viewed on a large Apple Cinema display or on an iPhone or an number of thousand Android devices --or heaven forbid a screen reader. This means two things are important, graceful degradation of features and graceful degradation of design. The way web browsers (and other web enabled devices) work is they make their best effort to display content in the way that it was intended. The problem is that some web portals are better at this than others.

So what is “graceful degradation?” This is attempting to control the degradation in a meaningful way. The largest part of this in the management of expectations of the client. The current model of we fully support these browsers based solely on market share is a bad idea. Some things are so cost prohibitive that they are basically impossible on some browsers. There are tools that help but all come at a cost. Usually a cost of performance. Sure this makes a site look more like the Photoshop design, but it takes a toll and normally it will add small delays and make a site feel sluggish.
