// R11 "Direction B" rebuild (owner 2026-07-14) — replaces the old WhatsApp-
// contact-flow copy with a native amount/recipient/payment builder. Copy is
// the owner's own locked lines (verbatim, do not paraphrase); en/ru are
// machine translations of that same copy. See
// Claude/plans/2026-07-14__club-giftcard-B-locked-buildspec.md.
import type { Locale } from '../locales';

interface GiftcardAmountStrings {
  legend: string;
  otherLabel: string;
  otherPlaceholder: string;
}

interface GiftcardRecipientStrings {
  legend: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  greetingLabel: string;
  greetingPlaceholder: string;
}

interface GiftcardSenderStrings {
  legend: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
}

interface GiftcardNoteStrings {
  eyebrowPrefix: string; // "המתנה של " + recipient name
  defaultName: string;
  meta: string;
  defaultGreeting: string;
  foot: string;
}

interface GiftcardPayStrings {
  kicker: string;
  title: string;
  sub: string;
  windowTitle: string;
  pciBadge: string;
  cardNumberLabel: string;
  expiryLabel: string;
  cvvLabel: string;
  trustPre: string;
  trustStrong: string;
  trustPost: string;
  ctaPrefix: string; // "שליחת המתנה · " + amount
  submitSuccess: string;
  submitError: string;
}

interface GiftcardStrings {
  pageTitle: string;
  pageDescription: string;
  heroAlt: string;
  kicker: string;
  h1: string;
  lead: string;
  subline: string;
  photoCaption: string;
  amount: GiftcardAmountStrings;
  recipient: GiftcardRecipientStrings;
  sender: GiftcardSenderStrings;
  note: GiftcardNoteStrings;
  pay: GiftcardPayStrings;
}

