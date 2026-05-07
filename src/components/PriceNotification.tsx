import { useState, useEffect } from "react";
import { Clock, AlertTriangle, X } from "lucide-react";

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
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <h3 className="text-lg font-heading font-bold text-foreground">
            Важная информация
          </h3>

          {/* Блок 1: Смена цен */}
          <div className="w-full rounded-lg bg-amber-50 border border-amber-300 p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <h4 className="font-semibold text-foreground">Смена цен</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Уважаемые посетители! На сайте проводится смена цен. Просим уточнять актуальную стоимость у наших менеджеров.
            </p>
          </div>

          {/* Блок 2: График работы */}
          <div className="w-full rounded-lg bg-primary/5 border border-primary/20 p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <h4 className="font-semibold text-foreground">Новый график работы</h4>
            </div>
            <div className="text-sm text-foreground space-y-1">
              <div>Вт, Ср, Чт: <span className="font-semibold">9:00 – 20:00</span></div>
              <div>Остальные дни: <span className="font-semibold">9:00 – 18:00</span></div>
              <div className="font-semibold text-primary">Без выходных</div>
            </div>
          </div>

          <a
            href="tel:+78002001636"
            className="text-primary font-semibold hover:underline"
          >
            +7 (800) 200-16-36
          </a>
          <button
            onClick={handleClose}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceNotification;
