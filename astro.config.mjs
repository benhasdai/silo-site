import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://silo.co.il',
  output: 'static',
  devToolbar: { enabled: false },
  // R9 i18n (owner ruling 2026-07-13): he default unprefixed, en/ru real
  // prefixed routes (never translate.goog). Page files under src/pages/en/**
  // and src/pages/ru/** provide the actual translated builds.
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en', 'ru'],
    routing: { prefixDefaultLocale: false },
  },
});
