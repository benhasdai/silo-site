// R9 i18n — machine-translated menu item copy (name/desc/unit2_label), keyed
// by content-snapshot.json's item id. Kept SEPARATE from src/lib/content.ts
// (frozen; refreshed from the owner's Google Sheet) so a data refresh can
// never wipe translations, and a translation edit never touches live prices.
import type { Locale } from './locales';
import type { MenuItem } from '../lib/content';

interface ItemTranslation {
  name?: string;
  desc?: string;
  unit2_label?: string;
}

type ItemTranslations = Record<string, ItemTranslation>;

const EN: ItemTranslations = {
  'st-01': { name: 'Focaccia & Parmesan Breadstick', desc: "'Puttanesca' salsa, garlic, eggplant and balsamic" },
  'st-02': { name: '3 Arancini', desc: 'Filled with mushrooms and cheese, with parmesan and rosé sauce' },
  'st-03': { name: 'Soft Polenta', desc: 'Corn cream, roasted forest mushrooms and parmesan' },
  'st-04': { name: "'Caprese' Bruschetta", desc: 'Stracciatella cheese, onion confit, roasted tomatoes, arugula and balsamic' },
  'st-05': { name: 'Melanzane Steak', desc: 'Charred local eggplant, arugula, eggplant labneh, red onion and sumac' },
  'st-06': { name: 'Gamberi Burro', desc: 'Shrimp in butter, white wine, sherry, roasted onion and kalamata olives' },
  'st-07': { name: 'Beef Carpaccio', desc: 'Valley olive oil, lemon, arugula, parmesan and balsamic' },
  'st-08': { name: 'Salmon Ceviche', desc: 'Raw diced fish over celery gazpacho, chopped greens, pineapple, coriander and a focaccia stick' },
  'st-09': { name: 'Burrata di Fiori', desc: 'Burrata cheese wrapped in focaccia and pesto, oven-baked and served with warm Napoletana sauce and balsamic' },
  'sa-01': { name: 'Romaine', desc: 'Romaine lettuce, cherry tomatoes, onion, kalamata olives, pecan, balsamic, brioche croutons, feta and crispy sweet-potato ricotta' },
  'sa-02': { name: 'Panzanella', desc: 'Burrata cheese, market vegetables, croutons and oregano' },
  'sa-03': { name: 'Caesar', desc: 'Romaine lettuce, parmesan and croutons', unit2_label: 'with chicken added' },
  'pz-01': { name: 'Tartufo Formaggio', desc: 'Mascarpone sauce, mozzarella, smoked potato, parmesan and truffle' },
  'pz-02': { name: 'Goat Brûlée', desc: 'Mascarpone and beetroot sauce, mozzarella and arugula' },
  'pz-03': { name: 'Caramella Dolce', desc: 'Mascarpone and tomato sauce, caramelized sweet potato, roasted onion and feta' },
  'pz-04': { name: 'Pepperoni', desc: 'Tomato sauce, mozzarella and pepperoni' },
  'pz-05': { name: 'Pizza Roma', desc: 'Tomato sauce, kalamata olives, artichoke, onion and coriander' },
  'pz-06': { name: 'Margherita', desc: 'Tomato sauce, mozzarella and basil' },
  'ps-01': { name: 'Funghi Tartufo from the Parmesan Wheel', desc: 'Cream, butter, portobello and truffle' },
  'ps-02': { name: 'Arrabbiata', desc: 'Spicy Napoletana sauce, sage and garlic' },
  'ps-03': { name: 'Chestnut Gnocchi', desc: 'Cream, butter, portobello mushrooms and truffle' },
  'ps-04': { name: 'Mascarpone Ravioli', desc: 'Cream, butter, tomatoes and cherry tomatoes' },
  'ps-05': { name: 'Veal Cheek Tortellini', desc: 'Butter, beef stock, onion confit and portobello mushrooms' },
  'ps-06': { name: 'Funghi Risotto', desc: 'Cream, butter, portobello mushrooms and truffle' },
  'ps-07': { name: 'Carbonara', desc: 'Lamb bacon, egg yolk, butter' },
  'ps-08': { name: 'Ragù Bolognese', desc: 'Slow-cooked beef, root vegetables and tomatoes' },
  'ps-09': { name: 'Shrimp Spaghetti', desc: 'Cream, butter, kalamata olives, cherry tomatoes, onion confit and chili' },
  'ps-10': { name: 'Salmon Spaghetti in Parmesan', desc: 'Cream, butter, salmon, broccoli and crispy sweet potato' },
  'mn-01': { name: 'Whole Sea Bass', desc: 'Head to tail, with antipasti vegetables. 400g' },
  'mn-02': { name: 'Spicy Sicilian Chraimeh', desc: 'Tomatoes, onion confit, charred eggplant and coriander. 220g' },
  'mn-03': { name: 'Salmon Steak', desc: 'With butter mash and asparagus. 240g' },
  'mn-04': { name: 'Sea Bream Fillet', desc: 'With risotto and portobello in butter. 220g' },
  'mn-05': { name: 'Entrecôte', desc: "Marbled, aged at least 40 days. Smoked potato and butcher's butter. 330g" },
  'mn-06': { name: 'Veal Schnitzel Milanese', desc: 'Napoletana sauce, mozzarella and homemade fries. 200g' },
  'mn-07': { name: 'Spiedini of Chicken Thigh', desc: 'Skewers in the Abruzzo style. Caramelized onion and butter mash. 180g' },
  'mn-08': { name: 'Liver in Fig Wine', desc: 'Onion confit and butter mash. 200g' },
  'ds-01': { name: 'Kinder Cookie Tart', desc: 'Cookie dough, chocolate chunks and Kinder ganache. Served with vanilla ice cream' },
  'ds-02': { name: "Tiramisu Like Mom's", desc: 'Ladyfingers, mascarpone cream, homemade espresso liqueur and cocoa. Eaten straight from the pan' },
  'ds-03': { name: 'Chocolate Soufflé', desc: 'Rich chocolate cake with a molten core and vanilla cream. Served with vanilla ice cream. "It\'s not a soufflé, it\'s a fondant!" (Chef Asaf)' },
  'ds-04': { name: 'Pavlova Tower', desc: 'A giant meringue kiss, soft inside, mascarpone cream, vanilla cream, berry coulis and fresh fruit. Served with crumble and pecans' },
  'ds-05': { name: 'Deconstructed Cheesecake', desc: 'Cheesecake mousse, lemon cream, crumble and Amarena cherry' },
  'ds-06': { name: 'Crème Brûlée Chocolate Sphere', desc: '70% dark chocolate sphere filled with chocolate mousse and frozen crème brûlée. Melted tableside with fire' },
  'ds-07': { name: 'Sugar-Free Cake', desc: 'Served with vanilla ice cream' },
  'ds-08': { name: 'Fruit Sorbet', desc: 'Vanilla sorbet, strawberry sorbet and fresh fruit' },
  'br-01': { name: 'SILO Brunch', desc: 'Per guest — includes a choice of main, juice and cappuccino (large cappuccino +4, large soft drink +18)' },
  'br-02': { name: 'Bambini Brunch', desc: 'Up to age 8 — includes a main and juice' },
  'br-03': { name: 'Choice of Drink', desc: 'Juices: lemonade, mint lemonade, orange · Coffee: espresso, cappuccino, iced coffee · Mineral water' },
  'br-04': { name: 'Egg Salad on Brioche', desc: 'Caramelized onion, aioli, mustard and dill' },
  'br-05': { name: 'Frittata', desc: 'Potato, pepper, onion, herbs and feta' },
  'br-06': { name: 'Con Salsiccia', desc: 'Chorizo, pepperoni sausage and herbs' },
  'br-07': { name: 'Cornetto', desc: 'Crunchy croissant, lamb bacon, sunny-side-up eggs and caramel sauce' },
  'br-08': { name: 'Florentine-Style Skillet', desc: 'Cream and spinach stew, sunny-side-up eggs and salty cheese' },
  'br-09': { name: 'Arrabbiata Shakshuka', desc: 'Spicy tomatoes, sunny-side-up eggs and stracciatella cheese' },
  'br-10': { name: 'French Toast', desc: 'Mascarpone, pecan, salted caramel and fruit' },
  'br-11': { name: 'Eggs Your Way', desc: 'Herbs, sautéed mushrooms, onion, feta, pepperoni' },
  'br-12': { name: 'Aperol Spritz · from the Bar', desc: 'Vermouth, orange and prosecco — add-on' },
  'br-13': { name: 'Paloma · from the Bar', desc: 'Tequila, grapefruit, lime and soda — add-on' },
  'br-14': { name: 'Mimosa · from the Bar', desc: 'Orange and prosecco — add-on' },
  'br-15': { name: 'Bellini · from the Bar', desc: 'White peaches and prosecco — add-on' },
  'br-16': { name: 'House Wine · from the Bar', desc: 'Rosé / White / Red — add-on' },
  'br-17': { name: 'Draft Beer · from the Bar', desc: "Goldstar / Murphy's — add-on" },
  'bz-01': { name: 'Choice of Starter', desc: 'Polenta (corn cream, butter and parmesan) · Caesar salad (romaine, parmesan and croutons) · Panzanella salad (market vegetables, croutons and oregano)' },
  'bz-02': { name: 'Choice of Main', desc: 'A selection of pastas, fish and cuts from the menu' },
  'bz-03': { name: 'Choice of Dessert', desc: "Pavlova Tower · Tiramisu Like Mom's · Fruit Sorbet — add-on" },
  'bz-04': { name: 'Bar Specials', desc: 'Aperol Spritz · Paloma · Mimosa · Bellini · House Wine · Draft Beer — add-on' },
  'ck-01': { name: 'Negroni', desc: 'Gin, Campari and red vermouth (demo — will be replaced with the real bar menu)' },
  'ck-02': { name: 'Aperol Spritz', desc: 'Aperol, prosecco and soda' },
  'ck-03': { name: 'Paloma', desc: 'Tequila, grapefruit, lime and soda' },
  'ck-04': { name: 'Bellini', desc: 'White peach purée and prosecco' },
  'wn-01': { name: 'Chianti Classico', desc: 'Tuscany, Italy (demo — will be replaced with the real wine list)', unit2_label: 'glass' },
  'wn-02': { name: 'Primitivo', desc: 'Puglia, Italy — fruity and round', unit2_label: 'glass' },
  'wn-03': { name: 'Vermentino', desc: 'Sardinia — white, mineral and crisp', unit2_label: 'glass' },
  'wn-04': { name: 'House Wine', desc: 'Rosé / White / Red — by the glass' },
};

