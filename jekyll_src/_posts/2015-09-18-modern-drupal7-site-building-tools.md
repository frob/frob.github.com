---
layout: post
title: Modern Drupal7 Site Building Tools
date: 2015-09-22T00:00:00.000Z
description: ""
canonical: null
tags: [drupal, frontpage, quarzack13]
category: null
assets:
  js:
    - null
  css:
    - null
published: true
---


## Why build a site with Drupal 7

Drupal8 is nearly out making Drupal 7 look like it isn't an appealing choice. However, Drupal 7 is still a contender for the conviences in site-building crown. The module ecosystem for Drupal 7 is mature and, specifically for site builders, it is a very exciting time for Drupal 7.

# The Modules

I know, I know, many of these modules are not new and this isn't a list of everything someone will need to build a site ([that subject has been done to death](http://lmgtfy.com/?q=top+50+drupal+modules)); this is a list of modules that allow site builders and someone with some front-end skill to build complicated sites with little to no custom module code.

## [Title](https://www.drupal.org/project/title)

Originally designed to make up for the short coming of Drupal 7 keeping the title as a property (not a field) and what that meant for entity translations. This is a module that I use for every site for one reason. It makes the title into a field. This allows it to be placed in a view mode like any other field. Used in conjunction with Fences and this allow for semantic and accessible markup in any view mode with a wide variety of layouts.

## [Field Group](https://www.drupal.org/project/field_group)

Seriously, why isn't this in core? This is what a module should be; it allows users to put the fields in groups, both in the form display and in the view mode display. This module also allows for the use of vertical tabs, jquery ui tabs for horizontal tabs, and collapsible groups.

## [Fences](https://www.drupal.org/project/fences)

Drupal, out-of-the-box, puts classes on everything with wrappers on wrappers on wrappers in an attempt to do all things for all use-cases. As is shown over and over again throughout history, if something attempts to do all things it will inevitably [do all things poorly](https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II). This is one of those things that, arguably, Drupal does poorly.

