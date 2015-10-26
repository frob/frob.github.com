---
layout: post
title: add an api to your jekyll blog
date: 2015-10-25
description: "Without adding any non-Github pages approved plugins, build a RESTfull api for your blog by adding a json endpoint."
canonical:
tags: ["tutorial", "jekyll", "rest", "reactjs"]
category: ["tutorial", "jekyll"]
assets:
  js:
    -
  css:
    -
---

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

## Footnotes

Jekyll complains about using ```ruby nill``` for a layout type. It doesn't break, but I also create two layout templates json_default.json and json.json. Now that it is working, I will rename the templates to something abit more meaningful:

```bash
default.json
post.json
```

I think these are better names.
