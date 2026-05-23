---
title: "Things I learned this week"
date: 2026-03-18T16:00:00-00:00
draft: false
description: "Six small things that surprised me — Hugo output formats, JSON-LD, pixel-font smoothing, and more."
category: "Field notes"
tags:
  - hugo
  - css
  - tooling
  - frontpage
thumbnail: "https://placecats.com/300/200"
thumbnail_alt: "A curious cat poking its head into the frame"
---

Every week I keep a running list of "huh, didn't know that" moments. Most of them are small. Here's this week's, in the order I bumped into them.

## Hugo output formats don't hot-reload

If you add a new output format to `hugo.toml`, the dev server won't pick it up live. You have to restart `hugo server`. I spent fifteen minutes wondering why `/llms.txt` was 404ing before I remembered that.

## `safeJS` is required for JSON-LD

Go's `html/template` will happily JS-escape the JSON you put inside a `<script>` tag, turning your object into a quoted string. You have to pipe through `safeJS` after `jsonify` so the runtime treats the output as already-safe JavaScript.

## Pixel fonts go fuzzy under subpixel antialiasing

VT323 — the terminal font this site uses for h1 — looked surprisingly blurry on my retina display until I disabled font smoothing:

- `-webkit-font-smoothing: none` on Webkit
- `font-smooth: never` for spec compliance (limited support, but harmless)
- Mozilla's `-moz-osx-font-smoothing` doesn't accept `none`; `auto` is the closest you can get

Sizes that are multiples of 8 also help, because they align with the font's design grid.

## Three useful kinds of memory

I've been thinking about memory for AI assistants in three buckets, and the categories keep holding up:

1. **User memory** — who they are, what they care about, how they prefer to work
2. **Feedback memory** — corrections and confirmations, especially the surprising ones
3. **Project memory** — what's currently in flight, with the *why* attached

The "why" is the part that decays slowest. Facts go stale; reasons stay useful for judgment calls.

## Tables work fine in plain markdown

I keep forgetting this and writing HTML tables. Plain markdown pipe tables render perfectly in Hugo, and they're a fraction of the typing:

| When | Tool |
| --- | --- |
| Targeted lookup | `grep` |
| Codebase survey | `Explore` agent |
| Multi-step task | `general-purpose` agent |

## Default to writing no comments

Old habit dying slowly. Most comments restate what the code already says. The ones worth writing are the ones that explain a constraint, an incident, or a non-obvious decision — the *why*. If removing a comment wouldn't confuse the next reader, don't write it in the first place.
