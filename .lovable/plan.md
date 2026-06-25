## HTML-версия

**1. Крупные флажки на карточках товаров (`public/bitrix/css/products.css`, `catalog.css`, `category-page.css` и HTML-разметка карточек)**
- Бейджи "Хит", "Новинка", "Скидка/-10%" — увеличить шрифт (~14px), padding 6px 12px, как в React (`text-sm px-3 py-1.5`).
- Иконка пламени у "Хит".

**2. Текст в карточках товара (HTML-версия каталога и главной)**
- Название: `text-sm sm:text-base` → ~15–16px, font-weight 700.
- Категория сверху: uppercase, ~12px, muted.
- Цена: ~20–24px, bold.
- Старая цена / выгода — как в React.
- Кнопка "В корзину" — крупнее, с иконкой.

**3. SEO-текст на главной (`index.html` + `css/products.css`/общий)**
- Подогнать размеры заголовков и абзацев к React-версии `SeoSection` (h2 крупный, p — base/lg).

## Общие правки (React + HTML)

**4. Мобильная шапка крупнее**
- React: `src/components/layout/Header.tsx` — увеличить высоту mobile-бара, размер логотипа и иконки бургера.
- HTML: `public/bitrix/css/header.css` — те же изменения через media-queries.

**5. Мобильная hero-секция — только H1**
- React: `HeroSection.tsx` — на `<md` скрыть слайдер/CTA/изображения, оставить только заголовок.
- HTML: `css/hero.css` + при необходимости `index.html` — добавить классы `hidden md:flex` / media-queries.

**6. Открытие товара по клику на всю карточку**
- React: `ProductCard.tsx` — обернуть карточку в `<Link>`, убрать overlay с кнопкой "Подробнее" (или оставить визуально без отдельного клика). Кнопка корзины/избранного по-прежнему останавливают всплытие.
- HTML: соответствующие карточки в каталоге/категориях/главной — сделать всю превью кликабельной ссылкой, убрать overlay-кнопку.

**7. Анимация "товар улетает в корзину"**
- React: в `ProductCard.handleAddToCart` — клонировать `<img>`, абсолютно спозиционировать поверх, transition в координаты иконки корзины в шапке (querySelector по data-атрибуту), затем удалить. Лёгкий bounce у иконки корзины.
- HTML: аналогичный JS в `public/bitrix/html/js/skif.js` (или inline) на все кнопки "В корзину".

**8. Компактная шапка категорий каталога (`/catalog/odnoosnye` и аналоги)**
- React: `src/pages/Category.tsx` — уменьшить верхний padding, размер H1, breadcrumbs компактнее, убрать лишний описательный блок выше товаров (или свернуть).
- HTML: `public/bitrix/html/category.html` + `css/category-page.css` — аналогично.

**9. Мобильный каталог: 2 в ряд в grid, 1 в ряд в list**
- React: `Catalog.tsx`/`Category.tsx` — сетка `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` (уже есть в SearchResults, проверить остальные). List — `flex flex-col`.
- HTML: `css/catalog.css` — `.products-grid` на мобильном `grid-template-columns: repeat(2, 1fr)`, list — 1 колонка.

## Технические детали

- Бейджи в HTML-версии генерируются как `<span class="product-badge product-badge--hit">…</span>`; нужно расширить CSS-классы и добавить SVG иконку пламени.
- Анимация "fly to cart": создаём клон изображения, `getBoundingClientRect()` источника и цели, `position: fixed`, CSS transition 600ms `cubic-bezier(.5,-0.5,.5,1.5)` на `transform` + `opacity`, после `transitionend` удалить и кратко scale-pulse у иконки корзины.
- Для React-карточки клик по всей карточке: внешний `<Link>` оборачивает `<Card>`; внутренние интерактивные элементы (`Heart`, `В корзину`) используют `e.preventDefault(); e.stopPropagation();`.
- Hero на мобильном: оставить только `<h1>` внутри контейнера, остальное `hidden md:block`. В HTML — media-query `@media (max-width: 767px) { .hero-slider, .hero-cta, .hero-image { display: none; } }`.

После правок проверю сборку и визуально через Playwright (desktop + mobile).