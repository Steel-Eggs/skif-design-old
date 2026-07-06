import { useState, useEffect } from "react";
import { X } from "lucide-react";
import maxLogo from "@/assets/max-logo.png";

const MAX_CHANNEL_URL = "https://max.ru/"; // TODO: заменить на реальную ссылку канала

const MaxPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("max-popup-dismissed")) return;
    const t = setTimeout(() => setVisible(true), 15000);
    return () => clearTimeout(t);

  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    sessionStorage.setItem("max-popup-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <a
      href={MAX_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:bottom-4 z-50 flex items-center gap-2 pl-2 pr-3 py-2 rounded-full bg-card border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-in slide-in-from-bottom-3 fade-in duration-500"
      aria-label="Наш канал в MAX"
    >
      <img src={maxLogo} alt="MAX" className="w-8 h-8 rounded-lg" />
      <span className="text-sm font-semibold text-foreground">Мы в MAX</span>
      <button
        onClick={handleClose}
        className="ml-1 p-1 rounded-full hover:bg-muted text-muted-foreground"
        aria-label="Закрыть"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </a>
  );
};

export default MaxPopup;
