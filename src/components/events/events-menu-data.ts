// R3 — the three events packages with their FULL menus (source: owner-supplied
// events text, 2026-07-10). Dishes that exist on the main menu
// reference their snapshot item id (`ref`) and resolve name/desc at build via
// getMenuItems — one database, one truth. `name`/`desc` on a ref = display
// override from the events text; without a ref they are event-only literals.
//
// R9 i18n — every locale's Hebrew, English and Russian package copy lives here
// (title/body/intro/section text/drinks/fine print), machine-translated the
// same way menu-content.ts translates individual dish names: the Hebrew is the
// source of truth, EN/RU are faithful parallel copies. Dish names resolved via
// `ref` go through translateMenuItem so they follow the shared menu DB's
// per-locale text; only the literal overrides below need their own translation.
import { getMenuItems, type MenuItem } from '../../lib/content';
import { translateMenuItem } from '../../i18n/menu-content';
import type { Locale } from '../../i18n/locales';

export interface EventDish {
  ref?: string;
  name?: string;
  desc?: string;
}

export interface EventMenuSection {
  title: string;
  note?: string;
  /** free-text buffet paragraph instead of dish rows (brunch) */
  text?: string;
  dishes?: EventDish[];
}

export interface EventPackage {
  id: string; // anchor: /events#<id>
  photo: string;
  alt: string;
  tag: string;
  title: string;
  body: string;
  intro: string;
  pricePp: number;
  priceKids: number;
  sections: EventMenuSection[];
  drinks: string[];
  finePrint: string[];
}

/* ============================================================ Hebrew (base) */

const HE_FINE_PRINT = [
  'שריון האירוע מותנה במסירת פרטי אשראי לביטחון, עבור התחייבות למספר האורחים שהוזמנו.',
  'שתייה מוגזת בבקבוקים אישיים בתוספת 8 ₪ לאורח.',
  'לרשותכם מערכת הגברה פרטית ומסך טלוויזיה.',
  'המחיר כולל מע״מ, אך לא כולל דמי שירות לצוות, שישולמו בנפרד.',
];

const HE_DRINKS = ['שתייה קלה: קנקני מים, סודה, מיצים טבעיים ומשקה מוגז.', 'אלכוהול: בירה מהחבית ויין הבית.'];

const HE_STARTERS: EventDish[] = [
  { ref: 'st-01', name: 'פוקצ׳ות ומקלות פרמז׳ן' },
  { ref: 'st-02', name: 'כדורי ארנצ׳יני' },
  { ref: 'st-03' },
  { ref: 'st-05' },
  { ref: 'st-07' },
  { ref: 'sa-01', name: 'סלט רומאי' },
];

const HE_PIZZAS: EventDish[] = [
  { ref: 'pz-01' },
  { ref: 'pz-02' },
  { ref: 'pz-03' },
  { ref: 'pz-04' },
  { ref: 'pz-05' },
  { ref: 'pz-06' },
];

const HE_DESSERTS: EventDish[] = [
  { ref: 'ds-02' },
  { ref: 'ds-03', name: '״זה לא סופלה, זה פונדנט!״ (שף אסף)' },
  { ref: 'ds-04' },
  { ref: 'ds-08' },
];

