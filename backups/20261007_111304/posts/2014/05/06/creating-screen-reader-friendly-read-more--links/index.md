# Creating screen-reader friendly read more  links

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2014/05/06/creating-screen-reader-friendly-read-more--links/ |
| date | 2014-05-06 |
| tags | tutorial, css, frontpage |


Over the course of my career I have worked on more than a fair share of higher-education sites. When dealing with a universities website there are many challenges. One of the biggest challenges is in dealing with the accessibility standards. I am writing about [WCAG](http://www.w3.org/TR/WCAG20/). The WCAG, or Web Content Accessibility Guidelines, is a detailed list for how accessibility should be done on the web.

I might write about the problems with WCAG at some point, but this article is about strictly an incompatibility between what the designer/UX people want and what the WCAG says about "READ MORE" links. [Specifically WCAG 2.0 SC 2.4.4](http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html). This states that any link needs to have context.

The issue with this is even though the standard says:

<q>A Web page contains a collection of news articles. The main page lists the first few sentences of each article, followed by a "Read more" link. A screen reader command to read the current paragraph provides the context to interpret the purpose of the link.</q>

This is incorrect. A screen reader will list all the links on a page. If two links have the same text but go to different places it will get confused because there could be 20 or more links that all go to different places but still say "Read More."

My solution? Use css to hide the full title text (or better yet something more relevant, however, content editors usually cannot be bothered) for the read more link and use more css to show Read More in its place.

```scss
.read-more {
  font-size: 0;

  &:after {
    text-transform: uppercase;
    font-size: 11px;
    content: "READ MORE";
  }

  &:hover:after {
    background-color: $blue;
  }
}
```

So here (example is in scss) you can see that we are using a simple technique, borrowed from image replacements to make the text invisible but still seen by screen readers to hide the text. After that, we just replace it with the after pseudo selector ```:after``` to show whatever text we want to display for "READ MORE."

## What about multilingual sites?!?!

Just add a body class for each language and then adjust the content rule accordingly.

```css
.en .read-more:after {
  content: "READ MORE";
}

.es .read-more:after {
  content: "leer más";
}

.cn .read-more:after {
  content: "阅读更多";
}

.klingon .read-more:after {
  content: "latlh laD";
}
```

Thanks to [Google Translator](https://translate.google.com/) for the Spanish and Simplified Chinese translations. Thanks to [Bing translator for the Klingon](https://www.bing.com/translator/).

The technique is simple: hide the real link text with ```font-size: 0```, replace it visually with a ```:after``` pseudo element, and let screen readers see the original accessible text. It is a small amount of CSS that makes a real difference for users who navigate by link list. If your site has "Read More" links, this is worth the five minutes it takes to implement.

