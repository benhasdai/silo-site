// R9 i18n — machine-translated UI chrome copy (nav, footer, menu page frame).
// Owner ruling: machine-only, no human-review pass. .notranslate discipline
// protects prices/₪/the SILO wordmark elsewhere; this file is prose only.
import type { Locale } from './locales';

interface UiStrings {
  skipLink: string;
  reserveCta: string;
  nav: {
    home: string;
    menu: string;
    events: string;
    club: string;
    giftcard: string;
    delivery: string;
    accessibility: string;
    logoHomeAria: string;
    logoOtherAria: string;
    whatsappAria: string;
    telAria: (display: string) => string;
    burgerLabel: string;
    burgerLabelClose: string;
    navAriaLabel: string;
  };
  switcher: {
    groupAria: string;
    labels: Record<Locale, string>;
  };
  footer: {
    hours: string;
    address: string;
    instagramAria: string;
    facebookAria: string;
    emailAria: string;
    wazeAria: string;
    legalPrefix: (year: number) => string;
    accessibilityLink: string;
  };
  menu: {
    pageTitle: string;
    pageDescription: string;
    h1: string;
    tablistAria: string;
    tabs: Record<string, string>;
    categories: Record<string, string>;
    allergens: Record<string, string>;
    legend: { vegan: string; gluten_free: string; title: string };
    filters: { dietaryGroupAria: string; categoriesNavAria: string; allChip: string };
    comingSoon: string;
    noMatches: string;
    resetFilters: string;
    currencyWord: string;
    notes: { wine_pouring_note: string; allergen_note: string; price_vat_note: string };
  };
}

