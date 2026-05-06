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
      <Icon className={`shrink-0 ${variant === "detail" ? "h-4 w-4" : "h-4 w-4"}`} />
      <span>{data.text}</span>
    </div>
  );
};

export default MarketingBadge;
