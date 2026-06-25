import { useParams, Link } from "react-router-dom";
import { 
  Car, Truck, Anchor, Bike, AlertTriangle, Wrench, Caravan, Zap, 
  Building2, Home, RefreshCw, Tag, Package, Warehouse, Snowflake,
  Fish, Cog, Compass, Box, Grid, List
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// Category data mapping with SEO texts
const categoryData: Record<string, { 
  name: string; 
  description: string; 
  icon: any; 
  color: string;
  seoTitle?: string;
  seoText?: string;
}> = {
  "sale": { 
    name: "Распродажа", 
    description: "Лучшие цены на популярные модели", 
    icon: Tag, 
    color: "from-red-500 to-orange-500",
    seoTitle: "Выгодные предложения на прицепы",
    seoText: "В разделе распродажи представлены прицепы по специальным ценам. Это отличная возможность приобрести качественный прицеп от ведущих производителей по выгодной цене. Все модели проходят проверку качества и имеют полную гарантию. Ассортимент регулярно обновляется — следите за новыми предложениями!"
  },
  "odnoosnye": { 
    name: "Одноосные прицепы", 
    description: "Компактные решения для перевозки грузов", 
    icon: Car, 
    color: "from-primary to-primary/80",
    seoTitle: "Одноосные прицепы — компактность и манёвренность",
    seoText: "Одноосные прицепы — это оптимальное решение для перевозки небольших грузов. Они отличаются компактностью, лёгкостью управления и экономичностью. Идеально подходят для дачников, рыболовов и владельцев небольших грузов. Доступны модели с различной грузоподъёмностью, с тентом или открытые. Все прицепы соответствуют ГОСТу и имеют сертификаты качества."
  },
  "dvuhosnye": { 
    name: "Двухосные прицепы", 
    description: "Для больших и тяжёлых грузов", 
    icon: Truck, 
    color: "from-primary to-primary/80",
    seoTitle: "Двухосные прицепы — надёжность и грузоподъёмность",
    seoText: "Двухосные прицепы, несмотря на высокую стоимость, пользуются популярностью среди водителей. Условно они делятся на две категории: универсальные и специализированные. Универсальные — это бортовые прицепы с многофункциональным назначением для дачников, рыболовов, туристов и предпринимателей. Специализированные предназначены для транспортировки конкретного вида груза: квадроциклов, лодок, снегоходов. Можно выделить несколько подвидов: стандартные с бортами из металла, модели с тентом, изделия с функцией самосвала, удлинённые для габаритных грузов."
  },
  "s-kryshkoy": { 
    name: "Прицепы с крышкой", 
    description: "Защита груза от погодных условий", 
    icon: Caravan, 
    color: "from-primary to-primary/80",
    seoTitle: "Прицепы с крышкой — защита от непогоды",
    seoText: "Прицепы с крышкой обеспечивают надёжную защиту груза от дождя, снега и пыли. Жёсткая крышка выполнена из прочных материалов и оснащена замками для безопасности. Такие модели подходят для перевозки инструментов, техники, личных вещей. Доступны различные размеры под любые задачи."
  },
  "platforma": { 
    name: "Прицепы платформа", 
    description: "Универсальные платформы для любых задач", 
    icon: Building2, 
    color: "from-primary to-primary/80",
    seoTitle: "Прицепы-платформы — универсальность применения",
    seoText: "Прицепы-платформы — универсальное решение для перевозки крупногабаритных и нестандартных грузов. Ровная площадка позволяет размещать технику, стройматериалы, контейнеры. Усиленная рама выдерживает значительные нагрузки. Возможна комплектация бортами, трапами, лебёдкой."
  },
  "furgony": { 
    name: "Прицепы фургоны", 
    description: "Закрытые кузова для защиты груза", 
    icon: Warehouse, 
    color: "from-primary to-primary/80",
    seoTitle: "Прицепы-фургоны — полная защита груза",
    seoText: "Прицепы-фургоны с закрытым кузовом обеспечивают максимальную защиту груза. Идеальны для перевозки товаров, требующих защиты от погоды и посторонних глаз. Доступны модели с утеплением для температурочувствительных грузов."
  },
  "kommercheskie": { 
    name: "Коммерческие прицепы", 
    description: "Для бизнеса и торговли", 
    icon: Building2, 
    color: "from-primary to-primary/80",
    seoTitle: "Коммерческие прицепы — для вашего бизнеса",
    seoText: "Коммерческие прицепы разработаны для нужд бизнеса: торговые точки на колёсах, мобильные кухни, выставочные павильоны. Можно заказать индивидуальную комплектацию под ваши требования."
  },
  "moto": { 
    name: "Прицепы для мототехники", 
    description: "Для мотоциклов и квадроциклов", 
    icon: Bike, 
    color: "from-primary to-primary/80",
    seoTitle: "Прицепы для мототехники — безопасная перевозка",
    seoText: "Специализированные прицепы для перевозки мотоциклов, квадроциклов и другой мототехники. Оснащены системами фиксации, трапами для заезда, антикоррозийным покрытием. Безопасность вашей техники гарантирована."
  },
  "lodki": { 
    name: "Прицепы для лодок и катеров", 
    description: "Для водного транспорта", 
    icon: Anchor, 
    color: "from-blue-500 to-cyan-500",
    seoTitle: "Лодочные прицепы — надёжная перевозка водного транспорта",
    seoText: "Лодочные прицепы специально разработаны для перевозки лодок, катеров и гидроциклов. Ролики и направляющие облегчают спуск и подъём судна. Оцинкованная рама устойчива к коррозии. Подберём модель под ваше судно."
  },
  "elektrostancii": { 
    name: "Прицепы для электростанций", 
    description: "Для генераторов и оборудования", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-500",
    seoTitle: "Прицепы для электростанций и генераторов",
    seoText: "Прицепы для транспортировки генераторов, электростанций и промышленного оборудования. Усиленная конструкция, виброзащита, возможность подключения без снятия с прицепа."
  },
  "evakuatory": { 
    name: "Прицепы эвакуаторы", 
    description: "Для транспортировки автомобилей", 
    icon: AlertTriangle, 
    color: "from-orange-500 to-red-500",
    seoTitle: "Прицепы-эвакуаторы — перевозка автомобилей",
    seoText: "Прицепы-эвакуаторы позволяют перевозить легковые автомобили, внедорожники, микроавтобусы. Лебёдка, трапы, надёжные крепления — всё для безопасной эвакуации."
  },
  "spectehnika": { 
    name: "Прицепы для спецтехники", 
    description: "Для перевозки тяжёлой техники", 
    icon: Cog, 
    color: "from-primary to-primary/80",
    seoTitle: "Прицепы для спецтехники — тяжёлые грузы",
    seoText: "Прицепы для перевозки тракторов, экскаваторов, погрузчиков и другой спецтехники. Высокая грузоподъёмность, усиленная рама, широкие трапы."
  },
  "bytovki": { 
    name: "Бытовки на колёсах", 
    description: "Мобильные помещения для работы", 
    icon: Home, 
    color: "from-green-500 to-emerald-500",
    seoTitle: "Бытовки на колёсах — мобильный комфорт",
    seoText: "Бытовки на колёсах — готовые мобильные помещения для отдыха или работы. Утеплённые, с электрикой, окнами и дверьми. Используются на стройках, дачах, в экспедициях."
  },
  "proekty": { 
    name: "Наши проекты", 
    description: "Индивидуальные решения на заказ", 
    icon: Compass, 
    color: "from-purple-500 to-pink-500",
    seoTitle: "Индивидуальные проекты прицепов",
    seoText: "Разрабатываем и изготавливаем прицепы по индивидуальным проектам. Любые размеры, комплектации, назначение. Воплотим вашу идею в жизнь."
  },
  "bu": { 
    name: "Прицепы Б/У", 
    description: "Проверенные б/у прицепы по выгодным ценам", 
    icon: RefreshCw, 
    color: "from-primary to-primary/80",
    seoTitle: "Б/У прицепы — проверенное качество",
    seoText: "Проверенные б/у прицепы по выгодным ценам. Каждая единица проходит техническую диагностику. Гарантия и документы в комплекте."
  },
  "prokat": { 
    name: "Прицепы в прокат", 
    description: "Аренда прицепов на любой срок", 
    icon: RefreshCw, 
    color: "from-primary to-primary/80",
    seoTitle: "Аренда прицепов — удобно и выгодно",
    seoText: "Прокат прицепов на любой срок: от нескольких часов до месяцев. Большой выбор моделей, гибкие условия, доставка. Идеально для разовых задач."
  },
  "proizvoditeli": { 
    name: "По производителям", 
    description: "Прицепы от ведущих производителей", 
    icon: Building2, 
    color: "from-primary to-primary/80",
    seoTitle: "Прицепы от ведущих производителей России",
    seoText: "Официальный дилер ведущих производителей прицепов: МЗСА, СКИФ, Курганские прицепы, Вектор, ССТ, Спутник. Оригинальная продукция с гарантией."
  },
  "zapchasti": { 
    name: "Запчасти и аксессуары", 
    description: "Комплектующие для прицепов", 
    icon: Wrench, 
    color: "from-gray-500 to-slate-600",
    seoTitle: "Запчасти и аксессуары для прицепов",
    seoText: "Оригинальные запчасти и аксессуары для прицепов всех марок. Ступицы, амортизаторы, тенты, фаркопы, электрика. Быстрая доставка, консультация специалистов."
  },
  "boksy": { 
    name: "Боксы и багажники", 
    description: "Автобоксы и багажные системы", 
    icon: Box, 
    color: "from-primary to-primary/80",
    seoTitle: "Автобоксы и багажные системы",
    seoText: "Автобоксы, багажники на крышу, поперечины, крепления для велосипедов и лыж. Увеличьте полезный объём вашего автомобиля."
  },
  "snegohody": { 
    name: "Снегоходы и вездеходы", 
    description: "Техника для бездорожья", 
    icon: Snowflake, 
    color: "from-cyan-500 to-blue-600",
    seoTitle: "Снегоходы и вездеходы — техника для зимы",
    seoText: "Снегоходы и вездеходы от проверенных производителей. Надёжная техника для охоты, рыбалки, работы. Сервис и запчасти в наличии."
  },
  "motobuksirovschiki": { 
    name: "Мотобуксировщики", 
    description: "Компактная техника для зимы", 
    icon: Compass, 
    color: "from-primary to-primary/80",
    seoTitle: "Мотобуксировщики — мобильность зимой",
    seoText: "Компактные мотобуксировщики для передвижения по снегу и льду. Отличная альтернатива снегоходу. Лёгкие, экономичные, помещаются в багажник."
  },
  "zapchasti-moto": { 
    name: "Запчасти для мотобуксировщиков", 
    description: "Комплектующие и расходники", 
    icon: Cog, 
    color: "from-primary to-primary/80",
    seoTitle: "Запчасти для мотобуксировщиков",
    seoText: "Запчасти, расходники и аксессуары для мотобуксировщиков. Гусеницы, двигатели, карбюраторы, ремни. Оригинал и качественные аналоги."
  },
  "rybalka": { 
    name: "Товары для рыбалки", 
    description: "Всё для успешной рыбалки", 
    icon: Fish, 
    color: "from-teal-500 to-cyan-500",
    seoTitle: "Товары для рыбалки",
    seoText: "Всё необходимое для рыбалки: лодки, моторы, эхолоты, палатки, снасти. Экипировка для летней и зимней рыбалки от проверенных брендов."
  },
};

// Mock products data
const allProducts: Product[] = [
  { id: 1, name: "Прицеп СКИФ-2500", price: 89000, oldPrice: 99000, brand: "СКИФ", isHit: true, inStock: true },
  { id: 2, name: "Прицеп МЗСА 817711", price: 125000, oldPrice: null, brand: "МЗСА", isNew: true, inStock: true },
  { id: 3, name: "Прицеп Курганский 8213", price: 78500, oldPrice: 85000, brand: "Курганские прицепы", inStock: true },
  { id: 4, name: "Прицеп Вектор ЛАВ 81012", price: 156000, oldPrice: null, brand: "Вектор", isHit: true, inStock: true },
  { id: 5, name: "Прицеп ССТ 7132-24", price: 234000, oldPrice: 250000, brand: "ССТ", inStock: false },
  { id: 6, name: "Прицеп Спутник 821311", price: 98000, oldPrice: null, brand: "Спутник", isNew: true, inStock: true },
  { id: 7, name: "Прицеп СКИФ-3500 Люкс", price: 145000, oldPrice: 159000, brand: "СКИФ", isHit: true, inStock: true },
  { id: 8, name: "Прицеп МЗСА 817719", price: 189000, oldPrice: null, brand: "МЗСА", inStock: true },
  { id: 9, name: "Прицеп Курганский 8219 Люкс", price: 112000, oldPrice: 125000, brand: "Курганские прицепы", inStock: true },
  { id: 10, name: "Прицеп Вектор ЛАВ 81015", price: 178000, oldPrice: null, brand: "Вектор", isNew: true, inStock: true },
  { id: 11, name: "Прицеп СКИФ-4000", price: 198000, oldPrice: 215000, brand: "СКИФ", inStock: true },
  { id: 12, name: "Прицеп Спутник 821315", price: 134000, oldPrice: null, brand: "Спутник", inStock: true },
];

const ITEMS_PER_PAGE = 8;

const Category = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const category = categorySlug ? categoryData[categorySlug] : null;
  const IconComponent = category?.icon || Package;

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Категория не найдена</h1>
            <Link to="/catalog">
              <Button>Вернуться в каталог</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Related categories for quick links (exclude current)
  const relatedCategories = [
    { slug: 'dvuhosnye', label: '🚙 Двухосные' },
    { slug: 's-kryshkoy', label: '📦 С крышкой' },
    { slug: 'lodki', label: '🚤 Для лодок' },
    { slug: 'evakuatory', label: '⚠️ Эвакуаторы' },
    { slug: 'moto', label: '🏍️ Для мото' },
  ].filter(c => c.slug !== categorySlug);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Header />
      
      <main className="flex-1">
        {/* Compact hero — minimal space */}
        <section className={`py-4 md:py-8 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
          <div className="container relative z-10 px-4">
            <nav className="flex items-center gap-2 text-white/70 text-xs md:text-sm mb-2 md:mb-3 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Главная</Link>
              <span>/</span>
              <Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link>
              <span>/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm items-center justify-center shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl md:text-3xl font-heading font-bold text-white leading-tight">
                    {category.name}
                  </h1>
                  <span className="text-xs md:text-sm text-white/80">
                    {allProducts.length} товаров в наличии
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex flex-wrap gap-2">
                {relatedCategories.slice(0, 4).map(rc => (
                  <Link
                    key={rc.slug}
                    to={`/category/${rc.slug}`}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                  >
                    {rc.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky toolbar */}
        <div className="sticky top-[65px] md:top-[73px] z-40 bg-card border-b border-border shadow-sm">
          <div className="container px-4 py-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Сетка"
                    className={`h-9 w-9 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="Список"
                    className={`h-9 w-9 flex items-center justify-center border-l border-border transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {allProducts.length} товаров
                </span>
              </div>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-border rounded-xl px-3 py-2 text-sm bg-card font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="name">По названию</option>
                <option value="new">Сначала новые</option>
              </select>
            </div>
          </div>
        </div>

        <section className="py-6 md:py-10">
          <div className="container px-4">
            <div className={`grid gap-3 sm:gap-5 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {paginatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      if (
                        page === 1 || 
                        page === totalPages || 
                        Math.abs(page - currentPage) <= 1
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return <PaginationEllipsis key={page} />;
                      }
                      return null;
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* SEO Text Section */}
            {category.seoTitle && category.seoText && (
              <div className="mt-12 md:mt-16 p-6 md:p-8 bg-muted/50 rounded-2xl">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4">
                  {category.seoTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {category.seoText}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Category;