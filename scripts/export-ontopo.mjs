// Export a menu tab from the "תפריט SILO" Google Sheet to Ontopo's menu CSV.
//
// Ontopo's format (per their sample, "תפריט ערב 6.7.2026-menu.he.csv"):
//   row 1: 0,1,2,3,4,5,6,7
//   row 2: שם התפריט,תיאור תפריט,שם קטגוריה,תיאור,שם הפריט,תיאור,מחיר,מחיר תצוגה
//   then one row per node of the hierarchy — menu name (col 0), category
//   (col 2), item (cols 4/5/6, col 7 = optional display price).
//
// Usage (from silo-site/):
//   node scripts/export-ontopo.mjs                        # restaurant tab → "תפריט ערב"
//   node scripts/export-ontopo.mjs brunch "תפריט בראנץ׳"  # any tab + menu title
// Output: ontopo-<tab>.he.csv in the current directory.
//
// Data source: the live sheet (same fetch as the site build). Rules:
//   visible=TRUE only · price>0 shown, otherwise empty (package-choice items)
//   unit2 (e.g. wine glass/bottle) → "מחיר תצוגה" as "<unit2_label> <unit2_price> ₪".

import { writeFileSync } from 'node:fs';

const SHEET_ID = '1EeU1AeMdurPK0h_fSVBP8GzfvoxRryl52Y8AfPiBtpo';
const TAB = process.argv[2] || 'restaurant';
const MENU_TITLES = {
  restaurant: 'תפריט ערב', business: 'עסקיות צהריים', brunch: 'בראנץ׳ שישי',
  cocktails: 'בר', wine: 'יין', desserts: 'קינוחים',
};
const TITLE = process.argv[3] || MENU_TITLES[TAB] || TAB;

// Same closed vocabularies + Hebrew labels as the site (src/i18n/ui-strings.ts).
const CATEGORY_ORDER = ['starters','salads','pizzas','pastas','mains','desserts','cocktails','wine','wine_glass','alcohol'];
const CATEGORY_HE = {
  starters:'ראשונות', salads:'סלטים', pizzas:'פיצות', pastas:'פסטות', mains:'עיקריות',
  desserts:'קינוחים', cocktails:'קוקטיילים', wine:'יין', wine_glass:'יין במזיגה', alcohol:'אלכוהול',
};

function parseCsv(text) {
  const rows = [[]]; let f = '', q = false;
  const push = () => { rows[rows.length - 1].push(f); f = ''; };
  const clean = text.replace(/^﻿/, '');
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (q) { if (c === '"') { if (clean[i+1] === '"') { f += '"'; i++; } else q = false; } else f += c; continue; }
    if (c === '"') q = true;
    else if (c === ',') push();
    else if (c === '\n') { push(); rows.push([]); }
    else if (c !== '\r') f += c;
  }
  push();
  if (rows[rows.length-1].length === 1 && rows[rows.length-1][0] === '') rows.pop();
  return rows;
}

const res = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=menu_items`);
if (!res.ok) { console.error(`sheet fetch failed: ${res.status}`); process.exit(1); }
const rows = parseCsv(await res.text());
const headers = rows[0].map(h => h.trim());
const items = rows.slice(1).map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])));

const picked = items
  .filter(r => r.tab === TAB && r.visible.toLowerCase() === 'true' && r.name_he)
  .sort((a, b) =>
    CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
    (Number(a.sort) || 0) - (Number(b.sort) || 0));

if (!picked.length) { console.error(`no visible items for tab "${TAB}"`); process.exit(1); }

const esc = v => /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
const line = cols => cols.map(esc).join(',');

const out = [];
out.push('0,1,2,3,4,5,6,7');
out.push(line(['שם התפריט','תיאור תפריט','שם קטגוריה','תיאור','שם הפריט','תיאור','מחיר','מחיר תצוגה']));
out.push(line([TITLE,'','','','','','','']));
let cat = null;
for (const r of picked) {
  if (r.category !== cat) {
    cat = r.category;
    out.push(line(['','', CATEGORY_HE[cat] || cat,'','','','','']));
  }
  const price = Number(r.price) > 0 ? r.price : '';
  const display = r.unit2_label && Number(r.unit2_price) > 0 ? `${r.unit2_label} ${r.unit2_price} ₪` : '';
  out.push(line(['','','','', r.name_he, r.desc_he, price, display]));
}

const file = `ontopo-${TAB}.he.csv`;
writeFileSync(file, '﻿' + out.join('\n') + '\n');
console.log(`wrote ${file}: ${picked.length} items, menu "${TITLE}"`);
