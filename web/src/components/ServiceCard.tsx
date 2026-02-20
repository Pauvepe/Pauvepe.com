interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: "copper" | "sage" | "earth";
}

const colorClasses = {
  copper: {
    bg: "bg-[#D4714E]/10",
    border: "border-[#D4714E]/20",
    text: "text-[#D4714E]",
    badge: "bg-[#D4714E]/20 text-[#C0623F]",
  },
  sage: {
    bg: "bg-[#5A8A62]/10",
    border: "border-[#5A8A62]/20",
    text: "text-[#5A8A62]",
    badge: "bg-[#5A8A62]/20 text-[#4A7A52]",
  },
  earth: {
    bg: "bg-[#A07850]/10",
    border: "border-[#A07850]/20",
    text: "text-[#A07850]",
    badge: "bg-[#A07850]/20 text-[#8A6840]",
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
