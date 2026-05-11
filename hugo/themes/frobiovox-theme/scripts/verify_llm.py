"""Verify LLM-friendly outputs in exampleSite/public."""
import json
import os
import re
import sys

PUB = "exampleSite/public"
REQUIRED = ["llms.txt", "llms-full.txt", "about/index.md", "posts/index.md"]


def fail(msg):
    sys.exit(f"FAIL: {msg}")


missing = [p for p in REQUIRED if not os.path.exists(os.path.join(PUB, p))]
if missing:
    fail("missing: " + ", ".join(missing))
print("OK: site-level + section markdown companions present")

post_md = None
for root, _, files in os.walk(os.path.join(PUB, "posts")):
    if "index.md" in files and root != os.path.join(PUB, "posts"):
        post_md = os.path.join(root, "index.md")
        break
if not post_md:
    fail("no per-post index.md found")
print(f"OK: per-post markdown companion: {post_md}")

post_html = post_md.replace("index.md", "index.html")
html = open(post_html).read()
m = re.search(
    r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html, re.S
)
if not m:
    fail(f"no JSON-LD in {post_html}")
obj = json.loads(m.group(1))
if not isinstance(obj, dict):
    fail(f"JSON-LD parsed as {type(obj).__name__}, expected dict")
print(f"OK: JSON-LD is object, @type={obj.get('@type', '?')}, keys={','.join(obj.keys())}")

if 'rel="alternate" type="text/markdown"' not in html:
    fail("missing rel=alternate markdown link")
print("OK: rel=alternate markdown link present")

home = open(os.path.join(PUB, "index.html")).read()
m = re.search(
    r'<script type="application/ld\+json">\s*(.*?)\s*</script>', home, re.S
)
if not m:
    fail("no JSON-LD on home")
hobj = json.loads(m.group(1))
print(f"OK: home JSON-LD @type={hobj.get('@type', '?')}")
print("All checks passed.")
