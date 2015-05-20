---
layout: post
title: Setting Up Jenkins on 12.04
canonical:
category:
tags: []
assets:
  js:
  css:
---

What I have noticed, is that every step by step for installing Jenkins on Ubuntu 12.04 is currently wrong. I is wrong becasue Jenkins recently began to require Java 1.7 instead of 1.6.

I was able to find one saving grace. This site gave a great [step by step on installing Jenkins](http://www.whiteboardcoder.com/2014/01/install-jenkins-ubuntu.html) --which I am going to condence for you all here.

## Install the correct JAVA RTE

1. ``` sudo apt-get purge openjdk* ```
1. ``` sudo apt-get install python-software-properties ```
1. ``` sudo add-apt-repository ppa:webupd8team/java ```
1. ``` sudo apt-get update ```
1. ``` sudo apt-get install oracle-java7-installer ```
1. ``` java -version ```

The output of the last command will say something like ```Java version 1.7.blah blah blah```

## Install Jenkins

1. ``` wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add - ```
1. ``` sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list' ```
1. ``` sudo apt-get update ```
1. ``` sudo apt-get install jenkins ```

By default Jenkins listens to port 8080. All you need to do is go to example.com:8080 and ...

## Setup Jenkins

I am not going to cover setting up Jenkins. If this is your first time installing Jenkins I recommend doing at least what is has here in the post install portion ([Securing Jenkins](http://www.whiteboardcoder.com/2014/01/install-jenkins-ubuntu.html)). It goes over how to do the bare minimum in a secure install.

### Bonus

If you don't like how Jenkins is listening only to port 8080, you can set up Jenkins to listen on port 80, or [just have nginx do all the hard work](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-jenkins-on-ubuntu-12-04).
