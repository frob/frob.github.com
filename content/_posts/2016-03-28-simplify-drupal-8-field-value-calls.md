---
layout: post
title: Simplify Drupal 8 field value calls
date: 2016-03-28
description: "Explore a bit of field fetching with Drupal 8"
canonical:
tags:
  - frontpage
  - drupal
  - tutorial
  - quarzack13
category:
  - tutorial
  - drupal
  - frontpage
  - quarzack13
assets:
  js:
    -
  css:
    -
published: true
---

Things change, it's a fact of life; even more so it's a fact of a web developer's life.

In semantic versioned frameworks every new major version brings new api and discards the old apis. Like ripping off a band-aid, this is an excruciatingly painful experience that will eventually bring forward a less painful future. Thus, it has been with the change from Drupal 7 to Drupal 8.x.

# Get the title of a node

Let load a node and return the title.

## Drupal 7

```php
$node = node_load($nid);
$title = $node->title;
```

Easy right? Two lines, done!

Now lets look at the Drupal 8 way.

## Drupal 8

```php
$node = \Drupal\node\Entity\Node::load($nid);
$title_field = $node->get('title');
$title = $title_field->value;
```

Wow, look at all those words.

Lets take a look at what is happening here. First, we load the node, that is what all that ```\Drupal\node\Entity\Node::load()``` business is doing. Second, We load the title field (that is correct titles are fields in Drupal 8) this is done with the ```get``` method. Third, we have to get the value from that field that we got with a call to the ```value``` member.

So much work just to get the title. Clearly things where easier in Drupal 7.

Well, not so fast. What if the site is multi-lingual? Or what if we need more than just the title. Remember, Drupal 7 didn't use objects so it was impossible to get those values in a "normal" way. That is unless you consider ```$node->field_name[0][LANGUAGE_NONE]['value']``` normal. This isn't a stab at Drupal 7's brilliant architecture. Drupal 7's architecture gave us an awe inspiring amount of freedom within an engine to build nearly anything we wanted. However, the api's (or lack there of) have not aged well.

The point of all that is, there is just this one getter to get a value from a field. No longer do we need to ```dpm``` a value and see what is there and then pull the right value with the correct delta, for the correct language, from the correct "value." Now we just ```get()``` the field, and pull the ```value```.

## Simplify

Now that we are past all that, let us see how we can improve upon that getter snippit.

### use

First we can utilize the use keyword so the Node static object will be directly accessible inside our namespace. This will be the only thing that I mention in this post that increase the number of lines.

```php
use Drupal\node\Entity\Node

$node = Node::load($nid);
$title_field = $node->get('title');
$title = $title_field->value;
```

### Don't split the ```get()``` and ```value``` calls

There is no need to separate the field getter from the value getter. We can eliminate the field variable and one line by concatenating those commands.

```php
use Drupal\node\Entity\Node

$node = Node::load($nid);
$title = $node->get('title')->value;
```

### Don't split the ```load()``` and ```get()``` and ```value``` calls

While we are at it we should just put it all on one line.

If all we want is the title there is no reason to save the node to a variable. There isn't anything wrong with saving it to a variable, but it can be confusing to have all these variables laying around when you come back to this code after six months.

```php
use Drupal\node\Entity\Node

$title = Node::load($nid)->get('title')->value;
```

### We don't really need to call ```get()```

As pointed out by Dezső BICZÓ in the comments, get() is a magic method. Therefore, in this case we can call for ```$node->title``` directly. That can further simplify our example.

```php
use Drupal\node\Entity\Node

$title = Node::load($nid)->title->value;
```

## Things to remember

This isn't sanitary!

If the title isn't being output through twig then remember to sanitize anything that comes from the db.

```php
use Drupal\Component\Utility\Xss;

Xss::filter($title)
```

It's important to remember that when dealing with a new version it's tempting to say, "This used to be easy and now it is hard."

It only used to be easy because we knew how to do things without having to do too much research. Now things are hard --but they will not stay that way. For better or worse Drupal 8 brought new architecture, new ideas, and new things to learn.
