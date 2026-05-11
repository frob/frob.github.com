---
name: new-post
description: Scaffold a new Hugo blog post with frontmatter, asking the user for title, publish status, and asset needs.
---

You are helping the user create a new blog post for their Hugo site. The posts live in `/Users/fanderson/repos/self/frob.github.com/content/posts/`.

## Step 1 — Gather information

Ask the following questions. If the user already provided an answer in their invocation message, skip that question.

1. **Title** (if not already provided): "What's the title of the post?"
2. **Publish status**: "Should this post be published now, scheduled for a future date, or saved as a draft?"
   - If "now": use today's date.
   - If "future": ask for the date (YYYY-MM-DD).
   - If "draft": use today's date and set `draft: true`.
3. **Assets**: "Does this post need any JavaScript or CSS assets? (yes / no / not sure yet)"
   - If yes: ask for the URLs or local paths for JS and/or CSS separately.
   - If not sure: include empty `assets:` block in frontmatter as a placeholder.
   - If no: omit the `assets` field entirely.

Ask all unanswered questions together in a single message so the user can answer them at once.

## Step 2 — Derive filename and slug

- **Slug**: lowercase the title, replace spaces and special characters with hyphens, collapse multiple hyphens, strip leading/trailing hyphens.
- **Filename**: `YYYY-MM-DD-{slug}.md` using the post's date.
- **File path**: `/Users/fanderson/repos/self/frob.github.com/content/posts/{filename}`

## Step 3 — Create the file

Write the file with YAML frontmatter followed by a blank body. Use this structure:

### Published post (no assets):
```
---
title: The Title Here
date: "YYYY-MM-DD"
description:
slug: the-slug-here
tags:
---

```

### Draft post:
```
---
title: The Title Here
date: "YYYY-MM-DD"
description:
slug: the-slug-here
tags:
draft: true
---

```

### Post with JS/CSS assets (fill in what the user provided; leave array empty if not sure yet):
```
---
title: The Title Here
date: "YYYY-MM-DD"
description:
slug: the-slug-here
tags:
assets:
    js:
        - 
    css:
        - 
---

```

Omit `css:` if the user only mentioned JS, and vice versa. If the user said "not sure yet", include the `assets:` key with empty `js:` and/or `css:` arrays as placeholders.

## Step 4 — Confirm

After creating the file, tell the user the full file path and the slug that will be used in the URL (`/posts/YYYY/MM/DD/{slug}/`).
