"use client";

interface Service {
  icon: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

interface ServicesListProps {
  services: Service[];
  title?: string;
}

export default function ServicesList({
  services,
  title = "Todo lo que incluye",
}: ServicesListProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-6 text-center">
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((s, i) => (
          <div
            key={i}
            className={`card-hover p-5 rounded-2xl border transition-all ${
              s.highlight
                ? "bg-[var(--primary)]/5 border-[var(--primary)]/20"
                : "bg-[var(--surface)] border-[var(--foreground)]/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  s.highlight
                    ? "bg-[var(--primary)]/20"
                    : "bg-[var(--secondary)]/10"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-lg ${
                    s.highlight ? "text-[var(--primary)]" : "text-[var(--secondary)]"
                  }`}
                >
                  {s.icon}
                </span>
              </div>
              <div>
                <h4 className="font-semibold font-[family-name:var(--font-display)] text-sm">
                  {s.title}
                </h4>
                <p className="text-xs text-[var(--foreground)]/60 mt-1">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
