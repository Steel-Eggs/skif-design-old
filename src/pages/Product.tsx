import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, ShoppingCart, Phone, Heart,
  Check, Truck, Shield, Clock, ZoomIn, X, Plus, Minus
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import CallbackModal from "@/components/CallbackModal";
import MarketingBadge from "@/components/MarketingBadge";
import { useFavorites, dispatchFavoritesUpdate, FAVORITES_UPDATED_EVENT } from "@/hooks/useFavorites";
import trailerUserHorizontal from "@/assets/products/trailer-user-horizontal.jpg";
import trailerUserVertical from "@/assets/products/trailer-user-vertical-collage.jpg";

// Mock product data
const mockProduct = {
  id: 1,
  name: "Прицеп для квадроцикла ССТ-7132-мини",
  brand: "ССТ",
  category: "Одноосные прицепы",
  categorySlug: "odnoosnye",
  price: 89900,
  oldPrice: 99900,
  inStock: true,
  images: [
    "https://www.skif-avto.ru/upload/iblock/07c/xygzme5zt9i56rpajnzded7k3tog73ab.JPG",
    "https://www.skif-avto.ru/upload/resize_cache/iblock/467/720_720_1/2efb8wnuce5737wxvu4ci8j0t5n41vps.JPG",
    "https://www.skif-avto.ru/upload/resize_cache/iblock/434/720_720_1/wijenp0br5okbstw4a37kocwiucfw03v.JPG",
    "https://www.skif-avto.ru/upload/resize_cache/iblock/219/720_720_1/a7qknx1z85rz5ryzd1np3jvupfvz4kdj.JPG",
    "https://www.skif-avto.ru/upload/resize_cache/iblock/b7a/720_720_1/wkko1mmpahi5q1hxwgoql111iiawzqys.JPG",
    "https://www.skif-avto.ru/upload/resize_cache/iblock/cce/720_720_1/sp4msspcmcdm943skgbulvfarq47gf4w.JPG",
    trailerUserHorizontal,
    trailerUserVertical,
  ],
  description: `
    <p>Прицеп для квадроцикла ССТ-7132-мини — компактный и надёжный помощник для транспортировки вашего квадроцикла. Идеально подходит для активного отдыха, охоты и рыбалки.</p>
    
    <h3>Особенности конструкции</h3>
    <p>Каркас прицепа изготовлен из высокопрочной стали с использованием технологии лазерной резки и сварки на роботизированном оборудовании. Это обеспечивает высокую точность сборки и долговечность конструкции.</p>
    
    <h3>Защита от коррозии</h3>
    <p>Все металлические элементы прицепа покрыты цинковым слоем методом горячего цинкования. Данная технология обеспечивает надёжную защиту от коррозии на срок более 25 лет даже при интенсивной эксплуатации.</p>
    
    <h3>Комплектация</h3>
    <ul>
      <li>Откидной трап для удобной погрузки</li>
      <li>Крепёжные ремни в комплекте</li>
      <li>Опорное колесо для маневрирования</li>
      <li>Светотехника по ГОСТ</li>
      <li>Документы для регистрации в ГИБДД</li>
    </ul>
  `,
  specifications: [
    { name: "Внутренние размеры (ДxШ)", value: "2450 x 1250 мм" },
    { name: "Внешние размеры (ДxШ)", value: "3200 x 1520 мм" },
    { name: "Высота бортов", value: "300 мм" },
    { name: "Грузоподъёмность", value: "750 кг" },
    { name: "Снаряжённая масса", value: "180 кг" },
    { name: "Полная масса", value: "930 кг" },
    { name: "Количество осей", value: "1" },
    { name: "Тип подвески", value: "Рессора/Амортизаторы" },
    { name: "Размер колеса", value: "R-13" },
    { name: "Тип сцепного устройства", value: "Шар 50 мм" },
    { name: "Материал кузова", value: "Оцинкованная сталь" },
    { name: "Покрытие", value: "Горячее цинкование" },
    { name: "Погрузочная высота", value: "600 мм" },
    { name: "Назначение", value: "Для квадроцикла" },
    { name: "Производитель", value: "ССТ" },
    { name: "Гарантия", value: "12 месяцев" },
  ],
  // VK Video embed. Замените oid и id на свои:
  // https://vk.com/video_ext.php?oid=-XXXXXXXXX&id=YYYYYYYYY&hd=2&autoplay=0
  videoUrl: "https://vk.com/video_ext.php?oid=-220754053&id=456239466&hd=2",
  videoTitle: "Самый красивый и практичный прицеп для квадроцикла и мотоблока!",
  features: [
    "Горячее цинкование",
    "Гарантия 12 мес",
    "Документы для ГИБДД",
    "Рессорная подвеска",
  ],
  // Маркетинговая плашка — заполняется вручную в Битрикс
  // (свойства UF_MARKETING_TEXT / UF_MARKETING_TONE / UF_MARKETING_ICON).
  // Если оставить text пустым — плашка не показывается.
  marketing: {
    text: "Этот товар в этом месяце купили уже 12 раз",
    tone: "blue" as const,        // blue | amber | green | purple
    icon: "trending" as const,    // trending | tag | award | trophy | sparkles
  },
};

