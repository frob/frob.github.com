---
layout: post
title: Simplify Drupal 8 field value calls
date: 2016-03-18
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

# Get the title of a node

```php
$node = \Drupal\node\Entity\Node::load($nid);
$title_field = $node->get('title');
$title = $title_field->value;
```

## Simplify

### use

```php
use Drupal\node\Entity\Node

$node = Node::load($nid);
$title_field = $node->get('title');
$title = $title_field->value;
```

### Don't split the ```get()``` and ```value``` calls

```php
use Drupal\node\Entity\Node

$node = Node::load($nid);
$title = $node->get('title')->value;
```

### Don't split the ```load()``` and ```get()``` and ```value``` calls

```php
use Drupal\node\Entity\Node

$title = Node::load($nid)->get('title')->value;
```

## Things to remember

This isn't sanitary!

If the title isn't being output through twig then remeber to sanitize anything that comes from the db.

```php
use Drupal\Component\Utility\Xss;

Xss::filter($title)
```
