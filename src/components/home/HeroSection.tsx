import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  ArrowRight, ChevronLeft, ChevronRight, Award, ChevronDown,
  Tag, Car, Truck, Package, Layers, Weight, Caravan, Building2,
  Bike, Ship, Zap, AlertTriangle, Wrench, Home, RefreshCw,
  Factory, Box, Snowflake, Gauge, Cog, Fish, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import trailerImage1 from "@/assets/products/trailer-1.jpg";
import trailerImage2 from "@/assets/products/trailer-2.jpg";
import trailerImage3 from "@/assets/products/trailer-3.jpg";

const slides = [
  { id: 1, title: "Автомобильные прицепы", highlight: "СКИФ", image: trailerImage1, buttonText: "В каталог", buttonLink: "/catalog" },
  { id: 2, title: "Прицепы для лодок", highlight: "и катеров", image: trailerImage2, buttonText: "Смотреть", buttonLink: "/catalog/lodki" },
  { id: 3, title: "Прицепы для", highlight: "мототехники", image: trailerImage3, buttonText: "Подробнее", buttonLink: "/catalog/moto" },
];

type SubCat = { id: string; name: string; children?: SubCat[] };
type Cat = {
  id: string; name: string; href: string; icon: LucideIcon;
  badge?: { label: string; tone: "danger" | "accent" };
  children?: SubCat[];
};

const sub = (parent: string, id: string) => `/catalog/${parent}?sub=${id}`;

