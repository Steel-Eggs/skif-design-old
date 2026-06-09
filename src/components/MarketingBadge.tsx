import { TrendingUp, Tag, Award, Trophy, Sparkles } from "lucide-react";

/**
 * Маркетинговая плашка товара.
 *
 * Текст и оформление задаются ВРУЧНУЮ через свойства товара в Битрикс:
 *   — UF_MARKETING_TEXT  → text   (если пусто — плашка не выводится)
 *   — UF_MARKETING_TONE  → tone   ("blue" | "amber" | "green" | "purple")
 *   — UF_MARKETING_ICON  → icon   ("trending" | "tag" | "award" | "trophy" | "sparkles")
 *
 * Никакой авто-генерации больше нет — что админ написал, то и покажется.
 */

const TONES: Record<string, string> = {
  blue: "bg-blue-100 text-blue-900 border-blue-300",
  amber: "bg-amber-100 text-amber-950 border-amber-300",
  green: "bg-green-100 text-green-900 border-green-300",
  purple: "bg-purple-100 text-purple-900 border-purple-300",
};

const ICONS = {
  trending: TrendingUp,
  tag: Tag,
  award: Award,
  trophy: Trophy,
  sparkles: Sparkles,
} as const;

export type MarketingBadgeTone = keyof typeof TONES;
export type MarketingBadgeIcon = keyof typeof ICONS;

interface MarketingBadgeProps {
  /** Текст из Битрикс. Если пусто/не задано — компонент ничего не рендерит. */
  text?: string | null;
  /** Цветовая тема плашки. */
  tone?: MarketingBadgeTone;
  /** Иконка слева от текста. */
  icon?: MarketingBadgeIcon;
  variant?: "card" | "detail";
}

export const MarketingBadge = ({
  text,
  tone = "blue",
  icon = "trending",
  variant = "card",
}: MarketingBadgeProps) => {
  const trimmed = (text ?? "").trim();
  if (!trimmed) return null;

  const Icon = ICONS[icon] ?? ICONS.trending;
  const toneClass = TONES[tone] ?? TONES.blue;

  return (
    <div
      className={`flex items-center gap-2 rounded-md border-2 px-3 py-2 shadow-sm ${toneClass} ${
        variant === "detail" ? "text-sm" : "text-xs sm:text-[13px]"
      } font-semibold leading-snug`}
    >
      <Icon className="shrink-0 h-4 w-4" />
      <span>{trimmed}</span>
    </div>
  );
};

export default MarketingBadge;
