"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const phases = [
  {
    step: "01",
    icon: "language",
    title: "Web & E-commerce",
    subtitle: "Tu base digital",
    description:
      "Creamos tu web o tienda online profesional. Si no te gusta, te devolvemos el dinero.",
    color: "#D4714E",
    guarantee: "No te gusta? Te devolvemos el dinero.",
    guaranteeIcon: "verified",
  },
  {
    step: "02",
    icon: "smart_toy",
    title: "Chatbots & Llamadas IA",
    subtitle: "Atencion 24/7 automatica",
    description:
      "Chatbots inteligentes y secretaria IA que atienden, venden y agendan por ti las 24 horas.",
    color: "#5A8A62",
    guarantee: "Trabajan 24/7 sin descanso.",
    guaranteeIcon: "schedule",
  },
  {
    step: "03",
    icon: "campaign",
    title: "RRSS & Ads",
    subtitle: "Escala sin limites",
    description:
      "Contenido organico + publicidad en Meta y Google. Si no duplicamos tu inversion, te devolvemos el dinero.",
    color: "#E89868",
    guarantee: "No duplicamos? Te devolvemos todo.",
    guaranteeIcon: "trending_up",
  },
];

export default function GrowthPhases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;

      const rawProgress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      setProgress(rawProgress);

      // Map progress to phases (3 phases)
      const phaseIndex = Math.min(2, Math.floor(rawProgress * 3));
      setActivePhase(phaseIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Per-phase progress (0 to 1 within each phase)
  const phaseProgress = Math.min(1, (progress * 3) % 1);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Background gradient that shifts per phase */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${phases[activePhase].color}15 0%, var(--background) 70%)`,
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] leading-tight">
              Mas <span className="gradient-text">Libertad</span>, Mas{" "}
              <span className="gradient-text-warm">Ingresos</span>
            </h2>
            <p className="text-sm md:text-base text-[var(--foreground)]/50 mt-2">
              3 fases para escalar tu negocio
            </p>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-8 md:mb-12">
            <div className="flex items-center gap-2">
              {phases.map((phase, i) => (
                <div key={i} className="flex-1 flex items-center gap-2">
                  <div
                    className="h-1.5 rounded-full flex-1 transition-all duration-500 overflow-hidden"
                    style={{ background: `${phase.color}20` }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width:
                          i < activePhase
                            ? "100%"
                            : i === activePhase
                            ? `${phaseProgress * 100}%`
                            : "0%",
                        background: phase.color,
                      }}
                    />
                  </div>
                  {i < 2 && (
                    <span
                      className="material-symbols-outlined text-xs transition-colors duration-500"
                      style={{
                        color: i < activePhase ? phases[i + 1].color : "var(--foreground)",
                        opacity: i < activePhase ? 1 : 0.2,
                      }}
                    >
                      arrow_forward
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] md:text-xs font-medium">
              {phases.map((phase, i) => (
                <span
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    color: i <= activePhase ? phase.color : "var(--foreground)",
                    opacity: i <= activePhase ? 1 : 0.3,
                  }}
                >
                  {phase.step}
                </span>
              ))}
            </div>
          </div>

          {/* Phase cards */}
          <div className="max-w-lg mx-auto relative" style={{ minHeight: "320px" }}>
            {phases.map((phase, i) => {
              const isActive = i === activePhase;
              const isPast = i < activePhase;

              return (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0) scale(1)"
                      : isPast
                      ? "translateY(-40px) scale(0.95)"
                      : "translateY(40px) scale(0.95)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className="rounded-3xl p-6 md:p-8 border backdrop-blur-sm"
                    style={{
                      borderColor: `${phase.color}30`,
                      background: `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)`,
                    }}
                  >
                    {/* Step + Icon */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${phase.color}, ${phase.color}CC)`,
                        }}
                      >
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-white">
                          {phase.icon}
                        </span>
                      </div>
                      <div>
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: phase.color }}
                        >
                          Fase {phase.step}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-display)]">
                          {phase.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground)]/50">
                          {phase.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--foreground)]/70 leading-relaxed mb-6 text-sm md:text-base">
                      {phase.description}
                    </p>

                    {/* Guarantee badge */}
                    <div
                      className="flex items-center gap-3 p-4 rounded-2xl"
                      style={{ background: `${phase.color}10`, border: `1px solid ${phase.color}25` }}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: phase.color }}
                      >
                        {phase.guaranteeIcon}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: phase.color }}>
                        {phase.guarantee}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom: "Unfair offer" + CTA */}
          <div className="max-w-lg mx-auto text-center mt-8">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-4 transition-all duration-700"
              style={{
                background: `${phases[activePhase].color}10`,
                border: `1px solid ${phases[activePhase].color}20`,
              }}
            >
              <span
                className="material-symbols-outlined text-base"
                style={{ color: phases[activePhase].color }}
              >
                shield
              </span>
              <span className="text-xs md:text-sm font-bold" style={{ color: phases[activePhase].color }}>
                Oferta injusta... para mi
              </span>
            </div>
            <p className="text-xs text-[var(--foreground)]/40 mb-4">
              Todo el riesgo es mio. Si no funciona, no pagas.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all hover:scale-105"
            >
              Empieza Gratis
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
