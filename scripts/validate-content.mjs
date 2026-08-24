import { readFileSync } from 'node:fs';

const file = new URL('../src/data/content-snapshot.json', import.meta.url);
const errors = [];
const allowedTabs = new Set(['restaurant', 'business', 'brunch', 'cocktails', 'wine', 'desserts']);
const allowedCategories = new Set([
  'starters', 'salads', 'pizzas', 'pastas', 'mains',
  'desserts', 'cocktails', 'wine', 'wine_glass', 'alcohol',
]);
const allowedAllergens = new Set(['gluten', 'nuts', 'dairy', 'egg', 'fish', 'sesame']);
const requiredNotes = ['wine_pouring_note', 'allergen_note', 'price_vat_note', 'hours', 'address'];

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const at = (path, condition, message) => { if (!condition) errors.push(`${path}: ${message}`); };
const nonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const finiteNumber = (value) => typeof value === 'number' && Number.isFinite(value);

let data;
try {
  data = JSON.parse(readFileSync(file, 'utf8'));
} catch (error) {
  throw new Error(`Content snapshot is not valid JSON: ${error.message}`);
}

at('$', isObject(data), 'expected an object');
at('$.menu_items', Array.isArray(data?.menu_items), 'expected an array');
at('$.events_menus', Array.isArray(data?.events_menus), 'expected an array');
at('$.site_notes', isObject(data?.site_notes), 'expected an object');

const menuIds = new Set();
for (const [index, item] of (data?.menu_items ?? []).entries()) {
  const path = `$.menu_items[${index}]`;
  at(path, isObject(item), 'expected an object');
  if (!isObject(item)) continue;
  at(`${path}.id`, nonEmptyString(item.id), 'expected a non-empty string');
  if (nonEmptyString(item.id)) {
    at(`${path}.id`, !menuIds.has(item.id), `duplicate id ${JSON.stringify(item.id)}`);
    menuIds.add(item.id);
  }
  at(`${path}.tab`, allowedTabs.has(item.tab), `unsupported tab ${JSON.stringify(item.tab)}`);
  at(`${path}.category`, allowedCategories.has(item.category), `unsupported category ${JSON.stringify(item.category)}`);
  at(`${path}.name_he`, nonEmptyString(item.name_he), 'expected a non-empty string');
  at(`${path}.desc_he`, typeof item.desc_he === 'string', 'expected a string');
  at(`${path}.price`, finiteNumber(item.price) && item.price >= 0, 'expected a non-negative finite number');
  at(`${path}.vegan`, typeof item.vegan === 'boolean', 'expected a boolean');
  at(`${path}.gluten_free`, typeof item.gluten_free === 'boolean', 'expected a boolean');
  at(`${path}.visible`, typeof item.visible === 'boolean', 'expected a boolean');
  at(`${path}.sort`, Number.isInteger(item.sort), 'expected an integer');
  at(`${path}.allergens`, Array.isArray(item.allergens), 'expected an array');
  for (const allergen of item.allergens ?? []) {
    at(`${path}.allergens`, allowedAllergens.has(allergen), `unsupported allergen ${JSON.stringify(allergen)}`);
  }
  if ('unit2_label' in item) at(`${path}.unit2_label`, typeof item.unit2_label === 'string', 'expected a string');
  if ('unit2_price' in item) at(`${path}.unit2_price`, finiteNumber(item.unit2_price) && item.unit2_price >= 0, 'expected a non-negative finite number');
  if ('name_en' in item) at(`${path}.name_en`, typeof item.name_en === 'string', 'expected a string');
  if ('desc_en' in item) at(`${path}.desc_en`, typeof item.desc_en === 'string', 'expected a string');
}

const eventIds = new Set();
for (const [index, event] of (data?.events_menus ?? []).entries()) {
  const path = `$.events_menus[${index}]`;
  at(path, isObject(event), 'expected an object');
  if (!isObject(event)) continue;
  at(`${path}.id`, nonEmptyString(event.id), 'expected a non-empty string');
  if (nonEmptyString(event.id)) {
    at(`${path}.id`, !eventIds.has(event.id), `duplicate id ${JSON.stringify(event.id)}`);
    eventIds.add(event.id);
  }
  at(`${path}.package_name`, nonEmptyString(event.package_name), 'expected a non-empty string');
  at(`${path}.desc`, typeof event.desc === 'string', 'expected a string');
  at(`${path}.items`, typeof event.items === 'string', 'expected a string');
  at(`${path}.price_pp`, finiteNumber(event.price_pp) && event.price_pp >= 0, 'expected a non-negative finite number');
  at(`${path}.min_guests`, Number.isInteger(event.min_guests) && event.min_guests >= 0, 'expected a non-negative integer');
  at(`${path}.visible`, typeof event.visible === 'boolean', 'expected a boolean');
  at(`${path}.sort`, Number.isInteger(event.sort), 'expected an integer');
}

at('$.menu_items', (data?.menu_items ?? []).some((item) => item?.visible === true), 'expected at least one visible menu item');
at('$.events_menus', (data?.events_menus ?? []).some((event) => event?.visible === true), 'expected at least one visible event package');
for (const key of requiredNotes) {
  at(`$.site_notes.${key}`, nonEmptyString(data?.site_notes?.[key]), 'expected a non-empty string');
}

if (errors.length) {
  throw new Error(`Content snapshot validation failed:\n- ${errors.join('\n- ')}`);
}

console.log(`Content snapshot verified: ${data.menu_items.length} menu items, ${data.events_menus.length} event packages, ${Object.keys(data.site_notes).length} notes`);