// Additional options/accessories
const mockAccessories = [
  {
    id: 101,
    name: "Тент с каркасом НИЗКИЙ 7132-МИНИ",
    price: 4100,
    image: "https://www.skif-avto.ru/upload/iblock/9f4/nc3ct56l0o4d3e40cyt33n5ty5el1dqv.jpg",
    href: "/product/101",
  },
  {
    id: 102,
    name: "БОРТА НАДСТАВНЫЕ (КОМПЛЕКТ) 7132-МИНИ",
    price: 7500,
    image: "https://www.skif-avto.ru/upload/iblock/062/6kuboanfmoeybs9o4a1c0xnqlvxd5uqn.jpg",
    href: "/product/102",
  },
  {
    id: 103,
    name: "Держатель вилки 7/13pin TRAILERCOM TM5024 (синий)",
    price: 250,
    image: "https://www.skif-avto.ru/upload/resize_cache/iblock/208/250_350_1/9q33gx4fffgmge17yhu1h7mj61sgekex.jpg",
    href: "/product/103",
  },
  {
    id: 104,
    name: "Опорное колесо с хомутом TR-06",
    price: 3300,
    image: "https://www.skif-avto.ru/upload/resize_cache/iblock/f0a/250_350_1/f0a83644f8e6276d7a72b209dcaf0017.jpg",
    href: "/product/104",
  },
];

