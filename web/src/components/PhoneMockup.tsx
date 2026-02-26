"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  // Hide scroll hint once user scrolls
  const handleScroll = useCallback(() => {
    if (screenRef.current && screenRef.current.scrollTop > 30) {
      setShowHint(false);
    }
  }, []);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;

    let animFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      animFrame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        // Subtle tilt following mouse
        el.style.transform = `
          perspective(1200px)
          rotateY(${-8 + deltaX * 6}deg)
          rotateX(${4 + deltaY * -6}deg)
          translateZ(0)
        `;
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(animFrame);
      el.style.transform = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`phone-mockup-wrapper ${className}`}>
      <div
        ref={phoneRef}
        className="phone-mockup-device"
      >
        {/* Ambient glow behind phone */}
        <div className="phone-mockup-glow" />

        {/* Phone frame */}
        <div className="phone-mockup-frame">
          {/* Status bar */}
          <div className="phone-mockup-statusbar">
            <span className="phone-mockup-time">9:41</span>
            <div className="phone-mockup-notch" />
            <div className="phone-mockup-icons">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="6" width="2" height="4" rx="0.5" opacity="0.4"/><rect x="3" y="4" width="2" height="6" rx="0.5" opacity="0.6"/><rect x="6" y="2" width="2" height="8" rx="0.5" opacity="0.8"/><rect x="9" y="0" width="2" height="10" rx="0.5"/></svg>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0.5" y="0.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="14" y="3" width="2" height="4" rx="0.5"/><rect x="2" y="2" width="9" height="6" rx="1" opacity="0.8"/></svg>
            </div>
          </div>

          {/* Screen area - scrollable */}
          <div
            ref={screenRef}
            className="phone-mockup-screen"
            onScroll={handleScroll}
          >
            {children || (
              <div className="phone-mockup-placeholder">
                <div className="phone-mockup-ph-header">
                  <div className="phone-mockup-ph-logo" />
                  <div className="phone-mockup-ph-nav">
                    <div className="phone-mockup-ph-dot" />
                    <div className="phone-mockup-ph-dot" />
                    <div className="phone-mockup-ph-dot" />
                  </div>
                </div>
                <div className="phone-mockup-ph-hero">
                  <div className="phone-mockup-ph-badge" />
                  <div className="phone-mockup-ph-title" />
                  <div className="phone-mockup-ph-title short" />
                  <div className="phone-mockup-ph-subtitle" />
                </div>
                <div className="phone-mockup-ph-image" />
                <div className="phone-mockup-ph-cards">
                  <div className="phone-mockup-ph-card" />
                  <div className="phone-mockup-ph-card" />
                </div>
                <div className="phone-mockup-ph-text-block">
                  <div className="phone-mockup-ph-line" />
                  <div className="phone-mockup-ph-line w80" />
                  <div className="phone-mockup-ph-line w60" />
                </div>
                <div className="phone-mockup-ph-image short" />
                <div className="phone-mockup-ph-cards">
                  <div className="phone-mockup-ph-card tall" />
                  <div className="phone-mockup-ph-card tall" />
                </div>
                <div className="phone-mockup-ph-text-block">
                  <div className="phone-mockup-ph-line" />
                  <div className="phone-mockup-ph-line w80" />
                </div>
                <div className="phone-mockup-ph-cta" />
              </div>
            )}
          </div>

          {/* Scroll hint */}
          {showHint && (
            <div className="hu-scroll-hint">
              <span className="hu-scroll-hint-text">Scroll</span>
              <svg className="hu-scroll-hint-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          )}

          {/* Home indicator */}
          <div className="phone-mockup-home" />
        </div>
      </div>
    </div>
  );
}
