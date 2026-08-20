// R9 i18n — machine-translated events page copy (hero headline, showcase
// chrome strings, WhatsApp CTA builders). Package/menu content itself (titles,
// bodies, intros, section text, drinks, fine print) lives in
// ../../components/events/events-menu-data.ts, translated the same way
// menu-content.ts translates menu items (kept separate from this file so the
// page-chrome strings and the long-form package copy don't get tangled).
import type { Locale } from '../locales';

interface EventsStrings {
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  showcaseAriaLabel: string;
  viewFullMenu: string;
  drinksHeading: string;
  perGuest: string;
  kidsUpTo8: string;
  ctaLabel: (packageTitle: string) => string;
  whatsappMessage: (packageTitle: string, pricePp: number) => string;
}

export const events: Record<Locale, EventsStrings> = {
  he: {
    pageTitle: 'אירועים בסילו — אירוע צבעוני, מרגש ובלתי נשכח',
    pageDescription:
      'אירועים פרטיים בסילו חולון: חדר פרטי, אירוע גדול עד 150 אורחים ובראנץ׳ חגיגי. תפריטי אירועים, מחירים וליווי אישי עד האירוע.',
    heroTitle: 'אירוע צבעוני, מרגש ובלתי נשכח',
    showcaseAriaLabel: 'אפשרויות אירוח',
    viewFullMenu: 'לתפריט המלא',
    drinksHeading: 'שתייה',
    perGuest: 'לאורח',
    kidsUpTo8: 'לבמביני עד גיל 8',
    ctaLabel: (packageTitle) => `דברו איתנו על ${packageTitle}`,
    whatsappMessage: (packageTitle, pricePp) => `היי סילו! נשמח לשמוע פרטים על ${packageTitle} (${pricePp} ₪ לאורח)`,
  },
  en: {
    pageTitle: 'Events at SILO — A colorful, moving, unforgettable event',
    pageDescription:
      'Private events at SILO Holon: a private room, a large event for up to 150 guests, and a festive brunch. Event menus, pricing and personal support through the event.',
    heroTitle: 'Vivid. Moving. Unforgettable.',
    showcaseAriaLabel: 'Hosting options',
    viewFullMenu: 'View full menu',
    drinksHeading: 'Drinks',
    perGuest: 'per guest',
    kidsUpTo8: 'for kids up to age 8',
    ctaLabel: (packageTitle) => `Chat with us about ${packageTitle}`,
    whatsappMessage: (packageTitle, pricePp) =>
      `Hi SILO! We'd love to hear details about ${packageTitle} (${pricePp} ₪ per guest)`,
  },
  ru: {
    pageTitle: 'Мероприятия в SILO — яркое, трогательное, незабываемое событие',
    pageDescription:
      'Частные мероприятия в SILO Холон: отдельный зал, крупное мероприятие до 150 гостей и праздничный бранч. Меню мероприятий, цены и личное сопровождение до самого события.',
    heroTitle: 'Яркое, трогательное, незабываемое событие',
    showcaseAriaLabel: 'Варианты проведения мероприятий',
    viewFullMenu: 'Смотреть полное меню',
    drinksHeading: 'Напитки',
    perGuest: 'с гостя',
    kidsUpTo8: 'для детей до 8 лет',
    ctaLabel: (packageTitle) => `Напишите нам про «${packageTitle}»`,
    whatsappMessage: (packageTitle, pricePp) =>
      `Привет, SILO! Хотим узнать подробнее о «${packageTitle}» (${pricePp} ₪ с гостя)`,
  },
};
