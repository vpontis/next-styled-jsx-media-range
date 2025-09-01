# Next.js styled-jsx Media Query Issue Reproduction

Minimal reproduction for styled-jsx media query issue with Lightning CSS.

## Setup

```bash
bun install
bun dev
```

## Issue

When using styled-jsx with Lightning CSS (`useLightningcss: true` in next.config.mjs), media queries are not being properly processed in the compiled CSS output.

## Configuration

- Next.js with styled-jsx
- Lightning CSS enabled via `compiler.styledJsx.useLightningcss: true`
- Browserslist: `chrome 64, edge 79, firefox 67, opera 51, safari 12`

## Expected Behavior

The `.media-query-test` element should:

- Be blue on desktop (default)
- Be red on mobile (max-width: 768px)

## Actual Behavior

The media query styles are not being applied correctly when Lightning CSS is enabled.