const heroCategories: Cat[] = [
  { id: "sale", name: "Распродажа", href: "/catalog/sale", icon: Tag, badge: { label: "-30%", tone: "danger" } },
  {
    id: "odnoosnye", name: "Одноосные прицепы", href: "/catalog/odnoosnye", icon: Car,
    children: [
      { id: "do-750", name: "До 750 кг" },
      { id: "750-1500", name: "750 – 1500 кг" },
      { id: "1500+", name: "От 1500 кг" },
    ],
  },
  {
    id: "dvuhosnye", name: "Двухосные прицепы", href: "/catalog/dvuhosnye", icon: Truck,
    children: [
      { id: "do-1500", name: "До 1500 кг" },
      { id: "1500-2500", name: "1500 – 2500 кг" },
      { id: "2500+", name: "От 2500 кг" },
    ],
  },
  { id: "platforma", name: "Прицепы платформа", href: "/catalog/platforma", icon: Layers },
  {
    id: "s-kryshkoy", name: "Прицепы с крышкой", href: "/catalog/s-kryshkoy", icon: Package,
    children: [
      { id: "abs", name: "Крышка ABS" },
      { id: "alu", name: "Алюминиевая" },
      { id: "tent", name: "Тент" },
    ],
  },
  { id: "gruzy", name: "Прицепы для грузов", href: "/catalog/gruzy", icon: Weight },
  { id: "furgony", name: "Прицепы фургоны", href: "/catalog/furgony", icon: Caravan },
  { id: "kommercheskie", name: "Коммерческие", href: "/catalog/kommercheskie", icon: Building2 },
  {
    id: "lodki", name: "Для лодок и катеров", href: "/catalog/lodki", icon: Ship,
    badge: { label: "Хит", tone: "accent" },
    children: [
      { id: "pvh", name: "Для ПВХ лодок" },
      { id: "katera-6", name: "Для катеров до 6 м" },
      { id: "katera-6plus", name: "Для катеров 6 м+" },
      { id: "gidro", name: "Для гидроциклов" },
    ],
  },
  {
    id: "moto", name: "Для мототехники", href: "/catalog/moto", icon: Bike,
    badge: { label: "Хит", tone: "accent" },
    children: [
      { id: "1-moto", name: "Для 1 мотоцикла" },
      { id: "2-moto", name: "Для 2 мотоциклов" },
      {
        id: "kvadro", name: "Для квадроциклов",
        children: [
          { id: "kvadro-light", name: "Лёгкие" },
          { id: "kvadro-heavy", name: "Тяжёлые" },
        ],
      },
    ],
  },
  { id: "elektrostancii", name: "Для электростанций", href: "/catalog/elektrostancii", icon: Zap },
  { id: "evakuatory", name: "Эвакуаторы", href: "/catalog/evakuatory", icon: AlertTriangle },
  { id: "spectehnika", name: "Для спецтехники", href: "/catalog/spectehnika", icon: Wrench },
  { id: "bytovki", name: "Бытовки на колёсах", href: "/catalog/bytovki", icon: Home },
  {
    id: "snegohody", name: "Снегоходы и вездеходы", href: "/catalog/snegohody", icon: Snowflake,
    children: [
      { id: "1-sneg", name: "Для 1 снегохода" },
      { id: "2-sneg", name: "Для 2 снегоходов" },
    ],
  },
  { id: "motobuksirovschiki", name: "Мотобуксировщики", href: "/catalog/motobuksirovschiki", icon: Gauge },
  { id: "bu", name: "Прицепы Б/У", href: "/catalog/bu", icon: RefreshCw },
  { id: "prokat", name: "Прицепы в прокат", href: "/catalog/prokat", icon: RefreshCw },
  { id: "proizvoditeli", name: "По производителям", href: "/catalog/proizvoditeli", icon: Factory },
  {
    id: "zapchasti", name: "Запчасти и аксессуары", href: "/catalog/zapchasti", icon: Cog,
    children: [
      { id: "tormoza", name: "Тормозные системы" },
      { id: "elektrika", name: "Электрика" },
      {
        id: "podveska", name: "Подвеска",
        children: [
          { id: "ressory", name: "Рессоры" },
          { id: "amort", name: "Амортизаторы" },
        ],
      },
    ],
  },
  { id: "boksy", name: "Боксы и багажники", href: "/catalog/boksy", icon: Box },
  { id: "rybalka", name: "Товары для рыбалки", href: "/catalog/rybalka", icon: Fish },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [popup, setPopup] = useState<{ cat: Cat; top: number; left: number } | null>(null);
  const hideTimer = useRef<number | null>(null);

  const toggle = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const cancelHide = () => {
    if (hideTimer.current) { window.clearTimeout(hideTimer.current); hideTimer.current = null; }
  };
  const scheduleHide = () => {
    cancelHide();
    hideTimer.current = window.setTimeout(() => setPopup(null), 180);
  };
  const openPopup = (cat: Cat, el: HTMLElement) => {
    if (!cat.children?.length) return;
    cancelHide();
    const r = el.getBoundingClientRect();
    const w = 320;
    let left = r.right + 8;
    if (left + w > window.innerWidth - 8) left = Math.max(8, r.left - w - 8);
    setPopup({ cat, top: r.top, left });
  };


  const changeSlide = useCallback((newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPreviousSlide(currentSlide);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 800);
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => changeSlide((currentSlide + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide, changeSlide]);

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = slides[currentSlide];

  /* ---------- Renderers ---------- */

  const SubItem = ({ parent, item, depth }: { parent: string; item: SubCat; depth: number }) => {
    const key = `${parent}/${item.id}`;
    const isOpen = !!expanded[key];
    const hasChildren = !!item.children?.length;
    const pad = depth === 1 ? "pl-14" : "pl-20";
    return (
      <div>
        <div className={`flex items-center group rounded-md hover:bg-muted/70 ${pad} pr-2`}>
          <Link
            to={sub(parent, item.id)}
            className="flex-1 py-1.5 text-[0.875rem] text-foreground/85 hover:text-primary leading-snug"
          >
            {item.name}
          </Link>
          {hasChildren && (
            <button
              type="button"
              onClick={() => toggle(key)}
              aria-label={isOpen ? "Свернуть" : "Развернуть"}
              className="shrink-0 h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        {hasChildren && isOpen && (
          <div className="space-y-0.5">
            {item.children!.map((c) => (
              <SubItem key={c.id} parent={parent} item={c} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const CategoryRow = ({ cat, compact = false, hoverFlyout = false }: { cat: Cat; compact?: boolean; hoverFlyout?: boolean }) => {
    const Icon = cat.icon;
    const isOpen = !!expanded[cat.id];
    const hasChildren = !!cat.children?.length;
    const chipSize = compact ? "w-8 h-8" : "w-9 h-9";
    const iconSize = compact ? "h-4 w-4" : "h-[18px] w-[18px]";
    const padY = compact ? "py-1.5" : "py-2";
    const text = compact ? "text-[0.95rem]" : "text-[1rem]";

    const rowProps = hoverFlyout
      ? {
          onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => openPopup(cat, e.currentTarget),
          onMouseLeave: scheduleHide,
        }
      : {};

    return (
      <div>
        <div
          {...rowProps}
          className={`flex items-center gap-2 rounded-lg hover:bg-muted/70 group transition-colors pr-1 ${popup?.cat.id === cat.id ? "bg-muted/70" : ""}`}
        >
          <Link to={cat.href} className={`flex-1 flex items-center gap-3 pl-2 ${padY} min-w-0`}>
            <span className={`${chipSize} shrink-0 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center transition-colors`}>
              <Icon className={iconSize} strokeWidth={1.75} />
            </span>
            <span className={`flex-1 min-w-0 font-semibold ${text} text-foreground leading-tight truncate`}>
              {cat.name}
            </span>
            {cat.badge && (
              <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                cat.badge.tone === "danger"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-accent text-accent-foreground"
              }`}>
                {cat.badge.label}
              </span>
            )}
          </Link>
          {hasChildren ? (
            hoverFlyout ? (
              <span className="shrink-0 h-8 w-8 text-muted-foreground flex items-center justify-center">
                <ChevronRight className="h-4 w-4" />
              </span>
            ) : (
              <button
                type="button"
                onClick={() => toggle(cat.id)}
                aria-label={isOpen ? "Свернуть" : "Развернуть"}
                className="shrink-0 h-8 w-8 rounded-md hover:bg-muted text-muted-foreground flex items-center justify-center"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
            )
          ) : (
            <span className="shrink-0 w-8" />
          )}
        </div>
        {!hoverFlyout && hasChildren && isOpen && (
          <div className="mt-0.5 mb-1 space-y-0.5">
            {cat.children!.map((c) => (
              <SubItem key={c.id} parent={cat.id} item={c} depth={1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* Popup flyout for desktop hover */
  const PopupItem = ({ parent, item }: { parent: string; item: SubCat }) => {
    const hasKids = !!item.children?.length;
    return (
      <div>
        <Link
          to={sub(parent, item.id)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[1rem] font-semibold text-foreground hover:bg-muted/70 hover:text-primary leading-tight"
        >
          <span className="flex-1 min-w-0 truncate">{item.name}</span>
          {hasKids && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
        </Link>
        {hasKids && (
          <div className="ml-3 pl-3 border-l border-border space-y-0.5 mb-1">
            {item.children!.map((c) => (
              <Link
                key={c.id}
                to={sub(parent, c.id)}
                className="block px-3 py-1.5 rounded-md text-[0.95rem] text-foreground/85 hover:bg-muted/70 hover:text-primary leading-tight"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };


  const asideHeader = (
    <div className="px-5 py-3 gradient-primary text-primary-foreground">
      <h2 className="text-lg md:text-xl font-heading font-black leading-tight">Каталог техники</h2>
      <p className="text-xs opacity-90">Выберите категорию</p>
    </div>
  );

  const asideFooter = (
    <div className="px-4 py-2 border-t border-border bg-muted/50">
      <Link to="/catalog" className="block text-center text-sm font-bold text-primary hover:underline">
        Весь каталог →
      </Link>
    </div>
  );

  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Mobile: H1 + catalog */}
      <div className="md:hidden container relative pt-6 pb-8">
        <h1 className="text-3xl font-heading font-black leading-tight text-center mb-5">
          {currentSlideData.title} <span className="text-accent">{currentSlideData.highlight}</span>
        </h1>

        <aside className="bg-card text-card-foreground rounded-2xl shadow-xl overflow-hidden">
          {asideHeader}
          <nav className="p-2 max-h-[42vh] overflow-y-auto scrollbar-thin">
            <div className="space-y-0.5">
              {heroCategories.map((c) => <CategoryRow key={c.id} cat={c} compact />)}
            </div>
          </nav>
          {asideFooter}
        </aside>
      </div>

      {/* Desktop/tablet hero */}
      <div className="hidden md:block container relative pt-6 md:pt-8 lg:pt-10 pb-24 md:pb-28 lg:pb-32">
        <div className="grid gap-5 lg:gap-6 lg:grid-cols-12 items-stretch">

          <div className="lg:col-span-4 lg:relative">
            <aside className="bg-card text-card-foreground rounded-2xl shadow-xl overflow-hidden flex flex-col lg:absolute lg:inset-0">
              {asideHeader}
              <nav className="p-2 flex-1 min-h-0 overflow-y-auto scrollbar-thin">
                <div className="space-y-0.5">
                  {heroCategories.map((c) => <CategoryRow key={c.id} cat={c} hoverFlyout />)}
                </div>
              </nav>
              {asideFooter}
            </aside>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="text-center lg:text-left overflow-hidden mb-6">
              <h1 key={`title-${currentSlide}`} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black leading-tight animate-slide-up">
                {currentSlideData.title} <span className="text-accent">{currentSlideData.highlight}</span>
              </h1>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-primary-foreground/90 bg-background/15 backdrop-blur-sm rounded-full px-4 py-1.5 w-fit mx-auto lg:mx-0 border border-background/20">
              <Award className="h-4 w-4 text-accent" />
              <span>Более 15 лет на рынке</span>
            </div>

            <div className="relative">
              <div className="aspect-[16/9] lg:aspect-[16/8] xl:aspect-[16/7] rounded-2xl overflow-hidden border border-background/20 shadow-2xl relative">
                {slides.map((slide, index) => (
                  <div key={slide.id} className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === currentSlide ? 'opacity-100 scale-100 translate-x-0 z-10'
                      : index === previousSlide ? 'opacity-0 scale-110 -translate-x-full z-0'
                      : 'opacity-0 scale-95 translate-x-full z-0'
                  }`}>
                    <img src={slide.image} alt={`${slide.title} ${slide.highlight}`}
                      className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-linear ${index === currentSlide && isAutoPlaying ? 'scale-110' : 'scale-100'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                ))}
              </div>

              <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all z-20" aria-label="Предыдущий слайд">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all z-20" aria-label="Следующий слайд">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2">
              {slides.map((slide, index) => (
                <button key={slide.id} onClick={() => {
                  if (index !== currentSlide) {
                    changeSlide(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }
                }} className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-primary-foreground/40 hover:bg-primary-foreground/60'
                }`} aria-label={`Перейти к слайду ${index + 1}`} />
              ))}
            </div>

            <div key={`buttons-${currentSlide}`} className="flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start animate-fade-in-up">
              <Link to={currentSlideData.buttonLink}>
                <Button size="lg" className="gradient-accent text-accent-foreground font-bold text-base px-6 hover:opacity-90 shadow-lg">
                  {currentSlideData.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="bg-background/10 border-2 border-background/30 text-primary-foreground font-bold text-base px-6 hover:bg-background/20 backdrop-blur-sm">
                  Наши услуги
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 -mb-px pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 md:h-12 block">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      {popup && typeof document !== "undefined" && createPortal(
        <div
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
          style={{ position: "fixed", top: popup.top, left: popup.left, width: 320, maxHeight: "70vh" }}
          className="z-[60] bg-card text-card-foreground rounded-xl shadow-2xl border border-border p-2 overflow-y-auto scrollbar-thin animate-fade-in"
        >
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground border-b border-border mb-1">
            {popup.cat.name}
          </div>
          <div className="space-y-0.5">
            {popup.cat.children!.map((c) => (
              <PopupItem key={c.id} parent={popup.cat.id} item={c} />
            ))}
          </div>
        </div>,
        document.body
      )}
    </section>

  );
};

export default HeroSection;
