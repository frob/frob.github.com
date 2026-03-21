---
layout: post
title: When I see a problem
date: 2016-06-30T00:00:00.000Z
description: >-
  When I see a problem, I tend to need to fix it. Even if this involves shaving
  a yak.
canonical: null
tags: null
category: null
assets:
  js:
    - null
  css:
    - null
---

This is a story about a problem, [this problem](https://www.drupal.org/node/2678132) lead to lots of yak shaving. Hopefully, this will lead to the problem getting fixed too.

!https://www.dropbox.com/s/pd4xv8488i8s6jr/Screenshot%202016-06-28%2012.01.06.png

frob:
Mixologic_: ping
Mixologic_:
frob :pong
frob:
I really want to fix this issue https://www.drupal.org/node/2678132 but I have no idea where to start.
Druplicon:
https://www.drupal.org/node/2678132 => Not able to login from groups.drupal.org [#2678132] => 9 comments, 5 IRC mentions
frob:
Mixologic_: any first steps I could take would be awesome
benhartig is now known as benhartig|afk
Greg-Boggs has left IRC (Remote host closed the connection)
Mixologic_:
frob: g.d.o. is on drupal 6. which is why nobody works on fixing it. I'm digging around to see if I can point you in the right spot
frob:
awesome, it is annoying and embarrassing. Is there a doc page on setting up a infrastructure development environment?
nonsie has left IRC (Quit: nonsie)
Greg-Boggs has joined (~greg_bogg@173.240.241.83)
DyanneNova has left IRC (Quit: DyanneNova)
Greg-Boggs has left IRC (Ping timeout: 252 seconds)
DyanneNova has joined (~DyanneNov@199.127.229.254)
Greg-Boggs has joined (~greg_bogg@173.240.241.83)
Mixologic_:
frob : there is, but this, also is a little bit tricky because we actually need two dev envs
frob:
Seriously, thank you.
nonsie has joined (~anonymous@198.0.38.169)
frob:
do you have a link to the doc page?
Mixologic_:
frob : no, thank you, this kinda thing falls between the cracks because we just dont have the resources.
Mixologic_:
frob :  I had to stop for food, now Im gonna get you set up
Mixologic_:
frob : but Im also digging to find where to point you.
frob:
I understand, most people coming from a corporate product wont. They think that because there is a DA that means there is people working on this as a part of their job all the time.
Mixologic_:
There is, just not enough of us, and less of us.
frob:
this as in this issue.
Mixologic_:
And *many* of the things are so heinously complex, that volunteer assistance is often more of an obstacle than a boon.
frob:
this is little more than an annoyance.
Mixologic_:
frob : right, and fairly handoffable
frob:
I am sure there are more important things for DA employees to work on
Mixologic_:
frob : every person  in the community has an opinion on what those things are, too.
frob:
yup
Mixologic_:
frob : so right now, Im going to add your key to devwww2. You pretty much have to develop on our servers, remotely. Do you phpstorm?
frob:
yup
Mixologic_:
frob : https://www.drupal.org/contribute/drupalorg/code/develop
frob:
I get a 500 error when I go there
Mixologic_:
frob : so what I have found useful is setting up a deployment server and auto uploading to the dev site.
Mixologic_:
yeah, actually kinda bad timing to have this talk. d.o. is down right now. for who knows why.
frob:
oh, crap. Don't let me distract you then.
nonsie has left IRC (Quit: nonsie)
benhartig|afk is now known as benhartig
Mixologic_:
frob : so, which ssh key would you like me to use for the devwww2 server? https://www.drupal.org/user/249517/ssh-keys
frob:
clarity is the most current
frob:
I didn't realize I still had my old kwall keys in there. I have now deleted them
Mixologic_:
frob : so you should be able to ssh frob@devwww.drupalsystems.org -i .ssh/your_private_clarity_key, can you confirm that that works?
frob:
yup
frob:
Mixologic_: it works
Mixologic_:
frob : k. Im building you a couple of dev sites now. the drupal one wont matter, its just the bakery master.
Mixologic_:
(drupal being drupal.org)
frob:
awesome
frob:
looks like I have tonights reading all lined up
Mixologic_:
frob : yeah, from the looks of it this is a patch to the bakery module. https://www.dropbox.com/s/pd4xv8488i8s6jr/Screenshot%202016-06-28%2012.01.06.png?dl=0
frob:
Not sure why you sent the link
Mixologic_:
Because theres gonna be a bunch of yak shaving.
frob:
lol
frob:
I have never heard that term before. That is hilariose
Mixologic_:
frob : can you see this? https://bitbucket.org/drupalorg-infrastructure/groups.drupal.org/src/d8f2d2dbbff5aaf14a3791fb497d76172b1ea98a/groups.drupal.org.make?fileviewer=file-view-default
frob:
yes
Mixologic_:
The projects[bakery] stuff is the important parts.
frob:
So likely this will end with another patch in the make file?
Mixologic_:
frob : yup. I would probabaly look at this patch as some guidance: https://www.drupal.org/node/1967936#comment-7478158
Druplicon:
https://www.drupal.org/node/1967936 => Redirect to master a password reset request from a slave [#1967936] => 14 comments, 1 IRC mention
frob:
is anyone else going to be using the dev sites?
Mixologic_:
frob : this is your drupal.org dev site: https://login-drupal.dev.devdrupal.org/
nonsie has joined (~anonymous@198.0.38.169)
Mixologic_:
frob : and this should be your https://login-groups.dev.devdrupal.org/ groups dev site
frob:
it requires a basic auth passowrd
Mixologic_:
drupal:drupal
Mixologic_:
thats in that "develop on our servers doc above"
frob:
gotcha, thanks
Mixologic_:
all user accounts have been blasted, but one gets reset: U: bacon P: bacon
Mixologic_:
frob : do you xdebug?
frob:
I can, I still prefer dpm where I can
frob:
I see there is guide in the docs
Mixologic_:
frob : also, if you want to observe typical behavior, you can hit https://bakery-api.dev.devdrupal.org/api/drupal - an api subsite that will redirect to composer-drupal.dev.devdrupal.org for login
frob:
okay
Mixologic_:
frob : so my preferred way is to have bakery checked out locally, and set up a "deployment server" on devwww via ssh with auto upload. Edit locally, it ends up on the server.
frob:
okay, I haven't done that with phpstorm before. But it sounds similar to the way I used to use coda
Mixologic_:
frob : be sure you're working from the same commit of bakery as is in the makefile, and apply the patches.
frob:
Thanks for removing all excuses for me not getting this done.
frob:
Mixologic_: ++
frob:
That patch looks very close to what needs to happen for login.
frob:
Login has quite a few more edge cases to deal with.
Mixologic_:
frob : yeah, its pretty simple, its under build execution deploymnet -> deployment-> add a server SFTP type, and add a path mapping under mappings of wherever bakery lives on the groups dev site.
Mixologic_:
frob : actually here: /var/www/dev/login-groups.dev.devdrupal.org/htdocs/sites/all/modules/bakery
Mixologic_:
cool, thanks for being willing to dig in. theres definitely a buncho hoops to jump through just to be able to make changes.
Mixologic_:
frob++
frob:
I will attempt to get this setup tonight or tomorrow morning. I'll ping back if I run into any problems.
