## 1. Cookie consent — compact single‑line on mobile

**React (`src/components/CookieConsent.tsx`)**
- Replace the bottom-card layout with a slim bar pinned to the bottom: small truck icon, one-line text (truncated on overflow), two compact buttons "Принять" / "✕", no decorative wheels, no big trailer block.
- Mobile (`< md`): one horizontal row, `h-12`–`h-14`, full-width, sits above viewport bottom by `bottom-2`. Text uses `truncate` + `text-xs`.
- Desktop (`md+`): slightly larger but still a single bar, max-width ~640px centered or right-aligned.
- Keep the same accept/decline localStorage logic, animation, and `forwardRef` API.

**HTML (`public/bitrix/html/css/skif.css`)**
- Rewrite `.cookie-consent*` rules to match: flex row, `h: 3rem`, single-line text with `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`, small icon, two compact buttons. Drop the multi-line `<h4>` + `<p>` styling by hiding `h4` on mobile and shrinking `p`. On `>=768px` allow a touch more padding.
- HTML markup already exists across all pages — keep it but simplify the visible structure via CSS only (hide `<h4>` on small screens, single-line `<p>`).

## 2. Scrollable categories list

Long category list should scroll inside the aside without growing the hero.

**React (`src/components/home/HeroSection.tsx`)**
- Desktop `<nav>` (`lg:flex flex-col divide-y …`): give it `max-h-[480px] overflow-y-auto` with custom thin scrollbar styling (utility classes + a small CSS rule in `src/index.css` for `.scrollbar-thin`).
- Mobile grid: wrap in `max-h-[60vh] overflow-y-auto` so the full list (currently truncated to 11) becomes the same full list with vertical scroll.

**HTML**
- `public/bitrix/html/index.html`: add `style="max-height:480px;overflow-y:auto"` (or class) to the desktop `<nav>` and `max-height:60vh;overflow-y:auto` to the mobile `<nav>`. Expand the mobile grid to include all categories (parity with desktop).
- `public/bitrix/html/css/skif.css`: thin scrollbar styling.

## 3. Expandable 2nd / 3rd level subcategories

Each category becomes a collapsible row: clicking the chevron expands a list of subcategories; subcategories can themselves expand to 3rd-level items where defined. Clicking the label text still navigates to the category page.

**Data**
- Add a shared subcategory map (id → `{ name, href, children?: [...] }[]`) inline in `HeroSection.tsx`. Populate sensible Russian subcategories for the main types (одноосные → "До 750 кг", "750–1500 кг", "1500+ кг"; двухосные → similar; лодки → "Для ПВХ", "Для катеров до 6м", "Для катеров 6м+"; мото → "Для 1 мотоцикла", "Для 2 мотоциклов", "Для квадроциклов" → ("Лёгкие", "Тяжёлые"); запчасти → "Тормозные системы", "Электрика", "Подвеска" → ("Рессоры", "Амортизаторы"); etc.). Categories without children render as plain links (no chevron).

**React (`HeroSection.tsx`)**
- Introduce `expanded: Record<string, boolean>` state.
- Render each category row: label as `<Link>`, plus an inline chevron `<button>` (visible only if it has children) that toggles. Children render below indented (`pl-8`), level-3 indented further (`pl-12`), chevron rotates 90° on open. Same pattern reused on mobile (mobile rows currently grid — switch mobile to the same list layout for consistency and to support nesting).

**HTML**
- `public/bitrix/html/index.html`: expand markup so each category that has subs is `<div data-cat>` containing the link + chevron button + a `<div class="subcats hidden">` with `<a>` children (and nested `subcats` for level 3).
- `public/bitrix/html/js/skif.js`: add a small delegated click handler on `[data-cat-toggle]` that toggles `.hidden` on the next `.subcats` and rotates the chevron via a `.open` class.
- `public/bitrix/html/css/skif.css`: indentation + chevron rotation transition.

## 4. Nicer styling with neutral icons

Replace the current text-only / emoji-only rows with a polished list: round neutral icon chip on the left, category name, optional badge (e.g. "-30%" for Распродажа), chevron on the right.

**Icons (neutral, monochrome)**
- React: reuse the existing `lucide-react` set already present in the project (`Tag, Car, Truck, Anchor, Bike, Package, Layers, Weight, Caravan, Building2, Wrench, Home, Snowflake, Fish, Box, Factory, RefreshCw, Zap, AlertTriangle, Gauge, Cog`) — render at 18px in a `w-9 h-9 rounded-lg bg-muted text-muted-foreground` chip; on hover/active the whole row turns primary and the chip flips to `bg-primary-foreground/15 text-primary-foreground`.
- HTML: inline matching Lucide SVG paths for the same icons (one `<svg>` per row). Same chip styling via Tailwind utility classes.

**Visual polish**
- Drop the `divide-y` separators in favour of `space-y-0.5` and rounded-md hover (`hover:bg-muted`).
- Aside header (`gradient-primary`) gets a subtle bottom border and a "Каталог" eyebrow already there — leave wording.
- Active/hovered row highlights both the icon chip and the chevron.
- Mobile: same row design but compact (`h-12`, smaller icon chip `w-8 h-8`).

## Files to edit

- `src/components/CookieConsent.tsx` — rewrite compact bar.
- `src/components/home/HeroSection.tsx` — new category data with children/icons, scroll containers, expandable rows, polished row layout (both mobile and desktop).
- `src/index.css` — `.scrollbar-thin` rule.
- `public/bitrix/html/index.html` — new aside markup with icons + collapsible subcategory blocks (mobile + desktop), scroll wrappers, all categories on mobile.
- `public/bitrix/html/css/skif.css` — compact cookie bar, scrollbar styling, subcat indentation + chevron transition, icon-chip row styles.
- `public/bitrix/html/js/skif.js` — delegated toggle handler for category chevrons.
- Cookie markup across the other HTML pages stays as-is (CSS-only redesign so we don't have to touch 20+ files).

## Notes / non-goals

- Subcategory destinations link to `/catalog/<parent>?sub=<id>` (React) and `category.html?cat=<parent>&sub=<id>` (HTML) — purely presentational, no routing logic changes.
- No business logic, no data fetching, no React state moved out of the component.
- The mega-menu in the header (`CatalogMegaMenu.tsx`) is untouched.