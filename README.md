# [snehangsude.github.io](https://snehangsude.github.io/)

Personal portfolio — Snehangsu De, Senior Data Engineer & Architect.
View it live using the link above 👆

## Stack

Static multi-page site, no framework. Three self-contained pages
(`index.html`, `projects.html`, `writings.html`), each with inline styles
and an inline component script run by `public/support.js` (a tiny DCLogic
runtime: it hoists `<helmet>` into `<head>`, mounts the page component, and
wires the anti-spam email link). Vite bundles the pages for GitHub Pages.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # outputs dist/
npm run preview  # serve the built dist/
```

`public/` is copied to the dist root as-is, so `public/support.js` →
`/support.js` and `public/static/*` → `/static/*`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.
