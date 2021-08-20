---
id: ignore
title: Ignoring Code
---

Prettier offers an escape hatch to ignore a block of code or prevent entire files from being formatted.

## Ignoring Files

To exclude files from formatting, add entries to a `.prettierignore` file in the project root or set the `--ignore-path` [CLI](cli.md) option.

## JavaScript

A JavaScript comment of `// prettier-ignore` will exclude the next node in the abstract syntax tree from formatting.

For example:

<!-- prettier-ignore -->
```js
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

will be transformed to:

```js
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

## JSX

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

## CSS

```css
/* prettier-ignore */
.my    ugly rule
{

}
```

## Markdown

```markdown
<!-- prettier-ignore -->
Do   not    format   this
```
