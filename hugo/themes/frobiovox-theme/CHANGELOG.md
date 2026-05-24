# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Four image roles in posts:
  - **Hero banner** — set via `hero` / `hero_alt` / `hero_caption` frontmatter; rendered above the title with the title/date/category/tags overlaid on the image and a semi-translucent gradient scrim for legibility
  - **List thumbnail** — set via `thumbnail` / `thumbnail_alt`; floats right of the entry on list pages, stacks on mobile
  - **Full-width block image** — `<img class="image-full">` or `<figure class="image-full">…<figcaption>…</figcaption></figure>` between paragraphs, with optional caption
  - **Inline floats** — `<img class="image-inline-left">` and `<img class="image-inline-right">` with text wrap; stacks on mobile
- Golden-ratio breakout system on desktop (≥1024 px): full-width images, hero, codeblocks, Mermaid diagrams, tables, headings, and inline floats each extend past the 740 px column by a golden-ratio step (180 / 69 / 26 px). Mobile is unchanged.
- Centered, content-sized post tables with header/zebra/border styling; on desktop they may grow up to the full-width image width.
- New example post: `the-quiet-tao-of-cat-naps.md` demonstrating all four image roles.
- Style Guide gained sections for **Hero banner**, **Images**, and a wider tokens table; raw HTML rendering enabled via `markup.goldmark.renderer.unsafe` in `exampleSite/config.toml`.
- Creative Commons cat photos from [placecats.com](https://placecats.com) used as placeholders in the styleguide and example posts (attributed in README).
- Tailwind CSS v4 via Vite build pipeline
- shadcn design tokens (CSS custom properties + `@theme inline` mappings)
- `src/main.css` as the CSS entry point, output to `static/css/main.css`
- Vite config with Docker-based build tasks (`task install`, `task css:build`, `task css:dev`)
- `task build` now depends on `task css:build`
- `.gitignore` covering `node_modules/` and backstop test bitmaps
- LLM-friendly site outputs: `llms.txt` and `llms-full.txt` at site root ([llmstxt.org](https://llmstxt.org)), per-page `index.md` markdown companions on every page and section, and `<link rel="alternate" type="text/markdown">` discovery in `<head>`
- JSON-LD (`schema.org`) in `<head>` of every page: `BlogPosting` for posts, `AboutPage` for `about`, `Blog` on the home page, `CollectionPage` for section/taxonomy lists
- `[params.author]` site-config block (per-post `author` frontmatter overrides the default)
- `task verify:llm` to verify the LLM-friendly artifacts in `exampleSite/public`
- Style-guide page at `/styleguide/` demonstrating every component, font, and color in the system; linked from the main menu
- `task start` / `task stop` to run the Hugo dev server as a detached Docker container (`hugomods/hugo:exts-0.154.3`)
- `task build:hugo` for fast Hugo-only rebuilds that skip the CSS pipeline

### Changed

- Mermaid SVG output now scales to fill the wider breakout container instead of being pinned to its intrinsic pixel width (CSS override of the inline `max-width` Mermaid emits).
- Tables now have header/zebra-row styling, dark header bar in VT323, and `1.5em auto` centering with `width: max-content` + transform-centering so they scale beyond the column on desktop.
- AI Summarize widget redesigned to be subtler — replaced the gray block + uppercase VT323 heading with a pair of light hairline rules, a small muted Raleway label, and square-bordered transparent pills.
- Typography overhaul: `h1` and post-listing titles now render in **VT323** at 40 px (`font-weight: normal`, 1 px letter-spacing); `h2`–`h6` now render in **IBM Plex Sans**; Cutive Mono dropped from the font load
- Pixel-font crispness: `-webkit-font-smoothing: none` / `font-smooth: never` applied to every VT323 element so the pixel grid stays sharp
- Taskfile renamed to verb:subject convention (e.g. `css:build` → `build:css`, `css:dev` → `watch:css`, `serve:stop` → `stop:serve`, `backstop:*` → `*:backstop`, `new` → `new:post`)
- Footer RSS icon now reuses the site mark from `avatar.svg` instead of the standard orange RSS glyph

### Fixed

- Raw HTML in `exampleSite/` Markdown (style-guide cards, badges, asides) was being silently dropped by Goldmark; now enabled via `markup.goldmark.renderer.unsafe`.
- BackstopJS ESM conflict caused by `"type": "module"` in `package.json` — resolved by adding a `commonjs` override in `backstop_data/engine_scripts/`

## [0.0.1] - 2025-01-10

### Added

- Initial theme release
- Responsive layout with VT323, Cutive Mono, and Raleway fonts
- Solarized syntax highlighting
- "Read More" buttons on post listings
- Social media links and blogroll in footer
- External links open in new tabs via `links.js`
- BackstopJS visual regression testing via Docker
- Example site for local development
