"use client";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  separator?: string;
  className?: string;
}

export default function Marquee({
  items,
  speed = 35,
  reverse = false,
  separator = "—",
  className = "",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex items-center ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-4 md:mx-8 text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-[var(--foreground)]/[0.07] hover:text-[var(--primary)]/30 transition-colors duration-500 select-none">
              {item}
            </span>
            {i < doubled.length - 1 && (
              <span className="text-[var(--primary)]/20 text-2xl select-none">
                {separator}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
