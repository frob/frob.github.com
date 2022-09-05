---
layout: json
sitemap: false
title: Semantic Git
date: 2016-05-27
description: "Using git-flow as a workflow for semantic versioning. This is a circular dependency that is good."
canonical:
tags:
  - frontpage
  - git
  - tutorial
category:
  - frontpage
  - git
  - tutorial
assets:
  js:
    -
  css:
    -
---

Git is a great tool for managing source control. Git flow is a great workflow for working with git branches and tags. Semantic versioning is a great way for labeling and cataloging version dependence. If we put them together then we will have a dependency system that is reenforced by workflow that is reenforced by a dependency system. This is a circular dependency that is good.

# Semantic git-flow

## Background

[skip TLDR;](#tldr)

### Sematic Versioning

At a high-level Semantic Versioning aims to solve dependency issues by creating a standard versioning system that allows anyone to understand what has changed in a new version.

#### Example

*1.2.3*

*_Major_*.*_Minor_*.*_Patch_*

Major
: Changing this is mandatory in the case of a backwards incompatible api change.

Minor
: Changing this is mandatory in the case of a backwards compatible api change or addition of new features.

Patch
: Changing this is mandatory in the case of any other change, that is not adding functionality or breaking backwards compatibility.

### Git Flow

A git workflow that dictates what branches to make and why. A typical git-flow workflow will include 3+ branches:

*stable*
: the current stable branch

*master*
: the current development or HEAD

*master-feature*
: where the work is actually accomplished

The git flow workflow is designed so that:

- hot-fixing the stable product is always possible
- new features can be added to the stable product by merging in the feature branch
- git history remains linear to that it doesn't become git branch spaghetti

## Semantic git <a name="tldr"></a>

By merging these two ideas we can make it clear what is in development on any branch at any time and what that means to the product.

### Stable

*1.2.3*
: By utilizing semantic versioning we can always keep it clear what our stable code is by using tags to snapshot stable code. In this way _stable_ wouldn't be a branch but rather a tag. Since the _patch_ number should increment any time there is a new stable release this should be a sane mechanism for it.

### master

*1.2.x*
: There could me multiple master branches, one of any supported major.minor version combination. No work should be done directly on the master branches.

### master-feature

*1.2.x-feature*
: It is obvious what is being worked on in the branch and what master version it is based on.

## Workflow

1. Initialize git and create master branch
  1. ```git init```
  1. ```git checkout -b 1.0.x```
  1. ```git push -u origin 1.0.x```

1. Create new branch for "Checkout Widget" feature development
  1. ```git checkout -b 1.2.x-checkout-widget```
  1. _Work on project_
  1. ```git fetch```
  1. ```git pull --rebase origin 1.2.x```
  1. ```git push origin 1.2.x-checkout-widget```

1. Create merge request in Gitlab or a pull request in github (shown here is what happens on the command line)
  1. ```git checkout 1.2.x-checkout-widget```
  1. ```git pull --rebase 1.2.x```
  1. _test and peer review_
  1. ```git checkout 1.2.x```
  1. ```git merge 1.2.x-checkout-widget```

    > This is also handy if you are working on your own sub-feature branches that do not require further peer review.

1. Create release tag and publish new release
    - *Patch release*
      1. ```git tag 1.2.4``` _Assumes the current release is 1.2.3_
      1. ```git push origin 1.2.4```
    - *Minor release*
      1. ```git tag 1.2.0``` _Assumes the current release is 1.1.\<any-number\>_
      1. ```git push origin 1.2.0```
      1. ```git checkout -b 1.3.x```
      1. ```git push -u origin 1.3.x```

  > Notice the new Minor Release comes from the branch of the same name. Same is true of Major Releases. As soon as it is known that backwards compatibility will be broken, then new Major Release branch should be made. Before work is started on a new feature, a new Minor Release branch should be made.
