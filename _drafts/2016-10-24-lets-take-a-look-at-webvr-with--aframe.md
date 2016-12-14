---
layout: post
title: Lets take a look at webVR with AFrame
date: 2016-10-24
description: "I should continue my series on Machine Generated text or Composer or Drupal, but this just looks like too much fun. WebVR with AFrame."
canonical:
tags:
category:
assets:
  js:
    - "//cdnjs.cloudflare.com/ajax/libs/aframe/0.3.2/aframe.js"
  css:
    -
---

Do you remember that time when you googled a  js lib, only to find something named what you thought but as a completely different js lib? Well that happened when I was looking for A-Frame. Just so you know we are not talking about this slightly debunked mvc js framework; we are going to be talking about Mozilla's WebVR lib A-Frame.

# What is [A-Frame](https://aframe.io/docs/0.3.0/introduction/faq.html#do-i-call-it-“a-frame”-or-“aframe”-or-“aframevr”-or-“aframe”)

blah blah blah

## How to use A Frame

Remember when you read my [introduction to Threejs](https://www.frobiovox.com/posts/2014/11/15/WebGL-with-threejs.html) (because you are an avid reader of my blog)? Well that will be useful now because AFrame uses Threejs behind the scenes to manage the webgl. So lets do that first.

<iframe width="640" height="480" allowfullscreen src="https://frob.github.io/aframeexamples/" ></iframe>

My old example converts easily to A-Frame. While the Threejs example is around 30 lines of Javascript, the A-Frame example converts to about 9 custom html tags with no custom JS. Not even for the animation. I am not the kind of person that considers code to be harder than markup, but in this case it makes more sense to use markup and the majority of the information that is lost is the boilerplate code. All we have to do to setup a scene is use the ```<a-scene></a-scene>``` tags. All the parts of the scene go inside.

To recreate my Threejs example I used these components and primitives:
 - [scene](https://aframe.io/docs/0.3.0/core/scene.html)
  **a-scene** This is the container that holds the other components and primitives. There should only be one on a page. This is also where several global properties should be defined; this is where the *fog* got defined in my example reboot. If you want more scenes on a page, then use iframes.
 - [box](https://aframe.io/docs/0.3.0/primitives/a-box.html)
  **a-box** A-Frame provides several simple primitives, this is one of them. Read the docs to find them all. Models are also allowed.
 - [animation](https://aframe.io/docs/0.3.0/core/animations.html)
 - [sky](https://aframe.io/docs/0.3.0/primitives/a-sky.html)
 - [entity](https://aframe.io/docs/0.3.0/core/entity.html)
 - [camera](https://aframe.io/docs/0.3.0/components/camera.html)

In order to have multiple examples on this page we need to use iframes, so I will provide links to the [A-Frame examples used on this page](https://github.com/frob/aframeexamples) and the [official A-Frame examples](https://github.com/aframevr/aframe/blob/master/examples) after each example.

### 3D primitives

According to [AFrame's Hello World example](https://github.com/aframevr/aframe/blob/master/examples/boilerplate/hello-world/index.html), just insert some simple invalid html and the lib will take care of the rest.

```html
<div>
<a-scene>

  <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
  <a-box position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1"  color="#4CC3D9"></a-box>
  <a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
  <a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>

  <a-sky color="#ECECEC"></a-sky>
  <a-entity position="0 0 3.8">
    <a-camera></a-camera>
  </a-entity>
</a-scene>
</div>
```

### Skybox

### Billboards

Unfortunately, A-Frame doesn't support billboard components out-of-the-box. But it is built on an [enitty-component-system pattern](https://aframe.io/docs/0.3.0/docs/core) (which they repeat all over their FAQ page). So adding a component type is somewhat trivial. Take a look at a [random billboard component from github](https://github.com/blairmacintyre/aframe-look-at-billboard-component).

I am not going to go through how to create new components or even include the source code here. Take a look for yourself, it is only 165 lines and it really isn't all that complicated. Maybe if I ever need to write a new custom component I will do a writeup about it.

Using the above billboard component we can get a scene like this:

<iframe width="640" height="480" allowfullscreen src="https://frob.github.io/aframeexamples/example-billboard.html" ></iframe>

> Note that this billboard example will only work if the ad blockers are turned off. They don't like that this library has the word billboard in it. In case you are wondering, billboard is the name of an ad. Just to avoid confusion. So that no one is confused. I really, really, really hope that you are not confused.

### Models

bla bla bla

### Composite

something about using webvr mixed with html.

### Shaders

What is a shader, how do we use custom shaders.

## Is it cool?
