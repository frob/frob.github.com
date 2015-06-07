---
layout: post
title: Creating Auto Submitting Forms with Drupal's Form API
date: 2013-11-26
description: ""
canonical: http://www.kwallcompany.com/blog/creating-auto-submitting-forms-drupals-form-api
tags: ['drupal', 'kwallcompany']
category:
assets:
  js:
    -
  css:
    -
---

<p>If you are unfamiliar with building forms in Drupal, please view Patrick’s post on the <a href="http://www.kwallcompany.com/blog/details-formation-forms">various options for building forms in Drupal</a>.</p>
<p>I will be focusing on forms built with <a href="https://api.drupal.org/api/drupal/developer%21topics%21forms_api_reference.html/7" target="_blank">Drupal’s Form API (or fapi)</a>.</p>
<p>My use case was a semi-typical one: have the input from one select list affect the options in another select list. Here is my wireframe: [insert wireframe here]</p>
<p>This could be done in any number of ways including:</p>
<ul><li>ahah (or ajax)</li>
<li>I could have javascript limit the options after selection without a server call</li>
<li>Or, I could&nbsp;reload the page after the first selection is made</li>
</ul><p>I chose to reload the page after the first choice was made.</p>
<p>Drupal has a built in handler for ajax like behavior in its form api aptly named “#ajax”. Using the ajax element in the Drupal’s form api looks like this:</p>
<pre>$form['form_element'] = array(
  '#type' =&gt; 'submit',
  ‘#value' =&gt; t('Submit'),
  ‘#ajax' =&gt; array(
    'callback' =&gt; 'callback_function',
    'method' =&gt; 'replace',
    'effect' =&gt; 'fade',
  ),
);</pre><p>It is pretty verbose,&nbsp;requires a php callback, and can be a&nbsp;bit of overkill for auto-submitting a form. In the days of pure HTML forms, we would simply add the form submit straight to the form input. As it turns out we can do the same thing to our form by exploiting the fact that the form API uses render arrays. All we have to do is attach this code snipit to our form element.</p>
<pre>'#attributes' =&gt; array('onChange' =&gt; 'document.getElementById("people-filter-form").submit();')</pre><p>Notice what is happening here. We are adding attributes to the form element. This is the same way that we would attach classes, only this time we are adding the attribute <tt>onChange='&lt;some js to execute&gt;'.</tt></p>
<p>Below is the full form definition.</p>
<pre>/**
 * Custom Report User Filter Form
 */
function people_filter_form($form, &amp;$form_state) {
  $form['person'] = array(
    '#type' =&gt; 'select',
    '#options' =&gt; array(
      '' =&gt; 'Select a Person',
    ),
    '#default_value' =&gt; empty($_GET['person']) ? '' : check_plain($_GET['person']),
    '#attributes' =&gt; array('onChange' =&gt; 'document.getElementById("iris-app-people-filter-form").submit();'),
  );
  $people = _get_select_list_data('person');
  foreach ($people as $person) {
    $form['person']['#options'][$person-&gt;uid] =  $person-&gt;name;
  }

  $form['submit'] = array(
    '#type' =&gt; 'submit',
    '#value' =&gt; 'Search People',
  );

  return $form;
}</pre>
