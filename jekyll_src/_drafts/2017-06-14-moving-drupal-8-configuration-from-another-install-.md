---
layout: post
title: Moving Drupal 8 configuration from another install.
date: 2017-06-14
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

First remove all uuids from the config files. This is necessary because the uuids are specific to the install.

```bash
$ sed -i.bak '/uuid/d' config/sync/*.yml
```

Don't forget to remove all the .bak files that this will create. The mac version of sed requires **-i** to produce a backup.

```bash
$ rm config/sync/*.bak
```

Remove all system files.

```bash
$ rm config/sync/system.*
```

Also, remove any configuration for modules that won't be on the new site.

```bash
$ rm config/sync/google_analytics_lite.settings.yml
```

```bash
$ drush @drupalvm.dev cim --partial
```
