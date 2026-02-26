"use client";

import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  children,
  className = "",
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const updateHeight = () => {
      const trackWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const scrollNeeded = Math.max(trackWidth - vw, 0);
      section.style.height = `${scrollNeeded + window.innerHeight}px`;
    };

    updateHeight();

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      const trackWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const maxTranslate = Math.max(trackWidth - vw, 0);

      track.style.transform = `translateX(${-progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-8 px-4 md:px-[max(2rem,calc((100vw-1200px)/2+2rem))] will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
