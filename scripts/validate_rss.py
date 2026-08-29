#!/usr/bin/env python3
"""Validate the RSS feeds Hugo writes into hugo/public.

Checks every *.xml under the public directory that is not a sitemap:

  - the file parses as XML
  - the root element is <rss version="2.0">
  - the channel carries title, link and description
  - every item carries a title or description, a link and a guid
  - every link is an absolute http(s) URL
  - every pubDate parses as RFC 822
  - no title or description was HTML-escaped twice
  - no entity-encoded tags (&lt;p&gt;) sit outside a CDATA section

Exits non-zero and prints one line per problem if anything fails.
"""

import re
import sys
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlparse

PUBLIC = Path(sys.argv[1] if len(sys.argv) > 1 else "hugo/public")
ATOM = "{http://www.w3.org/2005/Atom}"

CDATA = re.compile(r"<!\[CDATA\[.*?\]\]>", re.DOTALL)
ESCAPED_TAG = re.compile(r"&lt;[^&<>]{0,80}&gt;")
DOUBLE_ESCAPED_TAG = re.compile(r"&lt;/?[a-zA-Z]")
RAW_TAG = re.compile(r"</?[a-zA-Z]")
ENTITY = re.compile(r"&(?:amp|lt|gt|quot|apos|#\d+|#[xX][0-9a-fA-F]+);")


def text_of(parent, tag):
    node = parent.find(tag)
    return node.text.strip() if node is not None and node.text else ""


def check_url(value, where, errors):
    parsed = urlparse(value)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        errors.append(f"{where}: link is not an absolute http(s) URL: {value!r}")


def check_double_escaped(value, where, field, errors, markup_expected):
    """Catch content that went through HTML escaping twice.

    The parser has already decoded one layer, so anything still holding an
    entity was escaped again on the way out. In a body that is supposed to
    carry markup, a post quoting HTML in a code block legitimately leaves
    entities behind -- what gives the bug away is escaped tags with no real
    tags anywhere alongside them.
    """
    if markup_expected:
        if DOUBLE_ESCAPED_TAG.search(value) and not RAW_TAG.search(value):
            errors.append(
                f"{where}: <{field}> looks double-escaped -- "
                f"every tag is entity-encoded and none are real markup"
            )
    else:
        found = ENTITY.search(value)
        if found:
            errors.append(
                f"{where}: <{field}> still contains {found.group(0)!r} "
                f"after decoding -- double-escaped"
            )


def check_raw_escaped_tags(path, errors):
    """Fail on entity-encoded tags sitting outside a CDATA section.

    Post bodies belong in CDATA, so markup reaches the reader as markup. An
    &lt;p&gt; loose in the file means a template escaped the content instead.
    Escaped tags *inside* CDATA are left alone -- those are the author
    writing about HTML in a code block, and they have to stay encoded.
    """
    raw = path.read_text(encoding="utf-8", errors="replace")
    outside = CDATA.sub("", raw)
    hits = ESCAPED_TAG.findall(outside)
    if hits:
        sample = ", ".join(sorted(set(hits))[:3])
        errors.append(
            f"{path}: {len(hits)} entity-encoded tag(s) outside CDATA "
            f"(e.g. {sample}) -- content was escaped instead of wrapped"
        )


def validate(path, errors):
    check_raw_escaped_tags(path, errors)

    try:
        root = ET.parse(path).getroot()
    except ET.ParseError as exc:
        errors.append(f"{path}: not well-formed XML: {exc}")
        return

    if root.tag != "rss":
        errors.append(f"{path}: root element is <{root.tag}>, expected <rss>")
        return
    if root.get("version") != "2.0":
        errors.append(f"{path}: rss version is {root.get('version')!r}, expected '2.0'")

    channel = root.find("channel")
    if channel is None:
        errors.append(f"{path}: no <channel> element")
        return

    for tag in ("title", "link", "description"):
        if not text_of(channel, tag):
            errors.append(f"{path}: channel is missing <{tag}>")

    link = text_of(channel, "link")
    if link:
        check_url(link, f"{path}: channel", errors)

    check_double_escaped(
        text_of(channel, "title"), f"{path}: channel", "title", errors, False
    )
    check_double_escaped(
        text_of(channel, "description"),
        f"{path}: channel",
        "description",
        errors,
        True,
    )

    self_link = channel.find(f"{ATOM}link")
    if self_link is None or not self_link.get("href"):
        errors.append(f"{path}: channel has no <atom:link rel='self'> href")

    items = channel.findall("item")
    if not items:
        errors.append(f"{path}: channel has no <item> elements")

    for index, item in enumerate(items, start=1):
        where = f"{path}: item {index}"
        title = text_of(item, "title")
        label = f"{where} ({title})" if title else where

        description = text_of(item, "description")
        if not title and not description:
            errors.append(f"{label}: has neither <title> nor <description>")

        if title:
            check_double_escaped(title, label, "title", errors, False)
        if description:
            check_double_escaped(description, label, "description", errors, True)

        item_link = text_of(item, "link")
        if not item_link:
            errors.append(f"{label}: missing <link>")
        else:
            check_url(item_link, label, errors)

        if not text_of(item, "guid"):
            errors.append(f"{label}: missing <guid>")

        pub_date = text_of(item, "pubDate")
        if not pub_date:
            errors.append(f"{label}: missing <pubDate>")
        else:
            try:
                parsedate_to_datetime(pub_date)
            except (TypeError, ValueError):
                errors.append(f"{label}: pubDate is not RFC 822: {pub_date!r}")


def main():
    if not PUBLIC.is_dir():
        print(f"{PUBLIC} not found -- build the site first.", file=sys.stderr)
        return 1

    feeds = sorted(
        p for p in PUBLIC.rglob("*.xml") if not p.name.startswith("sitemap")
    )
    if not feeds:
        print(f"No feeds found under {PUBLIC}.", file=sys.stderr)
        return 1

    errors = []
    for feed in feeds:
        validate(feed, errors)

    for error in errors:
        print(error, file=sys.stderr)

    print(f"Checked {len(feeds)} feed(s), found {len(errors)} problem(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
