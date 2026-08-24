# SILO Site

Public Astro website for SILO Meditaliano, deployed to GitHub Pages.

## Sources

- Customer-brand master: `../silo-marketing/brand`.
- Menu, event packages, and site notes: the public SILO Google Sheet.
- Published website media: `public` and `src/assets`.

The repository also contains committed fallback inputs: a validated content
snapshot and a provenance-stamped brand copy. They make a single cloud checkout
buildable without the sibling marketing repository, credentials, or live network.

## Clean checkout

```bash
npm ci
npm run verify
```

`npm run verify` requires Node.js 24. It validates the runtime, committed content,
brand publication record, static build, and expected output routes. It does not
read the live Sheet, secrets, or sibling folders.

## Local development

```bash
npm run dev
```

`npm run build` is the production-content build. When `SHEET_ID` is present it
refreshes the snapshot from the public Sheet before validating and building; when
the variable is absent it keeps the committed fallback.

Brand changes begin in the separate marketing repository. This repository keeps
the generated tokens, logo assets, and `src/assets/brand-provenance.json` together;
ordinary site work must not edit them directly.

## Publication

Do not run `scripts/deploy.py`, force-push, or deploy from a local/Codex cloud
task. Publication happens only through the reviewed GitHub Pages workflow after
an explicitly authorized merge or dispatch.
