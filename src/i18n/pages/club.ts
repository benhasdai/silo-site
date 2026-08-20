// R11 "Direction B" rebuild (owner 2026-07-14) — native membership form
// replaces the old benefit-cards + external-link page. Copy is the owner's
// own locked lines (verbatim, do not paraphrase); en/ru are machine
// translations of that same copy. See
// Claude/plans/2026-07-14__club-giftcard-B-locked-buildspec.md.
import type { Locale } from '../locales';

interface ClubPerk {
  n: string; // digit, never translated
  title: string;
  body: string;
}

interface ClubFormStrings {
  formTitle: string;
  formSub: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  genderLabel: string;
  genderMale: string;
  genderFemale: string;
  genderOther: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  dobLegend: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  anniversaryAdd: string;
  anniversaryLegend: string;
  marcomLabel: string;
  termsLabel: string;
  termsLinkText: string;
  submitCta: string;
  photoCaption: string;
  submitSuccess: string;
  submitError: string;
}

interface ClubStrings {
  pageTitle: string;
  pageDescription: string;
  heroAlt: string;
  kicker: string;
  h1: string;
  lead: string;
  subline: string;
  perksEyebrow: string;
  perks: ClubPerk[];
  form: ClubFormStrings;
  balanceLink: string;
}

export const club: Record<Locale, ClubStrings> = {
  he: {
    pageTitle: 'מועדון החברים | סילו',
    pageDescription:
      'האנשים שעושים את סילו — ניוזלטר עם מתנה חודשית, מתנה ביום הולדת וביום נישואין. הצטרפות חינם.',
    heroAlt: 'ידיים של ברמן מסננות קוקטייל קרמי לתוך גביע קוקטייל, שייקר מתכת מוחזק מעליו, על רקע בר מוארך באור עמום.',
    kicker: 'מועדון',
    h1: 'האנשים שעושים את סילו',
    lead: 'בנוסף לניוזלטר עם מתנה חודשית, אנחנו גם שולחים מתנה ביום ההולדת וביום הנישואין.',
    subline: 'השאירו לנו פרטים, ההצטרפות חינם.',
    perksEyebrow: 'מה מקבלים',
    perks: [
      { n: '01', title: 'ניוזלטר עם מתנה חודשית', body: 'עדכונים מהמטבח וההטבות — ומדי חודש, מתנה קטנה מאיתנו.' },
      { n: '02', title: 'מתנה ליום ההולדת', body: 'מגיע לכם לחגוג אצלנו — מתנה בחודש יום ההולדת שלכם.' },
      { n: '03', title: 'מתנה ליום הנישואין', body: 'גם התאריך הזה שמור אצלנו — מתנה בחודש יום הנישואין.' },
    ],
    form: {
      formTitle: 'הצטרפות למועדון',
      formSub: 'ללא עלות, ללא כרטיס פלסטיק — רק ההטבות.',
      firstNameLabel: 'שם פרטי',
      firstNamePlaceholder: 'שם פרטי',
      lastNameLabel: 'שם משפחה',
      lastNamePlaceholder: 'שם משפחה',
      genderLabel: 'מין',
      genderMale: 'זכר',
      genderFemale: 'נקבה',
      genderOther: 'אחר',
      phoneLabel: 'טלפון',
      phonePlaceholder: '050-0000000',
      emailLabel: 'אימייל',
      emailPlaceholder: 'you@email.com',
      dobLegend: 'תאריך לידה',
      dobDay: 'יום',
      dobMonth: 'חודש',
      dobYear: 'שנה',
      anniversaryAdd: '+ הוספת תאריך יום נישואין',
      anniversaryLegend: 'תאריך יום נישואין',
      marcomLabel: 'אני מאשר/ת קבלת דיוור והטבות מסילו.',
      termsLabel: 'קראתי ואני מסכים/ה',
      termsLinkText: 'לתקנון המועדון',
      submitCta: 'הצטרפות למועדון',
      photoCaption: 'מקום ליד השולחן.',
      submitSuccess: 'ההצטרפות התקבלה — נשמח לראותכם בסילו.',
      submitError: 'לא הצלחנו לשלוח כרגע — נסו שוב או צרו קשר טלפוני.',
    },
    balanceLink: 'כבר חברים? בדיקת פרטים',
  },
  en: {
    pageTitle: 'Members Club | SILO',
    pageDescription:
      "The people who make SILO — a monthly newsletter with a gift, a birthday gift, and an anniversary gift. Free to join.",
    heroAlt: "A bartender's hands straining a pale, creamy cocktail into a coupe glass, with a metal shaker held above against a dim bar background.",
    kicker: 'Club',
    h1: 'The people who make SILO',
    lead: "Alongside our newsletter with a monthly gift, we also send a gift on your birthday and your anniversary.",
    subline: 'Leave us your details — joining is free.',
    perksEyebrow: 'What you get',
    perks: [
      { n: '01', title: 'Newsletter with a monthly gift', body: 'Updates from the kitchen and our perks — plus a small gift from us every month.' },
      { n: '02', title: 'A birthday gift', body: "You deserve to celebrate with us — a gift during your birthday month." },
      { n: '03', title: 'An anniversary gift', body: "We keep that date too — a gift during your anniversary month." },
    ],
    form: {
      formTitle: 'Join the club',
      formSub: 'No cost, no plastic card — just the perks.',
      firstNameLabel: 'First name',
      firstNamePlaceholder: 'First name',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Last name',
      genderLabel: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      genderOther: 'Other',
      phoneLabel: 'Phone',
      phonePlaceholder: '050-0000000',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      dobLegend: 'Date of birth',
      dobDay: 'Day',
      dobMonth: 'Month',
      dobYear: 'Year',
      anniversaryAdd: '+ Add anniversary date',
      anniversaryLegend: 'Anniversary date',
      marcomLabel: "I'd like to receive newsletters and perks from SILO.",
      termsLabel: "I've read and agree to the",
      termsLinkText: 'club terms',
      submitCta: 'Join the club',
      photoCaption: 'A place at the table.',
      submitSuccess: "You're in — we can't wait to see you at SILO.",
      submitError: "We couldn't send this right now — try again or give us a call.",
    },
    balanceLink: 'Already a member? Check your details',
  },
  ru: {
    pageTitle: 'Клуб друзей | SILO',
    pageDescription:
      'Люди, которые создают SILO — ежемесячная рассылка с подарком, подарок на день рождения и годовщину. Вступление бесплатное.',
    heroAlt: 'Руки бармена процеживают кремовый коктейль в бокал купе, металлический шейкер над стаканом, на фоне приглушённо освещённого бара.',
    kicker: 'Клуб',
    h1: 'Люди, которые создают SILO',
    lead: 'Помимо рассылки с ежемесячным подарком, мы также отправляем подарок на день рождения и на годовщину.',
    subline: 'Оставьте нам свои данные — вступление бесплатное.',
    perksEyebrow: 'Что вы получаете',
    perks: [
      { n: '01', title: 'Рассылка с ежемесячным подарком', body: 'Новости из кухни и наши привилегии — и каждый месяц небольшой подарок от нас.' },
      { n: '02', title: 'Подарок на день рождения', body: 'Вы заслуживаете отмечать с нами — подарок в месяц вашего дня рождения.' },
      { n: '03', title: 'Подарок на годовщину', body: 'Эту дату мы тоже помним — подарок в месяц вашей годовщины.' },
    ],
    form: {
      formTitle: 'Вступить в клуб',
      formSub: 'Бесплатно, без пластиковой карты — только привилегии.',
      firstNameLabel: 'Имя',
      firstNamePlaceholder: 'Имя',
      lastNameLabel: 'Фамилия',
      lastNamePlaceholder: 'Фамилия',
      genderLabel: 'Пол',
      genderMale: 'Мужской',
      genderFemale: 'Женский',
      genderOther: 'Другой',
      phoneLabel: 'Телефон',
      phonePlaceholder: '050-0000000',
      emailLabel: 'Эл. почта',
      emailPlaceholder: 'you@email.com',
      dobLegend: 'Дата рождения',
      dobDay: 'День',
      dobMonth: 'Месяц',
      dobYear: 'Год',
      anniversaryAdd: '+ Добавить дату годовщины',
      anniversaryLegend: 'Дата годовщины',
      marcomLabel: 'Хочу получать рассылку и привилегии от SILO.',
      termsLabel: 'Я прочитал(а) и согласен(на) с',
      termsLinkText: 'правилами клуба',
      submitCta: 'Вступить в клуб',
      photoCaption: 'Место за столом.',
      submitSuccess: 'Заявка принята — будем рады видеть вас в SILO.',
      submitError: 'Не удалось отправить — попробуйте снова или позвоните нам.',
    },
    balanceLink: 'Уже участник? Проверить данные',
  },
};
