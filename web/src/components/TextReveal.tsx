"use client";

import { useEffect, useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  as: Tag = "p",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll<HTMLElement>(".tr-word");

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when element bottom enters viewport, 1 when element top leaves viewport
      const progress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (vh + rect.height * 0.5))
      );

      words.forEach((word, i) => {
        const wordThreshold = (i + 1) / (words.length + 2);
        const wordProgress = Math.max(
          0,
          Math.min(1, (progress - wordThreshold * 0.6) / 0.3)
        );
        word.style.opacity = `${0.15 + wordProgress * 0.85}`;
        word.style.filter = `blur(${(1 - wordProgress) * 5}px)`;
        word.style.transform = `translateY(${(1 - wordProgress) * 8}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="py-4">
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className="tr-word inline-block mr-[0.3em] transition-none will-change-[opacity,filter,transform]"
            style={{ opacity: 0.15, filter: "blur(5px)" }}
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
