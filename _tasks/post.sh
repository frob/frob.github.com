#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: provide a title argument."
  exit -1
else
  title="$@"
fi

d=$(date +"%Y-%m-%d")

slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-' | tr -cd '[:alnum:]-')
post="./content/posts/$d-$slug.md"

cat > "$post" <<EOF
---
title: $title
date: "$d"
slug: $slug
draft: true
tags: []
---

EOF

echo "Created $post"