const HE_EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'private-room',
    photo: '/media/photos/event-private.jpg',
    alt: 'כוסות יין מורמות לחיים בחדר הפרטי',
    tag: 'עד 24 אורחים',
    title: 'חדר פרטי',
    body: 'מרחב משלכם בלב המסעדה — שולחן ארוך, אור חם ודלת שנסגרת. מושלם לימי הולדת, ארוחות משפחתיות חגיגיות וערבי צוות שרוצים שקט משלהם.',
    intro:
      'צ׳או! מתרגשים לארח אתכם לסעודה איטלקית בחדר הפרטי שלנו, שמזכיר את הסלון של הסבתא מטוסקנה. בהשראת תפריט המסעדה נגיש בנדיבות מנות ראשונות ועיקריות, מתוקים, שתיה קלה וחמה, ויין טוב.',
    pricePp: 370,
    priceKids: 150,
    sections: [
      { title: 'ראשונות למרכז', note: 'הכל מוגש', dishes: HE_STARTERS },
      { title: 'פיצות לבחירה', note: '2 מתוך המגוון', dishes: HE_PIZZAS },
      {
        title: 'עיקרית אישית · פסטה טרייה',
        dishes: [
          { ref: 'ps-01' }, { ref: 'ps-02' }, { ref: 'ps-03' }, { ref: 'ps-04' }, { ref: 'ps-05' },
          { ref: 'ps-06' }, { ref: 'ps-07' }, { ref: 'ps-08' }, { ref: 'ps-09' }, { ref: 'ps-10' },
        ],
      },
      {
        title: 'עיקרית אישית · דגים',
        dishes: [{ ref: 'mn-01' }, { ref: 'mn-02' }, { ref: 'mn-03' }, { ref: 'mn-04' }],
      },
      {
        title: 'עיקרית אישית · נתחים',
        dishes: [{ ref: 'mn-06' }, { ref: 'mn-07' }, { ref: 'mn-08' }],
      },
      { title: 'קינוחים', dishes: HE_DESSERTS },
    ],
    drinks: HE_DRINKS,
    finePrint: HE_FINE_PRINT,
  },
  {
    id: 'large-event',
    photo: '/media/photos/hero-table.jpg',
    alt: 'שולחן ארוך עמוס מנות וידיים של אורחים',
    tag: 'עד 150 אורחים',
    title: 'אירוע גדול',
    body: 'המסעדה כולה שלכם: הבר, המטבח הפתוח והצוות — הכול סביב האורחים שלכם. ערב חברה, חגיגה משפחתית גדולה או כל סיבה טובה למסיבה.',
    intro:
      'צ׳או! מתרגשים לארח אתכם לסעודה איטלקית! בהשראת תפריט המסעדה נגיש בנדיבות מנות ראשונות ועיקריות, מתוקים, שתיה קלה וחמה, ויין טוב.',
    pricePp: 370,
    priceKids: 150,
    sections: [
      { title: 'ראשונות', note: 'הכל מוגש', dishes: HE_STARTERS },
      { title: 'פיצות לבחירה', note: '2 מתוך המגוון', dishes: HE_PIZZAS },
      {
        title: 'עיקריות',
        dishes: [
          { name: 'דגים טריים', desc: 'סטייק סלמון ופילה בר ים' },
          { ref: 'sa-02', name: 'סלט פנזנלה' },
        ],
      },
      {
        title: 'פסטות לבחירה',
        note: '2 מתוך המגוון',
        dishes: [{ ref: 'ps-01' }, { ref: 'ps-02' }, { ref: 'ps-03' }, { ref: 'ps-04' }, { ref: 'ps-06' }],
      },
      { title: 'קינוחים', dishes: HE_DESSERTS },
    ],
    drinks: HE_DRINKS,
    finePrint: HE_FINE_PRINT,
  },
  {
    id: 'brunch',
    photo: '/media/photos/event-brunch.jpg',
    alt: 'הרמת כוסות מימוזה מעל שולחן בראנץ׳ ערוך',
    tag: 'שעות הבוקר',
    title: 'בראנץ׳ חגיגי',
    body: 'בוקר חגיגי על שולחנות ערוכים — מאפים חמים, ביצים, סלטים ומימוזה. הדרך הכי טעימה להתחיל חגיגה, מזל טוב או סתם שבת טובה במיוחד.',
    intro:
      'צ׳או! מתרגשים לארח אתכם לסעודה איטלקית! בהשראת תפריט הבוקר שלנו נגיש בנדיבות צ׳קטי אינסופי שמוגש, מנות חמות, מתוקים, שתיה קלה וחמה, ויין טוב.',
    pricePp: 270,
    priceKids: 135,
    sections: [
      {
        title: 'מאפים',
        text: 'פוקצ׳ות חמות, לחמניות בריוש אישיות, לחם דגנים, פיצות מהטאבון במגוון סוגים ומאפי פילו ממולאים בגבינות.',
      },
      {
        title: 'ירקות טריים',
        text: 'סלט קיסר, סלט רומאי, סלט אדממה, פטה וחריף, סלט קינואה ב-3 צבעים, סלט בורגול וירוקים, קוביות קולרבי בתפוזים סחוטים, קוביות סלק ברימונים ובלסמי, סלט עדשים ירוקות ושחורות, חומוס שלנו ומגוון זיתים.',
      },
      {
        title: 'ירקות צלויים',
        text: 'חצילים קלויים, פלפל חריף שרוף, סלט כרוביות בטחינה ושקדים ועלי גפן ביתיים.',
      },
      {
        title: 'גבינות ודגים',
        text: 'גבינות טובות מהמשק, גבינת שמנת ביתית, ריקוטה בדבש ואגוזי לוז, סלמון מעושן ביתי וסלט הטונה האגדי של אסף.',
      },
      {
        title: 'חמות ומנות ביצים',
        text: 'פולנטה רכה, שקשוקה איטלקית פיקנטית, מחבת פלורנטין עם שמנת ותרד, פסטה ברוטב רוזה ופסטה ברוטב שמנת.',
      },
      { title: 'קינוחים', dishes: HE_DESSERTS },
    ],
    drinks: HE_DRINKS,
    finePrint: HE_FINE_PRINT,
  },
];

