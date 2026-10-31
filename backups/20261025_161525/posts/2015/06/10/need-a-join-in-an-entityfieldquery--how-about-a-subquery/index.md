# Need a join in an EntityFieldQuery, how about a subquery?

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2015/06/10/need-a-join-in-an-entityfieldquery--how-about-a-subquery/ |
| date | 2015-06-10 |
| tags | drupal, tutorial |
| description | Did you know that EntityFieldQueries can have subqueries? They can. |


I saw this over at [stackexchange](http://drupal.stackexchange.com/a/153695/17227) and I had to write about it. EntityFieldQuery is the Drupal 7 way to fetch entities without writing raw SQL, but it has a well-known limitation: you cannot do arbitrary `JOIN`s the way you would with a normal `db_select()` query. That comes up the moment you try to filter users by role, since role assignments live in their own table rather than on the user entity itself. It turns out there is a clean way around this using a subquery, and it is worth knowing about because the same trick applies any time you need to filter an EntityFieldQuery against data that lives in another table.

_**Shaddap and give me the code:**_

```php
$query = new EntityFieldQuery();
$query->entityCondition('entity_type', 'user');

$roles_subquery = db_select('users_roles', 'ur');
$roles_subquery->fields('ur', array('uid'));
$roles_subquery->condition('rid', $my_role_id);

$query->propertyCondition('uid', $roles_subquery, 'IN');
```

In case you do not want to click the link I put in the opening paragraph. That is the code.

## What was the problem?

This is the question.

> I thought this was an easy task, yet there does not seem to be a Drupal-method for this. I came as far as knowing I have to use EntityFieldQuery for this - because the API said conditions for user_load_multiple() are deprecated.

> So I tried this:

```php
  $query = new EntityFieldQuery;
  $query
    ->entityCondition('entity_type', 'user')
    ->propertyCondition('rid',array(1,2,3);

  $result = $query->execute();
```

What this developer wants to do is a query to find all users of a certain role. The problem here is that propertyConditions will only allow querying based on the fields of the base table for the entity and role isn't in the user table. Further, role isn't even a field so fieldCondition wouldn't help either. Also, when doing an EntityFieldQuery we cannot do a typical ```JOIN``` as we normally would.

## What is the solution.

To get around this we need to limit the EntityFieldQuery based on the uid and not the role. That means we need to get a the list of all the uids from the ```user_role``` table.

```php
$roles_subquery = db_select('users_roles', 'ur');
$roles_subquery->fields('ur', array('uid'));
$roles_subquery->condition('rid', $my_role_id);
```

This will give us a query that will return a list of all the user ids for a particular role. Then we can use that to do a propertyCondition on the EntityFieldQuery to limit it to those uids.

```php
$query->propertyCondition('uid', $roles_subquery, 'IN');
```

The interesting thing about this is that this isn't an array of results being passed to the propertyCondition. Instead, this is passing the query object. Then, Drupal's query builder will build the query to include that.

Seriously, well done with the whole DB layer in Drupal 7.

