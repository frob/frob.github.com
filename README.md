# frobiovox.com

Personal blog for [www.frobiovox.com](https://www.frobiovox.com), built with [Hugo](https://gohugo.io) and hosted on AWS S3 behind Cloudflare.

## Structure

```
content/posts/    # Blog posts (markdown)
hugo/             # Hugo site (config, layouts, theme)
_posts/           # Legacy Jekyll source posts
_drafts/          # Legacy Jekyll source drafts
_tasks/normalize/ # Go tool for normalizing post front matter
```

## Local Development

```bash
task serve          # Start dev server at http://localhost:1313
task serve:drafts   # Include draft posts
task build          # Build to hugo/public/
task build:prod     # Build minified for production
```

## Content Workflow

Posts live in `content/posts/`. The source of truth for editing is `_posts/` and `_drafts/` (legacy Jekyll files). To sync changes to Hugo:

```bash
task copy       # Normalize and copy from _posts/_drafts into content/posts/
task copy:dry   # Preview what would change without writing
```

The normalize tool cleans up front matter for Hugo compatibility: standardizes key order, merges `category` into `tags`, drops Jekyll-specific fields (`layout`, `published`), and sets the slug from the filename.

## Feeds

- `/feed.xml` — primary RSS feed
- `/rss.xml` — alternate RSS feed
- `/drupal.xml` — RSS feed filtered to `quarzack13` tag

## Theme

The theme is [`frobiovox-theme`](https://gitlab.com/frob/frobiovox-theme.git), vendored via `vendors.toml` at `hugo/themes/frobiovox-theme`.

## Cloudflare Redirect Rule

To redirect legacy `.html` URLs from the old Jekyll site to Hugo's trailing-slash URLs, add a redirect rule in the Cloudflare dashboard for the `frobiovox.com` zone:

- **Rules → Redirect Rules → Create rule**
- **Wildcard pattern:** `www.frobiovox.com/*.html`
- **Dynamic redirect expression:** `concat("https://www.frobiovox.com/", wildcard_replace(http.request.uri.path, "/*.html", "${1}"), "/")`
- **Status code:** `301`
