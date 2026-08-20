// R9 i18n — machine-translated /accessibility page copy (task 16-a11y-page).
// Owner ruling: machine-only, no human-review pass. `he` is lifted verbatim
// from the original Hebrew route; `en`/`ru` are faithful translations.
import type { Locale } from '../locales';

interface AccessibilityStrings {
  pageTitle: string;
  pageDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  digital: {
    heading: string;
    intro: string;
    items: string[];
  };
  physical: {
    heading: string;
    intro: string;
    items: string[];
  };
  officer: {
    heading: string;
    intro: string;
    nameLabel: string;
    name: string;
    phoneLabel: string;
    emailLabel: string;
  };
  contact: {
    heading: string;
    body: string;
  };
  meta: string;
}

export const ACCESSIBILITY: Record<Locale, AccessibilityStrings> = {
  he: {
    pageTitle: 'הצהרת נגישות | סילו',
    pageDescription:
      'הצהרת הנגישות של מסעדת סילו — ההתאמות שבוצעו באתר ובמסעדה הפיזית, פרטי רכז הנגישות ודרכי פנייה בנושאי נגישות.',
    eyebrow: 'נגישות',
    h1: 'הצהרת נגישות',
    lead: 'מסעדת סילו מאמינה שאירוח אמיתי פתוח לכולם. אנו פועלים להנגיש את האתר ואת המסעדה הפיזית לאנשים עם מוגבלות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998, ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.',
    digital: {
      heading: 'נגישות האתר',
      intro: 'האתר נבנה ומתוחזק בשאיפה לעמידה בתקן הנגישות הבינלאומי WCAG 2.1 בדרגה AA. בין ההתאמות שביצענו:',
      items: [
        'ניגודיות צבעים העומדת בדרישות WCAG AA בכל עמודי האתר.',
        'ניווט מלא במקלדת, עם מסגרת פוקוס נראית לעין על כל רכיב אינטראקטיבי.',
        'טקסט חלופי (alt) לתמונות, לאיורים ולסימנים גרפיים.',
        'מבנה HTML סמנטי — כותרות מדורגות בסדר הגיוני, אזורי ניווט מזוהים, וקישור "דילוג לתוכן הראשי" בראש כל עמוד.',
        'תמיכה בהעדפת המשתמש להפחתת תנועה (prefers-reduced-motion) — מי שמבקש פחות אנימציה מקבל תצוגה סטטית וברורה, בלי אובדן מידע או פונקציונליות.',
        'תפריט נגיש: סימוני אלרגנים, טבעוני וללא-גלוטן מוצגים באמצעות אייקונים ברורים לצד טקסט — לא כטקסט בלבד, כדי לצמצם סיכון לטעות בקריאה או בתרגום.',
      ],
    },
    physical: {
      heading: 'נגישות המסעדה הפיזית',
      intro: 'במתחם ובמסעדה עצמה קיימות ההתאמות הבאות:',
      items: [
        'חניית נכים בקרבת הכניסה למתחם.',
        'גישה נוחה לכיסא גלגלים אל המסעדה ובתוך חלל הישיבה.',
        'שירותי נכים בנגישות מלאה.',
      ],
    },
    officer: {
      heading: 'רכז נגישות',
      intro: 'לפניות, שאלות ובקשות בנושא נגישות ניתן לפנות לרכז/ת הנגישות של המסעדה:',
      nameLabel: 'שם רכז/ת הנגישות:',
      name: 'אסף גלזר',
      phoneLabel: 'טלפון:',
      emailLabel: 'דוא"ל:',
    },
    contact: {
      heading: 'פנייה בנושאי נגישות',
      body: 'נתקלתם בקושי או בבעיית נגישות באתר או במסעדה? נשמח לשמוע ולתקן. ניתן לפנות בטלפון או בדוא"ל שלמעלה, ואנו מתחייבים לבדוק כל פנייה ולהשיב בהקדם האפשרי, ככל הניתן בתוך 14 ימי עסקים.',
    },
    meta: 'הצהרת נגישות זו עודכנה לאחרונה ב-9 ביולי 2026.',
  },
  en: {
    pageTitle: 'Accessibility Statement | SILO',
    pageDescription:
      "SILO restaurant's accessibility statement — the adjustments made to the website and the physical restaurant, accessibility officer details, and how to reach us about accessibility.",
    eyebrow: 'Accessibility',
    h1: 'Accessibility Statement',
    lead: 'SILO restaurant believes real hospitality is open to everyone. We work to make our website and physical restaurant accessible to people with disabilities, in accordance with the Equal Rights for Persons with Disabilities Law, 5758-1998, and the Equal Rights for Persons with Disabilities Regulations (Accessibility Adjustments for Service), 5773-2013.',
    digital: {
      heading: 'Website Accessibility',
      intro: 'The website is built and maintained with the aim of conforming to the international WCAG 2.1 Level AA accessibility standard. Among the adjustments we have made:',
      items: [
        'Color contrast that meets WCAG AA requirements on every page of the site.',
        'Full keyboard navigation, with a visible focus outline on every interactive element.',
        'Alternative text (alt) for images, illustrations, and graphic marks.',
        'Semantic HTML structure — headings in a logical order, identified navigation regions, and a "skip to main content" link at the top of every page.',
        "Support for the user's reduced-motion preference (prefers-reduced-motion) — anyone who requests less animation gets a static, clear display, with no loss of information or functionality.",
        'Accessible menu: allergen, vegan, and gluten-free markings are shown with clear icons alongside text — not as text alone, to reduce the risk of misreading or mistranslation.',
      ],
    },
    physical: {
      heading: 'Physical Restaurant Accessibility',
      intro: 'The following adjustments are in place at the complex and in the restaurant itself:',
      items: [
        'Accessible parking near the entrance to the complex.',
        'Convenient wheelchair access to the restaurant and within the seating area.',
        'Fully accessible restrooms for people with disabilities.',
      ],
    },
    officer: {
      heading: 'Accessibility Coordinator',
      intro: "For inquiries, questions, and requests about accessibility, you can contact the restaurant's accessibility coordinator:",
      nameLabel: 'Accessibility coordinator name:',
      name: 'Asaf Glazer',
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
    },
    contact: {
      heading: 'Accessibility Inquiries',
      body: 'Encountered a difficulty or an accessibility issue on the website or at the restaurant? We would love to hear about it and fix it. You can reach us by phone or email above, and we are committed to reviewing every inquiry and responding as soon as possible, within 14 business days wherever we can.',
    },
    meta: 'This accessibility statement was last updated on July 9, 2026.',
  },
  ru: {
    pageTitle: 'Заявление о доступности | SILO',
    pageDescription:
      'Заявление о доступности ресторана SILO — меры, принятые на сайте и в самом ресторане, контактные данные координатора по доступности и способы связи по вопросам доступности.',
    eyebrow: 'Доступность',
    h1: 'Заявление о доступности',
    lead: 'Ресторан SILO считает, что подлинное гостеприимство открыто для всех. Мы работаем над тем, чтобы сделать наш сайт и сам ресторан доступными для людей с ограниченными возможностями, в соответствии с Законом о равных правах людей с ограниченными возможностями, 5758-1998, и Положениями о равных правах людей с ограниченными возможностями (меры по обеспечению доступности услуг), 5773-2013.',
    digital: {
      heading: 'Доступность сайта',
      intro: 'Сайт создан и поддерживается с целью соответствия международному стандарту доступности WCAG 2.1 уровня AA. Среди принятых нами мер:',
      items: [
        'Цветовой контраст, соответствующий требованиям WCAG AA на всех страницах сайта.',
        'Полная навигация с клавиатуры с заметной рамкой фокуса на каждом интерактивном элементе.',
        'Альтернативный текст (alt) для изображений, иллюстраций и графических знаков.',
        'Семантическая структура HTML — заголовки в логичном порядке, обозначенные области навигации и ссылка «Перейти к основному содержанию» в верхней части каждой страницы.',
        'Поддержка настройки пользователя на снижение анимации (prefers-reduced-motion) — тем, кто предпочитает меньше анимации, показывается статичное и понятное отображение без потери информации или функциональности.',
        'Доступное меню: обозначения аллергенов, веганских и безглютеновых блюд показаны понятными иконками наряду с текстом — а не только текстом, чтобы снизить риск ошибки при чтении или переводе.',
      ],
    },
    physical: {
      heading: 'Доступность ресторана',
      intro: 'В комплексе и в самом ресторане предусмотрены следующие меры:',
      items: [
        'Парковка для людей с инвалидностью рядом со входом в комплекс.',
        'Удобный доступ на инвалидной коляске в ресторан и в зоне посадочных мест.',
        'Полностью доступные туалеты для людей с инвалидностью.',
      ],
    },
    officer: {
      heading: 'Координатор по доступности',
      intro: 'По вопросам, запросам и обращениям, связанным с доступностью, можно обратиться к координатору по доступности ресторана:',
      nameLabel: 'Имя координатора по доступности:',
      name: 'Асаф Глазер',
      phoneLabel: 'Телефон:',
      emailLabel: 'Эл. почта:',
    },
    contact: {
      heading: 'Обращения по вопросам доступности',
      body: 'Столкнулись с трудностью или проблемой доступности на сайте или в ресторане? Мы будем рады узнать об этом и всё исправить. Вы можете обратиться по телефону или электронной почте, указанным выше, и мы обязуемся рассмотреть каждое обращение и ответить как можно скорее, по возможности в течение 14 рабочих дней.',
    },
    meta: 'Это заявление о доступности было последний раз обновлено 9 июля 2026 года.',
  },
};
