import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Phone, Search, ShoppingCart, ChevronDown, MessageCircle, Send, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CallbackModal from "@/components/CallbackModal";
import CatalogMegaMenu from "./CatalogMegaMenu";
import { useFavorites, FAVORITES_UPDATED_EVENT } from "@/hooks/useFavorites";
import { useCart, CART_UPDATED_EVENT } from "@/hooks/useCart";
import logo from "@/assets/logo-new.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const { cartCount } = useCart();
  const [displayFavCount, setDisplayFavCount] = useState(0);
  const [displayCartCount, setDisplayCartCount] = useState(0);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);

  // Sync favorites count from hook
  useEffect(() => {
    setDisplayFavCount(favoritesCount);
  }, [favoritesCount]);

  // Sync cart count from hook
  useEffect(() => {
    setDisplayCartCount(cartCount);
  }, [cartCount]);

  // Listen for favorites updates from other components
  useEffect(() => {
    const handleUpdate = () => {
      const stored = localStorage.getItem("skif_favorites");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setDisplayFavCount(parsed.length);
        } catch (e) {
          setDisplayFavCount(0);
        }
      } else {
        setDisplayFavCount(0);
      }
    };
    window.addEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, handleUpdate);
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      const stored = localStorage.getItem("skif_cart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const count = parsed.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
          setDisplayCartCount(count);
        } catch (e) {
          setDisplayCartCount(0);
        }
      } else {
        setDisplayCartCount(0);
      }
    };
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
  }, []);

  // Focus mobile search input when opened
  useEffect(() => {
    if (isSearchOpen && mobileSearchInputRef.current) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);
  
  const catalogRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const catalogCategories = [
    { name: "Распродажа", href: "/catalog/sale", icon: "🏷️" },
    { name: "Одноосные прицепы", href: "/catalog/odnoosnye", icon: "🚗" },
    { name: "Двухосные прицепы", href: "/catalog/dvuhosnye", icon: "🚙" },
    { name: "Прицепы с крышкой", href: "/catalog/s-kryshkoy", icon: "📦" },
    { name: "Прицепы платформа", href: "/catalog/platforma", icon: "📐" },
    { name: "Прицепы для грузов", href: "/catalog/gruzy", icon: "⚖️" },
    { name: "Прицепы фургоны", href: "/catalog/furgony", icon: "🚐" },
    { name: "Коммерческие прицепы", href: "/catalog/kommercheskie", icon: "🏪" },
    { name: "Прицепы для мототехники", href: "/catalog/moto", icon: "🏍️" },
    { name: "Прицепы для лодок и катеров", href: "/catalog/lodki", icon: "🚤" },
    { name: "Прицепы для электростанций", href: "/catalog/elektrostancii", icon: "⚡" },
    { name: "Прицепы эвакуаторы", href: "/catalog/evakuatory", icon: "🚨" },
    { name: "Прицепы для перевозки спецтехники", href: "/catalog/spectehnika", icon: "🔧" },
    { name: "Бытовки на колёсах", href: "/catalog/bytovki", icon: "🏠" },
    { name: "Наши проекты", href: "/catalog/proekty", icon: "📋" },
    { name: "Прицепы Б/У", href: "/catalog/bu", icon: "♻️" },
    { name: "Прицепы в прокат", href: "/catalog/prokat", icon: "🔄" },
    { name: "Прицепы по производителям", href: "/catalog/proizvoditeli", icon: "🏭" },
    { name: "Запчасти и аксессуары", href: "/catalog/zapchasti", icon: "🔩" },
    { name: "Боксы и багажники", href: "/catalog/boksy", icon: "🧳" },
    { name: "Снегоходы и Вездеходы", href: "/catalog/snegohody", icon: "❄️" },
    { name: "Мотобуксировщики", href: "/catalog/motobuksirovschiki", icon: "🛷" },
    { name: "Запчасти для мотобуксировщиков", href: "/catalog/zapchasti-moto", icon: "🔧" },
    { name: "Товары для рыбалки", href: "/catalog/rybalka", icon: "🎣" },
  ];

  const navLinks = [
    { name: "Услуги", href: "/services" },
    { name: "Оплата", href: "/payment" },
  ];

  const aboutSubmenu = [
    { name: "Новости", href: "/news" },
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogOpen(false);
      }
      // Check both desktop and mobile search containers
      const isInsideDesktopSearch = searchRef.current && searchRef.current.contains(event.target as Node);
      const isInsideMobileSearch = mobileSearchContainerRef.current && mobileSearchContainerRef.current.contains(event.target as Node);
      if (!isInsideDesktopSearch && !isInsideMobileSearch) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar - hidden on mobile */}
      <div className="bg-primary text-primary-foreground hidden md:block">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            {/* General phone */}
            <a href="tel:+78002001636" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>+7 (800) 200-16-36</span>
            </a>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            {/* Social networks */}
            <div className="flex items-center gap-3">
              <a href="https://vk.com/skifavtoru" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="VK">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.561c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.572 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.305-.491.745-.491h1.744c.525 0 .643.27.525.643-.22 1.016-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.475-.085.72-.576.72z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCI8Pg8mffiiHNH1rY_K1GOA" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://dzen.ru/id/684413b8083e6952b7aac03d" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Дзен">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C12 0 12 5.37 9.19 8.19C6.37 11 1 11 0 12C0 12 5.37 12 8.19 14.81C11 17.63 11 23 12 24C12 24 12 18.63 14.81 15.81C17.63 13 23 13 24 12C24 12 18.63 12 15.81 9.19C13 6.37 13 1 12 0Z"/></svg>
              </a>
              <a href="https://ok.ru/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Одноклассники">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.505 17.44a11.18 11.18 0 0 0 3.394-1.15c.612-.35.87-1.122.527-1.73-.344-.607-1.116-.864-1.728-.514a8.96 8.96 0 0 1-2.834.937c-.47.068-.942.1-1.415.1-.472 0-.945-.032-1.413-.1a8.956 8.956 0 0 1-2.835-.937c-.612-.35-1.384-.093-1.728.514-.343.608-.085 1.38.527 1.73a11.18 11.18 0 0 0 3.395 1.15L7.4 20.44c-.476.478-.476 1.254 0 1.73.238.238.55.357.862.357.312 0 .624-.12.862-.357l2.876-2.895 2.876 2.895c.238.238.55.357.862.357.312 0 .624-.12.862-.357.476-.476.476-1.252 0-1.73l-2.995-3zM12 2C9.238 2 7 4.238 7 7s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5zm0 7.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 4.5 12 4.5s2.5 1.12 2.5 2.5S13.38 9.5 12 9.5z"/></svg>
              </a>
            </div>
            {/* Divider */}
            <div className="w-px h-4 bg-primary-foreground/30" />
            {/* Messengers */}
            <div className="flex items-center gap-3">
              <a href="https://max.ru" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="MAX">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://t.me/skif_trailers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Telegram">
                <Send className="h-5 w-5" />
              </a>
            </div>
            {/* Divider */}
            <div className="w-px h-4 bg-primary-foreground/30" />
            {/* Phone */}
            <a href="tel:+79219103850" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>+7 (921) 910-38-50</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-3 md:py-3 gap-2 md:gap-3 px-3 md:px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="СКИФ" className="h-16 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-1 px-3 py-2 text-foreground font-medium hover:text-primary transition-colors rounded-lg hover:bg-muted"
              >
                {link.name}
              </Link>
            ))}

            {/* О компании dropdown */}
            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-foreground font-medium hover:text-primary transition-colors rounded-lg hover:bg-muted">
                О компании
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAboutOpen && (
                <div className="absolute top-full left-0 pt-2 z-[100]">
                  <div className="w-48 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                    <div className="py-2">
                      <Link
                        to="/about"
                        className="block px-4 py-2.5 text-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => setIsAboutOpen(false)}
                      >
                        О компании
                      </Link>
                      {aboutSubmenu.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-2.5 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setIsAboutOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contacts"
              className="flex items-center gap-1 px-3 py-2 text-foreground font-medium hover:text-primary transition-colors rounded-lg hover:bg-muted"
            >
              Контакты
            </Link>
          </nav>

          {/* Desktop inline search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-2 lg:mx-4">
            <div className="flex w-full bg-muted border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/40">
              <Input
                type="text"
                placeholder="Поиск по сайту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 h-11 text-base"
              />
              <Button type="submit" className="rounded-none gradient-primary h-11 px-4 shrink-0">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>


          {/* Actions */}
          <div className="flex items-center gap-1.5 md:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-12 w-12"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-6 w-6" />
            </Button>
            <Link to="/favorites">
              <Button variant="outline" size="icon" className="relative h-12 w-12 md:h-12 md:w-12 rounded-xl">
                <Heart className="h-6 w-6 md:h-5 md:w-5" />
                {displayFavCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {displayFavCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart" data-cart-icon>
              <Button variant="outline" size="icon" className="relative h-12 w-12 md:h-12 md:w-12 rounded-xl">
                <ShoppingCart className="h-6 w-6 md:h-5 md:w-5" />
                {displayCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {displayCartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              onClick={() => setIsCallbackModalOpen(true)}
              className="hidden lg:flex gradient-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity h-10 px-4 rounded-lg"
            >
              Заказать звонок
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        {isSearchOpen && (
          <div 
            ref={mobileSearchContainerRef}
            className="md:hidden border-t border-border p-4 animate-fade-in"
          >
            <form onSubmit={handleSearch} className="relative">
              <Input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-muted border-border"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}


      </div>
      
      {/* Callback Modal */}
      <CallbackModal 
        isOpen={isCallbackModalOpen} 
        onClose={() => setIsCallbackModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
