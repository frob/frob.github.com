---
title: Altering Entity Field Queries for JOINS ORs and Profit
date: "2015-11-11"
description: EntityFieldQueries are one of the most useful things in Drupal 7, using tags we can get around some of the limitations of using them.
slug: altering-entity-field-querys-for-joins-ors-and-profit
tags:
    - frontpage
    - drupal
    - tutorial
    - quarzack13
---



EntityFieldQuery is powerful, but it has a well-known limitation: no ```OR``` conditions. If you need to filter nodes by a taxonomy field AND also match a keyword in the title, you are stuck -- unless you know about query tags and ```hook_query_TAG_alter()```. This post shows how to break out of EntityFieldQuery's constraints by altering the underlying database query directly.

I have written about [extending EntityFieldQueries with subqueries](https://www.frobiovox.com/posts/2015/06/10/need-a-join-in-an-entityfieldquery--how-about-a-subquery.html) before. This time I will go into extending the query as a query object, using Drupal's hook and alter architecture.

## Simple EntityFieldQuery

For our example we will start with a simple EntityFieldQuery for getting a list of nodes.

```php

  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'activity_set');

  $result = $query->execute();

  if (isset($result['node'])) {
    $activity_sets = node_load_multiple(array_keys($result['node']));
    $activity_sets = node_view_multiple($activity_sets);
  }
```

Now lets say that we want this list to be a keyword filtered list of title or taxonomy. But, we also want to filter this to exclusively show nodes with another taxonomy field's values. The one taxonomy field is an easy addition.

```php
$query->fieldCondition('field_related_curriculum', 'tid', $structure_taxonomy, 'IN');
```

## How EntityFieldQueries can start to break down

But how do we add an ```OR``` statement to also allow for the title keyword filter?

EntityFieldQuery doesn't allow for ```OR``` out of the box. We could extend the EntityFieldQuery class and add some interface to it to try and handle this case. OR, we could just use Drupal's hook and alter system to alter the query before we execute the query.

Before we can alter the query, we must know what query we want to alter. We will do this by tagging the query when we created the EntityFieldQuery.

```php
$query->addTag('keyword');
```

While we are at it we will have to add our filter criteria as well.

```php
$query->addMetaData('options', $options);
```

There now we have what we will need for our alter hook. To alter this query we will need to implement hook_query_TAG_alter().

```php
/**
 * Implements hook_query_TAG_alter().
 */
function module_name_query_keyword_alter(QueryAlterableInterface $query) {
  // @TODO: make this do things.
}
```

What we want is for any single word in the title to come back with a like. I did it this way. I realize that this can be done in a variety of different ways.

```php
$keywords = explode(' ', $options['keywords']);

$or = db_or();
if (count($keywords)) {
  foreach ($keywords as $keyword) {
    $or->condition('node.title', '%' . $keyword . '%', 'LIKE');
  }
}
$query->condition($or);
```

There, we are done, right? Nope. We may think that we are, however, if we ran that code we would get a PDO exception. Why? Because we are not doing any propertyConditions on the original EntityFieldQuery. Drupal is smart enough to know that if it isn't using the node table in the EFQ that it doesn't need to ```JOIN``` it.

To fix this, go back up to the original EntityFieldQuery and add this line ```$query->propertyCondition('status', 1);```. This forces the node table into the query so our alter hook can reference ```node.title```.

To recap: tag your EntityFieldQuery, attach metadata with ```addMetaData()```, implement ```hook_query_TAG_alter()``` to add your ```OR``` conditions, and make sure the base table is joined by including at least one ```propertyCondition```. It is not obvious, but once you know the pattern it opens up EntityFieldQuery for nearly any query you need to build.
