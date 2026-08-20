// R9 i18n — locale registry (Astro static routing: he unprefixed default, en/ru prefixed).
// Owner ruling 2026-07-13: Hebrew (default) + English + Russian only, machine-translated,
// real /en/… /ru/… routes (never translate.goog).

export type Locale = 'he' | 'en' | 'ru';

export const LOCALES: Locale[] = ['he', 'en', 'ru'];
export const DEFAULT_LOCALE: Locale = 'he';

const RTL_LOCALES: Locale[] = ['he'];

export function dirFor(locale: Locale): 'rtl' | 'ltr' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
}

/** Strips a leading /en or /ru segment AND any trailing slash (Astro emits
 *  "/en/menu/" for static directory routes; the rest of the site links
 *  without a trailing slash — e.g. href="/menu") — returning the bare
 *  (Hebrew-shape) path. */
export function stripLocale(pathname: string): string {
  const noLocale = pathname.replace(/^\/(en|ru)(?=\/|$)/, '');
  const noTrailingSlash = noLocale.length > 1 ? noLocale.replace(/\/+$/, '') : noLocale;
  return noTrailingSlash === '' ? '/' : noTrailingSlash;
}

/** Builds the equivalent path in `locale` from any current pathname. */
export function localizedPath(pathname: string, locale: Locale): string {
  const bare = stripLocale(pathname);
  if (locale === DEFAULT_LOCALE) return bare;
  return bare === '/' ? `/${locale}` : `/${locale}${bare}`;
}

export function localeFromPath(pathname: string): Locale {
  const m = pathname.match(/^\/(en|ru)(?:\/|$)/);
  return (m?.[1] as Locale) ?? DEFAULT_LOCALE;
}

/** Pages with a real translated build — the switcher/nav/hreflang only offer
 *  EN/RU where a destination actually exists. R9 completed the whole site. */
export const TRANSLATED_BASE_PATHS = new Set<string>([
  '/',
  '/menu',
  '/events',
  '/club',
  '/giftcard',
  '/accessibility',
  '/404',
]);

export function hasTranslation(barePath: string): boolean {
  return TRANSLATED_BASE_PATHS.has(barePath);
}