// dt-* mirrors ds-* (same dishes, duplicated onto the standalone Desserts tab).
for (const n of ['01', '02', '03', '04', '05', '06', '07', '08']) {
  EN[`dt-${n}`] = EN[`ds-${n}`];
}

const RU: ItemTranslations = {
  'st-01': { name: 'Фокачча и пармезановая палочка', desc: 'Соус «путтанеска», чеснок, печёный баклажан и бальзамик' },
  'st-02': { name: '3 Аранчини', desc: 'Начинка из грибов и сыра, с пармезаном и соусом розе' },
  'st-03': { name: 'Мягкая полента', desc: 'Кукурузный крем, жареные лесные грибы и пармезан' },
  'st-04': { name: 'Брускетта «Капрезе»', desc: 'Сыр страчателла, конфи из лука, печёные томаты, руккола и бальзамик' },
  'st-05': { name: 'Стейк меланцане', desc: 'Печёный местный баклажан, руккола, лабне из баклажанов, красный лук и сумах' },
  'st-06': { name: 'Гамбари бурро', desc: 'Креветки в масле, белое вино, херес, печёный лук и оливки каламата' },
  'st-07': { name: 'Карпаччо из говядины', desc: 'Оливковое масло из долины, лимон, руккола, пармезан и бальзамик' },
  'st-08': { name: 'Севиче из лосося', desc: 'Кубики сырой рыбы на сельдерейном гаспачо, рубленая зелень, ананас, кинза и палочка фокаччи' },
  'st-09': { name: 'Буррата ди Фьори', desc: 'Сыр буррата, завёрнутый в фокаччу с песто, запечённый в печи, подаётся с тёплым соусом наполетана и бальзамиком' },
  'sa-01': { name: 'Ромэн', desc: 'Салат ромэн, помидоры черри, лук, оливки каламата, пекан, бальзамик, гренки бриошь, фета и хрустящая рикотта из батата' },
  'sa-02': { name: 'Панцанелла', desc: 'Сыр буррата, овощи с рынка, гренки и орегано' },
  'sa-03': { name: 'Цезарь', desc: 'Салат ромэн, пармезан и гренки', unit2_label: 'с добавлением курицы' },
  'pz-01': { name: 'Тартуфо Формаджо', desc: 'Соус маскарпоне, моцарелла, копчёный картофель, пармезан и трюфель' },
  'pz-02': { name: 'Козий брюле', desc: 'Соус из маскарпоне и свёклы, моцарелла и руккола' },
  'pz-03': { name: 'Карамелла Дольче', desc: 'Соус из маскарпоне и томатов, карамелизированный батат, печёный лук и фета' },
  'pz-04': { name: 'Пепперони', desc: 'Томатный соус, моцарелла и пепперони' },
  'pz-05': { name: 'Пицца Рома', desc: 'Томатный соус, оливки каламата, артишок, лук и кинза' },
  'pz-06': { name: 'Маргарита', desc: 'Томатный соус, моцарелла и базилик' },
  'ps-01': { name: 'Фунги тартуфо из пармезанового колеса', desc: 'Сливки, масло, портобелло и трюфель' },
  'ps-02': { name: 'Аррабьята', desc: 'Острый соус наполетана, шалфей и чеснок' },
  'ps-03': { name: 'Ньокки с каштаном', desc: 'Сливки, масло, грибы портобелло и трюфель' },
  'ps-04': { name: 'Равиоли с маскарпоне', desc: 'Сливки, масло, томаты и помидоры черри' },
  'ps-05': { name: 'Тортеллини с телячьими щёчками', desc: 'Масло, говяжий бульон, конфи из лука и грибы портобелло' },
  'ps-06': { name: 'Ризотто фунги', desc: 'Сливки, масло, грибы портобелло и трюфель' },
  'ps-07': { name: 'Карбонара', desc: 'Бекон из ягнятины, яичный желток, масло' },
  'ps-08': { name: 'Рагу Болоньезе', desc: 'Долго тушёная говядина, корнеплоды и томаты' },
  'ps-09': { name: 'Спагетти с креветками', desc: 'Сливки, масло, оливки каламата, помидоры черри, конфи из лука и чили' },
  'ps-10': { name: 'Спагетти с лососем в пармезане', desc: 'Сливки, масло, лосось, брокколи и хрустящий батат' },
  'mn-01': { name: 'Целый лаврак (сибас)', desc: 'От головы до хвоста, с овощами антипасти. 400 г' },
  'mn-02': { name: 'Острая сицилийская хараймэ', desc: 'Томаты, конфи из лука, печёный баклажан и кинза. 220 г' },
  'mn-03': { name: 'Стейк из лосося', desc: 'Со сливочным пюре и спаржей. 240 г' },
  'mn-04': { name: 'Филе дорады', desc: 'С ризотто и портобелло в масле. 220 г' },
  'mn-05': { name: 'Антрекот', desc: 'Мраморная говядина, выдержка не менее 40 дней. Копчёный картофель и мясницкое масло. 330 г' },
  'mn-06': { name: 'Шницель телячий по-милански', desc: 'Соус наполетана, моцарелла и домашний картофель фри. 200 г' },
  'mn-07': { name: 'Спедини из куриного бедра', desc: 'Шашлычки в стиле региона Абруццо. Карамелизированный лук и сливочное пюре. 180 г' },
  'mn-08': { name: 'Печень в инжирном вине', desc: 'Конфи из лука и сливочное пюре. 200 г' },
  'ds-01': { name: 'Тарт «Киндер Кукис»', desc: 'Песочное тесто, кусочки шоколада и ганаш «Киндер». Подаётся с ванильным мороженым' },
  'ds-02': { name: 'Тирамису как у мамы', desc: 'Савоярди, крем маскарпоне, домашний эспрессо-ликёр и какао. Едят прямо из формы' },
  'ds-03': { name: 'Шоколадное суфле', desc: 'Насыщенный шоколадный фондан с жидкой сердцевиной и ванильным кремом. Подаётся с ванильным мороженым. «Это не суфле, это фондан!» (шеф Асаф)' },
  'ds-04': { name: 'Башня «Павлова»', desc: 'Огромное безе, мягкое внутри, крем маскарпоне, ванильный крем, кули из лесных ягод и свежие фрукты. Подаётся с крамблом и пеканом' },
  'ds-05': { name: 'Чизкейк «на одной ноге»', desc: 'Мусс чизкейк, лимонный крем, крамбл и вишня амарена' },
  'ds-06': { name: 'Шоколадная сфера с крем-брюле', desc: 'Сфера из горького шоколада 70%, наполненная шоколадным муссом и замороженным крем-брюле. Растапливается огнём прямо за столом' },
  'ds-07': { name: 'Торт без сахара', desc: 'Подаётся с ванильным мороженым' },
  'ds-08': { name: 'Фруктовый сорбет', desc: 'Ванильный сорбет, клубничный сорбет и свежие фрукты' },
  'br-01': { name: 'Бранч SILO', desc: 'На гостя — включает основное блюдо на выбор, сок и капучино (большой капучино +4, большой газированный напиток +18)' },
  'br-02': { name: 'Бранч Бамбини', desc: 'До 8 лет — включает основное блюдо и сок' },
  'br-03': { name: 'Напиток на выбор', desc: 'Соки: лимонад, лимонад с мятой, апельсиновый · Кофе: эспрессо, капучино, айс-кофе · Минеральная вода' },
  'br-04': { name: 'Яичный салат на бриоши', desc: 'Карамелизированный лук, айоли, горчица и укроп' },
  'br-05': { name: 'Фриттата', desc: 'Картофель, перец, лук, зелень и фета' },
  'br-06': { name: 'Кон сальсичча', desc: 'Чоризо, колбаски пепперони и зелень' },
  'br-07': { name: 'Корнетто', desc: 'Хрустящий круассан, бекон из ягнятины, яичница-глазунья и карамельный соус' },
  'br-08': { name: 'Сковорода по-флорентийски', desc: 'Рагу из сливок и шпината, яичница-глазунья и солёный сыр' },
  'br-09': { name: 'Шакшука аррабьята', desc: 'Острые томаты, яичница-глазунья и сыр страчателла' },
  'br-10': { name: 'Французский тост', desc: 'Маскарпоне, пекан, солёная карамель и фрукты' },
  'br-11': { name: 'Яйца как пожелаете', desc: 'Зелень, обжаренные грибы, лук, фета, пепперони' },
  'br-12': { name: 'Апероль Шприц · из бара', desc: 'Вермут, апельсин и просекко — доплата' },
  'br-13': { name: 'Палома · из бара', desc: 'Текила, грейпфрут, лайм и содовая — доплата' },
  'br-14': { name: 'Мимоза · из бара', desc: 'Апельсин и просекко — доплата' },
  'br-15': { name: 'Беллини · из бара', desc: 'Белые персики и просекко — доплата' },
  'br-16': { name: 'Домашнее вино · из бара', desc: 'Розовое / Белое / Красное — доплата' },
  'br-17': { name: 'Разливное пиво · из бара', desc: 'Голдстар / Мёрфис — доплата' },
  'bz-01': { name: 'Закуска на выбор', desc: 'Полента (кукурузный крем, масло и пармезан) · Салат Цезарь (ромэн, пармезан и гренки) · Салат панцанелла (овощи с рынка, гренки и орегано)' },
  'bz-02': { name: 'Основное блюдо на выбор', desc: 'Выбор паст, рыбы и мясных блюд из меню' },
  'bz-03': { name: 'Десерт на выбор', desc: 'Башня «Павлова» · Тирамису как у мамы · Фруктовый сорбет — доплата' },
  'bz-04': { name: 'Специальные предложения бара', desc: 'Апероль Шприц · Палома · Мимоза · Беллини · Домашнее вино · Разливное пиво — доплата' },
  'ck-01': { name: 'Негрони', desc: 'Джин, кампари и красный вермут (демо — будет заменено реальным барным меню)' },
  'ck-02': { name: 'Апероль Шприц', desc: 'Апероль, просекко и содовая' },
  'ck-03': { name: 'Палома', desc: 'Текила, грейпфрут, лайм и содовая' },
  'ck-04': { name: 'Беллини', desc: 'Пюре из белых персиков и просекко' },
  'wn-01': { name: 'Кьянти Классико', desc: 'Тоскана, Италия (демо — будет заменено настоящей винной картой)', unit2_label: 'бокал' },
  'wn-02': { name: 'Примитиво', desc: 'Апулия, Италия — фруктовое и мягкое', unit2_label: 'бокал' },
  'wn-03': { name: 'Верментино', desc: 'Сардиния — белое, минеральное и свежее', unit2_label: 'бокал' },
  'wn-04': { name: 'Домашнее вино', desc: 'Розовое / Белое / Красное — бокалами' },
};

