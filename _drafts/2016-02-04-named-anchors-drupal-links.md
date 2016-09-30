---
published: false
---

I recently came acros a problem with Drupal 7 render arrays and named anchors. I was attempting to the link on an image that normally linked to the node. I wanted to instead link to the image as denoted by a named anchor in the url. It is simple enough to change the path in the render array in the hook_node_view_alter implementation.

```php
/**
 * Implements hook_node_view_alter().
 */
function MODULENAME_node_view_alter(&$build) {
  if ($build['#bundle'] === 'activity_set' && $build['#view_mode'] === 'teaser') {
    if (isset($build['field_page_worksheet']) && is_array($build['field_page_worksheet'])) {
      foreach($build['field_page_worksheet'] as $key => &$value) {
        if (is_numeric($key) && isset($value['#path']['path'])) {
          $value['#path']['options'] = $value['#path']['path'] . "#page_{$key}";
        }
      }
    }
  }
}
```

The above code did indeed edit the link path, however, it run through urlencode. This makes the hash in the url a url encoded ```%23```.

```
<a href="/node/123%23page_0">
```

instead of:

```
<a href="/node/123#page_0">
```

So how do we get around this without hacking core? This is when knowing Drupal's underlying api really come in handy. We know that the ```l``` function calls ```url``` and that ```url``` will encode the url. But, we also know that we can add more to it. https://www.drupal.org/node/81447#comment-2658418
