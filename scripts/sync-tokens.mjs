// Build-time design-tokens sync.
// Contract (mirrors fetch-content.mjs): NEVER break the build.
//   - Master (../../tokens.css, the vault's marketing/tokens.css) exists →
//     copy it into src/styles/tokens.css with a generated header.
//   - Master missing (CI, detached clone) → keep the committed copy, exit 0.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MASTER = path.join(__dirname, '../../tokens.css');
const DEST = path.join(__dirname, '../src/styles/tokens.css');

let master;
try {
  master = readFileSync(MASTER, 'utf8');
} catch {
  console.log('[sync-tokens] master not found (detached build) — keeping committed copy.');
  process.exit(0);
}

const header = `/* GENERATED COPY — do not edit. The single source of truth is the vault's
   marketing/tokens.css; this file is overwritten from it on every build
   (scripts/sync-tokens.mjs) and committed so detached builds work. */
`;
writeFileSync(DEST, header + master.replace(/^\/\*[\s\S]*?\*\/\s*/, ''));
console.log('[sync-tokens] copied master into src/styles/tokens.css');
