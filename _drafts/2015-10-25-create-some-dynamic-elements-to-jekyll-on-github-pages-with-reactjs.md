---
layout: post
title: create some dynamic elements to jekyll on github pages with reactjs
date: 2015-10-25
description: ""
canonical: ""
tags: []
category: []
assets:
  js:
    -
  css:
    -
---

## Proloug

While this post isn't meant to be a series, I thought you would like to know [how to add a REST api to a jekyll blog](https://www.frobiovox.com/posts/2015/10/25/add-an-api-to-your-jekyll-blog.html). Eventually, I will be using this api to add related links to my blog's articles. For now I will just write about how I will use Reactjs to add related links from my REST api.

# Reactjs

Facebook released [Reactjs](https://facebook.github.io/react/index.html) as an open source front-end component based framework. [Reactjs](https://facebook.github.io/react/index.html) is a topic that deserves a blog post all for itself. Not that it's extremely complicated, instead that it's extremely useful. Some have called [Reactjs](https://facebook.github.io/react/index.html) the V in MVC --that is a gross simplification. [Reactjs](https://facebook.github.io/react/index.html) allows us to define the data that will be used in markup and then define that markup. But, the power and utility of [Reactjs](https://facebook.github.io/react/index.html) comes from the way [Reactjs](https://facebook.github.io/react/index.html) manages that piece of data and semantic structure. [Reactjs](https://facebook.github.io/react/index.html) uses [virtual DOM](http://acko.net/blog/shadow-dom/) to store the pieces that it manages. When something happens [Reactjs](https://facebook.github.io/react/index.html) will take the changes to those pieces and apply them to a new copy of the virtual DOM --it then compares the two copies and changes the real DOM only where it needs to.

> This limits expensive DOM manipulation and allows a record of DOM changes. This can give us undo for an app in a browser.

## Components

I was purposefully using the vague term "pieces of data and markup." This is so I could explain Components in greater detail without having to cover them twice.

The largest front-end tool that we get with Reactjs is the component. Components are designed to be a somewhat self-contained javascript module. Here is a [small Reactjs component example](https://facebook.github.io/react/docs/tutorial.html):

```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
```

This is a simple "Hello World" Reactjs example component. You will notice two things right away about this: There is no data-structure (and there doesn't have to be with Reactjs), and some strange XML like stuff in the render function return. That XML is something called JSX and while you might be thinking "What!?! We cannot have presentation in our logic!" You need to remember that JSX is just syntactical sugar, and semantics is functional. Thus, get over yourself. Read up more on the JSX docs page.

> If you really want to see how it is done with Reactjs, checkout this [Reactjs starter kit on github](https://github.com/kriasoft/react-starter-kit).

This is really all there is to components. Sure there is more stuff to go into such as: events, props, and state. If you want all that, I suggest reading [facebooks documentation on Components](https://facebook.github.io/react/docs/getting-started.html).

## Pulling from our API

Pulling from the api will require an ajax call (just like anytime we need to integrate a REST api with JavaScript).

## Putting it all together

Here is my basic Reactjs component that I will be using to show article teasers.

```js
// @TODO: Put js component here.
```

Here is my JavaScript ajax api caller thingy.

```js
// @TODO: Write ajax caller thingy and put it here.
```

Below, you should see the latest article on my blog. If you happen to be here right after this article is published, I am sorry but you have already read this one.

<div class="related-content">
</div>
