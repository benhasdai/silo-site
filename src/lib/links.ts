// SILO — single source for every external href (contracts.md: "Use constants
// from src/lib/links.ts — never hardcode external URLs in pages").
// Provider/detail changes happen HERE ONLY — see OWNER-GUIDE.md §2 for the
// Hebrew how-to (the old tasks/15-integrations/INTEGRATIONS.md this used to
// point at no longer exists).
import type { Locale } from '../i18n/locales';

/** Ontopo reservation page — used directly where a new-tab "reserve" button
 *  already exists (hero, about). Opens in a new tab: target="_blank" rel="noopener".
 *  `ONTOPO_URL` is the he canonical (kept for metadata/back-compat). */
export const ONTOPO_URL = 'https://ontopo.com/he/il/page/silo';

/** Per-locale Ontopo booking page (owner 2026-07-13: the language switcher must
 *  carry the visitor's language through to the reservation flow). Ontopo mirrors
 *  the same page under /he, /en, /ru — so the locale slug drops straight in. */
export const ontopoUrl = (locale: Locale): string => `https://ontopo.com/${locale}/il/page/silo`;

/** /go/* redirect targets. R14 migration (2026-07-15): these now resolve to
 *  static redirect pages under src/pages/go/*.astro (destinations baked at
 *  build). Provider swap = edit the DEST in the matching go/*.astro + rebuild.
 *  (Only GO_DELIVERY is wired in the UI — Nav; GO_GIFTCARD is unused.) */
export const GO_GIFTCARD = '/go/giftcard';
export const GO_DELIVERY = '/go/delivery';

/** Valuecard club-registration form — the REAL live join link (harvested from
 *  the old silo.co.il, 2026-07-10). R8.2 (owner): the club stays on Valuecard;
 *  /club links here DIRECTLY (not via the /go/club env indirection) so the live
 *  site always carries the real link. Swap here if the club vendor ever changes. */
export const VALUECARD_JOIN_URL = 'https://valuecard.co.il/Forms/21BA18CA-D7F0-463D-84F4-565939F62B87';

/** Valuecard balance-check portal (from the old site) — reference only, not a purchase link. */
export const VALUECARD_BALANCE_URL = 'https://valuecard.co.il/silo/MemberLogin_SILO.asp';

/** Valuecard club-membership terms (harvested from the real join form's TermsApproval
 *  checkbox link, 2026-07-14 handoff §1.2). */
export const VALUECARD_TERMS_URL = 'https://vcd.bz/_y9efg';

/** WhatsApp number, no punctuation, international format (per brief §10). */
const WHATSAPP_NUMBER = '97235733315';

/** Builds a wa.me link, optionally prefilled with `text`. */
export function WHATSAPP_URL(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const TEL_URL = 'tel:03-573-3315';
export const TEL_DISPLAY = '03-573-3315';

export const MAPS_URL = 'https://maps.google.com/?q=שד׳+ירושלים+210+חולון';

/** Waze live-map directions to SILO (user-supplied 2026-07-10). */
export const WAZE_URL =
  'https://www.waze.com/he/live-map/directions/%D7%9E%D7%A1%D7%A2%D7%93%D7%AA-%D7%A1%D7%99%D7%9C%D7%95-silo-restauran-%D7%A9%D7%93%D7%A8%D7%95%D7%AA-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-210-%D7%97%D7%95%D7%9C%D7%95%D7%9F?to=place.w.22806848.228068480.175414';

export const INSTAGRAM_URL = 'https://instagram.com/silo.meditaliano/';
export const FACEBOOK_URL = 'https://facebook.com/silolapark';

export const EMAIL = 'silopark.service@gmail.com';
export const EMAIL_URL = `mailto:${EMAIL}`;

// Translation: R9 (2026-07-13) retired the translate.goog proxy — the owner
// rejected "opens a Google page" (R6-eve #4). Real /en/… /ru/… routes now
// live under src/pages/**, switched via src/components/LanguageSwitcher.astro.
