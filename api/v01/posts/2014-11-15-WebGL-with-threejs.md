---
layout: json
sitemap: false
title: WebGL with three.js
date: 2014-11-15
description: "Did you know that 3D is possible on the web with WEBGL? You did? Oh, well, go checkout Three.js then."
canonical: http://www.kwallcompany.com/blog/webgl-threejs
category: New Web
tags: [threejs, kwallcompany, tutorial, frontpage]
assets:
  js:
    - "//code.jquery.com/jquery-1.11.3.min.js"
    - "//cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js"
    - "/assets/js/2014-11-15-webgl.js"
---
Everything is moving away from the compiled native app and over to a more naturally cross platform ehh, platform: the web browser. While this has the advantage of (those not using IE) to have the same experience no matter what platform the site (hence to forth to be known as the webapp) is running on. This does still have some limitations. One relitively new api that has come out of this is WebGL

<div id="screen-wrapper"></div>

<a href="http://www.khronos.org/webgl/wiki/Main_Page" target="_blank">WebGL </a>is a way for web developers to directly access the <a href="http://www.opengl.org/" target="_blank">OpenGL </a>apis. WebGL has shown some remarkable adoption over the past few years and I have to think this is due to it being based on the very stable open apis from OpenGL. If you have used OpenGL (or any 3D programming) there is alot to do before anything can be rendered to the screen. I am not talking about art assets either, I am talking about templated boilerplate code that makes this stuff very tedios to start with. Luckily there are lots of Javascript people writing libraries so I don't have to rewrite the same boiler-plate code over and over again.

##Enter Three.js

<a href="http://threejs.org/" target="_blank">Three.js is a boiler-plate framework for building WebGL</a> applications. It takes care of much of the work that normally comes from building 3D apps and you can get up and running with a few lines of code.

The code below is used to draw the spinning cube you see above.

```js
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
   var scene = new THREE.Scene();
   var camera = new THREE.PerspectiveCamera(45, 640/480, 1, 1000);
   var renderer = new THREE.WebGLRenderer();
   renderer.setSize(640, 480);
   renderer.setClearColor(0x000000, 0);
   jQuery("#content article .field-name-body").append(renderer.domElement);
   jQuery("#content article .field-name-body canvas").css( {
    "margin": "1em auto",
    "display": "block"
    });

   var geometry = new THREE.BoxGeometry(1,1,1);
   var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
   var cube = new THREE.Mesh(geometry, material);

   var fog = THREE.Fog(0x000000, 1, 5);
   var ambient = new THREE.AmbientLight( 0x101030 );
   var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
   directionalLight.position.set( 0, 1, 0 );

   scene.add(cube);
   scene.fog = fog;
   scene.add(ambient);
   scene.add(directionalLight);

   camera.position.z = 2;
   var render = function () {
       requestAnimationFrame(render);
       cube.rotation.x += 0.01;
       cube.rotation.y += 0.01;
       renderer.render(scene, camera);
   };
   render();
&lt;/script&gt;
```

##Lets dive into the code.

```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js"></script>
```

This first line just loads the current release of three.js from a cdn.

```js
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 640/480, 1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(640, 480);
```

##Initialize!!

First thing we do to initialize the scene, camera, and renderer.

- *scene*
  - The scene is an object that controls the 3D space that is rendered.
- *camera*
  - The cammera controls how the scene is rendered. Options include:
    - **OrthographicCamera** (no perspective, isometric view)
    - **PerspectiveCamera** (camera with perspective projection)
- *renderer*
  - The renderer controls what is drawn on the screen and how. CanvasRenderer should be used in the case where WebGLRenderer is not supported. CanvasRenderer draws the scene as best as it can without GPU acceleration.

```js
  jQuery("#content article .field-name-body").append(renderer.domElement);
  jQuery("#content article .field-name-body canvas").css( {
    "margin": "1em auto",
    "display": "block"
  });
```

The renderer will create a canvas DOM object to use to draw the scene to the browser window. However, you still have to add the canvas to the page or alternatively you can pass the canvas ellement to the renderer contructor. In this case we are using jQuery to prepend the canvas ellement into the body field of this article. We are also assigning some style to the canvas ellement.

```js
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
  var cube = new THREE.Mesh(geometry, material);

  var fog = THREE.Fog(0x000000, 1, 5);
  var ambient = new THREE.AmbientLight( 0x101030 );
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  directionalLight.position.set( 0, 1, 0 );
```

##geometry, material, and cube

Geometry and matierials are used to define a renderable object in 3D space. The geometry defines the actual mesh of the object. The material defines how the object is seen. These two things are brought together to define the cube.

Geomety is farily simple, the material is where things get interesting. Polygon count doesn't mean nearly as much as it used to; far more impresive things are made with shaders and materials are what define how the shader interacts with the object (in this case the cube). For this simple demo I used the MeshLamertMaterial. All that means is that the object will interact with lights. There are many different things that a tallented artist can do with lights and shaders on a simple two poly plane. That however, if far beyond the scope of this post. For more on the power of shaders watch this<a href="https://www.youtube.com/watch?v=GNO_CYUjMK8" target="_blank"> talk from JSConfUS on Shaders</a>.

##fog, ambient, and directionalLight

These are all made to make the visual more apealing. Fog creates a gradually increasing shadow (which cannot even be noticed on my cube), ambient is the natrual ambient lighting, and directionalLight is light that comes in from a set point. Light without direction has no shadows so this is important to the scene.

```js
  scene.add(cube);
  scene.fog = fog;
  scene.add(ambient);
  scene.add(directionalLight);
  camera.position.z = 2;
```

##Add it all up

Once everything is defined then we simply add everything to the scene. Fog is a property of the scene so it isn't added in the same way. Once everything is complete we set the cammera distance.

```js
  var render = function () {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
  };
  render();
```

##One more thing

One more thing is required to make the scene update. If the scene had no movement then there would be no point in making it use realtime hardware processing. By creating the render function and then calling that function wth requestAnimationFrame and renderer.render we are creating the game loop and allowing updates to occur. This is why the cube is spinning.
