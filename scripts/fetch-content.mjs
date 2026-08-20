// Build-time content snapshot fetcher.
// Contract: NEVER break the build.
//   - No SHEET_ID → keep the bundled fixture, exit 0.
//   - Fetch/parse failure of any kind → log a warning, keep the existing snapshot, exit 0.
//   - Success → overwrite src/data/content-snapshot.json with the freshly normalized data.
//
// Mirrors the parse/normalize logic in netlify/functions/content.mts (duplicated rather
// than shared, since this runs as a plain Node script at build time while the function
// is bundled separately by Netlify — different runtimes, same contract).

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = path.join(__dirname, '../src/data/content-snapshot.json');

const sheetId = process.env.SHEET_ID;

if (!sheetId) {
  console.log('[fetch-content] SHEET_ID not set — keeping bundled fixture snapshot.');
  process.exit(0);
}

const MENU_TABS = ['restaurant', 'business', 'brunch', 'cocktails', 'wine', 'desserts'];
const MENU_CATEGORIES = [
  'starters', 'salads', 'pizzas', 'pastas', 'mains',
  'desserts', 'cocktails', 'wine', 'wine_glass', 'alcohol',
];
const ALLERGEN_CODES = ['gluten', 'nuts', 'dairy', 'egg', 'fish', 'sesame'];
const TRUE_TOKENS = new Set(['true', '1', 'yes', 'כן', 'x', 'v']);
const FALSE_TOKENS = new Set(['false', '0', 'no', 'לא', '']);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const clean = text.replace(/^﻿/, ''); // strip BOM if present
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (inQuotes) {
      if (c === '"') {
        if (clean[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\r') {
      // ignore — \n ends the row
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
}

function csvToObjects(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length < 1) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = (r[idx] ?? '').trim();
    });
    return obj;
  });
}

function toBool(raw, fallback) {
  if (raw == null) return fallback;
  const v = raw.trim().toLowerCase();
  if (v === '') return fallback;
  if (TRUE_TOKENS.has(v)) return true;
  if (FALSE_TOKENS.has(v)) return false;
  return fallback;
}

function toNumber(raw) {
  if (raw == null || raw.trim() === '') return null;
  const n = Number(String(raw).replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function toAllergens(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => ALLERGEN_CODES.includes(s));
}

function normalizeMenuItems(rows) {
  const out = [];
  rows.forEach((r, idx) => {
    try {
      const id = (r.id ?? '').trim();
      const tab = (r.tab ?? '').trim();
      const category = (r.category ?? '').trim();
      const name_he = (r.name_he ?? '').trim();
      const price = toNumber(r.price);
      if (!id || !name_he) return;
      if (!MENU_TABS.includes(tab)) return;
      if (!MENU_CATEGORIES.includes(category)) return;
      if (price == null) return;

      const item = {
        id,
        tab,
        category,
        name_he,
        desc_he: (r.desc_he ?? '').trim(),
        price,
        vegan: toBool(r.vegan, false),
        gluten_free: toBool(r.gluten_free, false),
        allergens: toAllergens(r.allergens),
        visible: toBool(r.visible, true),
        sort: toNumber(r.sort) ?? idx * 10,
      };
      const unit2_label = (r.unit2_label ?? '').trim();
      const unit2_price = toNumber(r.unit2_price);
      if (unit2_label) item.unit2_label = unit2_label;
      if (unit2_price != null) item.unit2_price = unit2_price;
      const name_en = (r.name_en ?? '').trim();
      const desc_en = (r.desc_en ?? '').trim();
      if (name_en) item.name_en = name_en;
      if (desc_en) item.desc_en = desc_en;

      out.push(item);
    } catch {
      // malformed row — skip, never throw
    }
  });
  return out;
}

function normalizeEventsMenus(rows) {
  const out = [];
  rows.forEach((r, idx) => {
    try {
      const id = (r.id ?? '').trim();
      const package_name = (r.package_name ?? '').trim();
      const price_pp = toNumber(r.price_pp);
      if (!id || !package_name || price_pp == null) return;
      out.push({
        id,
        package_name,
        desc: (r.desc ?? '').trim(),
        price_pp,
        min_guests: toNumber(r.min_guests) ?? 0,
        items: (r.items ?? '').trim(),
        visible: toBool(r.visible, true),
        sort: toNumber(r.sort) ?? idx * 10,
      });
    } catch {
      // malformed row — skip, never throw
    }
  });
  return out;
}

function normalizeSiteNotes(rows) {
  const out = {};
  rows.forEach((r) => {
    try {
      const key = (r.key ?? '').trim();
      if (!key) return;
      out[key] = (r.text_he ?? '').trim();
    } catch {
      // malformed row — skip, never throw
    }
  });
  return out;
}

const GVIZ_TABS = ['menu_items', 'events_menus', 'site_notes'];

async function fetchTabCsv(sheetId, tab) {
  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
  const res = await fetch(url, { headers: { Accept: 'text/csv' } });
  if (!res.ok) {
    throw new Error(`gviz fetch failed for tab "${tab}": HTTP ${res.status}`);
  }
  return await res.text();
}

async function main() {
  const [menuCsv, eventsCsv, notesCsv] = await Promise.all(
    GVIZ_TABS.map((tab) => fetchTabCsv(sheetId, tab)),
  );

  const data = {
    menu_items: normalizeMenuItems(csvToObjects(menuCsv)),
    events_menus: normalizeEventsMenus(csvToObjects(eventsCsv)),
    site_notes: normalizeSiteNotes(csvToObjects(notesCsv)),
  };

  if (data.menu_items.length === 0) {
    // A totally empty menu is almost certainly a sheet-structure problem, not
    // an intentional "no items" state — keep the existing snapshot rather than
    // ship a blank menu.
    console.warn('[fetch-content] Fetched sheet produced zero valid menu_items — keeping existing snapshot.');
    process.exit(0);
  }

  const existing = readFileSync(SNAPSHOT_PATH, 'utf8');
  const nextJson = JSON.stringify(data, null, 2) + '\n';
  writeFileSync(SNAPSHOT_PATH, nextJson, 'utf8');
  console.log(
    `[fetch-content] Wrote fresh snapshot: ${data.menu_items.length} menu_items, ` +
    `${data.events_menus.length} events_menus, ${Object.keys(data.site_notes).length} site_notes ` +
    `(previous snapshot was ${existing.length} bytes).`,
  );
}

main().catch((err) => {
  console.warn('[fetch-content] Sheet fetch failed — keeping existing snapshot.', err?.message ?? err);
  process.exit(0);
});
