// Build-time content loader over the bundled snapshot (src/data/content-snapshot.json).
// Free to edit — the parallel-build "frozen files" gate (docs/contracts.md)
// no longer applies to this file (lifted 2026-07-23, owner confirmed; that
// build phase is long over). Routine content edits (prices, items, dietary
// flags) go directly in content-snapshot.json and never need to touch this
// file at all. The prior comment here also referenced a "live-refresh
// client" (src/scripts/live-prices.ts) — that file was deleted in the Pages
// migration; there is no live-refresh mechanism today.
import snapshot from '../data/content-snapshot.json';

export type MenuTab = 'restaurant' | 'business' | 'brunch' | 'cocktails' | 'wine' | 'desserts';
export type MenuCategory =
  | 'starters' | 'salads' | 'pizzas' | 'pastas' | 'mains'
  | 'desserts' | 'cocktails' | 'wine' | 'wine_glass' | 'alcohol';
export type AllergenCode = 'gluten' | 'nuts' | 'dairy' | 'egg' | 'fish' | 'sesame';

export interface MenuItem {
  id: string;
  tab: MenuTab;
  category: MenuCategory;
  name_he: string;
  desc_he: string;
  price: number;
  unit2_label?: string;
  unit2_price?: number;
  vegan: boolean;
  gluten_free: boolean;
  allergens: AllergenCode[];
  visible: boolean;
  sort: number;
  name_en?: string;
  desc_en?: string;
}

export interface EventsPackage {
  id: string;
  package_name: string;
  desc: string;
  price_pp: number;
  min_guests: number;
  items: string;
  visible: boolean;
  sort: number;
}

export interface SiteContent {
  menu_items: MenuItem[];
  events_menus: EventsPackage[];
  site_notes: Record<string, string>;
}

const content = snapshot as unknown as SiteContent;

export function getContent(): SiteContent {
  return content;
}

export function getMenuItems(tab: MenuTab): MenuItem[] {
  return content.menu_items
    .filter((i) => i.tab === tab && i.visible)
    .sort((a, b) => a.sort - b.sort);
}

export function getEventsPackages(): EventsPackage[] {
  return content.events_menus
    .filter((p) => p.visible)
    .sort((a, b) => a.sort - b.sort);
}

export function getNote(key: string): string {
  return content.site_notes[key] ?? '';
}