export const giftcard: Record<Locale, GiftcardStrings> = {
  he: {
    pageTitle: 'גיפט קארד | סילו',
    pageDescription: 'כרטיס מתנה של סילו — בחרו תקציב, מלאו פרטים ושלחו לאנשים שאתם אוהבים באמת.',
    heroAlt: 'ידיים מרימות טליאטלה מהבילה מתוך גלגל גבינת גרנה פדנו חלול, כרוכה על שני מזלגות.',
    kicker: 'גיפט קארד',
    h1: 'כרטיס מתנה של סילו',
    lead: 'בחרו תקציב, מלאו פרטים ושלחו לאנשים שאתם אוהבים באמת.',
    subline: 'אנחנו כבר נדאג לשאר.',
    photoCaption: 'הערב שאתם נותנים.',
    amount: { legend: 'בחרו תקציב', otherLabel: 'סכום אחר', otherPlaceholder: 'סכום בש״ח' },
    recipient: {
      legend: 'למי שולחים',
      nameLabel: 'שם המקבל/ת', namePlaceholder: 'שם מלא',
      phoneLabel: 'טלפון', phonePlaceholder: '050-0000000',
      emailLabel: 'אימייל המקבל/ת', emailPlaceholder: 'name@email.com',
      greetingLabel: 'מה תרצו לאחל?', greetingPlaceholder: 'מגיע לך ערב מושלם…',
    },
    sender: {
      legend: 'פרטי השולח',
      nameLabel: 'שם מלא', namePlaceholder: 'שם מלא',
      phoneLabel: 'טלפון לאישור', phonePlaceholder: '050-0000000',
    },
    note: {
      eyebrowPrefix: 'המתנה של ', defaultName: 'המקבל/ת',
      meta: 'שובר חוויה בסילו · בתוקף ללא הגבלה',
      defaultGreeting: 'הברכה שלכם תופיע כאן.',
      foot: 'כך תגיע המתנה — בשמכם, עם הברכה שלכם.',
    },
    pay: {
      kicker: 'שלב אחרון', title: 'תשלום מאובטח', sub: 'רגע לפני שהמתנה יוצאת לדרך.',
      windowTitle: 'חלון סליקה של Pelecard', pciBadge: 'מאובטח · PCI',
      cardNumberLabel: 'מספר כרטיס', expiryLabel: 'תוקף', cvvLabel: 'CVV',
      trustPre: 'שדות הכרטיס מוגשים ישירות מ-Pelecard בחלון מאובטח — הם ',
      trustStrong: 'לא עוברים דרך אתר סילו', trustPost: ' ולא נשמרים אצלנו.',
      ctaPrefix: 'שליחת המתנה · ',
      submitSuccess: 'המתנה בדרך! שלחנו אישור למייל שלכם.',
      submitError: 'לא הצלחנו להשלים את התשלום — נסו שוב או צרו קשר טלפוני.',
    },
  },
  en: {
    pageTitle: 'Gift Card | SILO',
    pageDescription: 'A SILO gift card — choose a budget, fill in the details, and send it to people you truly love.',
    heroAlt: 'Hands lifting steaming tagliatelle out of a hollowed wheel of Grana Padano cheese, twirled around two forks.',
    kicker: 'Gift Card',
    h1: 'A SILO gift card',
    lead: 'Choose a budget, fill in the details, and send it to people you truly love.',
    subline: "We'll take care of the rest.",
    photoCaption: 'The evening you’re giving.',
    amount: { legend: 'Choose a budget', otherLabel: 'Other amount', otherPlaceholder: 'Amount in ILS' },
    recipient: {
      legend: "Who's it for",
      nameLabel: "Recipient's name", namePlaceholder: 'Full name',
      phoneLabel: 'Phone', phonePlaceholder: '050-0000000',
      emailLabel: "Recipient's email", emailPlaceholder: 'name@email.com',
      greetingLabel: 'What would you like to say?', greetingPlaceholder: 'You deserve a perfect evening…',
    },
    sender: {
      legend: 'Your details',
      nameLabel: 'Full name', namePlaceholder: 'Full name',
      phoneLabel: 'Phone (for confirmation)', phonePlaceholder: '050-0000000',
    },
    note: {
      eyebrowPrefix: "A gift for ", defaultName: 'the recipient',
      meta: 'A SILO experience voucher · never expires',
      defaultGreeting: 'Your message will appear here.',
      foot: "This is how the gift arrives — in your name, with your words.",
    },
    pay: {
      kicker: 'Last step', title: 'Secure payment', sub: 'One moment before the gift is on its way.',
      windowTitle: "Pelecard's payment window", pciBadge: 'Secure · PCI',
      cardNumberLabel: 'Card number', expiryLabel: 'Expiry', cvvLabel: 'CVV',
      trustPre: "Card fields are served directly by Pelecard inside a secure window — they ",
      trustStrong: 'never pass through the SILO site', trustPost: ' and are never stored by us.',
      ctaPrefix: 'Send the gift · ',
      submitSuccess: "The gift is on its way! We've emailed you a confirmation.",
      submitError: "We couldn't complete the payment — try again or give us a call.",
    },
  },
  ru: {
    pageTitle: 'Подарочный сертификат | SILO',
    pageDescription: 'Подарочный сертификат SILO — выберите сумму, заполните данные и отправьте тем, кого вы по-настоящему любите.',
    heroAlt: 'Руки поднимают горячую тальятелле из выдолбленного колеса сыра Грана Падано, накрученную на две вилки.',
    kicker: 'Подарочный сертификат',
    h1: 'Подарочный сертификат SILO',
    lead: 'Выберите сумму, заполните данные и отправьте тем, кого вы по-настоящему любите.',
    subline: 'Остальное мы возьмём на себя.',
    photoCaption: 'Вечер, который вы дарите.',
    amount: { legend: 'Выберите сумму', otherLabel: 'Другая сумма', otherPlaceholder: 'Сумма в шек.' },
    recipient: {
      legend: 'Кому отправляем',
      nameLabel: 'Имя получателя', namePlaceholder: 'Полное имя',
      phoneLabel: 'Телефон', phonePlaceholder: '050-0000000',
      emailLabel: 'Эл. почта получателя', emailPlaceholder: 'name@email.com',
      greetingLabel: 'Что бы вы хотели пожелать?', greetingPlaceholder: 'Вы заслуживаете идеальный вечер…',
    },
    sender: {
      legend: 'Данные отправителя',
      nameLabel: 'Полное имя', namePlaceholder: 'Полное имя',
      phoneLabel: 'Телефон для подтверждения', phonePlaceholder: '050-0000000',
    },
    note: {
      eyebrowPrefix: 'Подарок для ', defaultName: 'получателя',
      meta: 'Сертификат на впечатление в SILO · бессрочный',
      defaultGreeting: 'Ваше пожелание появится здесь.',
      foot: 'Именно так придёт подарок — от вашего имени, с вашими словами.',
    },
    pay: {
      kicker: 'Последний шаг', title: 'Безопасная оплата', sub: 'Ещё мгновение — и подарок отправится в путь.',
      windowTitle: 'Окно оплаты Pelecard', pciBadge: 'Защищено · PCI',
      cardNumberLabel: 'Номер карты', expiryLabel: 'Срок действия', cvvLabel: 'CVV',
      trustPre: 'Поля карты обслуживаются напрямую Pelecard в защищённом окне — они ',
      trustStrong: 'не проходят через сайт SILO', trustPost: ' и не сохраняются у нас.',
      ctaPrefix: 'Отправить подарок · ',
      submitSuccess: 'Подарок в пути! Мы отправили подтверждение на вашу почту.',
      submitError: 'Не удалось завершить оплату — попробуйте снова или позвоните нам.',
    },
  },
};
