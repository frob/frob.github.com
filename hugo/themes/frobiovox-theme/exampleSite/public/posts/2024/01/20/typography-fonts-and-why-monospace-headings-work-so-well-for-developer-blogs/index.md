# Typography, Fonts, and Why Monospace Headings Work So Well for Developer Blogs

| key | value |
| --- | --- |
| url | http://localhost:1313/posts/2024/01/20/typography-fonts-and-why-monospace-headings-work-so-well-for-developer-blogs/ |
| date | 2024-01-20 |


Here's another post to show how multiple posts look in the theme.

The Frobiovox theme uses:
- VT323 font for the site name and navigation
- Cutive Mono for headings
- Raleway for body text

> This is a blockquote example showing the styling with a gray left border.

## Why Monospace for Headings?

Monospace fonts carry a strong association with terminals, editors, and technical precision. Using one for headings on a developer blog signals intent — this is a place where code is taken seriously. The fixed character width also gives headings a calm, grid-like rhythm that pairs well with variable-width body text.

## A CSS Example

Here's the font stack the theme uses for headings, with a few fallbacks:

```css
/* Headings: Cutive Mono gives a typewriter feel that pairs well with technical content and inline code snippets */
h1, h2, h3, h4, h5, h6 {
    font-family: "Cutive Mono", "Courier New", Courier, monospace;
    font-weight: bold;
    line-height: 1.4;
    margin: 0 0 0.5em 0;
    color: #222;
}

/* Site name in the masthead uses VT323 for a retro terminal aesthetic at large display sizes */
.site-name {
    font-family: "VT323", "Courier New", Courier, monospace;
    font-size: 32px;
    letter-spacing: 1px;
    line-height: 0.6em;
    margin: 0;
    color: #333;
    cursor: pointer;
}

/* Navigation links also use VT323 to stay visually consistent with the site name in the masthead */
.navigation-menu-link {
    font-family: "VT323", "Courier New", Courier, monospace;
    font-size: 18px;
    letter-spacing: 1px;
    color: #fff;
    text-decoration: none;
    padding: 0.25em 1.25em;
    display: inline-block;
    transition: background-color 0.15s ease;
}
```

And the Google Fonts import that pulls them all in with `display=swap` to avoid invisible text during load:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Raleway:ital,wght@0,300;0,400;0,600;1,400&family=VT323&display=swap" rel="stylesheet">
```

