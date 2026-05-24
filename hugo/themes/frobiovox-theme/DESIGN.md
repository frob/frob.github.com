# Frobiovox — Design Notes

A retro-developer-blog aesthetic: monospace headings, a striped cartridge mark, content-first typography, and almost no chrome. This document describes the design system so future changes stay coherent.

## Voice

- Personal blog, not a marketing site. Reading comes first; navigation and ornament second.
- Retro/terminal flavor without being a costume — a VT323 nameplate and a Cutive Mono masthead set the tone, but body copy stays in Raleway so long-form reading is comfortable.
- Monochrome by default. The only saturated color in the system is the link blue (`#4183c4`) used as a hover/affordance signal.

## Layout

- 740 px content column (`.container`), centered, with 10 px gutters. The column is the default measure; certain in-post elements break out wider on desktop (see Responsive behavior).
- Three horizontal bands stacked top-to-bottom:
  1. **Masthead** — site avatar (70 px, 5 px radius) on the left, site name + description on the right; collapses to centered on ≤640 px.
  2. **Navigation strip** — a thin solid-black bar with right-aligned VT323 links. Deliberately heavy so it functions as a visual rule between header and content.
  3. **Content area** (`.not-footer`) — white background against the page's `#eee` body, giving a sheet-of-paper feel.
- Footer is `#eee` to match the body and visually "let go" of the content sheet. A 1 px top border (`#ddd`) is the only separator.

## Typography

Three families, each with a job — do not introduce a fourth.

| Role         | Family          | Where                                                                              |
| ------------ | --------------- | ---------------------------------------------------------------------------------- |
| Body / UI    | Raleway         | `body`, paragraphs, navigation labels (sentence-case), link text                   |
| Sub-headings | IBM Plex Sans   | `h2`–`h6`                                                                          |
| Display      | VT323           | `h1`, post-listing titles, site name, nav menu, "READ MORE" button, author byline  |

- VT323 is a pixel terminal font and carries the brand. It is reserved for `h1`, post-listing titles (visually-h1), the site name, nav, and a few short labels (read-more, author byline). Never use it for body copy.
- All VT323 elements have OS font smoothing disabled (`-webkit-font-smoothing: none`, `font-smooth: never`) so the pixel grid stays crisp. Pixel fonts only look right when the browser is *not* antialiasing them. The smoothing-disabled set: `h1`, `.post .title`, `.site-name`, `.navigation-menu`, `.post .author-info`, `.post .read-more`, `.post-hero-title`, and `.post thead th`.
- VT323 sizes are kept on multiples of 8 (32 px / 40 px) to align with the font's pixel grid.
- h1 is `font-weight: normal` — VT323 is already heavy at display sizes, and bold makes it muddy. h2–h6 stay at `bolder`.
- IBM Plex Sans on h2–h6 gives a quiet, modern counterpoint to VT323's retro top of the page without competing with Raleway in body copy.
- Body: 18 px / 1.4 line-height; paragraphs bump to 1.1em / 1.7 line-height for reading comfort.
- Heading scale: h1 40 px, h2 24 px, h3 20 px, h4 18 px (muted to `#666`). Single-step ratios — no dramatic display sizes.

## Color

Palette is intentionally small. Treat anything outside this list as a code smell.

| Token            | Value      | Use                                              |
| ---------------- | ---------- | ------------------------------------------------ |
| Page background  | `#eee`     | `body`, footer, selection background, asides     |
| Content surface  | `#fff`     | `.not-footer` content sheet                      |
| Ink              | `#333`     | Body text                                        |
| Heading ink      | `#222`     | h1–h3, post-title `#000`                         |
| Muted            | `#666`     | h4, dates, post descriptions, blockquote rule    |
| Border / divider | `#ddd`     | Footer top border                                |
| Link             | `#4183c4`  | All links, hover affordances (read-more, title)  |
| Inverse surface  | `#000`/`#222` | Nav strip, read-more button, author byline    |
| Inverse text     | `#fff`/`#eee` | Text on inverse surfaces                       |

shadcn design tokens (`--background`, `--foreground`, etc.) are also wired up via `@theme inline` for the card/badge components — used on list views. Light and dark variants are defined but the site currently renders light-only.

## Components

