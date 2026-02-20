interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: "blue" | "cyan" | "purple" | "orange" | "emerald" | "pink" | "amber";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500",
    badge: "bg-blue-500/20 text-blue-600",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-500",
    badge: "bg-cyan-500/20 text-cyan-600",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-500",
    badge: "bg-purple-500/20 text-purple-600",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-500",
    badge: "bg-orange-500/20 text-orange-600",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-500",
    badge: "bg-emerald-500/20 text-emerald-600",
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-500",
    badge: "bg-pink-500/20 text-pink-600",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500",
    badge: "bg-amber-500/20 text-amber-600",
  },
};

export default function ServiceCard({
  icon,
  title,
  description,
  badge,
  color,
}: ServiceCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={`card-hover p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl ${colors.bg} ${colors.text} flex-shrink-0`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-display)]">
            {title}
          </h3>
          <p className="text-sm text-[var(--foreground)]/70 mb-3">
            {description}
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}