/* ================================================================ English */

const EN_FINE_PRINT = [
  'Reserving the event is subject to providing credit card details as a guarantee, for the commitment to the number of guests booked.',
  'Carbonated drinks in individual bottles for an additional 8 ₪ per guest.',
  'A private sound system and a TV screen are available for your event.',
  'The price includes VAT, but does not include a service charge for the staff, which will be paid separately.',
];

const EN_DRINKS = [
  'Soft drinks: pitchers of water, soda water, natural juices and a soft drink.',
  'Alcohol: draft beer and house wine.',
];

const EN_STARTERS: EventDish[] = [
  { ref: 'st-01', name: 'Focaccia & Parmesan Breadsticks' },
  { ref: 'st-02', name: 'Arancini Balls' },
  { ref: 'st-03' },
  { ref: 'st-05' },
  { ref: 'st-07' },
  { ref: 'sa-01', name: 'Romaine Salad' },
];

const EN_PIZZAS: EventDish[] = [
  { ref: 'pz-01' },
  { ref: 'pz-02' },
  { ref: 'pz-03' },
  { ref: 'pz-04' },
  { ref: 'pz-05' },
  { ref: 'pz-06' },
];

const EN_DESSERTS: EventDish[] = [
  { ref: 'ds-02' },
  { ref: 'ds-03', name: '"It\'s not a soufflé, it\'s a fondant!" (Chef Asaf)' },
  { ref: 'ds-04' },
  { ref: 'ds-08' },
];

