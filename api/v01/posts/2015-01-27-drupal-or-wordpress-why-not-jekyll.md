---
layout: json
sitemap: false
title: Drupal or Wordpress? Why not Jekyll.
date: 2015-01-27
description: "Are you fedup with the offerings of Drupal, Wordpress, and other big CMS's? Then maybe a return to roots is in order. Let look at Jekyll"
canonical: http://www.kwallcompany.com/blog/wordpress-or-drupal-why-not-jekyll
tags: [drupal, wordpress, jekyll, kwallcompany, tutorial, frontpage]
---
If you want a blog then you might be tempted to use Wordpress over a more complicated Drupal based site. However, more recently I have to ask why should anyone even really need Wordpress. A far simpler aprouch is a program called Jekyll. Noticed I didn't call Jekyll a Content Management System.

So if Jekyll isn't a CMS then what is it? Jekyll is a "blog aware" static site generator. The way it works is content editor can write the content and put it into the folder and then tell Jekyll to generate the site. Jekyll will generate the site in html files, just like in the before-time.

## What are the advantages to static site generation?

The biggest advantage is simplelified hosting. All that is needed to host a static site is any html server, there is no database, script, or cgi necesary. The site is generated and then any browser can parse that html. That means that even with a small server the site will load very fast and with very little overhead. Github even uses it for its Github pages service.

### Another Advantage is simplisity. Jekyll has a very logical file structure:
 - Configuration goes into the _config.yml file
 - Posts go into _posts directory
 - Layout Templates go into the _layouts directory
 - Block Templates go into the _includes directory

## Basic Configuration

Inside the _config.yml you will find some basic configuration.

```yaml
# Name of your site (displayed in the header)
name: Name of the Site

# Short bio or description (displayed in the header)
description: Web Developer from Somewhere

# URL of your avatar or profile pic (you could use your GitHub profile pic)
avatar: url to the logo
# ...

# Includes an icon in the footer for each username you enter
footer-links:
  dribbble:
  email:
  facebook:
  flickr:
  github:
  instagram:
  linkedin:
  pinterest:
  rss: # just type anything here for a working RSS icon, make sure you set the "url" above!
  twitter:
  stackoverflow: # your stackoverflow profile, e.g. "users/50476/bart-kiers"

# Your disqus shortname, entering this will enable commenting on posts
disqus:

# Enter your Google Analytics web tracking code (e.g. UA-2110908-2) to activate tracking
google_analytics:
```

## Plugins

One of the cooler parts of Jekyll is that even though it is generating a static site it can have plugins that extend it's functionallity. Plugs will fall into one of four categories.

 - Generators
   - Creating new content based on the existing content. Multilanugauge sites, more content listings, etc..
 - Converters
   - Filtering content in some way. This could be adding tokens or just using something other than markdown.
 - Commands
   - These are commands that are outside of the content scope. For Drupal people think of this as drush commands for Jekyll.
 - Tags
   - Tags are taxonomy based functionallity; catigorization or linking of content.

## Posts
As I said be fore the Jekyll system is blog aware. That means that aside from pages Jekyll expects there to be posts of content.

All content is put into the _posts directory and has a specific naming convention including the date and expected url for the post. By default a post is written in markdown and it has a yaml header with some meta data about the post.

## Where do I use it

### Drupal for Firebug Developer blog/api test

After I took over development for DrupalForFirebug I knew that it would be just a matter of time before the issue was filed on drupal.org saying that the demo page (hosted on chapterthree) was down. I didn't want to ask the old maintainer to put the page back up and I didn't want to have to host a special site here on kwallcompany.com just for a demo of DrupalForFirebug. I also wanted to expand on the DrupalForFirebug api so I desided that I would host a faux api site using Jekyll. Basically with Jekyll I have created a dev blog for DrupalForFirebug and I put a special fake api callback there as well. DrupalForFirebug just uses hidden HTML for the the api so it was very easy. You can check it out by visiting the DrupalForFirebug page on Drupal.org and clicking on the demonstration link.

### Frobiovox.com or frob.gitbug.io

Drupal is awesome for so many things. I spent a lot of time perfecting my drupal blog site. Then I got hired and I never touched it. I have already put several posts here It took five minutes to spin up an adequate site and it is hosted for free on github.
