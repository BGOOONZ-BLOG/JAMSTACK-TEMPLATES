---
title: "Copying Linked Files and Intercepting Local Links"
date: "2017-03-21"
draft: false
author: Daisy Buchanan
tags:
  - remark
  - linked files
  - local links
---

![](denys-nevozhai-184452.jpg) _Photo by
[Denys Nevozhai](https://unsplash.com/@dnevozhai) via
[Unsplash](https://unsplash.com/@dnevozhai?photo=DlnK1KOREds)_

## Copying Linked Files

[gatsby-remark-copy-linked-files][1] copies files linked to from Markdown to
your `public` folder.

Let's try with a PDF, that you should be able to preview and/or download by
clicking this link:
[Creative Commons Informational Flyer.pdf](Creativecommons-informational-flyer_eng.pdf)

## Intercepting Local Links

[gatsby-plugin-catch-links][2] intercepts local links from Markdown and other
non-react pages and does a client-side `pushState` to avoid the browser having
to refresh the page.

Let's try linking to the
"[Code and Syntax Highlighting with PrismJS](/code-and-syntax-highlighting/)"
article using a relative path.

Also, let's link to "[Rendering math equations with KaTeX](https://using-remark.gatsbyjs.org/katex/)" article using an absolute path.

And this [link will be excluded](/excluded-link).

[1]: https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/
[2]: https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/