for (const n of ['01', '02', '03', '04', '05', '06', '07', '08']) {
  RU[`dt-${n}`] = RU[`ds-${n}`];
}

const MENU_ITEM_TRANSLATIONS: Partial<Record<Locale, ItemTranslations>> = { en: EN, ru: RU };

const SITE_NOTE_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  en: {
    wine_pouring_note: 'Over 200 bottles in our wine cellar — ask our team about a tour.',
    allergen_note:
      'Dishes may contain allergens. For questions about ingredients and allergens, our team is happy to help.',
    price_vat_note: 'Prices are in new Israeli shekels (₪) and include VAT.',
    business_price_note: 'The price is set by the chosen main course.',
  },
  ru: {
    wine_pouring_note: 'Более 200 бутылок в нашем винном погребе — спросите персонал об экскурсии.',
    allergen_note:
      'Блюда могут содержать аллергены. По вопросам о составе и аллергенах — наш персонал всегда поможет.',
    price_vat_note: 'Цены указаны в новых израильских шекелях (₪) и включают НДС.',
    business_price_note: 'Цена определяется выбранным основным блюдом.',
  },
};

export interface TranslatedItem extends MenuItem {
  display_name: string;
  display_desc: string;
  display_unit2_label?: string;
}

/** Merges a locale's machine translation over the Hebrew snapshot item. Falls
 *  back to the Hebrew field whenever a translation is missing (never blank). */
export function translateMenuItem(item: MenuItem, locale: Locale): TranslatedItem {
  const t = locale === 'he' ? undefined : MENU_ITEM_TRANSLATIONS[locale]?.[item.id];
  return {
    ...item,
    display_name: t?.name ?? item.name_he,
    display_desc: t?.desc ?? item.desc_he,
    display_unit2_label: t?.unit2_label ?? item.unit2_label,
  };
}

export function translateNote(key: string, fallback: string, locale: Locale): string {
  if (locale === 'he') return fallback;
  return SITE_NOTE_TRANSLATIONS[locale]?.[key] ?? fallback;
}
