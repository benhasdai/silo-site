# SILO Site

This repository owns SILO's public customer website. The customer-brand master
belongs to the separate `silo-marketing` repository.

## Sources of truth

- `../silo-marketing/brand` owns customer-brand tokens and canonical small assets.
- The public Google Sheet owns menu items, prices, packages, and site notes.
- Generated content snapshots and brand copies are fallbacks and build inputs,
  not editing targets.
- A cloud checkout is intentionally self-contained. It validates the committed
  content snapshot and brand publication record without requiring sibling folders,
  secrets, or live network access.

## Working rules

- Do not edit `src/styles/tokens.css` or generated brand assets directly.
- Never infer prices, dietary flags, allergens, opening hours, or reviews.
- Customer-visible design, copy, or brand changes require Ben's approval.
- Keep private staff and operational data out of this public repository.
- Do not force-push or publish directly from a local or Codex cloud task.
  Production publication is a separate, explicitly authorized action through
  the reviewed GitHub Pages workflow.
- Do not fetch or edit the sibling brand repository from a site-only cloud task.

## Verification

- Use Node.js 24.
- Run `npm run verify` before declaring a code change complete.
- `npm run verify` must remain offline and reproducible from a clean checkout.
- For an explicitly authorized production-content refresh, `npm run build` may
  use the public Sheet through `SHEET_ID`; ordinary code verification must not.

## Completion

- When the next in-scope action is unambiguous, complete it in the same task.
- A status question or correction does not pause the standing task; answer it
  briefly and continue.
- Do not stop merely to report that an artifact is stale or needs an obvious
  update. Stop only when the outcome is complete or progress needs an owner
  decision, new authority, blocked access, or an irreversible action.
