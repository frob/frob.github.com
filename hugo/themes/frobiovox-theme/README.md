# Frobiovox Theme

A Hugo theme based on the design of [www.frobiovox.com](https://www.frobiovox.com).

## Features

- Clean, minimal design with responsive layout
- Custom fonts: VT323, Cutive Mono, and Raleway
- Tailwind CSS v4 with shadcn design tokens
- Syntax highlighting with Solarized color scheme
- "Read More" buttons on post listings
- Social media links and blogroll in footer
- External links automatically open in new tabs

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

Run these in separate terminals:

```bash
task css:dev    # Watch and rebuild CSS/JS with Vite
task dev        # Hugo development server at http://localhost:1313
```

### Building

```bash
task build      # Builds CSS then Hugo site
```

`task build` automatically runs `task css:build` first.

### Visual regression testing

Requires the site to be built and served first:

```bash
task build
task serve               # Serve built site via nginx on http://localhost:8088
task backstop:test       # Run visual regression tests
task backstop:approve    # Approve current results as new reference
task serve:stop          # Stop the nginx container
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

[params]
  description = "Your site description"
  avatar = "/images/avatar.png"
  github = "yourusername"
  twitter = "yourusername"

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

## License

MIT
