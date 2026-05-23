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

## License

MIT
