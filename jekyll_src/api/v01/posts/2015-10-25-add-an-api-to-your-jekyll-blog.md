---
layout: json
sitemap: false
title: Add an API to Your Jekyll Blog
date: 2015-10-25
description: "Without adding any non-Github pages approved plugins, build a RESTfull api for your blog by adding a json endpoint."
canonical:
tags:
  - tutorial
  - jekyll
  - rest
  - reactjs
  - frontpage
category:
  - tutorial
  - jekyll
  - frontpage
assets:
  js:
    -
  css:
    -
---

I really like [github pages](https://pages.github.com/). I [built my blog on it](https://www.frobiovox.com/posts/2015/01/27/drupal-or-wordpress-why-not-jekyll.html), even though [I host it myself](https://www.frobiovox.com/posts/2015/05/19/setting-up-jenkins-on-1204.html). When friends and family ask for me to build them a site [I will point them to github pages](http://wapro.lbtech.org/). Markdown is so easy, liquid is so easy. What isn't easy is dynamic lists of content. A simple list of related content isn't as easy. Sure there are ways, but I want to learn [Reactjs](https://facebook.github.io/react/) --so I will build it with that. That will require a RESTful API for my content.

## The easy way

To be clear I didn't write this [snippit](http://jekyllsnippets.com/excluding-jsonify-your-site/) --but only because someone else did. And working code wins.

```json

    ---
    layout: nil
    ---

    [
    {% raw %}
    {% for post in site.posts %}
        {
          "title"    : "{{ post.title }}",
          "url"     : "{{ post.url }}",
          "date"     : "{{ post.date | date: "%B %d, %Y" }}",
          "content"  : "{{ post.content | escape }}"
        } {% if forloop.last %}{% else %},\{% endif %}
    {% endfor %}
    {% endraw %}
    ]

```

With this snippit (added for convenience) we get most of the way there. My plan is to modify it a bit.

## What I would do, or the not so easy way

```json

    ---
    layout: nil
    ---

    [
    {% raw %}
    {% for post in site.posts %}
        {
          "title"    : "{{ post.title }}",
          "url"     : "{{ post.url }}",
          "date"     : "{{ post.date | date: "%B %d, %Y" }}",
          "tags"  : {{ post.tags }},
          "categories"  : {{ post.categories }},
          "description"  : "{{ post.description | escape }}"
        } {% if forloop.last %}{% else %},{% endif %}
    {% endfor %}
    {% endraw %}
    ]

```

From here you should see the change that I made. I changed the content to description and added tags and categories to the listing. This will provide a good everything list for the blog api. (This should all be in the ```/api/v01/list.json``` file).

Hmmmm, that isn't working as expected. Instead of giving me a list of categories and tags it is concatenating them into a single string. So it looks like another modification is necessary.

> I also added a check incase there isn't anything in tags or categories.

```json
---
layout: nil
---

[
{% raw %}
{% for post in site.posts %}
    {
      "title"    : "{{ post.title }}",
      "url"     : "{{ post.url }}",
      "date"     : "{{ post.date | date: "%B %d, %Y" }}",
      {% if post.tags %} "tags"  : [
        {% for tag in post.tags %} "{{ tag }}"
        {% if forloop.last %}{% else %},{% endif %}
        {% endfor %}
        ],
      {% endif %}
      {% if post.tags == nil %} "tags"  : [],  {% endif %}
      {% if post.categories %} "categories"  : [
        {% for category in post.categories %} "{{ category }}"
        {% if forloop.last %}{% else %},{% endif %}
        {% endfor %}
        ],
      {% endif %}
      {% if post.categories == nil %} "categories"  : [],  {% endif %}
      "description"  : "{{ post.description | escape }}"
    } {% if forloop.last %}{% else %},{% endif %}
{% endfor %}
{% endraw %}
]

```

This gives me a single listing page. Now we need posts.

> Aside note. Jekyll is having a really hard time with this post. It keeps wanting to parse the liquid in the code examples. Thankfully [Jekyll Liquid now has a proper escaping system](http://stackoverflow.com/questions/3426182/how-to-escape-liquid-template-tags). Use ```liquid{% raw %}{% raw %}{% endraw %}```.

## Building the posts. NPM to the rescue (maybe)

Not npm exactly, Gulp instead saved the day. Ever since I moved my utility functions to Gulp I have been a fan. It is very well suited for building small repeatable tasks. So I add a new Gulp task to the gulpfule.

```bash
gulp build-api
```

With this command I duplicate the content in the _post directory over to the api/[version]/v01/posts directory. Thow in a little gulp piping to do a string replace (this is to change the layout template from html to json. This is the whole gulp command.

```javascript
gulp.task('build-api', function() {
  return gulp.src('_posts/*')
    .pipe(replace(/layout\: post/, 'layout: json'))
    .pipe(vfs.dest('api/v01/posts', { overwrite: true }));
});
```

It is simple enough, ignore the vfs.dest part (I am using vinyl directly so I can use the overwrite option).

All that is left is to add a unique identifier, I figure the post url should work for that. I do that with the json template.

```json
---
layout: json_default
---

{
  {% raw %}
  "title"    : "{{ page.title }}",
  "url"     : "{{ page.url }}",
  "permalink": "/posts/{{ page.date | date: "%Y/%B/%d" }}/{{ page.path | replace: 'api/v01/posts/', '' | replace: '.md', '' }}.html",
  "date"     : "{{ page.date | date: "%B %d, %Y" }}",
  {% if page.tags %} "tags"  : [
    {% for tag in page.tags %} "{{ tag }}"
    {% if forloop.last %}{% else %},{% endif %}
    {% endfor %}
    ],
  {% endif %}
  {% if page.tags == nil %} "tags"  : [],  {% endif %}
  {% if page.categories %} "categories"  : [
    {% for category in page.categories %} "{{ category }}"
    {% if forloop.last %}{% else %},{% endif %}
    {% endfor %}
    ],
  {% endif %}
  {% if page.categories == nil %} "categories"  : [],  {% endif %}
  "content"  : "{{ content | escape }}"
  {% endraw %}
}
```

## Footnotes

Jekyll complains about using ```ruby nill``` for a layout type. It doesn't break, but I also create two layout templates json_default.json and json.json. Now that it is working, I will rename the templates to something abit more meaningful:

```bash
default.json
post.json
```

I think these are better names.
