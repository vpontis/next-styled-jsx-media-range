# Next.js styled-jsx Media Query Issue Reproduction

Minimal reproduction for styled-jsx media query issue with Lightning CSS.

## Setup

```bash
bun install
bun dev
```

Open http://localhost:3000 and inspect the compiled CSS output.

## Issue

When using styled-jsx with Lightning CSS (`useLightningcss: true` in next.config.mjs), media queries are being compiled to modern range syntax that's not supported by the browsers specified in browserslist.

## Configuration

- Next.js with styled-jsx
- Lightning CSS enabled via `compiler.styledJsx.useLightningcss: true`
- Browserslist: `chrome 64, edge 79, firefox 67, opera 51, safari 12`

## The Problem

When you load the page, the compiled CSS shows:

```css
@media (width<=400px) {
  .media-query-test.jsx-535b236771676c9 {
    color: red;
  }
}
```

However, media query range syntax (`width<=400px`) is **not supported in Safari until version 16.4**. Safari 12 (specified in browserslist) doesn't support this syntax.

## Expected Behavior

Lightning CSS should respect the browserslist configuration and compile:

```css
@media (max-width: 400px);
```

Instead of the modern range syntax that breaks in Safari 12-15.

## Actual Behavior

Lightning CSS is outputting modern range syntax despite the browserslist specifying Safari 12, causing the media query to fail in older Safari versions.
