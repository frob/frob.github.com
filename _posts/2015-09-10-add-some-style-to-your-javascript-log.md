---
layout: post
title: "Add Some Style to Your JavaScript Log"
date: 2015-09-10
description: "Style can be passes as a parameter to the console.log function."
canonical:
tags: ["frontpage", "tutorials", "browsers", "debug"]
category:
assets:
  js:
    - "/assets/js/2015-09-10-colorfulllog.js"
  css:
    -
---

<a href="#howitdo">Skip the fluff</a>
## Backstory

Anytime I want to show off what the web can do with a simple blog I have to pull up [this awesome site](http://acko.net). I was on [A Very Cool Site about Hackery, Math &amp; Design](http://acko.net/), and the question was asked "how did he do that?"

So it was time to open my console. This is what I found.

<img class="image-center" src="/images/2015091005.png" />

Which lead to the question "how did he do that?"

# How <span title="The colorful console message">**_that_**</span> is done.

I you are not aware already, there are quite a few methods available in the global ```console``` object. If you are not familure I recommend the [Mozilla Developer Network pages on ```console```](https://developer.mozilla.org/en-US/docs/Web/API/consol). Some methods of importance are:

 - log (_duh_)
 - assert
 - trace
 - error
 - count

 These are old news and I wont go into them in detail here. Just look them up on the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/consol).

<a id="howitdo"></a>

## So then how was it done?

 Scroll ahead to the <q>[Outputting Text to the console](https://developer.mozilla.org/en-US/docs/Web/API/console#Outputting_text_to_the_console)</q> portion of the MDN doc and you will see that ```console.log``` will take in its first parameter some string wrappers. ```%f``` for float, ```%s``` for string, and so on. At the very bottom of the page you will see the ```%c```, which wrapps the remaining text in some style as the second parameter.

 ```js
 console.log("%cHello", "color: red;");
 ```

 Will render as:

<span style="color:red;">Hello</span>

### Results across browsers

In the console. From the screen shots below you will see that this works will all modern browsers (although, I don't have direct access to a PC with IE or Edge at the moment, but I will assume they work too).

**Chrome**

<img class="image-center" src="/images/2015091001.png" />

**Firefox Inspector**

<img class="image-center" src="/images/2015091002.png" />

**Firefox Firebug**

<img class="image-center" src="/images/2015091003.png" />
