// R9 i18n — Home page (route "/") prose. Machine-translated, no human pass
// (owner ruling — see ui-strings.ts header). `he` is lifted verbatim from the
// pre-i18n Hero.astro/index.astro literals; en/ru are faithful translations.
// SILO / סילו stays untranslated everywhere as the brand mark.
import type { Locale } from '../locales';

interface IndexStrings {
  pageTitle: string;
  pageDescription: string;
  hero: {
    /** visually-hidden <h1> — carries the page identity for AT/SEO */
    h1: string;
    /** transient cinematic opening title (data-hero-title) */
    title: string;
    /** persistent tagline under the title */
    tagline: string;
  };
  /** Hero's own film-slot placeholder label (shown only if hero clip's src is null) */
  heroPlaceholderLabel: string;
  /** CinemaBand decorative placeholder labels (shown only if a clip's src is null) */
  cinemaBand2Label: string;
  cinemaBand3Label: string;
  /** R14-T10: real editorial captions overlaid on each cinema band */
  cinemaBand2Caption: string;
  cinemaBand3Caption: string;
  /** R14-T9: "kitchen" editorial beat, first prose interlude (has a menu CTA) */
  kitchen: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };
  /** R14-T9: "about" editorial beat, second prose interlude (no CTA) */
  about: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  /** R14-T9: closing CTA beat — reserve + event booking */
  closing: {
    heading: string;
    reserveCta: string;
    eventCta: string;
  };
}

export const index: Record<Locale, IndexStrings> = {
  he: {
    pageTitle: 'סילו — מסעדה איטלקית־ים תיכונית | פארק פרס, חולון',
    pageDescription:
      'סילו – מסעדה איטלקית-ים תיכונית משפחתית בלב פארק פרס (לה פארק), חולון. הזמינו שולחן, עיינו בתפריט או תכננו אצלנו אירוע בלתי נשכח.',
    hero: {
      h1: 'סילו — מסעדה איטלקית־ים תיכונית, פארק פרס חולון',
      title: 'איטלקית מהים התיכון',
      tagline: 'פארק פרס, חולון',
    },
    heroPlaceholderLabel: 'סרטון פתיחה',
    cinemaBand2Label: 'סרטון 2',
    cinemaBand3Label: 'סרטון 3',
    cinemaBand2Caption: 'תערובת הקמחים שלנו בהתפחה ארוכה בת 48 שעות.',
    cinemaBand3Caption: 'ליים טרי סחוט וליקרים משובחים',
    kitchen: {
      eyebrow: 'מהמטבח',
      heading: 'חומרי הגלם שלנו',
      body: 'מיובאים מאיטליה, או נרכשים ישירות מידי יצרנים מקומיים',
      cta: 'לתפריט המלא',
    },
    about: {
      eyebrow: 'סילו',
      heading: 'שולחן אחד גדול, בלב פארק פרס',
      body: 'סילו שבחולון. איטלקית מהים התיכון. 7 ימים בשבוע.',
    },
    closing: {
      heading: 'Best prodotti only',
      reserveCta: 'הזמנת שולחן',
      eventCta: 'הזמנת אירוע',
    },
  },
  en: {
    pageTitle: 'SILO — Italian-Mediterranean Restaurant | Park Peres, Holon',
    pageDescription:
      'SILO – a family Italian-Mediterranean restaurant in the heart of Park Peres (La Park), Holon. Reserve a table, browse the menu, or plan an unforgettable event with us.',
    hero: {
      h1: 'SILO — Italian-Mediterranean restaurant, Park Peres, Holon',
      title: 'Italian from the Mediterranean',
      tagline: 'Peres Park, Holon',
    },
    heroPlaceholderLabel: 'Opening video',
    cinemaBand2Label: 'Video 2',
    cinemaBand3Label: 'Video 3',
    cinemaBand2Caption: 'Our flour blend, a long 48-hour proof.',
    cinemaBand3Caption: 'Fresh-squeezed lime and fine liqueurs',
    kitchen: {
      eyebrow: 'From the kitchen',
      heading: 'Our ingredients',
      body: 'Imported from Italy, or sourced directly from local producers',
      cta: 'View the full menu',
    },
    about: {
      eyebrow: 'SILO',
      heading: 'One big table, in the heart of Peres Park',
      body: 'SILO, in Holon. Italian from the Mediterranean. Seven days a week.',
    },
    closing: {
      heading: 'Best prodotti only',
      reserveCta: 'Reserve a table',
      eventCta: 'Book an event',
    },
  },
  ru: {
    pageTitle: 'SILO — итало-средиземноморский ресторан | Парк Перес, Холон',
    pageDescription:
      'SILO – семейный итало-средиземноморский ресторан в самом сердце парка Перес (Ла Парк), Холон. Забронируйте столик, ознакомьтесь с меню или организуйте с нами незабываемое мероприятие.',
    hero: {
      h1: 'SILO — итало-средиземноморский ресторан, парк Перес, Холон',
      title: 'Средиземноморская Италия',
      tagline: 'Парк Перес, Холон',
    },
    heroPlaceholderLabel: 'Вступительное видео',
    cinemaBand2Label: 'Видео 2',
    cinemaBand3Label: 'Видео 3',
    cinemaBand4Label: 'Видео 4',
    cinemaBand2Caption: 'Наша смесь муки, долгая расстойка 48 часов.',
    cinemaBand3Caption: 'Свежевыжатый лайм и изысканные ликёры',
    kitchen: {
      eyebrow: 'С кухни',
      heading: 'Наши ингредиенты',
      body: 'Импортируются из Италии или закупаются напрямую у местных производителей',
      cta: 'Всё меню',
    },
    about: {
      eyebrow: 'SILO',
      heading: 'Один большой стол, в сердце парка Переса',
      body: 'SILO в Холоне. Итальянская кухня Средиземноморья. Семь дней в неделю.',
    },
    closing: {
      heading: 'Best prodotti only',
      reserveCta: 'Забронировать столик',
      eventCta: 'Заказать мероприятие',
    },
  },
};
