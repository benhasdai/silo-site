# SILO Site

This repository owns SILO's public customer website. The customer-brand master
belongs to the separate `silo-marketing` repository.

## Sources of truth

- `../silo-marketing/brand` owns customer-brand tokens and canonical small assets.
- The public Google Sheet owns menu items, prices, packages, and site notes.
- Generated content snapshots and brand copies are fallbacks and build inputs,
  not editing targets.

## Working rules

- Do not edit `src/styles/tokens.css` or generated brand assets directly.
- Never infer prices, dietary flags, allergens, opening hours, or reviews.
- Customer-visible design, copy, or brand changes require Ben's approval.
- Keep private staff and operational data out of this public repository.
- Deploy only through the documented GitHub Pages workflow and only when the
  task explicitly includes publication.

## Verification

- Run `npm run build` before declaring a change complete.
- Verify generated brand provenance and the public routes affected by the change.

