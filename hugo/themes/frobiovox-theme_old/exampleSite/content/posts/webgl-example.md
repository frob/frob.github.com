---
title: "WebGL with three.js"
date: 2024-01-25T10:00:00-00:00
draft: false
description: "Did you know that 3D is possible on the web with WEBGL? You did? Oh, well, go checkout Three.js then."
canonical: "http://www.kwallcompany.com/blog/webgl-threejs"
category: "New Web"
tags:
  - threejs
  - kwallcompany
  - tutorial
  - frontpage
aliases:
  - /blog/webgl-threejs/
  - /2014/11/15/webgl-with-threejs/
assets:
  js:
    - //code.jquery.com/jquery-1.11.3.min.js
    - //cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js
    - /assets/js/2014-11-15-webgl.js
  css: []
---

This is an example post demonstrating the new frontmatter structure compatible with Jekyll posts.

## Features Demonstrated

This post shows how the Hugo theme now supports:

- **description**: A description field that appears in both the post and listings
- **canonical**: Link to the original publication URL
- **category**: Post categorization
- **tags**: Multiple tags for organizing content
- **assets**: Arrays for page-specific CSS and JavaScript files

## Assets Array

The assets array allows you to include additional CSS and JavaScript files on a per-post basis:

```yaml
assets:
  js:
    - //code.jquery.com/jquery-1.11.3.min.js
    - //cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js
    - /assets/js/2014-11-15-webgl.js
  css:
    - /assets/css/custom-styles.css
```

These assets will be automatically included in the page head (for CSS) and before the closing body tag (for JS).

## Usage

When creating a new post with `hugo new`, the archetype will include all these fields for you to fill in as needed.
