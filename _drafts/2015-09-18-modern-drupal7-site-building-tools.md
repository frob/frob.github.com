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

## [Views](https://www.drupal.org/project/views)

## [Entity Views Attach](https://www.drupal.org/project/eva)

## [Block Class](https://www.drupal.org/project/block_class)

## [Field Formatter Class](https://www.drupal.org/project/field_formatter_class)

## [Fences](https://www.drupal.org/project/fences)

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

## [Ember](https://www.drupal.org/project/ember)

## [Ember Support](https://www.drupal.org/project/ember_support)

## [Menu Attributes](https://www.drupal.org/project/menu_attributes)

## [Field Group](https://www.drupal.org/project/field_group)

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
