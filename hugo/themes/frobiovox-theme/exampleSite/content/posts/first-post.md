---
title: "Getting Started with the Frobiovox Theme for Hugo Static Sites"
date: 2024-01-15T10:00:00-00:00
draft: false
---

This is an example blog post to demonstrate the Frobiovox theme for Hugo.

## Features

The theme includes:

- Clean, minimal design
- Responsive layout
- Syntax highlighting for code
- "Read More" buttons on post listings

## Code Example

Here's a Python script that fetches posts from the Hugo content directory and prints a summary of each one, including title, date, and word count.

```python
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Optional

CONTENT_DIR = Path("content/posts")
DATE_FORMAT = "%Y-%m-%dT%H:%M:%S%z"

def parse_frontmatter(text: str) -> dict[str, str]:
    """Extract YAML frontmatter key-value pairs from a Hugo markdown file, ignoring nested arrays."""
    match = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return {}
    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ": " in line and not line.startswith("  ") and not line.startswith("\t"):
            key, _, value = line.partition(": ")
            fields[key.strip()] = value.strip().strip('"').strip("'")
    return fields

def word_count(text: str) -> int:
    """Count words in the body of a markdown file, stripping frontmatter and fenced code blocks."""
    body = re.sub(r"^---.*?---\n", "", text, flags=re.DOTALL)
    body = re.sub(r"```.*?```", "", body, flags=re.DOTALL)
    return len(body.split())

def format_date(raw: str) -> str:
    try:
        return datetime.strptime(raw[:19], "%Y-%m-%dT%H:%M:%S").strftime("%b %d, %Y")
    except ValueError:
        return raw[:10]

results = []
for md_file in sorted(CONTENT_DIR.glob("*.md"), key=lambda f: f.stat().st_mtime, reverse=True):
    content = md_file.read_text(encoding="utf-8")
    meta = parse_frontmatter(content)
    title = meta.get("title", md_file.stem)
    date_str = format_date(meta.get("date", "1970-01-01T00:00:00"))
    words = word_count(content)
    draft = meta.get("draft", "false").lower() == "true"
    results.append((date_str, words, title, draft))

for date_str, words, title, draft in results:
    status = " [DRAFT]" if draft else ""
    print(f"{date_str}  {words:>5} words  {title}{status}")
```

This theme is based on the design of www.frobiovox.com.
