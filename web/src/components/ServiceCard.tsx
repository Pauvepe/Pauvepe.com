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
    badge: "bg-[#D4714E]/15 text-[#C0623F]",
    glow: "hover:shadow-[#D4714E]/15",
    iconBg: "bg-[#D4714E]/10",
  },
  sage: {
    bg: "bg-[#5A8A62]/10",
    border: "border-[#5A8A62]/20",
    text: "text-[#5A8A62]",
    badge: "bg-[#5A8A62]/15 text-[#4A7A52]",
    glow: "hover:shadow-[#5A8A62]/15",
    iconBg: "bg-[#5A8A62]/10",
  },
  earth: {
    bg: "bg-[#A07850]/10",
    border: "border-[#A07850]/20",
    text: "text-[#A07850]",
    badge: "bg-[#A07850]/15 text-[#8A6840]",
    glow: "hover:shadow-[#A07850]/15",
    iconBg: "bg-[#A07850]/10",
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
      className={`group card-glow p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm h-full transition-all duration-400 hover:shadow-xl ${colors.glow}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-xl ${colors.iconBg} ${colors.text} flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-display)] group-hover:text-[var(--primary)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[var(--foreground)]/60 mb-3 leading-relaxed">
            {description}
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}
          >
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}
