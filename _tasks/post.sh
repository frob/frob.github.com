#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: provide a title argument."
  exit -1
else
  title="$@"
fi

d=$(date +"%Y-%m-%d")

slug=$(echo $title | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-')
slug="${slug:0:${#slug}-1}"
post="./_drafts/$d-$slug.md"

body=""
read -d '' body <<EOF
---
layout: post
title: $title
canonical:
category:
tags: []
assets:
  js:
  css:
---

EOF

echo "$body" > $post
subl . $post
