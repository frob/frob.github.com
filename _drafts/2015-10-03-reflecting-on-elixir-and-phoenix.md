---
layout: post
title: Reflecting on Elixir and Phoenix
date: 2015-10-03T00:00:00.000Z
description: "I reflect on what I have seen at ElixirConf 2015, what does this mean for Drupal, and Why use Elixir or Phoenix instead of Drupal or Jekyll."
canonical: null
tags:
  - drupal
  - elixir
  - jekyll
category: null
assets:
  js:
    - null
  css:
    - null
published: true
---


## The New Hotness

I read a post recently that had the click bait title "Is Drupal Dying?" Ironically I read this while attending [ElixirConf](http://www.elixirconf.com). The basis of that post was clients asking for the <q>next</q> thing --expecting Drupal to be old and busted in five years.

I am at ElixirConf because I see great potential in Elixir, Erlang, and [Phoenix](http://www.phornixframework.com). I expect it to be the next big thing and for it to help provide a scalable platform for highly available, highly scalable, and interactive / dynamic websites.

I consider myself a technologist. As such, I am always looking for the <q>next</q> thing. However, I would caution my clients against it.

# What is Elixir?

Elixir is a functional language that compiles down to Erlang. Erlang was developed by Ericson to run their phone switches. It is a fault-tolerant language that is designed to handle connections. However, Erlang is a difficult language to work with. Here are some examples about [how Elixir simplifies Erlang](http://elixir-lang.org/crash-course.html).

# What is [Phoenix](http://www.phornixframework.com)?

[Phoenix](http://www.phornixframework.com) is a Rails-like MVC framework that is written in Elixir. Phoenix makes good use of Elixir's tools (such as mix, plug, and ecto) and other Elixir components to create a highly scalable, fault-tolerant, and highly available web-application framework. This is still a very bare-bones and brand new framework. Phoenix 1.0.0 was just released. While I am very impressed, there are still some pieces that are missing. <mark>Some of these piece are missing in Rails and other MVC based frameworks as well</mark>. This is one reason I seldom use (or recommend) a MVC for back-end development.

## Phoenix feature overview?

The thing to remember is that phoenix is a bare metal type of framework. All it gives the developer out-of-the-box are: **Endpoints**, **Routes**, **Plugs**, **Models**, **Views**, and **Controllers**.

 - **Endpoints**
   - Where the client can connect; web-sockets and http.
 - **Routes**
   - Paths to content, these can be dynamic.
 - **Plugs**
   - Modules of additional functionality. The connections is pushed through the Plugs and the Plugs affect the connection.
 - **Models**
   - Definition (schema) of data.
 - **Views**
   - How the data is displayed
 - **Controllers**
   - How the data can be manipulated.

The nice thing about Phoenix is that it uses many pieces of tech form Elixir but it is also built to play well with other technologies.

# Some not-scientific-at-all &trade; benchmarks.

I am testing with apache benchmark. Running 1000 requests with 100 concurrent users. I am not going to do a test of Drupal, I will only be comparing Phoenix to a site that was statically generated beforehand and delivered with NGINX. Test where done with apache benchmark.

<aside class="inline">I am not testing Drupal, because it wouldn't be a fair comparison. Drupal does much more than Phoenix on each request. Really this is a far more apples&ndash;apples comparison.</aside>

## Static Site served with __nginx__

This is a site that I have in production. It was Drupal, I retired the site and archived it to static html. The web-server is running nginx and it only serves static sites. Neither Phoenix or NGINX are being used in a completely optimized way. Remember, these are not-scientific-at-all&trade; benchmarks.

```
01:18 $ ab -n 1000 -c 100 http://www.lnltowing.com/
This is ApacheBench, Version 2.3 <$Revision: 1663405 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking www.lnltowing.com (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests

Server Software:        nginx
Server Hostname:        www.lnltowing.com
Server Port:            80

Document Path:          /
Document Length:        3142 bytes

Concurrency Level:      100
Time taken for tests:   5.490 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      3392000 bytes
HTML transferred:       3142000 bytes
Requests per second:    182.15 [#/sec] (mean)
Time per request:       549.001 [ms] (mean)
Time per request:       5.490 [ms] (mean, across all concurrent requests)
Transfer rate:          603.37 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      100  237  58.8    244     665
Processing:    70  251  80.5    232     777
Waiting:       70  249  79.3    231     666
Total:        170  488 113.0    476    1089

Percentage of the requests served within a certain time (ms)
  50%    476
  66%    487
  75%    497
  80%    510
  90%    581
  95%    758
  98%    875
  99%    936
 100%   1089 (longest request)
```

## Dynamic site served with __Phoenix__

This is Phoenix running on my local machine in dev mode with live code reloading. I added a couple custom models and controllers, but otherwise it is basically vanilla Phoenix in development mode.

```
01:16 $ ab -n 1000 -c 100 http://127.0.0.1:4000/admin/content
This is ApacheBench, Version 2.3 <$Revision: 1663405 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests

Server Software:
Server Hostname:        127.0.0.1
Server Port:            4000

Document Path:          /admin/content
Document Length:        41373 bytes

Concurrency Level:      100
Time taken for tests:   7.488 seconds
Complete requests:      1000
Failed requests:        0
Non-2xx responses:      1000
Total transferred:      41567000 bytes
HTML transferred:       41373000 bytes
Requests per second:    133.54 [#/sec] (mean)
Time per request:       748.844 [ms] (mean)
Time per request:       7.488 [ms] (mean, across all concurrent requests)
Transfer rate:          5420.73 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.7      0       4
Processing:    30  726 128.0    710    1168
Waiting:       30  726 128.0    709    1168
Total:         33  727 127.9    711    1168
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%    711
  66%    752
  75%    809
  80%    828
  90%    892
  95%    953
  98%   1022
  99%   1073
 100%   1168 (longest request)
```

All this test does is make me think Phoenix might be onto something. This isn't decisive, however, Phoenix was delivering dynamic pages to the browser nearly as fast as nginx was delivering static files.

This definitely warrants further testing. My next test might be with some more complicated models and user access controls. However, my interest with Phoenix has more to do with the web-socket handling. These where the preliminary tests to see if Phoenix is even worth my limited time.

It is.

# Drupal's heel

My opinion is that Drupal's biggest strength (and the root of it's staying power) comes from our (as in the Drupal Community) acceptance that things change. Drupal 7 was a huge step forward from Drupal 6. Old apis where gone or changed in ways that where incompatible with Drupal 6. Remember that when Drupal 7 was released, no one was even developing on Drupal 6 anymore --everyone was using Pressflow.

Drupal 8, from all I can see, *gives us more tools out of the box than any other site building platform*. This is a good time.

For the longest time I thought Drupal's biggest problem was PHP --and I mostly still think that. The difference between now and 5 years ago is that PHP's development is starting to gain velocity. We are starting to see some of the improvements from HHVM and PHPng being brought into PHP. PHP7 holds some real potential. PHP has always been really fast and it is still really fast. Big pipe is the <q>new thing</q> for PHP and it can work, things are possible. All of this gives me hope. It gives me hope for Drupal.
