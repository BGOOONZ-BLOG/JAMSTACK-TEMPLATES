---
title: Features
weight: 2
seo:
  title: Features
  description: This is the features page
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Features
      keyName: property
    - name: 'og:description'
      value: This is the features page
      keyName: property
    - name: 'twitter:card'
      value: summary
    - name: 'twitter:title'
      value: Features
    - name: 'twitter:description'
      value: This is the features page
layout: docs
---

<div class="note">
  <strong>Note:</strong> This is the demo content for demonstration purpose only. The primary function of this content is to show you what this theme can do. There is a more detailed explanation in the <strong>Getting Started</strong> section.
</div>

## Code Blocks

Blocks of code are either fenced by `lines with three back-ticks`, or are indented with four spaces.

<pre>
```
body {
  background: #fff;
  color: #666;
  line-height: 1.66667; }

a {
  color: #d4a259;
  text-decoration: underline;
  -webkit-transition: background .3s ease, color .3s ease;
  transition: background .3s ease, color .3s ease; }

a:hover {
  color: #1d1d1d;
  text-decoration: none; }
```
</pre>

The rendered output looks like this:

```
body {
  background: #fff;
  color: #666;
  line-height: 1.66667; }

a {
  color: #d4a259;
  text-decoration: underline;
  -webkit-transition: background .3s ease, color .3s ease;
  transition: background .3s ease, color .3s ease; }

a:hover {
  color: #1d1d1d;
  text-decoration: none; }
```

## Callouts

There are two types of callouts available in this theme, **important** and **note**.

<div class="important">
  <strong>Important:</strong> 
  This is an "Important" callout block of text. 
  This block indicates a warning or caution.
  Use it for an important message. 
</div>

<div class="note">
  <strong>Note:</strong> 
  This is a "Note" callout block of text. 
  This block signifies a general note or tip.
</div>

## Tables

You can build tables with markdown to help you organize information. To add a table, use three or more hyphens (---) to create each column’s header, and use pipes (|) to separate each column like in the example below.

| Name | Required | Type | Description |
| ---- | --- | --- | --- |
| type | Required | `enum` | The type of the model. Must be one of - `page`, `config`, `data`, `object` |
| label | Required | `string` | The label of the model |
| description | | `string` | Description of the model. Used by some CMS. |
| fields | | `list` of `objects` | List of Field Models |

## Start using Libris theme

We’ve packed this theme with powerful features to help you have awesome documentation for your current or next project.

<br>

**Why not start using this theme today?**

<a href="https://www.stackbit.com/" class="button">Join Stackbit</a>
