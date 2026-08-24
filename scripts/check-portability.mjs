import { readFile } from 'node:fs/promises';

const proofreader = await readFile(new URL('./proofread-i18n.py', import.meta.url), 'utf8');
const forbidden = ['/.claude/', 'willow-vault', 'Path.home()', 'pbpaste'];

for (const marker of forbidden) {
  if (proofreader.includes(marker)) {
    throw new Error(`Translation proofreader contains a workstation-only dependency: ${marker}`);
  }
}

if (!proofreader.includes('GOOGLE_AI_API_KEY')) {
  throw new Error('Translation proofreader must use the explicit GOOGLE_AI_API_KEY interface.');
}

console.log('Portable translation-proofreader credential boundary verified');