- **Post card** (`.card` / `.card-header` / `.card-title` / `.card-description`) — used on list pages. Rounded (`--radius-lg`, 0.625 rem), soft 1 px border, faint shadow. Title links are inherit-colored and only underline on hover, so the card itself reads as the affordance.
- **Badge** (`.badge`, `.badge-outline`) — for categories and tags. Solid badge uses `--secondary`; outline badge is borrowed for the single category line above tag lists.
- **Read-more button** — `font-size: 0` on the link then a `:after` pseudo-element renders "READ MORE" in VT323 on a `#222` block that goes blue on hover. This trick keeps the markup a simple `<a>` while letting CSS own the label.
- **Author byline** (`.author-info`) — VT323 on a dark block, inline. Same family as the read-more, same color contract, so the eye reads them as a set.
- **Inline aside** (`aside.inline`) — `#eee` background with a giant white `>` glyph as a pseudo-element. A literal terminal-prompt marker; do not theme this any other way.
- **Blockquote** — 2 px left rule in `#666`, italic, larger (22 px) and muted. Reads as a pulled quote, not a callout.
- **Post hero** (`.post-hero-wrap` / `.post-hero` / `.post-hero-overlay` / `.post-hero-title` / `.post-hero-meta` / `.post-hero-badges`) — optional image banner at the top of a post. Title, date, and badges sit in an absolutely-positioned overlay with a top-transparent → bottom-78%-black gradient scrim for legibility. Badges over the hero swap to translucent white (solid) and translucent black with a white border (outline). A `.post-hero-caption` line can sit immediately below in muted italic.
- **Post thumbnail** (`.post-thumbnail`) — 140 px right-floated image beside post entries on list pages; stacks full-width (≤280 px) and centers on ≤640 px.
- **In-post images** — `.image-full` is a block image (with optional `figure` + `figcaption`); `.image-inline-left` / `.image-inline-right` float on desktop (max 240 px) and stack centered on mobile (max 280 px). Both use 4 px radius.
- **Tables** (`.post table`) — centered in the column. `thead` is dark (`#222` / `#eee`) with VT323 uppercase headers; `tbody` rows are zebra-striped (`#f6f6f6` even), 1 px `#ddd` row separators, and the last row gets a heavier `#222` underline.
- **Mermaid diagrams** (`.post .mermaid`) — Hugo renders an SVG with an inline max-width set to intrinsic pixel size; CSS overrides it to scale to the container. On desktop they participate in the breakout (see Responsive behavior).
- **AI Summarize widget** (`.ai-summarize` / `.ai-summarize-heading` / `.ai-summarize-pills` / `.ai-pill`) — a horizontally bordered (`#eee` top + bottom), centered strip inserted after the first paragraph of post-singles. Pills are squared (no radius), 1 px `#ddd` border, muted text, hover to `#f6f6f6` / `#999` / `#333`. Deliberately quiet — it advertises an AI affordance without competing with the post.

## Iconography

- Social icons (footer): inline SVG, 40×40 (`.svg-icon`). GitHub and the RSS icon are monochrome (`#000`); Twitter keeps brand blue. The RSS icon uses the standard feed glyph (dot + two arcs).
- Site mark (`avatar.svg`): a potrace-derived monochrome cartridge — two solid end-blocks connected by ribbed horizontal bands. It is the only piece of pure illustration in the system; keep it sacred.

## Motion

- Almost none. Two transitions exist, both 0.1–0.2 s ease, both on color:
  - Link color (`a` → 0.2 s)
  - Read-more button background (0.1 s)
- No entry animations, no scroll-triggered effects, no parallax. Static pages load and stay still.

## Code & syntax highlighting

- Solarized color scheme on fenced code blocks. Code blocks (`.highlight`) get a soft shadow and horizontally scroll on overflow — long lines are *not* wrapped, because wrapping breaks alignment in the kind of code samples this site exists to show. Container width forces a horizontal scrollbar when needed; that is intentional.

## Responsive behavior

Two breakpoints: **640 px** (mobile/desktop split) and **1024 px** (desktop breakout).

- ≤640 px: masthead stacks and centers, nav padding tightens (`px-2.5`), avatar and site info both `margin: auto`. Inline post images stack centered (max 280 px). Post thumbnails stack centered. Hero overlay padding tightens; hero title drops to 28 px and hero meta to 14 px.
- 640–1024 px: side-by-side masthead, right-aligned nav, inline images float at 240 px max, post thumbnail floats right at 140 px.
- ≥1024 px — **desktop breakout**: the post-hero, full-width images, and Mermaid SVGs extend 180 px beyond each edge of the 740 px column (total `100% + 360 px`). Inline floats and `.highlight` code blocks poke out by 69 px on their outer edge — 1/φ² (≈0.382) of the full-width breakout. Headings outdent left by 26 px — 69/φ² applied again, so the ratio _heading : inline : full-width_ stays golden. Tables size to their content up to the full-width width and are transform-centered (margins can't go negative when content exceeds the parent). The hero title stays inside the overlay (padded to align with the breakout edge minus the heading outdent), so it doesn't double-outdent.

The 1024 px breakpoint is opt-in per element — most pages still sit entirely inside the 740 px column. The breakout is for content (images, diagrams, code, tables) that benefits from horizontal room; copy stays at the reading measure.

## What not to do

- Don't add a fourth font family. The three are Raleway (body), IBM Plex Sans (h2–h6), and VT323 (h1 / display). If you need a new tone, pick a different weight or size in one of those.
- Don't introduce saturated colors beyond the link blue. Especially: no green-for-success, red-for-error pill UI; this is a content site.
- Don't widen the reading column. 740 px is the body-copy measure. Images, diagrams, code, and tables may use the desktop breakout; paragraphs and headings stay anchored to the column (headings only outdent by the golden-ratio 26 px).
- Don't add full-bleed banners or section dividers across the page. The masthead is the only page-level visual break; the post hero is a per-post opt-in, not a section header.
- Don't replace VT323 with another pixel font for the nav/byline — VT323 is recognizably *that* terminal font and the substitution would feel generic.
- Don't animate on scroll or hover-glow elements. The motion budget is set by the two color transitions above.

## Machine-readable surfaces

Design considerations also apply to non-visual consumers:

- Every page emits a `<script type="application/ld+json">` block with the most specific `schema.org` type (`BlogPosting` for posts, `AboutPage` for about, `Blog` on home, `CollectionPage` for sections/taxonomies).
- Every page advertises a markdown alternate via `<link rel="alternate" type="text/markdown">` and ships an `index.md` companion next to its `index.html`.
- The site root publishes `llms.txt` (index) and `llms-full.txt` (full corpus) per the [llmstxt.org](https://llmstxt.org) proposal.

Treat these as part of the design surface, not an afterthought: they are how AI tools and machine readers "see" the site, and they should stay accurate when content or structure changes.
