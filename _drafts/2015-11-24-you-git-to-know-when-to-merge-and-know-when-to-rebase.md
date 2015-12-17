---
layout: post
title: You Git to Know When To Merge and Know When to Rebase
date: 2015-11-24
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

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↑·3|✚ 1]
12:02 $ git commit sites/all/modules/custom/oen_custom/oen_custom.module -m "updated the comment form to use custom node for destination"
[7.x-1.0.x 88ec2a1] updated the comment form to use custom node for destination
 1 file changed, 18 insertions(+)

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↑·4|✔]
12:03 $ git status
On branch 7.x-1.0.x
Your branch is ahead of 'origin/7.x-1.0.x' by 4 commits.
  (use "git push" to publish your local commits)
nothing to commit, working directory clean

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↑·4|✔]
12:03 $ git fetch

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↑·4|✔]
12:03 $ git fetch
remote: Counting objects: 66, done.
remote: Compressing objects: 100% (66/66), done.
remote: Total 66 (delta 41), reused 0 (delta 0)
Unpacking objects: 100% (66/66), done.
From git.clarity-innovations.com:enetlearning/seed-pak
   ceffcba..ba7fc6f  7.x-1.0.x  -> origin/7.x-1.0.x

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↓·5↑·4|✔]
12:26 $ git status
On branch 7.x-1.0.x
Your branch and 'origin/7.x-1.0.x' have diverged,
and have 4 and 5 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
nothing to commit, working directory clean

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↓·5↑·4|✔]
12:26 $ git pull --rebase
First, rewinding head to replay your work on top of it...
Applying: updated the comment preprocessor to remove the reply link
Applying: added code to make the resource view not ajax
Applying: commented out the typekit script
Applying: updated the comment form to use custom node for destination

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↑·4|✔]
12:26 $ git status
On branch 7.x-1.0.x
Your branch is ahead of 'origin/7.x-1.0.x' by 4 commits.
  (use "git push" to publish your local commits)
nothing to commit, working directory clean

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x ↑·4|✔]
12:26 $ git push
Counting objects: 39, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (39/39), done.
Writing objects: 100% (39/39), 4.06 KiB | 0 bytes/s, done.
Total 39 (delta 22), reused 0 (delta 0)
To git@git.clarity-innovations.com:enetlearning/seed-pak.git
   ba7fc6f..120e66a  7.x-1.0.x -> 7.x-1.0.x

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x|✔]
12:26 $ git pull
remote: Counting objects: 9, done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 9 (delta 5), reused 0 (delta 0)
Unpacking objects: 100% (9/9), done.
From git.clarity-innovations.com:enetlearning/seed-pak
   120e66a..be4e779  7.x-1.0.x  -> origin/7.x-1.0.x
Updating 120e66a..be4e779
Fast-forward
 web/public/sites/all/modules/custom/resource_quiz/resource_quiz.field_group.inc | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 mode change 100644 => 100755 web/public/sites/all/modules/custom/resource_quiz/resource_quiz.field_group.inc

✔ ~/repos/clarity/client/enet/seed/project/build/web/public [7.x-1.0.x|✔]
12:28 $ git status
On branch 7.x-1.0.x
Your branch is up-to-date with 'origin/7.x-1.0.x'.
nothing to commit, working directory clean
