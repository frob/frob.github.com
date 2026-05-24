# Frobiovox Theme

A Hugo theme based on the design of [www.frobiovox.com](https://www.frobiovox.com).

## Features

- Clean, minimal design with responsive layout
- Custom fonts: VT323 (h1 / display), IBM Plex Sans (h2–h6), and Raleway (body)
- Tailwind CSS v4 with shadcn design tokens
- Syntax highlighting with Solarized color scheme
- "Read More" buttons on post listings
- Social media links and blogroll in footer
- External links automatically open in new tabs
- LLM-friendly outputs: `llms.txt` / `llms-full.txt`, per-page markdown companions, and `schema.org` JSON-LD in `<head>`
- Four image roles for posts: hero banner (with title/date/tags overlaid on a translucent scrim), list thumbnail, full-width block (with optional caption), and inline left/right floats
- Golden-ratio breakout grid on desktop (≥1024 px): hero/full-width images, Mermaid, codeblocks, tables, headings, and inline floats step outside the 740 px reading column by φ-related amounts for vertical rhythm
- Styled post tables with dark VT323 header bar, zebra rows, and content-sized centered layout that can grow to the full-width image width on desktop

## Requirements

- [Hugo](https://gohugo.io/installation/) v0.120.0+
- [Docker](https://www.docker.com/) (for CSS builds and visual regression tests)
- [Task](https://taskfile.dev/) (task runner)

## Development

All commands run through [Taskfile](https://taskfile.dev/). Run `task` to list available tasks.

### Setup

```bash
task install    # Install Node dependencies (via Docker)
```

### Local development

```bash
task start      # Start the Hugo dev server (detached Docker container) at http://localhost:1313
task stop       # Stop the dev server container
```

For live CSS rebuilds while developing, run this in a separate terminal:

```bash
task watch:css  # Watch and rebuild CSS/JS with Vite
```

The `exampleSite/` directory contains a working Hugo site for local development and testing.

### Building

```bash
task build      # Builds CSS then Hugo site
```

`task build` automatically runs `task build:css` first. For fast iteration on layouts/content only, use `task build:hugo` to skip the CSS rebuild.

### Visual regression testing

Requires the site to be built and served first:

```bash
task build
task serve               # Serve built site via nginx on http://localhost:8088
task test:backstop       # Run visual regression tests
task approve:backstop    # Approve current results as new reference
task stop:serve          # Stop the nginx container
```

## Installation in Your Hugo Site

Add this theme to your Hugo site's themes directory:

```bash
cd your-hugo-site
git submodule add https://github.com/yourusername/frobiovox-theme.git themes/frobiovox
```

## Configuration

Set `theme = "frobiovox"` in your site's `config.toml` and configure the theme parameters:

```toml
baseURL = "https://example.org/"
languageCode = "en-us"
title = "My Hugo Site"
theme = "frobiovox"

[permalinks]
  posts = "/posts/:year/:month/:day/:slug/"

[params]
  description = "Your site description"
  avatar = "/images/avatar.png"
  github = "yourusername"
  twitter = "yourusername"

  [params.author]
    name = "Your Name"
    url = ""

  [[params.blogroll]]
    name = "Example Blog"
    url = "https://example.com"

[[menu.main]]
  name = "Blog"
  url = "/"
  weight = 1

[[menu.main]]
  name = "About"
  url = "/about/"
  weight = 2
```

### LLM-friendly outputs

The theme ships three custom Hugo output formats (`LLMS`, `LLMSFULL`, `MARKDOWN`) and a JSON-LD partial. These need matching entries in your site config:

```toml
[outputFormats]
  [outputFormats.LLMS]
    mediaType = "text/plain"
    baseName = "llms"
    isPlainText = true
    notAlternative = true
  [outputFormats.LLMSFULL]
    mediaType = "text/plain"
    baseName = "llms-full"
    isPlainText = true
    notAlternative = true
  [outputFormats.MARKDOWN]
    mediaType = "text/markdown"
    baseName = "index"
    isPlainText = true

[outputs]
  home    = ["HTML", "RSS", "LLMS", "LLMSFULL"]
  section = ["HTML", "RSS", "MARKDOWN"]
  page    = ["HTML", "MARKDOWN"]
```

This produces:

- `/llms.txt` and `/llms-full.txt` at the site root ([llmstxt.org](https://llmstxt.org) format)
- `index.md` markdown companion alongside every `index.html`, advertised via `<link rel="alternate" type="text/markdown">`
- `schema.org` JSON-LD (`BlogPosting`, `Blog`, `AboutPage`, `CollectionPage`) in `<head>`

`hugo server` does not hot-reload changes to custom output formats — restart it after editing this config.

### Verification

```bash
task verify:llm   # runs scripts/verify_llm.py in a python:3-alpine container
```

## Images in posts

Posts support four image roles. See the [Style Guide](exampleSite/content/styleguide.md) and the example post `exampleSite/content/posts/the-quiet-tao-of-cat-naps.md` for live demos.

| Role | How to set | Where it renders |
| ---- | ---------- | ---------------- |
| **Hero banner** | `hero` (+ optional `hero_alt`, `hero_caption`) in post frontmatter | Above the article on the single-post page; title, date, category, and tags are overlaid on the image with a bottom-anchored gradient scrim |
| **List thumbnail** | `thumbnail` (+ optional `thumbnail_alt`) in post frontmatter | Floated next to the entry on list pages |
| **Full-width block** | `<img class="image-full">` or `<figure class="image-full">…<figcaption>…</figcaption></figure>` in Markdown | Between paragraphs, bleeds wide on desktop |
| **Inline float** | `<img class="image-inline-left">` or `<img class="image-inline-right">` | Paragraphs wrap around it; stacks on mobile |

Raw HTML in Markdown requires `markup.goldmark.renderer.unsafe = true` in your site config — the `exampleSite` config has this enabled.

### Desktop breakout (golden-ratio grid)

On viewports ≥1024 px, several elements step outside the 740 px reading column for visual rhythm. Each step is one division by φ² (≈0.382) of the one above:

| Element | Bleed per side |
| ------- | -------------- |
| Hero banner, full-width images, Mermaid diagrams, max-width of post tables | 180 px |
| Codeblocks, inline `image-inline-left` / `image-inline-right` (outer edge only) | 69 px |
| Headings (`h1`–`h6`, post titles) outdent | 26 px |

Tables size to their content (`width: max-content`) and center via transform, so a small table stays compact while a wider one can spread to the full-width image width.

## Image credits

The cat photos used in `exampleSite/` (style guide and example posts) are Creative Commons placeholders served from [placecats.com](https://placecats.com), a free service in the spirit of the original placekitten.com. Photos are contributed by the placecats community under Creative Commons licenses. Swap the URLs for your own assets before publishing.

## License

MIT
