---
layout: post
title: "Getting starter with phpunit: hello world"
date: 2018-05-19
description: "How to get started with test driven development using composer and phpunit."
canonical: 
tags: 
category: 
assets:
  js:
    - 
  css:
    - 
---

@TODO write some SEO friendly sentence about composer. Some SEO friendly sentence about phpunit and Drupal.

## What is phpUnit

## What is TDD

If you know the merrits and reasoning for test driven development, then click the <a href="#tldr" aria-label="Skip the why and get to the how.">TLDR</a>; to get to the implementation. Test Driven Development is the act of developing software by means of writing tests that let you know if software works. This can happen because before we write the code we know what the code should do. We know what the code should do because we are writing software to a spec. The normal example is if we are writing a function that does addition ```fn add(a, b)``` then we can test that with an assertation that ```add(2, 2)``` will return the number *4*. This is a really effective way to write software because it requires us to only write enough code to make the test pass. Take a look at this graphic from wikipedia.

This is easy if you have some simple specs. What this general description is missing is step we must take if we have a complicated spec. For a complicated spec we will have to *factor* the problem as well. So with a slightly more complicated example. For the sake of the example lets say the spec is that your code must take a list of user emails and send a reminder for the user. As a part of this we should factor out this problem into the smallest testable parts. To acomplish this task the code will need to retrieve the user list, this can be tested. The code will also have to verify the list only has unique emails so that the users don't get emails twice --this can also be tested. Hopefully you are getting the idea.

## <a id="tldr"></a>Installing phpUnit with composer

This example is assuming a composer based workflow. To get started with composer you can read my [guide on getting started with composer](). Installing phpunit is as easy as running.

```bash
$ composer require composer
```

That is all it takes to install phpunit. To run phpunit run this command:

```bash
$ vendor/bin/phpunit --bootstrap src/autoload.php tests
```

For most projects you will need to bootstrap with the ```src/autoload.php``` file, in order to load all the requirements for testing your code. There are exceptions to this, if you have a more complicated test suite that you are running as a part of a framework you will want to follow the guidelines for the framework. For example, with Drupal 8 you will need to load the ```core/test/bootstrap.php``` file if you want to take advantage of the platform specifc classes while testing.

## Writing a failing test



### Make that test pass

### Why do we make the test fail and then make it pass

### Other types of tests

### Dealing with legacy code

Once you start down the TDD route, forever will it dominate your destiny, consume you it will. So what about code that doesn't have tests? This is forever more called legacy code. A common practice is to add tests to any code that gets touched. In this case the test should pass when it is first written. This way as more and more code gets touched it should also be testable.

## phpunit project configuration

### bootstrap

### Other phpunit xml attributes

## Don't go Crazy

Tests are good, but 100% test coverage isn't usually an obtainable goal and unit tests are of limited value. Do not over invest in unit tests.