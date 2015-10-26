---
layout: json
title: Creating Auto Submitting Forms with Drupal's Form API
date: 2013-11-26
description: ""
canonical: http://www.kwallcompany.com/blog/creating-auto-submitting-forms-drupals-form-api
tags: ['drupal', 'kwallcompany', 'tutorial', 'quarzack13']
category:
assets:
  js:
    -
  css:
    -
---

If you are unfamiliar with building forms in Drupal, please view Patrick’s post on the <a href="http://www.kwallcompany.com/blog/details-formation-forms">various options for building forms in Drupal</a>.

I will be focusing on forms built with <a href="https://api.drupal.org/api/drupal/developer%21topics%21forms_api_reference.html/7" target="_blank">Drupal’s Form API (or fapi)</a>.

My use case was a semi-typical one: have the input from one select list affect the options in another select list. Here is my wireframe: [insert wireframe here]

This could be done in any number of ways including:

- ahah (or ajax)
- I could have javascript limit the options after selection without a server call
- Or, I could reload the page after the first selection is made

I chose to reload the page after the first choice was made.

Drupal has a built in handler for ajax like behavior in its form api aptly named “#ajax”. Using the ajax element in the Drupal’s form api looks like this:

```php
<?php
$form['form_element'] = array(
  '#type' => 'submit',
  ‘#value' => t('Submit'),
  ‘#ajax' => array(
    'callback' => 'callback_function',
    'method' => 'replace',
    'effect' => 'fade',
  ),
);
```

It is pretty verbose, requires a php callback, and can be a bit of overkill for auto-submitting a form. In the days of pure HTML forms, we would simply add the form submit straight to the form input. As it turns out we can do the same thing to our form by exploiting the fact that the form API uses render arrays. All we have to do is attach this code snipit to our form element.

```php
'#attributes' => array('onChange' => 'document.getElementById("people-filter-form").submit();')
```

Notice what is happening here. We are adding attributes to the form element. This is the same way that we would attach classes, only this time we are adding the attribute <tt>onChange='&lt;some js to execute&gt;'.</tt>

Below is the full form definition.

```php
<?php
/**
 * Custom Report User Filter Form
 */
function people_filter_form($form, &amp;$form_state) {
  $form['person'] = array(
    '#type' => 'select',
    '#options' => array(
      '' => 'Select a Person',
    ),
    '#default_value' => empty($_GET['person']) ? '' : check_plain($_GET['person']),
    '#attributes' => array('onChange' =>; 'document.getElementById("iris-app-people-filter-form").submit();'),
  );
  $people = _get_select_list_data('person');
  foreach ($people as $person) {
    $form['person']['#options'][$person->uid] =  $person-&gt;name;
  }

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Search People',
  );

  return $form;
}
```
