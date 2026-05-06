import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";

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
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-heading font-bold text-foreground">
            Новый график работы
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Уважаемые посетители! Обращаем ваше внимание на наш новый график работы.
          </p>
          <div className="w-full rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm text-foreground">
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
