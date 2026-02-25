"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  once?: boolean;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  once = false,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      data-direction={direction !== "up" ? direction : undefined}
    >
      {children}
    </div>
  );
}
