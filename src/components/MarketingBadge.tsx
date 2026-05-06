import { useMemo } from "react";
import { TrendingUp, Tag, Award, Trophy } from "lucide-react";

const MONTHS = [
  "январе", "феврале", "марте", "апреле", "мае", "июне",
  "июле", "августе", "сентябре", "октябре", "ноябре", "декабре",
];

const STORAGE_KEY = "marketing-badge-session-v1";

interface SessionData {
  tipIndex: number;
  count: number;
  daysAgo: number;
  discount: number;
}

const getSessionData = (): SessionData => {
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}
  const data: SessionData = {
    tipIndex: Math.floor(Math.random() * 4),
    count: 2 + Math.floor(Math.random() * 18),
    daysAgo: 5 + Math.floor(Math.random() * 6),
    discount: 5 + Math.floor(Math.random() * 11),
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
  return data;
};

interface MarketingBadgeProps {
  productId?: number;
  variant?: "card" | "detail";
}

export const MarketingBadge = ({ variant = "card" }: MarketingBadgeProps) => {
  const data = useMemo(() => {
    const s = getSessionData();
    const now = new Date();
    const month = MONTHS[now.getMonth()];
    const year = now.getFullYear();
    const lastYear = year - 1;

    const soldDate = new Date();
    soldDate.setDate(soldDate.getDate() - s.daysAgo);
    const soldStr = soldDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

    switch (s.tipIndex) {
      case 0:
        return { icon: TrendingUp, text: `Этот товар в ${month} ${year} купили уже ${s.count} раз`, tone: "blue" };
      case 1:
        return { icon: Tag, text: `Этот товар был продан ${soldStr} со скидкой ${s.discount}%`, tone: "amber" };
      case 2:
        return { icon: Award, text: "Этот товар — самый популярный среди наших клиентов!", tone: "green" };
      default:
        return { icon: Trophy, text: `Этот товар — был самым популярным в ${lastYear}!`, tone: "purple" };
    }
  }, []);

  const tones: Record<string, string> = {
    blue: "bg-blue-100 text-blue-900 border-blue-300",
    amber: "bg-amber-100 text-amber-950 border-amber-300",
    green: "bg-green-100 text-green-900 border-green-300",
    purple: "bg-purple-100 text-purple-900 border-purple-300",
  };

  const Icon = data.icon;

  return (
    <div
      className={`flex items-center gap-2 rounded-md border-2 px-3 py-2 shadow-sm ${tones[data.tone]} ${
        variant === "detail" ? "text-sm" : "text-xs sm:text-[13px]"
      } font-semibold leading-snug`}
    >
      <Icon className="shrink-0 h-4 w-4" />
      <span>{data.text}</span>
    </div>
  );
};

export default MarketingBadge;
