---
title: "Introducing they're here: a site assistant that runs in your visitor's browser"
date: "2026-10-31"
description: A proof of concept that replaces static-site search with a chat widget. It retrieves with Lunr and optionally lets Gemma write a cited answer on the visitor's own GPU. There's a live demo, and it needs no server and no inference API.
slug: introducing-theyre-here-a-site-assistant-that-runs-in-your-visitors-browser
tags:
    - ai
    - browsers
    - web development
    - open source
    - frontpage
draft: true
---

Search on a static site is a bad deal. You can ship a JSON index and a search box that does keyword matching, or you can bolt on a hosted service that wants a monthly fee and a copy of your content. Meanwhile every other site now has a chat box that answers questions in sentences.

The obvious fix is a chatbot, and the obvious chatbot needs a backend, an API key, and a bill that grows with traffic. That's the exact set of things I picked a static site to avoid. I wrote about [why I care about that](/posts/2026/10/13/who-benefits-from-the-ai-guardrails/) recently. So I wanted to know whether the model could run on the visitor's machine instead.

It can, mostly. [They're here](https://gitlab.com/frob/theyrehere) is a proof of concept, and there's a [live demo](https://frob.gitlab.io/theyrehere/) you can try right now. It's a drop-in widget that indexes your Markdown, answers questions with cited passages, and optionally has a local [Gemma](https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm) model write the answer. After the page loads, everything happens on the visitor's machine. There's no server and no third-party inference API.

## Three tags

The widget has no build step and no bundler. It's about 800 lines of vanilla JS:

```html
<link rel="stylesheet" href="assistant.css" />
<div id="llm-widget"></div>
<script src="assistant.js"></script>
```

It renders inline wherever the `div` is. I didn't want a floating button in the corner.

## How it works

1. **Index.** On load it fetches the Markdown sources listed in `content/manifest.json`, splits them by heading, and builds a [Lunr](https://lunrjs.com/) index. Fields are boosted: title x10, heading x5, tags and description x3, body x1.
2. **Retrieve.** A question runs a lexical search and returns the top four chunks. This works in any modern browser.
3. **Generate.** If you click **Load Gemma**, the widget downloads a model into the browser's OPFS and runs it over WebGPU. The retrieved chunks go into a RAG prompt and the answer streams back. Later visits skip the download.
4. **Cite.** Every answer lists its source passages, and each one links to the post at the cited heading. That holds for retrieval-only answers too.

I made the retrieval step stand on its own on purpose. A search that returns ranked, cited passages is useful with no model at all. Gemma only adds the prose on top. If WebGPU is missing, the Load Gemma button is hidden, so nobody downloads a 2 GB file they can't use.

There's also a **Stats for nerds** disclosure under the input. It shows the runtime, the GPU adapter, model load time, time to first token and tokens per second. I wanted to see the cost, not guess at it.

## Two runtimes, because browsers

Running an LLM in a browser means choosing a runtime, and the choice depends on the browser.

- **LiteRT-LM** is the primary path. It needs WebGPU and WebAssembly JSPI, so Chromium 137 or newer.
- **MediaPipe Tasks GenAI** is the fallback. It needs only WebGPU, which makes it the route for Firefox.

The widget checks for JSPI at load and picks one. Safari, and anything without WebGPU, gets retrieval only.

On Linux, Chromium still needs WebGPU switched on by hand: `--enable-unsafe-webgpu --use-vulkan`, plus `--ozone-platform=x11` on Wayland. Then check `chrome://gpu`. The README has the details, because that was the part that cost me an evening.

## Getting the model in

There are three ways to load it. The widget can stream it from Hugging Face. You can put the file next to the page and set `data-model-url`. Or you can click **Pick file** and select one from disk, which skips fetching and OPFS entirely. The default is Gemma 4 E2B. Pointing at E4B is a one-line change.

## What it isn't

It is a proof of concept, and the README says so at the top. The caveats, specifically:

- The first Gemma load is a download of about 2 GB. Most visitors won't want that for a blog search, so retrieval has to be good enough that the model is optional.
- The Firefox path is untested. MediaPipe's LLM API is in maintenance-only mode upstream, so I wouldn't build on it.
- A small local model will sometimes give a wrong answer. The citations are there so people can check, and you should expect to need them.
- The demo site is nine sample posts about WebGPU and on-device AI. That's easy retrieval. I haven't tried it on a messy real blog.

`SPEC.md` describes the shipping version: a Hugo module, BM25F retrieval, an optional precomputed index for bigger sites, and the MediaPipe fallback built in. None of that is implemented yet. The POC is where I'm finding out what the UI and the chunking should look like first.

To try it, open the [demo](https://frob.gitlab.io/theyrehere/). Ask it something, then click Load Gemma and ask again. The difference between the two answers is the whole experiment. If you'd rather run it yourself, `task run:poc` serves it on `localhost:8888`, or point `python3 -m http.server` at `poc/`. The demo is rebuilt from `poc/` on every push to the default branch, and there's nothing to build.
