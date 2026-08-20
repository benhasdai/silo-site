// R9 i18n — per-page strings for the 404 ("page not found") page.
// Export name is `notfound` (not `404`, which isn't a valid JS identifier).
import type { Locale } from '../locales';

interface NotfoundStrings {
  pageTitle: string;
  pageDescription: string;
  h1: string;
  copy: string;
  homeLabel: string;
  menuLabel: string;
}

export const notfound: Record<Locale, NotfoundStrings> = {
  he: {
    pageTitle: 'העמוד לא נמצא | סילו',
    pageDescription: 'העמוד שחיפשתם לא נמצא. חזרו לעמוד הבית של סילו — מסעדה איטלקית-ים תיכונית בחולון.',
    h1: 'העמוד הזה לא בתפריט',
    copy: 'אולי הקישור השתנה, אולי הצלחת פשוט חזרה למטבח. מה שבטוח — יש לאן לחזור.',
    homeLabel: 'לעמוד הבית',
    menuLabel: 'אל התפריט',
  },
  en: {
    pageTitle: 'Page Not Found | SILO',
    pageDescription:
      "The page you were looking for could not be found. Head back to SILO's homepage — an Italian-Mediterranean restaurant in Holon.",
    h1: "This page isn't on the menu",
    copy: "Maybe the link changed, maybe the dish simply went back to the kitchen. One thing's for sure — there's a way back.",
    homeLabel: 'Back to Homepage',
    menuLabel: 'View the Menu',
  },
  ru: {
    pageTitle: 'Страница не найдена | SILO',
    pageDescription:
      'Страница, которую вы искали, не найдена. Вернитесь на главную страницу SILO — итало-средиземноморского ресторана в Холоне.',
    h1: 'Этой страницы нет в меню',
    copy: 'Возможно, ссылка изменилась, а возможно, блюдо просто вернулось на кухню. Ясно одно — дорога назад есть.',
    homeLabel: 'На главную',
    menuLabel: 'Перейти в меню',
  },
};
