import { useMemo } from "react";
import { TrendingUp, Tag, Award, Trophy } from "lucide-react";

const MONTHS = [
  "январе", "феврале", "марте", "апреле", "мае", "июне",
  "июле", "августе", "сентябре", "октябре", "ноябре", "декабре",
];

// Deterministic pseudo-random based on product id (so the badge stays the same for a given product)
const seeded = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface MarketingBadgeProps {
  productId: number;
  variant?: "card" | "detail";
}

export const MarketingBadge = ({ productId, variant = "card" }: MarketingBadgeProps) => {
  const data = useMemo(() => {
    const now = new Date();
    const month = MONTHS[now.getMonth()];
    const year = now.getFullYear();
    const lastYear = year - 1;

    const r1 = seeded(productId * 7.13 + 1);
    const r2 = seeded(productId * 11.7 + 2);
    const r3 = seeded(productId * 3.31 + 3);

    const tipIndex = Math.floor(r1 * 4);
    const count = 2 + Math.floor(r2 * 18); // 2..19
    const daysAgo = 5 + Math.floor(r2 * 6); // 5..10
    const discount = 5 + Math.floor(r3 * 11); // 5..15

    const soldDate = new Date();
    soldDate.setDate(soldDate.getDate() - daysAgo);
    const soldStr = soldDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

    switch (tipIndex) {
      case 0:
        return {
          icon: TrendingUp,
          text: `Этот товар в ${month} ${year} купили уже ${count} раз`,
          tone: "blue",
        };
      case 1:
        return {
          icon: Tag,
          text: `Этот товар был продан ${soldStr} со скидкой ${discount}%`,
          tone: "amber",
        };
      case 2:
        return {
          icon: Award,
          text: "Этот товар — самый популярный среди наших клиентов!",
          tone: "green",
        };
      default:
        return {
          icon: Trophy,
          text: `Этот товар — был самым популярным в ${lastYear}!`,
          tone: "purple",
        };
    }
  }, [productId]);

  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-800 border-blue-200",
    amber: "bg-amber-50 text-amber-900 border-amber-200",
    green: "bg-green-50 text-green-800 border-green-200",
    purple: "bg-purple-50 text-purple-800 border-purple-200",
  };

  const Icon = data.icon;

  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 ${tones[data.tone]} ${
        variant === "detail" ? "text-sm" : "text-[11px] sm:text-xs"
      } font-medium leading-snug`}
    >
      <Icon className={`shrink-0 ${variant === "detail" ? "h-4 w-4" : "h-3.5 w-3.5"}`} />
      <span>{data.text}</span>
    </div>
  );
};

export default MarketingBadge;
