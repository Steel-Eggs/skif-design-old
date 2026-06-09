import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, ChevronLeft, ChevronRight, ChevronRight as Arrow } from "lucide-react";
import { Button } from "@/components/ui/button";
import trailerImage1 from "@/assets/products/trailer-1.jpg";
import trailerImage2 from "@/assets/products/trailer-2.jpg";
import trailerImage3 from "@/assets/products/trailer-3.jpg";

const slides = [
  {
    id: 1,
    title: "Автомобильные прицепы",
    highlight: "СКИФ",
    description: "Надёжные прицепы для легковых автомобилей. Широкий ассортимент, гарантия и доступные цены.",
    image: trailerImage1,
    buttonText: "В каталог",
    buttonLink: "/catalog",
  },
  {
    id: 2,
    title: "Прицепы для лодок",
    highlight: "и катеров",
    description: "Специализированные прицепы для безопасной транспортировки водного транспорта.",
    image: trailerImage2,
    buttonText: "Смотреть",
    buttonLink: "/catalog/lodki",
  },
  {
    id: 3,
    title: "Прицепы для",
    highlight: "мототехники",
    description: "Удобные решения для перевозки мотоциклов, квадроциклов и снегоходов.",
    image: trailerImage3,
    buttonText: "Подробнее",
    buttonLink: "/catalog/moto",
  },
];

const heroCategories = [
  { name: "Распродажа", href: "/catalog/sale", icon: "🏷️" },
  { name: "Одноосные прицепы", href: "/catalog/odnoosnye", icon: "🚗" },
  { name: "Двухосные прицепы", href: "/catalog/dvuhosnye", icon: "🚙" },
  { name: "Прицепы платформа", href: "/catalog/platforma", icon: "📐" },
  { name: "Прицепы с крышкой", href: "/catalog/s-kryshkoy", icon: "📦" },
  { name: "Прицепы фургоны", href: "/catalog/furgony", icon: "🚐" },
  { name: "Для лодок и катеров", href: "/catalog/lodki", icon: "🚤" },
  { name: "Для мототехники", href: "/catalog/moto", icon: "🏍️" },
  { name: "Снегоходы и вездеходы", href: "/catalog/snegohody", icon: "❄️" },
  { name: "Бытовки на колёсах", href: "/catalog/bytovki", icon: "🏠" },
  { name: "Запчасти и аксессуары", href: "/catalog/zapchasti", icon: "🔩" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const changeSlide = useCallback((newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPreviousSlide(currentSlide);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 800);
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      changeSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide, changeSlide]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    changeSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

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

  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container relative py-8 md:py-12 lg:py-16">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-stretch">

          {/* CATALOG (left on desktop, top on mobile) */}
          <aside className="lg:col-span-4 bg-card text-card-foreground rounded-2xl shadow-xl overflow-hidden">
            <div className="px-5 py-4 gradient-primary text-primary-foreground">
              <h2 className="text-xl md:text-2xl font-heading font-black">Каталог техники</h2>
              <p className="text-sm opacity-90">Выберите категорию</p>
            </div>

            {/* Desktop: vertical list */}
            <nav className="hidden lg:block divide-y divide-border max-h-[560px] overflow-y-auto">
              {heroCategories.map((c) => (
                <Link
                  key={c.name}
                  to={c.href}
                  className="flex items-center gap-3 px-5 py-3.5 text-base font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"
                >
                  <span className="text-2xl shrink-0">{c.icon}</span>
                  <span className="flex-1 leading-tight">{c.name}</span>
                  <Arrow className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </nav>

            {/* Mobile: 2-col tile grid */}
            <div className="lg:hidden grid grid-cols-2 gap-px bg-border">
              {heroCategories.slice(0, 10).map((c) => (
                <Link
                  key={c.name}
                  to={c.href}
                  className="flex flex-col items-center justify-center text-center gap-2 p-4 bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors min-h-[100px]"
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span className="text-sm font-semibold leading-tight">{c.name}</span>
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-muted/50">
              <Link to="/catalog" className="block text-center text-base font-bold text-primary hover:underline">
                Весь каталог →
              </Link>
            </div>
          </aside>

          {/* SLIDER (right) */}
          <div className="lg:col-span-8 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-5 text-center lg:text-left relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full text-sm font-medium backdrop-blur-sm">
                <Award className="h-4 w-4" />
                <span>Более 15 лет на рынке</span>
              </div>

              <div className="overflow-hidden">
                <h1
                  key={`title-${currentSlide}`}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-tight animate-slide-up"
                >
                  {currentSlideData.title}{" "}
                  <span className="text-accent">{currentSlideData.highlight}</span>
                </h1>
              </div>

              <div className="overflow-hidden">
                <p
                  key={`desc-${currentSlide}`}
                  className="text-base md:text-lg text-primary-foreground/85 leading-relaxed animate-slide-up-delayed"
                >
                  {currentSlideData.description}
                </p>
              </div>

              <div
                key={`buttons-${currentSlide}`}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up"
              >
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

              <div className="flex items-center gap-3 justify-center lg:justify-start pt-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="relative h-3 rounded-full overflow-hidden"
                    style={{
                      width: currentSlide === index ? '2.5rem' : '0.75rem',
                      backgroundColor: currentSlide === index ? 'hsl(var(--accent) / 0.3)' : 'hsl(var(--background) / 0.3)',
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease',
                    }}
                    aria-label={`Слайд ${index + 1}`}
                  >
                    {currentSlide === index && isAutoPlaying && (
                      <span key={`progress-${currentSlide}`} className="absolute inset-0 bg-accent rounded-full origin-left animate-progress" style={{ animationDuration: '5s' }} />
                    )}
                    {currentSlide === index && !isAutoPlaying && (
                      <span className="absolute inset-0 bg-accent rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-heading font-black text-accent">500+</div>
                  <div className="text-xs md:text-sm text-primary-foreground/70">моделей</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-heading font-black text-accent">15000+</div>
                  <div className="text-xs md:text-sm text-primary-foreground/70">клиентов</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-heading font-black text-accent">2 года</div>
                  <div className="text-xs md:text-sm text-primary-foreground/70">гарантии</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-background/20 shadow-2xl relative">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        index === currentSlide
                          ? 'opacity-100 scale-100 translate-x-0 z-10'
                          : index === previousSlide
                            ? 'opacity-0 scale-110 -translate-x-full z-0'
                            : 'opacity-0 scale-95 translate-x-full z-0'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={`${slide.title} ${slide.highlight}`}
                        className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-linear ${
                          index === currentSlide && isAutoPlaying ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all"
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all"
                  aria-label="Следующий слайд"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute -bottom-5 -left-5 z-20 bg-card text-card-foreground p-3 rounded-xl shadow-lg animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center">
                      <Shield className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm">Гарантия качества</div>
                      <div className="text-xs text-muted-foreground">Бесплатный сервис</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 -mb-px pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
