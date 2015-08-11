---
layout: post
title: Step One on replacing Jekyll, make yaml work
date: 2015-07-26
description: ""
canonical:
tags: [frontpage, rant, cms, gulp]
category:
assets:
  js:
    -
  css:
    -
---

As you might remember in my post on replacing Jekyll with Gulp (and my post on Jekyll). YAML will be a large part of getting this working.

# YAML Parsing
First am trying to use (npm-yaml)[https://www.npmjs.com/package/gulp-yaml]. Simple installation, ```npm install --save-dev npm-yaml```. And it works great with the \_config file that holds general site information. So I try it with the html.

```javascript
gulp.task('test-index', function() {
  var config = gulp.src('./index.html')
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest('./gulp-dist/'))
})
```

With that I get a big fat ...

```bash
✔ ~/repos/self/frob.github.com [jekylless L|✚ 2…1]
23:31 $ gulp test-index
[23:33:37] Using gulpfile ~/repos/self/frob.github.com/gulpfile.js
[23:33:37] Starting 'test-index'...
[23:33:37] Finished 'test-index' after 7.25 ms

events.js:85
      throw er; // Unhandled 'error' event
            ^
Error: JS-YAML: end of the stream or a document separator is expected at line 12, column 64:
     ... ">Written on {{ post.date | date: "%B %e, %Y" }}</aside>
```

Hmmm, It looks like the YAML Front matter will be a bit more dificult.

First I tried (yaml-front-matter)[https://www.npmjs.com/package/yaml-front-matter], which wasn't what I wanted. It works with node but I was hoping to find a gulp plugin. So I found (gulp-front-matter)[https://github.com/lmtm/gulp-front-matter] which looks promising. This one is a gulp plugin and it looks like it will work, but it isn't well documented. Looks like I have some code to read.

## Bad documentation
I read the code and the only hint looks to be here on line 40

```javascript
file[property] = content.attributes;
```

Due to my inexperience with Gulp I have no idea how to get to the file object. There is a hint in the documentation <q>.pipe(…) // you may want to take a look at gulp-marked at this point</q>. That was still not much help. So to the issue queue.

### Issue Number 8: Expose frontMatter, or not
https://github.com/lmtm/gulp-front-matter/issues/8 talks about exposing the frontmatter or just better documentation in general as it seems to be a large issue with this package.

My conclusion is that front-matter shouldn't be handled with gulp, but instead it should be handled by node. In this case the the front-matter will control the flow of the steam and thus it shouldn't be considered when reading the stream. The gulp-front-matter plugin will do one thing really well for me. It will strip the front-matter from my source and allow me to parse it with liquid or with markdown or whatever.

## Bad plug-ins
So, here it is. The liquid plugin just didn't work. I don't have the time to waist on this right now. Looks like this is too far ahead of its time for now. So I am putting it on hold.
