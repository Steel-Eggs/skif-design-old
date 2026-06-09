import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronRight as Arrow, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import trailerImage1 from "@/assets/products/trailer-1.jpg";
import trailerImage2 from "@/assets/products/trailer-2.jpg";
import trailerImage3 from "@/assets/products/trailer-3.jpg";

const slides = [
  {
    id: 1,
    title: "Автомобильные прицепы",
    highlight: "СКИФ",
    image: trailerImage1,
    buttonText: "В каталог",
    buttonLink: "/catalog",
  },
  {
    id: 2,
    title: "Прицепы для лодок",
    highlight: "и катеров",
    image: trailerImage2,
    buttonText: "Смотреть",
    buttonLink: "/catalog/lodki",
  },
  {
    id: 3,
    title: "Прицепы для",
    highlight: "мототехники",
    image: trailerImage3,
    buttonText: "Подробнее",
    buttonLink: "/catalog/moto",
  },
];

const heroCategories = [
  { name: "Распродажа", href: "/catalog/sale" },
  { name: "Одноосные прицепы", href: "/catalog/odnoosnye" },
  { name: "Двухосные прицепы", href: "/catalog/dvuhosnye" },
  { name: "Прицепы платформа", href: "/catalog/platforma" },
  { name: "Прицепы с крышкой", href: "/catalog/s-kryshkoy" },
  { name: "Прицепы фургоны", href: "/catalog/furgony" },
  { name: "Для лодок и катеров", href: "/catalog/lodki" },
  { name: "Для мототехники", href: "/catalog/moto" },
  { name: "Снегоходы и вездеходы", href: "/catalog/snegohody" },
  { name: "Бытовки на колёсах", href: "/catalog/bytovki" },
  { name: "Запчасти и аксессуары", href: "/catalog/zapchasti" },
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

      <div className="container relative pt-6 md:pt-8 lg:pt-10 pb-24 md:pb-28 lg:pb-32">
        <div className="grid gap-5 lg:gap-6 lg:grid-cols-12 items-stretch">

          {/* CATALOG */}
          <aside className="lg:col-span-4 bg-card text-card-foreground rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="px-5 py-3 gradient-primary text-primary-foreground">
              <h2 className="text-lg md:text-xl font-heading font-black leading-tight">Каталог техники</h2>
              <p className="text-xs opacity-90">Выберите категорию</p>
            </div>

            {/* Desktop: vertical list */}
            <nav className="hidden lg:flex flex-col divide-y divide-border flex-1">
              {heroCategories.map((c) => (
                  <Link
                    key={c.name}
                    to={c.href}
                    className="flex items-center gap-3 px-5 py-[0.7rem] text-[0.95rem] font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"
                  >
                    <span className="flex-1 leading-tight">{c.name}</span>
                    <Arrow className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
              ))}
            </nav>

            {/* Mobile: 2-col tile grid */}
            <div className="lg:hidden grid grid-cols-2 gap-px bg-border">
              {heroCategories.slice(0, 10).map((c) => (
                <Link
                  key={c.name}
                  to={c.href}
                  className="flex items-center justify-center text-center p-4 bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors min-h-[72px]"
                >
                  <span className="text-sm font-semibold leading-tight">{c.name}</span>
                </Link>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-border bg-muted/50">
              <Link to="/catalog" className="block text-center text-sm font-bold text-primary hover:underline">
                Весь каталог →
              </Link>
            </div>
          </aside>

          {/* SLIDER */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {/* Title */}
            <div className="text-center lg:text-left overflow-hidden mb-6">
              <h1
                key={`title-${currentSlide}`}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black leading-tight animate-slide-up"
              >
                {currentSlideData.title}{" "}
                <span className="text-accent">{currentSlideData.highlight}</span>
              </h1>
            </div>

            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-primary-foreground/90 bg-background/15 backdrop-blur-sm rounded-full px-4 py-1.5 w-fit border border-background/20">
              <Award className="h-4 w-4 text-accent" />
              <span>Более 15 лет на рынке</span>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[16/9] lg:aspect-[16/8] xl:aspect-[16/7] rounded-2xl overflow-hidden border border-background/20 shadow-2xl relative">

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
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all z-20"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all z-20"
                aria-label="Следующий слайд"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slide dots — directly under slider */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    if (index !== currentSlide) {
                      changeSlide(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-accent'
                      : 'w-3 bg-primary-foreground/40 hover:bg-primary-foreground/60'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
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
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 -mb-px pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 md:h-12 block">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
