import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const expected = [
  'index.html', '404.html', 'CNAME',
  'menu/index.html', 'events/index.html', 'club/index.html', 'giftcard/index.html',
  'accessibility/index.html', 'privacy/index.html',
  'en/index.html', 'en/404/index.html', 'en/menu/index.html', 'en/events/index.html',
  'en/club/index.html', 'en/giftcard/index.html', 'en/accessibility/index.html',
  'ru/index.html', 'ru/404/index.html', 'ru/menu/index.html', 'ru/events/index.html',
  'ru/club/index.html', 'ru/giftcard/index.html', 'ru/accessibility/index.html',
  'go/reserve/index.html', 'go/club/index.html', 'go/delivery/index.html', 'go/giftcard/index.html',
];

const problems = [];
for (const relative of expected) {
  const file = path.join(dist, relative);
  try {
    if (!statSync(file).isFile() || statSync(file).size === 0) problems.push(`${relative}: empty or not a file`);
  } catch {
    problems.push(`${relative}: missing`);
  }
}

const textExtensions = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt']);
const forbidden = [
  ['/Users/', 'local absolute path'],
  ['-----BEGIN PRIVATE KEY-----', 'private key'],
  ['-----BEGIN RSA PRIVATE KEY-----', 'private key'],
];
const keyPatterns = [
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'Google API key'],
  [/\bghp_[0-9A-Za-z]{36}\b/, 'GitHub token'],
  [/\bsk_live_[0-9A-Za-z]{16,}\b/, 'live payment key'],
];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const text = readFileSync(file, 'utf8');
    const relative = path.relative(dist, file);
    for (const [needle, label] of forbidden) if (text.includes(needle)) problems.push(`${relative}: contains ${label}`);
    for (const [pattern, label] of keyPatterns) if (pattern.test(text)) problems.push(`${relative}: contains possible ${label}`);
  }
}

walk(dist);

if (problems.length) throw new Error(`Static output validation failed:\n- ${problems.join('\n- ')}`);
console.log(`Static output verified: ${expected.length} required files and no local-path/key signatures`);
