#!/usr/bin/env node
// SILO — table-QR generator (task 17-assets-media, owned file).
//
// Generates the table QR codes for the three menu entry points named in the
// brief (§5, §10) and PRD (§6): the QR on a physical table must jump straight
// to the *menu*, in the guest's language — never to the homepage, and never
// through the (ugly, default) Google Translate widget.
//
//   node scripts/make-qr.mjs
//
// Output: SVG files written to tasks/23-launch/qr/ inside this project (fixed
// 2026-07-22 — used to resolve one level above the site folder, which was
// correct only while the site lived nested under a separate vault root; the
// project is self-contained now) — resolved relative to this file's own
// location so it works from any cwd. A short qr-manifest.md is written
// alongside them for whoever sends the batch to print.
//
// ---------------------------------------------------------------------------
// DEPENDENCY NOTE (please read before "fixing" an import error):
// This script needs the `qrcode` npm package (https://npmjs.com/package/qrcode).
// contracts.md freezes package.json for task 20-integration only, so task 17
// cannot add it as a devDependency itself. Until task 20 adds it —
//     npm install -D qrcode
// — run this once with a throwaway local install instead of editing
// package.json, e.g.:
//     npm install --no-save qrcode && node scripts/make-qr.mjs
// (the files this produces do not change based on how `qrcode` got resolved).
// See MEDIA.md §3 for the exact commands used to generate the first batch.
// ---------------------------------------------------------------------------

import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Single source of truth for the translate.goog proxy URLs (task 15). Node
// ≥22.6 (default from Node 23.6 / used here on Node 24) strips TypeScript
// types on the fly, so this plain `import` of a .ts file works without a
// build step. If it ever breaks on an older Node, the fallback constants
// below (kept in sync by hand) are used instead — see the try/catch.
let TRANSLATE_EN, TRANSLATE_RU;
try {
  ({ TRANSLATE_EN, TRANSLATE_RU } = await import('../src/lib/links.ts'));
} catch {
  const TRANSLATE_BASE = 'https://silo-co-il.translate.goog';
  TRANSLATE_EN = (p = '/menu') => `${TRANSLATE_BASE}${p}?_x_tr_sl=iw&_x_tr_tl=en&_x_tr_hl=en`;
  TRANSLATE_RU = (p = '/menu') => `${TRANSLATE_BASE}${p}?_x_tr_sl=iw&_x_tr_tl=ru&_x_tr_hl=ru`;
}

// Production origin (silo.co.il — brief §1, self-owned domain). Update here
// if the launch domain ever changes; nothing else in this script needs to.
const SITE_ORIGIN = 'https://silo.co.il';

const HERE = path.dirname(fileURLToPath(import.meta.url)); // .../silo-site/scripts
const SITE_ROOT = path.dirname(HERE); // .../silo-site
const OUTPUT_DIR = path.join(SITE_ROOT, 'tasks', '23-launch', 'qr');

// Palette tokens (tokens.css) — the ONLY colors used for QR modules.
const NAVY = '#1A303A';
const CREAM = '#FFFAED';
const RED = '#CD242F';

// QR options shared by every code: high error-correction so a laminated,
// slightly scratched table card still scans; a real quiet zone (margin, in
// modules) so print bleed/lamination edge never eats into the code.
const BASE_OPTS = {
  errorCorrectionLevel: 'H',
  type: 'svg',
  margin: 4,
  width: 480,
};

/** dark-on-light module color, iron rule: NEVER invert (light modules on a
 *  dark field) — that reads as "broken" to most phone scanners regardless
 *  of which two palette colors are used. */
const VARIANTS = {
  standard: { dark: `${NAVY}FF`, light: `${CREAM}FF`, note: 'navy-on-cream — default, highest scan reliability (13.2:1 contrast, verified in DESIGN.md)' },
  brand: { dark: `${RED}FF`, light: `${CREAM}FF`, note: 'red-on-cream — on-brand accent variant. Lower contrast than navy; PHYSICALLY TEST-SCAN a printed sample (several phones, table lighting, after lamination) before ordering the full print run. If any scan is flaky, ship navy-on-cream instead — do not ship a variant that failed a test scan.' },
};

const TARGETS = [
  {
    slug: 'menu-he',
    label: 'תפריט — עברית (ישיר)',
    url: `${SITE_ORIGIN}/menu`,
  },
  {
    slug: 'menu-en',
    label: 'Menu — English (Google Translate proxy)',
    url: TRANSLATE_EN('/menu'),
  },
  {
    slug: 'menu-ru',
    label: 'Меню — русский (Google Translate proxy)',
    url: TRANSLATE_RU('/menu'),
  },
];

function withMetadata(svg, title, desc) {
  return svg.replace(
    /<svg([^>]*)>/,
    `<svg$1><title>${escapeXml(title)}</title><desc>${escapeXml(desc)}</desc>`
  );
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const manifestRows = [];

  for (const target of TARGETS) {
    for (const [variantName, variant] of Object.entries(VARIANTS)) {
      const filename = variantName === 'standard' ? `${target.slug}.svg` : `${target.slug}-brand-red.svg`;
      const svg = await QRCode.toString(target.url, {
        ...BASE_OPTS,
        color: { dark: variant.dark, light: variant.light },
      });
      const titled = withMetadata(
        svg,
        `SILO — ${target.label}`,
        `${target.url} — ${variant.note}`
      );
      await writeFile(path.join(OUTPUT_DIR, filename), titled, 'utf8');
      manifestRows.push({ filename, label: target.label, url: target.url, variant: variantName, note: variant.note });
      console.log(`wrote ${filename}`);
    }
  }

  const manifest = [
    '# QR manifest — generated by scripts/make-qr.mjs',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '**Print rule:** default to the `*.svg` (navy-on-cream) files for table cards —',
    'verified highest contrast/scan reliability. Only use a `*-brand-red.svg` file',
    'after a physical test scan of a printed sample passes on multiple phones.',
    'Never use an inverted (light-on-dark) rendering — it fails most scanners',
    'outright regardless of which two palette colors are chosen.',
    '',
    '| file | destination | content | variant | note |',
    '|---|---|---|---|---|',
    ...manifestRows.map(
      (r) => `| \`${r.filename}\` | ${r.label} | ${r.url} | ${r.variant} | ${r.note} |`
    ),
  ].join('\n');
  await writeFile(path.join(OUTPUT_DIR, 'qr-manifest.md'), manifest + '\n', 'utf8');
  console.log(`\nDone. ${manifestRows.length} SVGs + qr-manifest.md → ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
