---
layout: post
title: Modern Drupal7 Site Building Tools
date: 2015-09-18
description: ""
canonical:
tags:
category:
assets:
  js:
    -
  css:
    -
---

## Why build a site with Drupal 7

Drupal8 is nearly out and it might seem as though Drupal 7 has lost its steam. However, Drupal 7 is still a very effective contender. The module ecosystem for Drupal 7 is mature and, specifically for site builders, it is a very exciting time for Drupal.

# The Modules

I know, I know, many of these modules are not new and this isn't a list of everything someone will need to build a site; this is a list of modules that allow site builders and someone with some front-end skill to build complicated sites with little to no custom module code.

## [View Field](https://www.drupal.org/project/viewfield)

Not to be confused with [Views Field](https://www.drupal.org/project/views_field), the [View Field](https://www.drupal.org/project/viewfield) Module allows site-builders to add fields to entities that allow the content editor to add views to fields. These views are configurable per piece of content. This means there can be a basic page content type that can have all the things that a page shoule have (path, menu, xml sitemap rules, access rules, og configuration, workflows, meta-tags, etc) and still have a view based listing.

## [Entity Views Attach](https://www.drupal.org/project/eva)

Unlike [View Field](https://www.drupal.org/project/viewfield), this module is all about the same view as a field on an entity. This module allows the site-builders to configure a view to act like a field on an entity bundle. For an example, we want to have a list of all the content that a user has flagged on the user's profile page, and the design has that list in the middle of the rest of the fields. With this module the listing can be configured to be a pseudo field on the users entity that is then free to be positioned along with the rest of the user fields.

## [Block Class](https://www.drupal.org/project/block_class)

Very simple, put classes on blocks.

## [Fences](https://www.drupal.org/project/fences)

Drupal, out-of-the-box puts classes on everything with wrappers on wrappers on wrappers, in an attempt to do all things for all use-cases. As is shown over and over again, if something attempts to do all things it will inevitably do all things poorly. This is one of those things that, arguably, Drupal does poorly.

[Fences](https://www.drupal.org/project/fences) attempts to tame this problem on the field level by making the wrappers for fields configurable. This has drawbacks: one of the cleanest options is to have no wrapper, and while this sounds like a good idea, it is not. This can lead one field to run into the next and can really just make things more difficult to target with css; Also, this module forces field to be wrapped on a per field bases instead of a per display basis. This might sound like it is forcing the site-builder to think semantically about the content, semantics can change based on display so this is to be used with a bit of caution.

## [Field Formatter Class](https://www.drupal.org/project/field_formatter_class)

Simple, put classes on field wrappers. Notice I said wrappers. This doesn't put the class on the field, so when used in conjunction with the [Fences](https://www.drupal.org/project/fences) Module's no wrapper, this can lead to confusing results as no class is rendered because no wrapper is rendered.

## [Elements](https://www.drupal.org/project/elements)

## [Viewfield](https://www.drupal.org/project/viewfield)

## [Entity View Mode](https://www.drupal.org/project/entity_view_mode)

## [Node Class](https://www.drupal.org/project/node_class)

## [Display Suite](https://www.drupal.org/project/ds)

## [Skinr](https://www.drupal.org/project/skinr)

## [Context](https://www.drupal.org/project/context)

## [Less](https://www.drupal.org/project/less)

## [Bootstrap Theme](https://www.drupal.org/project/bootstrap)

## [Bootstrap Library](https://www.drupal.org/project/bootstrap_library)

## [jQuery Update](https://www.drupal.org/project/jquery_update)

Drupal 7 is not the new hotness. It is the old standard. As such the libraries that where once newish when Drupal 7 was released are not so newish. They are in-fact very old indeed now. This will be an issue when attempting to use new js libraries and plugins that require new versions of jQuery.

To this end, I use jQuery update. It is simple, it allows the site-builder to pick a version of jQuery to use with a theme. It also facilitates loading that version from a CDN and the loading of the jQuery migrate module.

## [Ember](https://www.drupal.org/project/ember)

This is the new admin theme hotness from Aquia. It is semantic and accessible and it follows the Aquia's style guidelines. Ember is still in development so expect some glitches.

I recommend creating a sub-theme of this theme so that furhter customization can be done without having to hack at ember.

## [Ember Support](https://www.drupal.org/project/ember_support)

Does some stuff that ember cannot due in the theme space.

## [Menu Attributes](https://www.drupal.org/project/menu_attributes)

This modules adds attributes to menu items and menu links. This means that there is no more needing to theme off of a System generated mlid based class.

Why is theming off of a system generated mlid based class bad. Because this can change from install to install. Just like theming off of node id, theming off of menu link id is a bad idea.

## [Field Group](https://www.drupal.org/project/field_group)

Seriously, why isn't this in core? This is what a module should be; it allows users to put the fields in groups, both in the form display and in the view mode display. This module also allows for the use of vertical tabs, jquery ui tabs for horizontal tabs, and collapsable groups.

## [Speedboxes](https://www.drupal.org/project/speedboxes)

This is a module that truly must be seen to be believed; it is one of those modules that makes new Drupal developers go <q>hmmmm</q> and makes seasoned Drupal developers crap their pants.

What it does is allow the site-builder to draw a rectangular area around check boxes and then check/uncheck/toggle all the selected checkboxes. This makes configuring the user permission page so much easier.

The down side to this module used to be that did this on every page or forced the user to use a bookmarklet as a toggle. I recently took over maintanership of this module and I have changed it so that the library responsible only loads on the permissions page and the organic groups permissions page.

## [Title](https://www.drupal.org/project/title)

Originally designed to make up for the short coming of Drupal 7 keeping the title as a property and what that meant for entity translations. This is a module that I use for everysite for one reason. It makes the title into a field. This allows it to be placed in a view mode like any other field. Used in congunction with Fences and this allow for semantic and accessible markup in any view mode with a wide veriety of layouts.

## [Bean](https://www.drupal.org/project/bean)

To install these modules just type:
```bash
drush dl context views eva block_class field_formatter_class fences elements viewfield entity_view_mode node_class ds skinr less bootstrap bootstrap_library jquery_update ember ember_support menu_attributes field_group speedboxes title bean
```

```bash drusn en context views eva block_class field_formatter_class fences elements viewfield entity_view_mode node_class ds skinr less bootstrap bootstrap_library jquery_update ember ember_support menu_attributes field_group speedboxes title bean
```
If you do not what to have to confirm over and over again, then you will probably want to pass the ```-y``` flag to the drush command.
