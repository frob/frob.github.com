# Frobiovox — Design Notes

A retro-developer-blog aesthetic: monospace headings, a striped cartridge mark, content-first typography, and almost no chrome. This document describes the design system so future changes stay coherent.

## Voice

- Personal blog, not a marketing site. Reading comes first; navigation and ornament second.
- Retro/terminal flavor without being a costume — a VT323 nameplate and a Cutive Mono masthead set the tone, but body copy stays in Raleway so long-form reading is comfortable.
- Monochrome by default. The only saturated color in the system is the link blue (`#4183c4`) used as a hover/affordance signal.

## Layout

- Single 740 px content column (`.container`), centered, with 10 px gutters. Everything page-level is anchored to this measure — no full-bleed sections.
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
- All VT323 elements have OS font smoothing disabled (`-webkit-font-smoothing: none`, `font-smooth: never`) so the pixel grid stays crisp. Pixel fonts only look right when the browser is *not* antialiasing them.
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

## Iconography

- Social icons (footer): inline SVG, 40×40 (`.svg-icon`). GitHub and the site's own RSS icon are monochrome (`#000`); Twitter keeps brand blue. The RSS icon reuses the site mark (`avatar.svg`) rather than the standard orange RSS glyph — the site's identity *is* the feed icon.
- Site mark (`avatar.svg`): a potrace-derived monochrome cartridge — two solid end-blocks connected by ribbed horizontal bands. It is the only piece of pure illustration in the system; keep it sacred.

## Motion

- Almost none. Two transitions exist, both 0.1–0.2 s ease, both on color:
  - Link color (`a` → 0.2 s)
  - Read-more button background (0.1 s)
- No entry animations, no scroll-triggered effects, no parallax. Static pages load and stay still.

## Code & syntax highlighting

- Solarized color scheme on fenced code blocks. Code blocks (`.highlight`) get a soft shadow and horizontally scroll on overflow — long lines are *not* wrapped, because wrapping breaks alignment in the kind of code samples this site exists to show. Container width forces a horizontal scrollbar when needed; that is intentional.

## Responsive behavior

Single breakpoint at **640 px**.

- ≤640 px: masthead stacks and centers, nav padding tightens (`px-2.5`), avatar and site info both `margin: auto`.
- Above 640 px: side-by-side masthead, right-aligned nav.

No tablet-specific breakpoint. The 740 px column means there is no useful "tablet" layout between mobile and desktop — adding one would just create a third state to maintain.

## What not to do

- Don't add a fourth font family. The three are Raleway (body), IBM Plex Sans (h2–h6), and VT323 (h1 / display). If you need a new tone, pick a different weight or size in one of those.
- Don't introduce saturated colors beyond the link blue. Especially: no green-for-success, red-for-error pill UI; this is a content site.
- Don't widen the column. 740 px is the measure; long-line readability beats screen-filling.
- Don't add hero images, full-bleed banners, or section dividers. The masthead is the only visual "section break" the site needs.
- Don't replace VT323 with another pixel font for the nav/byline — VT323 is recognizably *that* terminal font and the substitution would feel generic.
- Don't animate on scroll or hover-glow elements. The motion budget is set by the two color transitions above.

## Machine-readable surfaces

Design considerations also apply to non-visual consumers:

- Every page emits a `<script type="application/ld+json">` block with the most specific `schema.org` type (`BlogPosting` for posts, `AboutPage` for about, `Blog` on home, `CollectionPage` for sections/taxonomies).
- Every page advertises a markdown alternate via `<link rel="alternate" type="text/markdown">` and ships an `index.md` companion next to its `index.html`.
- The site root publishes `llms.txt` (index) and `llms-full.txt` (full corpus) per the [llmstxt.org](https://llmstxt.org) proposal.

Treat these as part of the design surface, not an afterthought: they are how AI tools and machine readers "see" the site, and they should stay accurate when content or structure changes.