const EN_EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'private-room',
    photo: '/media/photos/event-private.jpg',
    alt: 'Wine glasses raised in a toast in the private room',
    tag: 'Up to 24 guests',
    title: 'Private Room',
    body: 'A space of your own at the heart of the restaurant — a long table, warm light and a door that closes. Perfect for birthdays, festive family meals and team evenings that want some peace and quiet of their own.',
    intro:
      "Ciao! We're excited to host you for an Italian feast in our private room, reminiscent of a grandmother's living room in Tuscany. Inspired by the restaurant menu, we'll generously serve starters and mains, sweets, soft and hot drinks, and good wine.",
    pricePp: 370,
    priceKids: 150,
    sections: [
      { title: 'Starters for the table', note: 'All served', dishes: EN_STARTERS },
      { title: 'Choice of pizzas', note: '2 from the selection', dishes: EN_PIZZAS },
      {
        title: 'Individual main · Fresh pasta',
        dishes: [
          { ref: 'ps-01' }, { ref: 'ps-02' }, { ref: 'ps-03' }, { ref: 'ps-04' }, { ref: 'ps-05' },
          { ref: 'ps-06' }, { ref: 'ps-07' }, { ref: 'ps-08' }, { ref: 'ps-09' }, { ref: 'ps-10' },
        ],
      },
      {
        title: 'Individual main · Fish',
        dishes: [{ ref: 'mn-01' }, { ref: 'mn-02' }, { ref: 'mn-03' }, { ref: 'mn-04' }],
      },
      {
        title: 'Individual main · Cuts',
        dishes: [{ ref: 'mn-06' }, { ref: 'mn-07' }, { ref: 'mn-08' }],
      },
      { title: 'Desserts', dishes: EN_DESSERTS },
    ],
    drinks: EN_DRINKS,
    finePrint: EN_FINE_PRINT,
  },
  {
    id: 'large-event',
    photo: '/media/photos/hero-table.jpg',
    alt: "A long table laden with dishes and guests' hands",
    tag: 'Up to 150 guests',
    title: 'Large Event',
    body: 'The whole restaurant is yours: the bar, the open kitchen and the staff — all around your guests. A company evening, a big family celebration, or any good reason for a party.',
    intro:
      "Ciao! We're excited to host you for an Italian feast! Inspired by the restaurant menu, we'll generously serve starters and mains, sweets, soft and hot drinks, and good wine.",
    pricePp: 370,
    priceKids: 150,
    sections: [
      { title: 'Starters', note: 'All served', dishes: EN_STARTERS },
      { title: 'Choice of pizzas', note: '2 from the selection', dishes: EN_PIZZAS },
      {
        title: 'Mains',
        dishes: [
          { name: 'Fresh Fish', desc: 'Salmon steak and sea bream fillet' },
          { ref: 'sa-02', name: 'Panzanella Salad' },
        ],
      },
      {
        title: 'Choice of pastas',
        note: '2 from the selection',
        dishes: [{ ref: 'ps-01' }, { ref: 'ps-02' }, { ref: 'ps-03' }, { ref: 'ps-04' }, { ref: 'ps-06' }],
      },
      { title: 'Desserts', dishes: EN_DESSERTS },
    ],
    drinks: EN_DRINKS,
    finePrint: EN_FINE_PRINT,
  },
  {
    id: 'brunch',
    photo: '/media/photos/event-brunch.jpg',
    alt: 'Raising mimosa glasses over a set brunch table',
    tag: 'Morning hours',
    title: 'Festive Brunch',
    body: 'A festive morning at set tables — warm pastries, eggs, salads and mimosas. The tastiest way to start a celebration, a mazal tov, or simply an especially good Saturday.',
    intro:
      "Ciao! We're excited to host you for an Italian feast! Inspired by our breakfast menu, we'll generously serve an endless buffet spread, hot dishes, sweets, soft and hot drinks, and good wine.",
    pricePp: 270,
    priceKids: 135,
    sections: [
      {
        title: 'Pastries',
        text: 'Warm focaccias, individual brioche buns, grain bread, wood-fired pizzas in a variety of kinds, and filo pastries filled with cheeses.',
      },
      {
        title: 'Fresh vegetables',
        text: 'Caesar salad, romaine salad, edamame salad, feta and chili, three-color quinoa salad, bulgur and greens salad, kohlrabi cubes with fresh-squeezed orange, beetroot cubes with pomegranate and balsamic, green and black lentil salad, our hummus and a selection of olives.',
      },
      {
        title: 'Roasted vegetables',
        text: 'Roasted eggplant, charred hot pepper, cauliflower salad with tahini and almonds, and homemade stuffed grape leaves.',
      },
      {
        title: 'Cheeses & fish',
        text: "Good farmstead cheeses, homemade cream cheese, ricotta with honey and hazelnuts, homemade smoked salmon, and Asaf's legendary tuna salad.",
      },
      {
        title: 'Hot dishes & eggs',
        text: 'Soft polenta, spicy Italian shakshuka, Florentine skillet with cream and spinach, pasta in rosé sauce and pasta in cream sauce.',
      },
      { title: 'Desserts', dishes: EN_DESSERTS },
    ],
    drinks: EN_DRINKS,
    finePrint: EN_FINE_PRINT,
  },
];

/* ================================================================ Russian */

const RU_FINE_PRINT = [
  'Бронирование мероприятия возможно при предоставлении данных кредитной карты в качестве гарантии обязательства по количеству забронированных гостей.',
  'Газированные напитки в индивидуальных бутылках за дополнительную плату 8 ₪ с гостя.',
  'В вашем распоряжении собственная звуковая система и телевизионный экран.',
  'Цена включает НДС, но не включает плату за обслуживание персонала, которая оплачивается отдельно.',
];

const RU_DRINKS = [
  'Безалкогольные напитки: кувшины воды, содовая, натуральные соки и газированный напиток.',
  'Алкоголь: разливное пиво и домашнее вино.',
];