export const UI: Record<Locale, UiStrings> = {
  he: {
    skipLink: 'דילוג לתוכן הראשי',
    reserveCta: 'הזמנת שולחן',
    nav: {
      home: 'בית',
      menu: 'תפריט',
      events: 'אירועים',
      club: 'מועדון',
      giftcard: 'גיפט קארד',
      delivery: 'משלוחים',
      accessibility: 'נגישות',
      logoHomeAria: 'חזרה לראש העמוד',
      logoOtherAria: 'סילו – לעמוד הבית',
      whatsappAria: 'וואטסאפ לסילו',
      telAria: (display) => `חיוג לסילו: ${display}`,
      burgerLabel: 'פתיחת תפריט ניווט',
      burgerLabelClose: 'סגירת תפריט ניווט',
      navAriaLabel: 'ניווט ראשי',
    },
    switcher: {
      groupAria: 'שינוי שפת התצוגה',
      labels: { he: 'עב', en: 'EN', ru: 'RU' },
    },
    footer: {
      hours: 'פתוחים 7 ימים בשבוע עד 23:00 · א׳-ה׳ מ-12:00 · ו׳ מ-08:00 · ש׳ מ-09:00',
      address: 'שד׳ ירושלים 210, מתחם לה פארק, פארק פרס, חולון',
      instagramAria: 'אינסטגרם',
      facebookAria: 'פייסבוק',
      emailAria: 'שליחת אימייל לסילו',
      wazeAria: 'ניווט לסילו ב-Waze',
      legalPrefix: (year) => `© ${year} סילו · פארק פרס, חולון · כל הזכויות שמורות ·`,
      accessibilityLink: 'הצהרת נגישות',
    },
    menu: {
      pageTitle: 'התפריט | סילו — מסעדה איטלקית-ים תיכונית בחולון',
      pageDescription:
        "התפריט המלא של סילו: פיצות מהטאבון, פסטות טריות, מנות ים ובשר, יין איטלקי וקינוחים. עסקית צהריים, בראנץ' וקינוחים — פארק פרס, חולון.",
      h1: 'התפריט',
      tablistAria: 'תפריטי סילו',
      tabs: {
        restaurant: 'תפריט המסעדה',
        business: 'עסקית צהריים',
        brunch: "בראנץ'",
        cocktails: 'קוקטיילים',
        wine: 'יין',
        desserts: 'קינוחים',
      },
      categories: {
        starters: 'ראשונות',
        salads: 'סלטים',
        pizzas: 'פיצות',
        pastas: 'פסטות',
        mains: 'עיקריות',
        desserts: 'קינוחים',
        cocktails: 'קוקטיילים',
        wine: 'יין',
        wine_glass: 'יין במזיגה',
        alcohol: 'אלכוהול',
      },
      allergens: {
        gluten: 'מכיל גלוטן',
        dairy: 'מכיל מוצרי חלב',
        egg: 'מכיל ביצים',
        fish: 'מכיל דגים',
        nuts: 'מכיל אגוזים',
        sesame: 'מכיל שומשום',
      },
      legend: { vegan: 'טבעוני', gluten_free: 'ללא גלוטן', title: 'מקרא סימונים' },
      filters: {
        dietaryGroupAria: 'סינון תזונתי',
        categoriesNavAria: 'קטגוריות תפריט המסעדה',
        allChip: 'הכל',
      },
      comingSoon: 'התפריט מתעדכן ממש בימים אלה — שאלו את הצוות.',
      noMatches: 'אין מנות שמתאימות לסינון שבחרתם.',
      resetFilters: 'ניקוי הסינון',
      currencyWord: 'שקלים',
      notes: {
        wine_pouring_note: 'מעל 200 בקבוקים במרתף היין שלנו — שאלו את הצוות על סיור.',
        allergen_note: 'המנות עשויות להכיל אלרגנים. לשאלות על רכיבים ואלרגנים — הצוות ישמח לעזור.',
        price_vat_note: 'המחירים בשקלים חדשים וכוללים מע"מ.',
      },
    },
  },
  en: {
    skipLink: 'Skip to main content',
    reserveCta: 'Reserve a Table',
    nav: {
      home: 'Home',
      menu: 'Menu',
      events: 'Events',
      club: 'Club',
      giftcard: 'Gift Card',
      delivery: 'Delivery',
      accessibility: 'Accessibility',
      logoHomeAria: 'Back to top',
      logoOtherAria: 'SILO – Home page',
      whatsappAria: 'WhatsApp SILO',
      telAria: (display) => `Call SILO: ${display}`,
      burgerLabel: 'Open navigation menu',
      burgerLabelClose: 'Close navigation menu',
      navAriaLabel: 'Main navigation',
    },
    switcher: {
      groupAria: 'Change display language',
      labels: { he: 'עב', en: 'EN', ru: 'RU' },
    },
    footer: {
      hours: 'Open 7 days a week until 23:00 · Sun–Thu from 12:00 · Fri from 08:00 · Sat from 09:00',
      address: '210 Jerusalem Blvd, La Park Complex, Park Peres, Holon',
      instagramAria: 'Instagram',
      facebookAria: 'Facebook',
      emailAria: 'Email SILO',
      wazeAria: 'Navigate to SILO on Waze',
      legalPrefix: (year) => `© ${year} SILO · Park Peres, Holon · All rights reserved ·`,
      accessibilityLink: 'Accessibility Statement',
    },
    menu: {
      pageTitle: 'Menu | SILO — Italian-Mediterranean Restaurant in Holon',
      pageDescription:
        "SILO's full menu: wood-fired pizzas, fresh pasta, meat and seafood mains, Italian wine and desserts. Business lunch, brunch and desserts — Park Peres, Holon.",
      h1: 'Menu',
      tablistAria: 'SILO menus',
      tabs: {
        restaurant: 'Restaurant Menu',
        business: 'Business Lunch',
        brunch: 'Brunch',
        cocktails: 'Cocktails',
        wine: 'Wine',
        desserts: 'Desserts',
      },
      categories: {
        starters: 'Starters',
        salads: 'Salads',
        pizzas: 'Pizzas',
        pastas: 'Pasta',
        mains: 'Mains',
        desserts: 'Desserts',
        cocktails: 'Cocktails',
        wine: 'Wine',
        wine_glass: 'Wine by the Glass',
        alcohol: 'Alcohol',
      },
      allergens: {
        gluten: 'Contains gluten',
        dairy: 'Contains dairy',
        egg: 'Contains eggs',
        fish: 'Contains fish',
        nuts: 'Contains nuts',
        sesame: 'Contains sesame',
      },
      legend: { vegan: 'Vegan', gluten_free: 'Gluten-free', title: 'Icon Legend' },
      filters: {
        dietaryGroupAria: 'Dietary filters',
        categoriesNavAria: 'Restaurant menu categories',
        allChip: 'All',
      },
      comingSoon: 'The menu is being updated currently — ask our team.',
      noMatches: 'No dishes match your selected filters.',
      resetFilters: 'Clear filters',
      currencyWord: 'shekels',
      notes: {
        wine_pouring_note: 'Over 200 bottles in our wine cellar — ask our team about a tour.',
        allergen_note:
          'Dishes may contain allergens. For questions about ingredients and allergens, our team is happy to help.',
        price_vat_note: 'Prices are in new Israeli shekels (₪) and include VAT.',
      },
    },
  },
  ru: {
    skipLink: 'Перейти к основному содержанию',
    reserveCta: 'Забронировать столик',
    nav: {
      home: 'Главная',
      menu: 'Меню',
      events: 'Мероприятия',
      club: 'Клуб',
      giftcard: 'Сертификаты',
      delivery: 'Доставка',
      accessibility: 'Доступность',
      logoHomeAria: 'Наверх страницы',
      logoOtherAria: 'SILO – на главную',
      whatsappAria: 'WhatsApp SILO',
      telAria: (display) => `Позвонить в SILO: ${display}`,
      burgerLabel: 'Открыть меню навигации',
      burgerLabelClose: 'Закрыть меню навигации',
      navAriaLabel: 'Основная навигация',
    },
    switcher: {
      groupAria: 'Изменить язык отображения',
      labels: { he: 'עב', en: 'EN', ru: 'RU' },
    },
    footer: {
      hours: 'Открыты 7 дней в неделю до 23:00 · Вс–Чт с 12:00 · Пт с 08:00 · Сб с 09:00',
      address: 'Бульвар Иерусалима 210, комплекс Ла Парк, парк Перес, Холон',
      instagramAria: 'Instagram',
      facebookAria: 'Facebook',
      emailAria: 'Написать на почту SILO',
      wazeAria: 'Маршрут до SILO в Waze',
      legalPrefix: (year) => `© ${year} SILO · Парк Перес, Холон · Все права защищены ·`,
      accessibilityLink: 'Заявление о доступности',
    },
    menu: {
      pageTitle: 'Меню | SILO — итало-средиземноморский ресторан в Холоне',
      pageDescription:
        'Полное меню SILO: пицца из дровяной печи, свежая паста, мясные и рыбные блюда, итальянское вино и десерты. Бизнес-ланч, бранч и десерты — парк Перес, Холон.',
      h1: 'Меню',
      tablistAria: 'Меню SILO',
      tabs: {
        restaurant: 'Меню ресторана',
        business: 'Бизнес-ланч',
        brunch: 'Бранч',
        cocktails: 'Коктейли',
        wine: 'Вино',
        desserts: 'Десерты',
      },
      categories: {
        starters: 'Закуски',
        salads: 'Салаты',
        pizzas: 'Пицца',
        pastas: 'Паста',
        mains: 'Основные блюда',
        desserts: 'Десерты',
        cocktails: 'Коктейли',
        wine: 'Вино',
        wine_glass: 'Вино по бокалам',
        alcohol: 'Алкоголь',
      },
      allergens: {
        gluten: 'Содержит глютен',
        dairy: 'Содержит молочные продукты',
        egg: 'Содержит яйца',
        fish: 'Содержит рыбу',
        nuts: 'Содержит орехи',
        sesame: 'Содержит кунжут',
      },
      legend: { vegan: 'Веганское', gluten_free: 'Без глютена', title: 'Обозначения' },
      filters: {
        dietaryGroupAria: 'Диетические фильтры',
        categoriesNavAria: 'Категории меню ресторана',
        allChip: 'Все',
      },
      comingSoon: 'Меню сейчас обновляется — уточните у персонала.',
      noMatches: 'Нет блюд, соответствующих выбранным фильтрам.',
      resetFilters: 'Сбросить фильтры',
      currencyWord: 'шекелей',
      notes: {
        wine_pouring_note: 'Более 200 бутылок в нашем винном погребе — спросите персонал об экскурсии.',
        allergen_note:
          'Блюда могут содержать аллергены. По вопросам о составе и аллергенах — наш персонал всегда поможет.',
        price_vat_note: 'Цены указаны в новых израильских шекелях (₪) и включают НДС.',
      },
    },
  },
};
