import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

const PriceNotification = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("price-notice-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("price-notice-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-amber-600" />
          </div>
          <h3 className="text-lg font-heading font-bold text-foreground">
            Смена цен
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Уважаемые посетители! На сайте проводится обновление цен. Просим вас уточнять актуальные цены у наших менеджеров.
          </p>
          <div className="w-full rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
            <div className="font-semibold mb-1">Новый график работы:</div>
            <div>Вт, Ср, Чт: <span className="font-semibold">9:00 – 20:00</span></div>
            <div>Остальные дни: <span className="font-semibold">9:00 – 18:00</span></div>
            <div className="font-semibold mt-1">Без выходных</div>
          </div>
          <a
            href="tel:+78002001636"
            className="text-primary font-semibold hover:underline"
          >
            +7 (800) 200-16-36
          </a>
          <button
            onClick={handleClose}
            className="mt-2 w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceNotification;
