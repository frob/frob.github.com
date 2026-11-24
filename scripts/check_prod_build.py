#!/usr/bin/env python3
"""Fail if a built site was not built for production.

Usage: check_prod_build.py PUBLIC_DIR BASE_URL

Checks that every <loc> in sitemap.xml starts with BASE_URL, and that the
feeds and home page contain no localhost or loopback URLs.
"""
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

public = Path(sys.argv[1])
base = sys.argv[2].rstrip("/") + "/"
errors = []

sitemap = public / "sitemap.xml"
if not sitemap.is_file():
    errors.append("sitemap.xml is missing")
else:
    locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", sitemap.read_text(encoding="utf-8"))
    if not locs:
        errors.append("sitemap.xml has no <loc> entries")
    bad = [u for u in locs if not u.startswith(base)]
    if bad:
        errors.append(f"sitemap.xml has {len(bad)} <loc> not under {base}, e.g. {bad[0]}")

local = re.compile(r"^\s*https?://(localhost|127\.0\.0\.1|0\.0\.0\.0)([:/]|\s*$)")
body_tags = {"description", "encoded", "content", "summary"}


def check_xml(path):
    try:
        root = ET.parse(path).getroot()
    except ET.ParseError as e:
        errors.append(f"{path.relative_to(public)} is not well-formed XML: {e}")
        return
    for el in root.iter():
        tag = el.tag.rsplit("}", 1)[-1]
        if tag in body_tags:
            continue
        if el.text and local.match(el.text):
            errors.append(f"{path.relative_to(public)} <{tag}> is a localhost URL: {el.text.strip()}")
        for k, v in el.attrib.items():
            if local.match(v):
                errors.append(f"{path.relative_to(public)} <{tag} {k}> is a localhost URL: {v}")


for path in sorted(public.rglob("*.xml")):
    check_xml(path)

# Page chrome only (canonical, og:url, feed links); post bodies may mention localhost.
head_tag = re.compile(r"<(?:link|meta)\b[^>]*>", re.I)
attr_url = re.compile(r"""\b(?:href|content)=["']([^"']*)["']""", re.I)
for name in ("index.html",):
    path = public / name
    if not path.is_file():
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    for tag in head_tag.findall(text):
        for url in attr_url.findall(tag):
            if local.match(url):
                errors.append(f"{name} {tag[:80]} is a localhost URL")

if errors:
    print("NOT a production build:", file=sys.stderr)
    for e in errors:
        print(f"  - {e}", file=sys.stderr)
    sys.exit(1)
print(f"ok: {public} is a production build for {base}")
