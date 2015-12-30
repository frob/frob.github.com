---
layout: post
title: You Git to Know When To Merge and Know When to Rebase
date: 2015-11-24T00:00:00.000Z
description: ""
canonical: null
tags: null
category: null
assets: 
  js: 
    - null
  css: 
    - null
published: true
---

Where I work, we have recently switched to git for our vcs. Being the experienced Drupal Developer that I am, I am also an experienced git user. Git isn't perfact and like most good tools, learning to use it is like learning to play the harmonica: the only differnece between someone who has used it for 10 hours and someone who has used it for 10 years is the amount of songs they know.

If you want to know how git works then go read this article explaining how git works. Otherwise keep reading and I will teach you the ``` git pull --rebase``` song.

## Why rebase?

If you don't know how git works then this isn't going to make sense and you should read that article I linked to earlier.

> Git logs a history of changes. Each change is a commit and is stored as a snapshot of the codebase. Each commit links to the next to make this history sequenchial.

### What is rebasing

Rebasing takes all the local commits and rewindes them; making it as though they never happened. Then, git pulls in all the remote changes. Then, git makes the remote HEAD the local HEAD, and then applies the local commits on top of the remote ones.

## Why not to rebase?

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
