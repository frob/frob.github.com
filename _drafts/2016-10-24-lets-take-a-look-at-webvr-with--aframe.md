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

Do you remember that time when you tried to find a Javascript library only to find the wrong Javascript library with the same name. Well that happened when I was looking for [A-Frame](https://aframe.io). Just so you know we are not talking about the slightly older MVC Javascript framework named AFrame; today, we are going to be talking about [Mozilla's WebVR library A-Frame](https://aframe.io).

# What is [A-Frame](https://aframe.io/docs/0.3.0/introduction/faq.html#do-i-call-it-“a-frame”-or-“aframe”-or-“aframevr”-or-“aframe”)

A-Frame is an open-source web framework for building virtual reality experiences on the web. We can use A-Frame to build VR web page using only some custom markup. Under the hood, A-Frame uses the threejs framework. A-Frame was built to make virtual reality more accessible to the web community and to kick-start the WebVR content ecosystem. It is easy to learn and extensible, allowing us to quickly prototype Virtual Reality experiences. A-Frame makes WebVR accessible to content creators and not just cutting edge developers.

## How to use A Frame

Remember when you read my [introduction to Threejs](https://www.frobiovox.com/posts/2014/11/15/WebGL-with-threejs.html) (because you are an avid reader of my blog)? If you know how to use threejs then you already know how to extend A-Frame. That is because A-Frame uses threejs behind the scenes to manage the webgl. Let's take a look at the example from my threejs post.

<iframe width="640" height="480" allowfullscreen src="https://frob.github.io/aframeexamples/" ></iframe>

My old example converts easily to A-Frame. While the threejs example is around 30 lines of Javascript, the A-Frame example converts to about 9 lines of custom html tags with no custom JS. It doesn't even use custom js for the animation. I am not the kind of person that considers code to be harder than markup, but in this case it makes more sense to use markup and the majority of the information that is lost is the boilerplate code. All we have to do to setup a scene is use the ```<a-scene></a-scene>``` tags. All the parts of the scene go inside.

[A-Frame example: threejs port](https://frob.github.io/aframeexamples).

```HTML
<a-scene fog="type: linear; color: #000; near: 1; far: 5" color="black">
  <a-box position="0 1.5 0" rotation="0 45 0" width="1" height="1" depth="1"  color="#00ff00">
    <a-animation attribute="rotation"
                 dur="9500"
                 easing="linear"
                 from="0 45 0"
                 to="-360 405 0"
                 repeat="indefinite"></a-animation>
  </a-box>
  <a-sky color="#000"></a-sky>
  <a-entity light="type: ambient; color: #101030"></a-entity>
  <a-entity light="type: directional; color: #ffffff; intensity: 0.5" position="0 1 0"></a-entity>
  <a-entity position="0 0 2">
    <a-camera></a-camera>
  </a-entity>
</a-scene>
```

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

The best example of primitives is on the [A-Frame homepage](https://aframe.io/examples/showcase/helloworld/).

### Skybox

If you read the above carefully you will notice that a skybox is just a primitive in A-Frame. This can be just a color or an asset, such as an [equirectangular image](https://www.flickr.com/groups/equirectangular/).

```html
<a-sky color="#ECECEC"></a-sky>
```

or

```html
<a-assets>
  <img id="sky" src="sky.png">
</a-assets>
<a-sky src="#sky"></a-sky>
```

This is much easier than having to sync up textures and position on 5 separate quads or having to define an inner texture for a cube and keeping the position up-to-date with the camera position.

### Billboards and custom components

Unfortunately, A-Frame doesn't support billboard components out-of-the-box. But it is built on an [enitty-component-system pattern](https://aframe.io/docs/0.3.0/docs/core) (which they repeat all over their FAQ page). So adding a component type is somewhat trivial. Take a look at a [random billboard component from github](https://github.com/blairmacintyre/aframe-look-at-billboard-component).

I am not going to go through how to create new components or even include the source code here. Take a look for yourself, it is only 165 lines and it really isn't all that complicated. Maybe if I ever need to write a new custom component I will do a writeup about it.

> A [billboard](http://www.opengl-tutorial.org/intermediate-tutorials/billboards-particles/billboards/) is a 3D primitive that usually consists of two triangles that make up a rectangle face that is always pointed at the camera.

Using the above billboard component we can get a scene like this ([billboard example](https://frob.github.io/aframeexamples/example-billboard.html)):

<iframe width="640" height="480" allowfullscreen src="https://frob.github.io/aframeexamples/example-billboard.html" ></iframe>

> Note that this billboard example will only work if the ad blockers are turned off. They don't like that this library has the word billboard in it. In case you are wondering, billboard is the name of an ad. Just to avoid confusion. So that no one is confused. I really, really, really hope that you are not confused.

Here is the important part.

```html
<a-assets>
  <img id="scorpion" src="images/8bitninja.gif" />
</a-assets>

<a-entity billboard id="ninja1" position="0 1 0" geometry="primitive: plane; height: 1.5; width:1;" material="src: #scorpion;opacity:.8" ></a-entity>
```

[Full bullboard example code](https://www.github.com/frob/aframeexamples/master/example-billboard.html).

The billboard custom component allows us to create a normal entity and just use an attribute ```billboard``` to tell A-Frame that this entity is a billboard. There are many custom A-Frame components, links are available on the A-Frame component docs page.

#### Assets

This is as good a time as any to talk about asset management in A-Frame (you might have noticed the ```a-asset``` tag in the last example). Simple scenes can handle assets in a simple manner --with an inline attribute. However, when things get more complicated, or as in my (still simple) example where we have three billboards all using the same asset, then [A-Frame's asset management system](https://aframe.io/docs/0.3.0/core/asset-management-system.html) comes in very handy. Here is an example of both ways of [loading assets ripped ripped straight from the docs](https://aframe.io/docs/0.3.0/primitives/a-image.html).

```html
<a-assets>
  <img id="my-image" src="image.png">
</a-assets>
<!-- Using the asset management system. -->
<a-image src="#my-image"></a-image>
<!-- Defining the URL inline. Not recommended but more comfortable for web developers. -->
<a-image src="another-image.png"></a-image>
```

Non-multimedia assets have the default behavior of blocking the rendering of the scene until all assets have loaded --this is configurable on a per asset basis. This simplifies the preloading of assets. There are more [asset controls in the docs](https://aframe.io/docs/0.3.0/core/asset-management-system.html), such as having a timeout that the scene will begin loading even if the assets don't load in time or dealing with asset **loaded** events.

### Models

Primitives are nice for simple things, but aside from A-Frame demos I doubt they will be used too often in a real application. Luckily A-Frame has a simple way to load mesh objects. To demo this I will demo the same model or mesh that every 3D demo uses --the [Utah Teapot](https://en.wikipedia.org/wiki/Utah_teapot).

<iframe width="640" height="480" allowfullscreen src="https://frob.github.io/aframeexamples/example-model.html" ></iframe>

```html
<a-scene fog="type: linear; color: #000; near: 1; far: 5" color="black">
  <a-assets>
    <a-asset-item id="teapot" src="models/teapot.obj"></a-asset-item>
  </a-assets>

  <a-entity obj-model="obj: #teapot" color="green" position="0 0 -2.5">
    <a-animation attribute="rotation"
                 dur="9500"
                 easing="linear"
                 from="0 45 0"
                 to="0 405 0"
                 repeat="indefinite">
    </a-animation>
  </a-entity>

  <a-sky color="#000"></a-sky>
  <a-entity light="type: ambient; color: #101030"></a-entity>
  <a-entity light="type: directional; color: #ffffff; intensity: 0.5" position="0 1 0"></a-entity>
  <a-entity position="0 0 2">
    <a-camera></a-camera>
  </a-entity>
</a-scene>
```

#### Meshes Materials and Shaders oh my!

You will notice that the above demo has a rather bland looking teapot. This is because it only uses a mesh object and has no material. If you are not familiar with 3D, something that is seen on the screen is normally a combination of three different things. There is the Mesh (or Model) that defines the geometry of the object, there is the Material that defines the textures used to show definition in the object, and there is the Shader that is the part that says how to put all three things together. Shaders are very powerful things and can be extremely complicated, so I will not go into how to write them in this article. They can give the 3D artist a huge amount of visual flexibility even with very simple meshes. I will go into more depth on shaders in a moment, but please checkout this video on shaders, they are awesome.

### Shaders

As said before shaders are how the computer knows what to display. A-Frame has some basic default shaders built in, but it also supports custom shaders.

Generally speaking there are two types of Shaders: Vertex Shaders and Pixel Shaders. Vertex Shaders act on the geometry of an object and the Pixel Shaders affect the image on a pixel by pixel basis.

A common use of the Vertex Shaders is to provide a smoothly effect on a mesh (it is impossible to have a truly smooth mesh, a Vertex Shader can make a dodecahedron appear to be smooth in the middle). A common use of a Pixel Shader is provide a bump map or normal map effect. This can provide seemingly complex depth on a very simple model. Another common use of a Pixel Shader is to produce a post processing effect on the whole image --think of an instagram filter.

### Composite

One of the downsides to the way A-Frame is built is that on an A-Frame page there can be no other content. Okay, this isn't completely true. Some html can be layered outside the A-Frame ```a-scene``` tags. But the results are inconsistent and mostly undesirable. The recommended way to include text in a scene is to bake the text into a texture and apply that texture to a quad (or plane).

There also exists the *HTML Shader*, which is a custom shader that takes HTML from the dom and places it in a scene. My experience with the HTML Shader has not been favorable, and I question how portable and scalable it is and how well if reacts to events.

## Is it cool?

This seems like the biggest question more Javascript developers ask when adopting a new library. The short answer is yes but the longer answer is it depends.

### It depends?

The usability of this cool new tech is all about what we do with it. I have given talks on A-Frame and the question is normally framed like this "What can we do with it?" And I respond I just showed you what it was meant to do. I bring this up to say, lets not parallax WebVR. It's cool, but if we don't use it the right way it will suck.

### Can I use it?

Go checkout caniuse for WebGL and WebVR the browser support for A-Frame and the browser support for threejs.