[Fences](https://www.drupal.org/project/fences) attempts to tame this problem on the field level by making the wrappers for fields configurable. This has drawbacks: One of the cleanest options is to have no wrapper, and while this sounds like a good idea, it is not. This can lead one field to run into the next and can really just make things more difficult to target with css; Also, this module forces fields to be wrapped on a per field bases instead of a per display basis. This might sound like it is forcing the site-builder to think semantically about the content, however, semantics can change based on display so this is to be used with a bit of caution. On this note: the Fences module might be [changing this stance](https://www.drupal.org/node/1888224#comment-10364825) on this.

## [Elements](https://www.drupal.org/project/elements)

This is an old module based on the idea that new things happen and it isn't always the core team that should have to deal with new things. Today this module allows for more modern form api elements to be rendered. Check the project page for specific details.

## [Field Formatter Class](https://www.drupal.org/project/field_formatter_class)

Simple, put classes on field wrappers. Notice I said wrappers. This doesn't put the class on the field, so using this in conjunction with the [Fences](https://www.drupal.org/project/fences) Module's no wrapper option can lead to confusing results --no class will be rendered because no wrapper is rendered.

## [Context](https://www.drupal.org/project/context)

Really it is Context and all the modules that support Context, such as [Context Entity Field](https://www.drupal.org/project/context_entity_field). Context is sort of like the [Rules](https://www.drupal.org/project/rules) Module and core's block placement had a baby. It is based on the idea that, if 'thing' is true (condition) then (reaction) will happen.

At first this module was thought of as an alternative to <span title="the devil">Panels</span>. However, it does much more than place blocks. With it (and the before mentioned helper module) a site-builder can add a select list to a node and have that select list add classes to the page body or add template suggestions to that node based on the content editor's input --all without code.

## [Node Class](https://www.drupal.org/project/node_class)

I love modules that put classes on things. Content people or site-builders then do not have to call the developers to add a class. This is one of those modules. It allows the content editor to put classes on nodes.

## [Block Class](https://www.drupal.org/project/block_class)

Very simple, put classes on blocks.

## [Menu Attributes](https://www.drupal.org/project/menu_attributes)

This modules adds attributes to menu items and menu links. This means that there is no more needing to write css rules that are based on Drupal's mlid based class.

<aside class="inline">Why is theming off of a system generated mlid based class bad. Because this can change from install to install. Just like theming off of node id, theming off of menu link id is a bad idea.</aside>

## [View Field](https://www.drupal.org/project/viewfield)

Not to be confused with [Views Field](https://www.drupal.org/project/views_field), the [View Field](https://www.drupal.org/project/viewfield) Module allows site-builders to add fields to entities that allow the content editor to display views in fields. These views are set per piece of content. This means there can be a basic page content type that can have all the things that a page shoule have (path, menu, xml sitemap rules, access rules, og configuration, workflows, meta-tags, etc) and still have a view based listing displayed.

## [Entity Views Attach](https://www.drupal.org/project/eva)

Unlike [View Field](https://www.drupal.org/project/viewfield), this module is all about the same view as a field on an entity. This module allows the site-builders to configure a view to act like a field on an entity bundle. For example, we want to have a list of all the content that a user has flagged on the user's profile page, and the design has that list in the middle of the rest of the fields. With this module the listing can be configured to be a pseudo field on the users entity that is then free to be positioned along with the rest of the user fields.

## [Bean](https://www.drupal.org/project/bean)

Bean stands for <q>Block Entities Aren't Nodes.</q> This is a stab at the [other way of doing this](https://www.drupal.org/project/nodeblock).

Block's are the things of which sites are made. One would expect that they would be fieldable, bundlable, entities. Alas, they are not. Blocks cannot have fields and those fields can not be stored in features --because blocks are'nt entities and don't have fields.

Beans can have fields, because a Bean is a new type of entity, a block entity. This also gives us a better experience for content editors that will be building blocks. Content editors are given revisions, and a block listing page that works just like the content listing page. This means we can have views of blocks too.

## [Entity View Mode](https://www.drupal.org/project/entity_view_mode)

Personally, I like code, and I like to write my view modes with code. But this module works too. This module allows the site-builder to add view modes to any bundle on any entity. There is one large drawback, all this stuff is stored in one big variable. That means when a features is exported with the strongarm module it will get all the settings for all the bundles on all content types. There is movement in the issue queue to make this less all-or-nothing but for now, this is how it is.

## [Display Suite](https://www.drupal.org/project/ds)

If I had one major complaint about Display Suite, it would be that it does too much (even though it does everything pretty well). With this module a site-builder can: override/layout entity forms, add view modes to bundles, add/remove fields from display, wrap fields in wrappers, and much much more. Read the project description and watch some tutorial videos for more.

## [Less](https://www.drupal.org/project/less)

Less!?!, I thought everyone used sass now and less was gone. Nope, less is awesome. It is just as awesome as sass and there is nothing that can be done with one that cannot be done with the other.

Once the flame war dies down, continue reading.

This module does a really cool thing. It ties Drupal's css attaching with a less compiler. This less compiler can be php based, such as the old Lefo php less compiler, or the new less.php compiler. It can even be the lessjs node plugin that is installed on the server. I works with css aggregation and it works with the autoprefixing node postCSS plugin as well. This means that you never need to put compiled css into the repository.

**Notice** there is a sass Drupal module that works with the old Lefo sass library. However, both the php lib and the Drupal module are not well supported.

## [Bootstrap Theme](https://www.drupal.org/project/bootstrap)

Bootstap is a fine front-end framework, and if you are building a site for boostrap developers then this is the place to go. I like to use [Bootstrap Library](https://www.drupal.org/project/bootstrap_library) for actually adding the Boostrap code.

## [jQuery Update](https://www.drupal.org/project/jquery_update)

Drupal 7 is not the new hotness. It is the old standard. As such the libraries that where once newish when Drupal 7 was released are not so newish. They are in-fact very old indeed now. This will be an issue when attempting to use new js libraries and plugins that require new versions of jQuery.

To this end, I use jQuery update. It is simple, it allows the site-builder to pick a version of jQuery to use with a theme. It also facilitates loading that version from a CDN and the loading of the jQuery migrate module.

**Notice** If using the CDN, pick it before starting with theming. Not every CDN will have the same code for the same versions of jQuery.

## [Ember](https://www.drupal.org/project/ember)

This is the new admin theme hotness from Aquia. It is semantic and accessible and it follows the Aquia's style guidelines. Ember is still in development so expect some glitches.

I recommend creating a sub-theme of this theme so that further customization can be done without having to hack at ember.

## [Ember Support](https://www.drupal.org/project/ember_support)

Does some stuff that ember cannot due in the theme space.

## [Coffee](https://www.drupal.org/project/coffee)

Toolbar was based somewhat on the admin menu module. Admin module persisted because toolbar doesn't next things. None of that matters anymore because coffee isn't a toolbar. Coffee works like Unity for Ubuntu or Spotlight search for Mac, or the Start Menu in Windows. Just start typing and a list of options will be presented. Pick the option and it will take you there.

## [Speedboxes](https://www.drupal.org/project/speedboxes)

This is a module that truly must be seen to be believed; it is one of those modules that makes new Drupal developers go <q>hmmmm</q> and makes seasoned Drupal developers crap their pants.

What it does is allow the site-builder to draw a rectangular area around check boxes and then check/uncheck/toggle all the selected checkboxes. This makes configuring the user permission page so much easier.

The down side to this module used to be that did this on every page or forced the user to use a bookmarklet as a toggle. I recently took over maintainership of this module and I have changed it so that the library responsible only loads on the permissions page and the organic groups permissions page.

## Installation

To install these modules just type:

```bash
drush dl context views eva block_class field_formatter_class fences elements viewfield entity_view_mode node_class ds skinr less bootstrap bootstrap_library jquery_update ember ember_support menu_attributes field_group speedboxes title bean
```

```bash
drush en context views eva block_class field_formatter_class fences elements viewfield entity_view_mode node_class ds skinr less bootstrap bootstrap_library jquery_update ember ember_support menu_attributes field_group speedboxes title bean
```
If you do not what to have to confirm over and over again, then you will probably want to pass the ```-y``` flag to the drush command.

Play with these modules before installing on production. :P