const RU_STARTERS: EventDish[] = [
  { ref: 'st-01', name: 'Фокачча и пармезановые палочки' },
  { ref: 'st-02', name: 'Шарики аранчини' },
  { ref: 'st-03' },
  { ref: 'st-05' },
  { ref: 'st-07' },
  { ref: 'sa-01', name: 'Салат ромэн' },
];

const RU_PIZZAS: EventDish[] = [
  { ref: 'pz-01' },
  { ref: 'pz-02' },
  { ref: 'pz-03' },
  { ref: 'pz-04' },
  { ref: 'pz-05' },
  { ref: 'pz-06' },
];

const RU_DESSERTS: EventDish[] = [
  { ref: 'ds-02' },
  { ref: 'ds-03', name: '«Это не суфле, это фондан!» (шеф Асаф)' },
  { ref: 'ds-04' },
  { ref: 'ds-08' },
];

const RU_EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'private-room',
    photo: '/media/photos/event-private.jpg',
    alt: 'Бокалы вина, поднятые в тосте в отдельном зале',
    tag: 'До 24 гостей',
    title: 'Отдельный зал',
    body: 'Собственное пространство в сердце ресторана — длинный стол, тёплый свет и дверь, которая закрывается. Идеально для дней рождения, праздничных семейных обедов и корпоративных вечеров, которые хотят тишины для себя.',
    intro:
      'Чао! Мы рады принять вас на итальянский ужин в нашем отдельном зале, который напоминает гостиную бабушки из Тосканы. Вдохновляясь меню ресторана, мы щедро подадим закуски и основные блюда, десерты, безалкогольные и горячие напитки, а также хорошее вино.',
    pricePp: 370,
    priceKids: 150,
    sections: [
      { title: 'Закуски на стол', note: 'Подаётся всё', dishes: RU_STARTERS },
      { title: 'Пицца на выбор', note: '2 из ассортимента', dishes: RU_PIZZAS },
      {
        title: 'Индивидуальное основное блюдо · Свежая паста',
        dishes: [
          { ref: 'ps-01' }, { ref: 'ps-02' }, { ref: 'ps-03' }, { ref: 'ps-04' }, { ref: 'ps-05' },
          { ref: 'ps-06' }, { ref: 'ps-07' }, { ref: 'ps-08' }, { ref: 'ps-09' }, { ref: 'ps-10' },
        ],
      },
      {
        title: 'Индивидуальное основное блюдо · Рыба',
        dishes: [{ ref: 'mn-01' }, { ref: 'mn-02' }, { ref: 'mn-03' }, { ref: 'mn-04' }],
      },
      {
        title: 'Индивидуальное основное блюдо · Мясные блюда',
        dishes: [{ ref: 'mn-06' }, { ref: 'mn-07' }, { ref: 'mn-08' }],
      },
      { title: 'Десерты', dishes: RU_DESSERTS },
    ],
    drinks: RU_DRINKS,
    finePrint: RU_FINE_PRINT,
  },
  {
    id: 'large-event',
    photo: '/media/photos/hero-table.jpg',
    alt: 'Длинный стол, уставленный блюдами, и руки гостей',
    tag: 'До 150 гостей',
    title: 'Крупное мероприятие',
    body: 'Весь ресторан — ваш: бар, открытая кухня и персонал — всё вокруг ваших гостей. Корпоративный вечер, большое семейное торжество или любой хороший повод для праздника.',
    intro:
      'Чао! Мы рады принять вас на итальянский ужин! Вдохновляясь меню ресторана, мы щедро подадим закуски и основные блюда, десерты, безалкогольные и горячие напитки, а также хорошее вино.',
    pricePp: 370,
    priceKids: 150,
    sections: [
      { title: 'Закуски', note: 'Подаётся всё', dishes: RU_STARTERS },
      { title: 'Пицца на выбор', note: '2 из ассортимента', dishes: RU_PIZZAS },
      {
        title: 'Основные блюда',
        dishes: [
          { name: 'Свежая рыба', desc: 'Стейк из лосося и филе дорады' },
          { ref: 'sa-02', name: 'Салат панцанелла' },
        ],
      },
      {
        title: 'Паста на выбор',
        note: '2 из ассортимента',
        dishes: [{ ref: 'ps-01' }, { ref: 'ps-02' }, { ref: 'ps-03' }, { ref: 'ps-04' }, { ref: 'ps-06' }],
      },
      { title: 'Десерты', dishes: RU_DESSERTS },
    ],
    drinks: RU_DRINKS,
    finePrint: RU_FINE_PRINT,
  },
  {
    id: 'brunch',
    photo: '/media/photos/event-brunch.jpg',
    alt: 'Поднятые бокалы мимозы над накрытым столом для бранча',
    tag: 'Утренние часы',
    title: 'Праздничный бранч',
    body: 'Праздничное утро за накрытыми столами — тёплая выпечка, яйца, салаты и мимоза. Самый вкусный способ начать праздник, мазл тов или просто особенно хорошую субботу.',
    intro:
      'Чао! Мы рады принять вас на итальянский ужин! Вдохновляясь нашим утренним меню, мы щедро подадим бесконечный шведский стол, горячие блюда, десерты, безалкогольные и горячие напитки, а также хорошее вино.',
    pricePp: 270,
    priceKids: 135,
    sections: [
      {
        title: 'Выпечка',
        text: 'Тёплая фокачча, индивидуальные булочки бриошь, зерновой хлеб, пицца из дровяной печи разных видов и слоёные пироги из теста фило с начинкой из сыров.',
      },
      {
        title: 'Свежие овощи',
        text: 'Салат Цезарь, салат ромэн, салат эдамаме, фета с перцем чили, салат из киноа трёх цветов, салат из булгура и зелени, кубики кольраби со свежевыжатым апельсином, кубики свёклы с гранатом и бальзамиком, салат из зелёной и чёрной чечевицы, наш хумус и ассорти оливок.',
      },
      {
        title: 'Печёные овощи',
        text: 'Печёные баклажаны, обожжённый острый перец, салат из цветной капусты с тхиной и миндалём, домашние голубцы из виноградных листьев.',
      },
      {
        title: 'Сыры и рыба',
        text: 'Хорошие фермерские сыры, домашний сливочный сыр, рикотта с мёдом и лесными орехами, домашний копчёный лосось и легендарный тунцовый салат Асафа.',
      },
      {
        title: 'Горячие блюда и яйца',
        text: 'Мягкая полента, острая итальянская шакшука, сковорода по-флорентийски со сливками и шпинатом, паста в соусе розе и паста в сливочном соусе.',
      },
      { title: 'Десерты', dishes: RU_DESSERTS },
    ],
    drinks: RU_DRINKS,
    finePrint: RU_FINE_PRINT,
  },
];

