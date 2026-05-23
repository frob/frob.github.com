# Diagrams with Mermaid

| key | value |
| --- | --- |
| url | http://localhost:1313/posts/2026/05/23/diagrams-with-mermaid/ |
| date | 2026-05-23 |
| category | Tooling |
| tags | mermaid, diagrams, tutorial |
| description | How to drop a diagram into a post without leaving Markdown. |


Most of the diagrams I want in a blog post are small — a flow, a sequence, the shape of a state machine. Reaching for Figma or draw.io for these is overkill. Mermaid lets me write them in the same fenced code blocks I already use for code.

## Flowchart

The publish path for a post in this repo:

```mermaid
flowchart LR
    Draft[Draft in Markdown] --> Commit[git commit]
    Commit --> Build[task build]
    Build --> Backstop{Backstop diff?}
    Backstop -- clean --> Deploy[Deploy]
    Backstop -- regression --> Fix[Fix and re-run]
    Fix --> Build
```

## Sequence

A request through the dev stack:

```mermaid
sequenceDiagram
    participant Browser
    participant Hugo
    participant Vite
    Browser->>Hugo: GET /posts/diagrams-with-mermaid/
    Hugo->>Hugo: render Markdown
    Hugo-->>Browser: HTML + <pre class="mermaid">
    Browser->>Vite: GET /js/mermaid.js
    Vite-->>Browser: ESM bundle (lazy chunks)
    Browser->>Browser: mermaid.run() → SVG
```

## State

The tiny state machine inside the codeblock render hook:

```mermaid
stateDiagram-v2
    [*] --> NoDiagram
    NoDiagram --> HasDiagram: fence with lang=mermaid
    HasDiagram --> HasDiagram: more fences
    HasDiagram --> [*]: page emits, script tag included
    NoDiagram --> [*]: page emits, no script tag
```

That's it — three diagrams, zero JavaScript written by hand, and the Mermaid runtime is only loaded on pages (like this one) that actually need it.

