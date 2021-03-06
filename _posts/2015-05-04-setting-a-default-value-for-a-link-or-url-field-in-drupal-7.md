---
layout: post
title: Setting a default value for a link or url field in Drupal 7
date: 2015-05-04
description: "Sometimes the best solution is to do something hacky. I am not saying this is the best way to make Drupal forms autosubmit. I am only saying that this is one way."
canonical:
tags: ["drupal", tutorial, frontpage, 'quarzack13']
category:
assets:
  js:
    -
  css:
    -
---

So everyone who does drupal development should know by now about hook_alter the form api and the setting of default values.

In case you don't I suggest reading these pages first:

 - [The Drupal Form API](https://api.drupal.org/api/drupal/developer%21topics%21forms_api_reference.html/7)
 - [The hook system](https://api.drupal.org/api/drupal/includes!module.inc/group/hooks/7)
 - [api.drupal.org's hook\_form\_alter for Drupal7 doc page](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_form_alter/7)

Normally these things are just all well and good, do something like.

```php
<?php
/**
 * Implements hook_form_alter().
 */
function some_modules_form_alter(&$form, &$form_state, $form_id) {
  $form['field_element']['#default_value'] = "some value";
}
```

Easy right? Easy, this unless you find yourself altering a compound element. A compound element is a form element that could potentially have multiple fields. A very common one is the link field. The link field could have (optionally) several different form elements depending on the settings of the form field. (All of this is assuming this is an entity edit form that is generated by Drupal's field system)

If you where to run a dpm on the $from callback you would find several interesting array items.

 - #default_value
 - #columns

## #default_value

This is simply the field that one would use to change the default value of the field. The issue is that sometimes it isn't as simple as changing this items value. Sometimes a field has more than one column and sometimes the value that you want to change isn't ``` value ```. It could be ``` target_id ``` or something else.

## #columns
This is where the #columns item comes into play. Inside the #coloumns item there are sub-items that tell you what values you need to set inside of the #default_value item. Get all that?

### For example:
The #coloumns element should look like this for a link field element.

```php
<?php

$form['#columns'] = array(
  'url',
  'title',
  'attributes',
);
```

Therefore, in-order to set the default value of a link field, one must set the ``` $form['field_link']['#default_value']['url'] ```. This is assuming that it is desired to change the url of the link field. It could be that the title needs to be set or one of the other optional attributes for the link field.

This should hole true for all fields of all types. I noticed this when I stubled upon this [Drupal.org issue where someone was asking how to set the default value of a link field.](https://www.drupal.org/node/1782516#comment-7552205)

The issue didn't talk about this behavior of the #coloumns item. I just noticed it when digging through that. Cool eh?
