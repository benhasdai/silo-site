# SILO Site

Public Astro website for SILO Meditaliano, deployed to GitHub Pages.

## Sources

- Customer-brand master: `../silo-marketing/brand`.
- Menu, event packages, and site notes: the public SILO Google Sheet.
- Published website media: `public` and `src/assets`.

## Local development

```bash
npm ci
npm run dev
npm run build
```

Before a brand change reaches the site, run the marketing repository's
`node scripts/publish-brand.mjs`. The generated copy is verified during build.

