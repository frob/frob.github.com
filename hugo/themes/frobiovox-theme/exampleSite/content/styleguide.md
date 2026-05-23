---
title: "Style Guide"
date: 2026-05-12T00:00:00-00:00
draft: false
description: "Living reference for every component and type style in the Frobiovox theme."
---

This page demonstrates every visual element defined in `DESIGN.md`. If you change a token or a component, check this page renders correctly before merging.

## Typography

# Heading 1 — VT323, 40px

## Heading 2 — IBM Plex Sans, 24px

### Heading 3 — IBM Plex Sans, 20px

#### Heading 4 — IBM Plex Sans, 18px, muted

Body copy is set in **Raleway** at 18px / 1.7 line-height. The point of this paragraph is to give you a long enough stretch of text to feel the reading rhythm. *Italics* and **bold** should sit comfortably inside the run without jumping out, and a [link looks like this](#) — the only saturated color in the system.

> A blockquote sits inside the column with a 2px rule on the left, italic, and a slightly larger size. Use it for pulled quotes, not for asides or callouts.

Inline `code` snippets render in the default monospace, no background tint. For fenced code blocks see the Code section below.

## Color

The palette is small on purpose. If you find yourself reaching for a color outside this list, stop and reconsider.

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 1em 0;">
  <div style="background:#eee; padding:1em; text-align:center; color:#333; border:1px solid #ddd;">#eee<br><small>page bg</small></div>
  <div style="background:#fff; padding:1em; text-align:center; color:#333; border:1px solid #ddd;">#fff<br><small>content</small></div>
  <div style="background:#333; padding:1em; text-align:center; color:#fff;">#333<br><small>ink</small></div>
  <div style="background:#222; padding:1em; text-align:center; color:#fff;">#222<br><small>heading</small></div>
  <div style="background:#666; padding:1em; text-align:center; color:#fff;">#666<br><small>muted</small></div>
  <div style="background:#ddd; padding:1em; text-align:center; color:#333;">#ddd<br><small>border</small></div>
  <div style="background:#4183c4; padding:1em; text-align:center; color:#fff;">#4183c4<br><small>link</small></div>
  <div style="background:#000; padding:1em; text-align:center; color:#fff;">#000<br><small>nav strip</small></div>
</div>

## Badges

Used for categories and tags on post pages and listing cards.

<div class="flex flex-wrap gap-1 mb-2">
  <span class="badge">default</span>
  <span class="badge">threejs</span>
  <span class="badge">tutorial</span>
  <span class="badge">frontpage</span>
</div>

<div class="mb-2">
  <span class="badge badge-outline">Outline / category</span>
</div>

## Cards

Cards are how posts surface on list pages. The whole card is the affordance; the title is the link.

<div class="card" style="max-width: 100%; margin: 1em 0;">
  <div class="card-header">
    <div class="card-title"><a href="#">Example post title goes right here</a></div>
    <div class="card-description">A one-line description sits in muted-foreground so the title stays dominant.</div>
  </div>
  <div class="card-content">
    <div class="date">January 12, 2026</div>
    <div class="mb-2 mt-2">
      <span class="badge badge-outline">New Web</span>
    </div>
    <div class="flex flex-wrap gap-1 mb-2">
      <span class="badge">threejs</span>
      <span class="badge">tutorial</span>
    </div>
  </div>
</div>

## Author byline

VT323 on a dark block — same visual contract as the read-more button.

<span class="author-info">posted by frobiovox</span>

## Inline aside

A terminal-prompt-styled aside. Use sparingly for editorial notes inline with prose.

<aside class="inline">
This is what an inline aside looks like — a muted block flagged with a giant <code>&gt;</code> prompt glyph on the left. It is for short editorial notes that interrupt the main read without breaking it.
</aside>

## Lists

Unordered:

- First item in the list
- Second item, with **emphasis** somewhere inside
  - A nested item drops to a circle marker
  - Nesting deeper keeps the same indent rhythm
- Third item

Ordered:

1. Steps go like this
2. Numbered, decimal, default indent
3. Predictable

## Code

Fenced code blocks get Solarized highlighting, a soft shadow, and horizontal scroll on long lines (intentional — wrapping breaks code alignment).

```javascript
// three.js scene setup — long lines do not wrap, they scroll
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
```

```bash
# task verify:llm — runs the JSON-LD / llms.txt sanity checks in a container
task verify:llm
```

## Tables

| Token            | Value      | Use                         |
| ---------------- | ---------- | --------------------------- |
| Page background  | `#eee`     | `body`, footer, asides      |
| Content surface  | `#fff`     | `.not-footer` content sheet |
| Ink              | `#333`     | Body text                   |
| Link             | `#4183c4`  | All links, hover affordances |

## Icons

The footer carries three icons at 40×40. The RSS icon reuses the site mark rather than the standard orange RSS glyph — the site's identity *is* its feed.

See the footer of this page for the rendered set.

## Responsive

There is exactly one breakpoint: **640 px**. Below it, the masthead stacks and centers, nav padding tightens, and the avatar floats free. Above it, masthead is side-by-side and nav is right-aligned. There is no tablet layout — the 740 px column makes a third state pointless.
