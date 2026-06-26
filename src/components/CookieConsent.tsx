import React, { useState, useEffect, forwardRef } from "react";
import { X, Cookie } from "lucide-react";

const CookieConsent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-2 left-2 right-2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-4 md:max-w-2xl z-50 animate-fade-in"
    >
      <div className="flex items-center gap-2 md:gap-3 bg-card/95 backdrop-blur border border-border rounded-full shadow-2xl pl-3 pr-2 md:pl-4 md:pr-3 h-12 md:h-14">
        <Cookie className="h-5 w-5 text-primary shrink-0" />
        <p className="flex-1 min-w-0 text-xs md:text-sm text-foreground truncate">
          <span className="md:hidden">Мы используем cookies для улучшения сайта.</span>
          <span className="hidden md:inline">Мы используем cookies для улучшения работы сайта и подбора лучших прицепов.</span>
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 h-8 md:h-9 px-3 md:px-4 rounded-full gradient-primary text-primary-foreground text-xs md:text-sm font-semibold hover:opacity-90"
        >
          Принять
        </button>
        <button
          onClick={handleClose}
          aria-label="Закрыть"
          className="shrink-0 h-8 w-8 md:h-9 md:w-9 rounded-full text-muted-foreground hover:bg-muted flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});
CookieConsent.displayName = "CookieConsent";

export default CookieConsent;
