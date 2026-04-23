---
title: Add a JSON API to Any Static Site Generator
date: "2026-04-23"
description: Static site generators output HTML, but they can output JSON too. Here is how to add a JSON API to your Hugo site, and why the technique works with any SSG.
slug: add-a-json-api-to-any-static-site-generator
tags:
    - tutorial
    - hugo
    - rest
    - frontpage
---

Back in 2015, I wrote about [adding a JSON API to a Jekyll blog](/posts/2015/10/25/add-an-api-to-your-jekyll-blog/). The idea was simple: if your static site generator can output HTML from templates, it can output JSON from those same templates. No server-side code, no plugins, no runtime dependencies. Just another output format alongside your pages.

That technique is not specific to Jekyll. It works with any static site generator that has a templating system. This blog runs on Hugo now. Hugo has a built-in feature for exactly this kind of thing and it makes the whole process much cleaner. So I figured I would revisit the idea.

## The idea, again

A static site generator takes your markdown and pushes it through templates to make HTML files. There is nothing special about HTML here --it is just the output format. If you write a template that outputs JSON instead of HTML, you get ```.json``` files. Your web server doesn't care, it serves them the same way and JavaScript on the client side can fetch them.

## Hugo's output formats

Hugo has this thing called [custom output formats](https://gohugo.io/templates/output-formats/). Instead of hacking JSON into a regular HTML template like I had to do with Jekyll, I defined a new output format and gave it its own templates. Hugo generates both the HTML and the JSON for you in the same build.

### Config

First, tell Hugo about the JSON format. In ```hugo.toml```:

```toml
[outputFormats.JSON]
  mediaType = "application/json"
  baseName = "index"

[outputs]
  home = ["HTML", "RSS", "JSON"]
  section = ["HTML", "JSON"]
  page = ["HTML", "JSON"]
```

The ```outputs``` section is where you decide what gets a JSON version. If you only want a listing endpoint and don't need individual post JSON, just leave ```page``` off.

### The list template

Hugo will look for a template called ```list.json.json``` for sections and the homepage. Create it at ```layouts/_default/list.json.json```:

```json
[
{{ range $index, $page := .Pages }}
  {{ if $index }},{{ end }}
  {
    "title": {{ .Title | jsonify }},
    "url": {{ .RelPermalink | jsonify }},
    "date": {{ .Date.Format "2006-01-02" | jsonify }},
    "description": {{ .Params.description | default "" | jsonify }},
    "tags": {{ .Params.tags | default slice | jsonify }}
  }
{{ end }}
]
```

See that ```jsonify``` function? That is doing all the heavy lifting. It handles escaping, it handles arrays, it handles nil values. In the [Jekyll version](/posts/2015/10/25/add-an-api-to-your-jekyll-blog/) I had to loop through tags one at a time and build the JSON array by hand. Here I just pipe to ```jsonify``` and Hugo figures it out.

### The single post template

For individual posts, create ```layouts/_default/single.json.json```:

```json
{
  "title": {{ .Title | jsonify }},
  "url": {{ .RelPermalink | jsonify }},
  "date": {{ .Date.Format "2006-01-02" | jsonify }},
  "description": {{ .Params.description | default "" | jsonify }},
  "tags": {{ .Params.tags | default slice | jsonify }},
  "content": {{ .Content | jsonify }}
}
```

### Build it

Run ```hugo``` and check the output. For every page that has JSON in its output list, there will be an ```index.json``` sitting right next to the ```index.html```:

- ```/posts/index.json``` -- all your posts
- ```/posts/2026/04/23/some-post/index.json``` -- one post
- ```/index.json``` -- homepage listing

It is simpler with Hugo. No Gulp task, no separate build step, no copying files around. But this same idea is possible in nearly any Static Site Generator.

## The homepage template

My homepage template is different from my default list template. It uses ```.Site.RegularPages``` instead of ```.Pages``` and limits to 50 posts. If yours is the same, you might want a separate ```index.json.json``` in your layouts root:

```json
[
{{ range $index, $page := first 50 .Site.RegularPages }}
  {{ if $index }},{{ end }}
  {
    "title": {{ .Title | jsonify }},
    "url": {{ .RelPermalink | jsonify }},
    "date": {{ .Date.Format "2006-01-02" | jsonify }},
    "description": {{ .Params.description | default "" | jsonify }},
    "tags": {{ .Params.tags | default slice | jsonify }}
  }
{{ end }}
]
```

## What Hugo gives you for free

Comparing this to what I went through with Jekyll:

In Jekyll, I had to loop through tags and categories and manually comma-separate them with ```forloop.last``` checks. I had to add nil guards for when tags or categories were empty. I used Liquid's ```escape``` filter on content and hoped for the best. And I had a whole Gulp task that duplicated the posts from ```_posts``` into an ```api/v01/posts``` directory and swapped the layout from html to json.

With Hugo, I write a template, add three lines to my config, and it just works. The ```jsonify``` function handles arrays, escaping, and nil values. The output format system handles the file generation. No Gulp task, no extra build step.

## This isn't just a Hugo thing

The core trick works anywhere. If your static site generator has templates, you can make it output JSON. Hugo happens to have first-class support for it, but the pattern is the same whether you are using 11ty, Astro, or even Jekyll like I was in 2015. Write a template, output JSON, let the build generate the files.

I use it for client-side filtering. Fetch the listing endpoint, match on tags in JavaScript, render a related posts section without a page reload. It is not a replacement for a real API --there is no auth, no pagination, no writes. But for read-only content that is already public on your site, it is free and it ships with every build.