const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const zoomScrollRef = useRef<HTMLDivElement | null>(null);
  const zoomStageRef = useRef<HTMLDivElement | null>(null);
  const zoomImgRef = useRef<HTMLImageElement | null>(null);
  const zoomPanRef = useRef({
    isPointerDown: false,
    isDragging: false,
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
  });
  
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isInFavorites, setIsInFavorites] = useState(false);
  
  const product = mockProduct; // In real app, fetch by productId

  // Sync favorites state
  useEffect(() => {
    setIsInFavorites(isFavorite(product.id));
  }, [isFavorite, product.id]);

  useEffect(() => {
    const handleUpdate = () => {
      setIsInFavorites(isFavorite(product.id));
    };
    window.addEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
  }, [isFavorite, product.id]);

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    setIsInFavorites(!isInFavorites);
    dispatchFavoritesUpdate();
  };

  const changeImage = (newIndex: number, direction: 'left' | 'right') => {
    if (isAnimating) return;
    setSlideDirection(direction);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 300);
    }, 150);
  };

  const nextImage = () => {
    const newIndex = currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1;
    changeImage(newIndex, 'right');
  };

  const prevImage = () => {
    const newIndex = currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1;
    changeImage(newIndex, 'left');
  };

  const goToImage = (index: number) => {
    if (index === currentImageIndex) return;
    changeImage(index, index > currentImageIndex ? 'right' : 'left');
  };

  const toggleAccessory = (id: number) => {
    setSelectedAccessories(prev => 
      prev.includes(id) 
        ? prev.filter(aId => aId !== id)
        : [...prev, id]
    );
  };

  // Calculate totals
  const accessoriesTotal = selectedAccessories.reduce((sum, id) => {
    const accessory = mockAccessories.find(a => a.id === id);
    return sum + (accessory?.price || 0);
  }, 0);

  const separateTotal = product.price + accessoriesTotal;
  const bundleDiscount = selectedAccessories.length >= 2 ? Math.round(accessoriesTotal * 0.05) : 0;
  const bundleTotal = separateTotal - bundleDiscount;

  useEffect(() => {
    if (!isZoomOpen) return;

    const syncZoomLayout = () => {
      const scroll = zoomScrollRef.current;
      const stage = zoomStageRef.current;
      const img = zoomImgRef.current;
      if (!scroll || !stage || !img) return;

      if (!zoomedIn) {
        scroll.style.touchAction = "auto";
        stage.style.width = "100%";
        stage.style.minHeight = "100%";
        stage.style.display = "flex";
        stage.style.alignItems = "center";
        stage.style.justifyContent = "center";
        img.style.width = "";
        img.style.height = "";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "92vh";
        scroll.scrollLeft = 0;
        scroll.scrollTop = 0;
        return;
      }

      const naturalW = img.naturalWidth || img.clientWidth || 1;
      const naturalH = img.naturalHeight || img.clientHeight || 1;
      const viewportW = Math.max(scroll.clientWidth - 32, 1);
      const viewportH = Math.max(Math.min(scroll.clientHeight - 32, window.innerHeight * 0.92), 1);
      const fitScale = Math.min(viewportW / naturalW, viewportH / naturalH) || 1;
      const zoomW = Math.max(Math.round(naturalW * fitScale * 2.5), viewportW);
      const zoomH = Math.max(Math.round(naturalH * fitScale * 2.5), viewportH);

      scroll.style.touchAction = "none";
      stage.style.width = `${zoomW}px`;
      stage.style.minHeight = `${zoomH}px`;
      stage.style.display = "block";
      img.style.maxWidth = "none";
      img.style.maxHeight = "none";
      img.style.width = `${zoomW}px`;
      img.style.height = `${zoomH}px`;

      requestAnimationFrame(() => {
        scroll.scrollLeft = Math.max(0, (zoomW - scroll.clientWidth) / 2);
        scroll.scrollTop = Math.max(0, (zoomH - scroll.clientHeight) / 2);
      });
    };

    syncZoomLayout();
    window.addEventListener("resize", syncZoomLayout);
    return () => window.removeEventListener("resize", syncZoomLayout);
  }, [isZoomOpen, zoomedIn, currentImageIndex]);

  useEffect(() => {
    const scroll = zoomScrollRef.current;
    if (!scroll || !isZoomOpen || !zoomedIn) return;

    const state = zoomPanRef.current;

    const endPan = () => {
      if (state.pointerId !== null && scroll.hasPointerCapture?.(state.pointerId)) {
        scroll.releasePointerCapture(state.pointerId);
      }
      state.isPointerDown = false;
      state.pointerId = null;
      requestAnimationFrame(() => {
        state.isDragging = false;
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      state.isPointerDown = true;
      state.isDragging = false;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.startScrollLeft = scroll.scrollLeft;
      state.startScrollTop = scroll.scrollTop;
      scroll.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!state.isPointerDown) return;
      if (state.pointerId !== null && event.pointerId !== state.pointerId) return;
      const deltaX = event.clientX - state.startX;
      const deltaY = event.clientY - state.startY;

      if (!state.isDragging && Math.hypot(deltaX, deltaY) > 6) {
        state.isDragging = true;
      }

      if (!state.isDragging) return;
      event.preventDefault();
      scroll.scrollLeft = state.startScrollLeft - deltaX;
      scroll.scrollTop = state.startScrollTop - deltaY;
    };

    scroll.addEventListener("pointerdown", onPointerDown);
    scroll.addEventListener("pointermove", onPointerMove, { passive: false });
    scroll.addEventListener("pointerup", endPan);
    scroll.addEventListener("pointercancel", endPan);
    scroll.addEventListener("pointerleave", endPan);

    return () => {
      scroll.removeEventListener("pointerdown", onPointerDown);
      scroll.removeEventListener("pointermove", onPointerMove);
      scroll.removeEventListener("pointerup", endPan);
      scroll.removeEventListener("pointercancel", endPan);
      scroll.removeEventListener("pointerleave", endPan);
    };
  }, [isZoomOpen, zoomedIn, currentImageIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-background w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="w-full px-3 md:container md:px-4 py-3 md:py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
              <span>/</span>
              <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
              <span>/</span>
              <Link to={`/catalog/${product.categorySlug}`} className="hover:text-primary transition-colors">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[150px] md:max-w-none">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product main section */}
        <section className="py-3 md:py-8 lg:py-12 w-full">
          <div className="w-full px-3 md:container md:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 lg:gap-12 w-full">
              
              {/* Gallery */}
              <div className="space-y-2 md:space-y-4 w-full min-w-0">
                {/* Main image */}
                <div className="relative w-full aspect-[4/3] rounded-lg md:rounded-2xl overflow-hidden bg-muted group">
                  {/* Image with animation */}
                  <div 
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      isAnimating 
                        ? slideDirection === 'right' 
                          ? 'opacity-0 translate-x-8' 
                          : 'opacity-0 -translate-x-8'
                        : 'opacity-100 translate-x-0'
                    }`}
                  >
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      onClick={() => { setZoomedIn(false); setIsZoomOpen(true); }}
                      className="w-full h-full object-contain bg-muted p-2 transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                    />

                  </div>
                  
                  {/* Zoom button - always visible on mobile */}
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute top-2 md:top-4 right-2 md:right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  
                  {/* Navigation arrows - always visible on mobile */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10 active:scale-90"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10 active:scale-90"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm z-10">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                  
                  {/* Progress dots */}
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'w-6 bg-white' 
                            : 'w-1.5 bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Sale badge */}
                  {product.oldPrice && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-bold z-10">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'border-primary shadow-md shadow-primary/30' 
                          : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - фото ${index + 1}`}
                        className="w-full h-full object-contain bg-muted p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="space-y-2 md:space-y-6 min-w-0 w-full">
                {/* Brand */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.brand}
                  </Badge>
                </div>
                
                {/* Title */}
                <h1 className="text-lg md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight break-words">
                  {product.name}
                </h1>
                
                <MarketingBadge
                  text={product.marketing?.text}
                  tone={product.marketing?.tone}
                  icon={product.marketing?.icon}
                  variant="detail"
                />
                
                {/* Features badges - wrap on mobile instead of scroll */}
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {product.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-0.5 md:py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-sm font-medium"
                    >
                      <Check className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[100px] md:max-w-none">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Price */}
                <div className="p-3 md:p-6 rounded-xl md:rounded-2xl bg-muted/50 border border-border">
                  <div className="flex flex-wrap items-baseline gap-2 mb-2 md:mb-4">
                    <span className="text-2xl md:text-4xl font-heading font-black text-foreground">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm md:text-xl text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                  
                  {/* Availability */}
                  <div className="flex items-center gap-2 mb-3 md:mb-6">
                    {product.inStock ? (
                      <>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-600 font-medium text-sm md:text-base">В наличии</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-orange-500" />
                        <span className="text-orange-600 font-medium text-sm md:text-base">Под заказ</span>
                      </>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 md:gap-3">
                    <Button size="lg" className="w-full h-10 md:h-14 gradient-accent text-sm md:text-lg font-bold gap-2">
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                      В корзину
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full h-10 md:h-14 text-sm md:text-lg font-bold gap-2"
                      onClick={() => setIsCallbackOpen(true)}
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                      Купить в 1 клик
                    </Button>
                  </div>
                  
                  {/* Favorite button */}
                  <Button
                    size="lg"
                    variant={isInFavorites ? "default" : "outline"}
                    className={`w-full h-9 md:h-12 gap-2 font-semibold transition-all text-xs md:text-base mt-2 ${
                      isInFavorites 
                        ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                        : ''
                    }`}
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isInFavorites ? 'fill-current' : ''}`} />
                    {isInFavorites ? 'В избранном' : 'В избранное'}
                  </Button>
                </div>
                
                {/* Benefits - grid on mobile instead of scroll */}
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-4 rounded-lg md:rounded-xl bg-card border border-border text-center md:text-left">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Truck className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-[10px] md:text-sm leading-tight">Доставка</p>
                      <p className="text-[8px] md:text-xs text-muted-foreground hidden md:block">Рассчитывается индивидуально</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-4 rounded-lg md:rounded-xl bg-card border border-border text-center md:text-left">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-[10px] md:text-sm leading-tight">Гарантия</p>
                      <p className="text-[8px] md:text-xs text-muted-foreground hidden md:block">12 месяцев</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-4 rounded-lg md:rounded-xl bg-card border border-border text-center md:text-left">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-[10px] md:text-sm leading-tight">Кредит</p>
                      <p className="text-[8px] md:text-xs text-muted-foreground hidden md:block">От 3 990 ₽/мес</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs section */}
        <section className="py-8 md:py-12">
          <div className="container">
            <Tabs defaultValue="description" className="space-y-8">
              <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1 md:p-1.5 h-auto flex-wrap gap-1">
                <TabsTrigger 
                  value="description" 
                  className="px-3 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  Описание
                </TabsTrigger>
                <TabsTrigger 
                  value="specifications" 
                  className="px-3 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  Характеристики
                </TabsTrigger>
              </TabsList>
              
              {/* Description tab — with accessories sidebar like original */}
              <TabsContent value="description" className="mt-0">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Description text */}
                  <div className="lg:col-span-2">
                    <Card className="border-2">
                      <CardContent className="p-6 md:p-8">
                        <div 
                          className="prose prose-lg max-w-none text-foreground
                            prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-muted-foreground prose-p:leading-relaxed
                            prose-ul:text-muted-foreground prose-li:marker:text-primary"
                          dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional options sidebar */}
                  <div className="lg:col-span-1">
                    <Card className="border-2 bg-muted/40">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-foreground mb-4">Дополнительные опции</h3>
                        <div className="space-y-3">
                          {mockAccessories.map((accessory) => {
                            const isSelected = selectedAccessories.includes(accessory.id);
                            return (
                              <label
                                key={accessory.id}
                                className="flex items-start gap-3 cursor-pointer group"
                                onClick={() => toggleAccessory(accessory.id)}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleAccessory(accessory.id)}
                                  className="mt-1"
                                />
                                <div>
                                  <div className={`font-medium text-sm transition-colors ${isSelected ? 'text-primary' : 'group-hover:text-primary'}`}>
                                    {accessory.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">+ {accessory.price.toLocaleString('ru-RU')} ₽</div>
                                </div>
                              </label>
                            );
                          })}
                        </div>

                        {/* Total */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Итого с опциями:</span>
                            <span className="font-bold text-lg text-foreground">
                              {(bundleDiscount > 0 ? bundleTotal : separateTotal).toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          {bundleDiscount > 0 && (
                            <p className="text-xs text-secondary mt-1">🎁 Скидка 5% при 2+ опциях</p>
                          )}
                          {selectedAccessories.length === 1 && (
                            <p className="text-xs text-muted-foreground mt-1">Выберите ещё опцию для скидки 5%</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Specifications tab */}
              <TabsContent value="specifications" className="mt-0">
                <Card className="border-2">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                      Технические характеристики
                    </h3>
                    <div className="grid gap-0 divide-y divide-border">
                      {product.specifications.map((spec, index) => (
                        <div 
                          key={index}
                          className={`flex flex-col sm:flex-row sm:items-center py-4 gap-2 ${index % 2 === 0 ? 'bg-muted/30' : ''} px-4 -mx-4 sm:-mx-8 sm:px-8`}
                        >
                          <span className="text-muted-foreground sm:w-1/2">{spec.name}</span>
                          <span className="font-semibold text-foreground sm:w-1/2">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Video block — рендерится ниже описания, всегда виден */}
            <div className="mt-10 md:mt-12">
              <Card className="border-2">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                    {product.videoTitle}
                  </h3>
                  <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={product.videoUrl}
                      title={product.videoTitle}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                      allowFullScreen
                      frameBorder={0}
                    />
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Посмотрите подробный видеообзор данной модели прицепа от наших экспертов.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Image zoom modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => { setIsZoomOpen(false); setZoomedIn(false); }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomOpen(false); setZoomedIn(false); }}
            className="fixed top-4 right-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); setZoomedIn(false); }}
            className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); setZoomedIn(false); }}
            className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm z-10 pointer-events-none">
            {zoomedIn ? "Тяните, чтобы перемещаться" : "Клик для увеличения"}
          </div>
          <div
            ref={zoomScrollRef}
            className={`w-full h-full overflow-auto ${zoomedIn ? "touch-none cursor-grab active:cursor-grabbing" : ""}`}
            onClick={(e) => {
              if (zoomedIn) return;
              if (e.target === e.currentTarget) {
                setIsZoomOpen(false);
                setZoomedIn(false);
              }
            }}
          >
            <div
              ref={zoomStageRef}
              className="w-full min-h-full flex items-center justify-center p-4 box-border"
            >
              <img
                ref={zoomImgRef}
                src={product.images[currentImageIndex]}
                alt={product.name}
                draggable={false}
                onClick={(e) => {
                  e.stopPropagation();
                  if (zoomedIn) return;
                  if (zoomPanRef.current.isDragging) return;
                  setZoomedIn(true);
                }}
                className={`${zoomedIn ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"} block object-contain select-none`}
              />
            </div>
          </div>
        </div>
      )}

      
      {/* Callback modal */}
      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />
    </div>
  );
};

export default Product;