/* ================================================================= export */

const PACKAGES_BY_LOCALE: Record<Locale, EventPackage[]> = {
  he: HE_EVENT_PACKAGES,
  en: EN_EVENT_PACKAGES,
  ru: RU_EVENT_PACKAGES,
};

/** Per-locale package list — the shared array previously exported as
 *  `EVENT_PACKAGES` is now selected by locale (defaults never needed: every
 *  route passes its own locale explicitly). */
export function getEventPackages(locale: Locale): EventPackage[] {
  return PACKAGES_BY_LOCALE[locale];
}

/** Resolve `ref` dishes against the snapshot at build time, translated to
 *  `locale` via the shared menu-content translations. A literal `name`/`desc`
 *  override on the dish (already locale-correct, set above) always wins. */
export function resolveDish(dish: EventDish, byId: Map<string, MenuItem>, locale: Locale): { name: string; desc?: string } {
  const item = dish.ref ? byId.get(dish.ref) : undefined;
  const translated = item ? translateMenuItem(item, locale) : undefined;
  return {
    name: dish.name ?? translated?.display_name ?? '',
    desc: dish.desc ?? translated?.display_desc ?? undefined,
  };
}

/** Build the id → item lookup once per page. */
export function menuItemIndex(): Map<string, MenuItem> {
  const map = new Map<string, MenuItem>();
  for (const tab of ['restaurant', 'desserts'] as const) {
    for (const item of getMenuItems(tab)) map.set(item.id, item);
  }
  return map;
}
