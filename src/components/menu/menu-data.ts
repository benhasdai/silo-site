// Task 11 — locked ordering for the menu page. Labels are locale-aware (R9
// i18n) — pulled from src/i18n/ui-strings.ts by id, never hardcoded here.
// Data itself comes from src/lib/content.ts (task 13's snapshot) — never hardcode items here.
import type { AllergenCode, MenuCategory, MenuTab } from '../../lib/content';
import { UI } from '../../i18n/ui-strings';
import { DEFAULT_LOCALE } from '../../i18n/locales';
import type { Locale } from '../../i18n/locales';

export type MenuIconName = AllergenCode | 'vegan' | 'gluten_free' | 'wine';

export interface TabDef {
  id: MenuTab;
  label: string;
}

/** Locked tab structure — PRD §3 (Menu) + user checkpoint 2026-07-10:
    cocktails + wine as separate tabs beside business/brunch. */
export function getTabs(locale: Locale = DEFAULT_LOCALE): TabDef[] {
  const t = UI[locale].menu.tabs;
  return [
    { id: 'restaurant', label: t.restaurant },
    { id: 'business', label: t.business },
    { id: 'brunch', label: t.brunch },
    { id: 'cocktails', label: t.cocktails },
    { id: 'wine', label: t.wine },
    { id: 'desserts', label: t.desserts },
  ];
}

/** Locked restaurant-tab category order — PRD §3. */
export function getCategories(locale: Locale = DEFAULT_LOCALE): { id: MenuCategory; label: string }[] {
  const c = UI[locale].menu.categories;
  return [
    { id: 'starters', label: c.starters },
    { id: 'salads', label: c.salads },
    { id: 'pizzas', label: c.pizzas },
    { id: 'pastas', label: c.pastas },
    { id: 'mains', label: c.mains },
    { id: 'cocktails', label: c.cocktails },
    { id: 'wine', label: c.wine },
    { id: 'wine_glass', label: c.wine_glass },
    { id: 'alcohol', label: c.alcohol },
  ];
}

/** Aria-labels for per-item allergen icons (icons, never text — brief §5). */
export function getAllergenLabels(locale: Locale = DEFAULT_LOCALE): Record<AllergenCode, string> {
  return UI[locale].menu.allergens;
}

/** Legend entries — user ruling (R3): only vegan + gluten-free are marked on the menu. */
export function getLegend(locale: Locale = DEFAULT_LOCALE): { icon: MenuIconName; label: string }[] {
  const l = UI[locale].menu.legend;
  return [
    { icon: 'vegan', label: l.vegan },
    { icon: 'gluten_free', label: l.gluten_free },
  ];
}
