// R9 i18n — machine-translated events page copy (hero headline, showcase
// chrome strings, WhatsApp CTA labels). Package/menu content itself (titles,
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
  packageNavAriaLabel: string;
  drinksHeading: string;
  perGuest: string;
  kidsUpTo8: string;
  ctaLabel: (packageTitle: string) => string;
  /** Owner-worded WhatsApp opener per package id (owner, 2026-11-21). */
  inquiryMessages: Record<string, string>;
  inquiryMessage: (packageId: string) => string;
}

export const events: Record<Locale, EventsStrings> = {
  he: {
    pageTitle: 'אירועים בסילו — אירוע צבעוני, מרגש ובלתי נשכח',
    pageDescription:
      'אירועים פרטיים בסילו חולון: חדר פרטי, אירוע גדול עד 150 אורחים ובראנץ׳ חגיגי. תפריטי אירועים, מחירים וליווי אישי עד האירוע.',
    heroTitle: 'אירוע צבעוני, מרגש ובלתי נשכח',
    showcaseAriaLabel: 'אפשרויות אירוח',
    packageNavAriaLabel: 'מעבר בין אפשרויות האירוח',
    drinksHeading: 'שתייה',
    perGuest: 'לאורח',
    kidsUpTo8: 'לבמביני עד גיל 8',
    ctaLabel: (packageTitle) => `דברו איתנו על ${packageTitle}`,
    inquiryMessages: {
      'private-room': 'היי סילו, אשמח לשמוע על אירוע בחדר הפרטי.',
      'large-event': 'היי סילו, אשמח לשמוע על אירוע במסעדה.',
      brunch: 'היי סילו, אשמח לשמוע על אירוע בראנץ.',
    },
    inquiryMessage(packageId) {
      const message = this.inquiryMessages[packageId];
      if (!message) throw new Error(`No events inquiry message for package "${packageId}" (he)`);
      return message;
    },
  },
  en: {
    pageTitle: 'Events at SILO — A colorful, moving, unforgettable event',
    pageDescription:
      'Private events at SILO Holon: a private room, a large event for up to 150 guests, and a festive brunch. Event menus, pricing and personal support through the event.',
    heroTitle: 'Vivid. Moving. Unforgettable.',
    showcaseAriaLabel: 'Hosting options',
    packageNavAriaLabel: 'Jump between hosting options',
    drinksHeading: 'Drinks',
    perGuest: 'per guest',
    kidsUpTo8: 'for kids up to age 8',
    ctaLabel: (packageTitle) => `Chat with us about ${packageTitle}`,
    inquiryMessages: {
      'private-room': "Hi SILO, I'd love to hear about an event in the private room.",
      'large-event': "Hi SILO, I'd love to hear about an event at the restaurant.",
      brunch: "Hi SILO, I'd love to hear about a brunch event.",
    },
    inquiryMessage(packageId) {
      const message = this.inquiryMessages[packageId];
      if (!message) throw new Error(`No events inquiry message for package "${packageId}" (en)`);
      return message;
    },
  },
  ru: {
    pageTitle: 'Мероприятия в SILO — яркое, трогательное, незабываемое событие',
    pageDescription:
      'Частные мероприятия в SILO Холон: отдельный зал, крупное мероприятие до 150 гостей и праздничный бранч. Меню мероприятий, цены и личное сопровождение до самого события.',
    heroTitle: 'Яркое, трогательное, незабываемое событие',
    showcaseAriaLabel: 'Варианты проведения мероприятий',
    packageNavAriaLabel: 'Переход между вариантами проведения',
    drinksHeading: 'Напитки',
    perGuest: 'с гостя',
    kidsUpTo8: 'для детей до 8 лет',
    ctaLabel: (packageTitle) => `Напишите нам про «${packageTitle}»`,
    inquiryMessages: {
      'private-room': 'Привет, SILO! Хочу узнать о мероприятии в отдельном зале.',
      'large-event': 'Привет, SILO! Хочу узнать о мероприятии в ресторане.',
      brunch: 'Привет, SILO! Хочу узнать о мероприятии-бранче.',
    },
    inquiryMessage(packageId) {
      const message = this.inquiryMessages[packageId];
      if (!message) throw new Error(`No events inquiry message for package "${packageId}" (ru)`);
      return message;
    },
  },
};
