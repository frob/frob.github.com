# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Tailwind CSS v4 via Vite build pipeline
- shadcn design tokens (CSS custom properties + `@theme inline` mappings)
- `src/main.css` as the CSS entry point, output to `static/css/main.css`
- Vite config with Docker-based build tasks (`task install`, `task css:build`, `task css:dev`)
- `task build` now depends on `task css:build`
- `.gitignore` covering `node_modules/` and backstop test bitmaps

### Fixed

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
