"use client";

import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import HorizontalScroll from "@/components/HorizontalScroll";
import Marquee from "@/components/Marquee";
import AnimatedCounter from "@/components/AnimatedCounter";
import { services } from "@/lib/services";
import PlaygroundSection from "@/components/playground/PlaygroundSection";
import GrowthPhases from "@/components/GrowthPhases";
import PhoneMockup from "@/components/PhoneMockup";
import HuellaProductScreen from "@/components/HuellaProductScreen";
import { useApp } from "@/context/AppContext";

const marqueeItems = [
  "E-commerce",
  "Apps a Medida",
  "Webs",
  "AI Chatbots",
  "Google Ads",
  "Meta Ads",
  "Shopify",
  "WooCommerce",
  "Next.js",
  "React",
  "WordPress",
  "Voice Agents",
];

const hsCardColors = [
  { gradient: "from-[#D4714E]/20 to-[#E89868]/10", border: "border-[#D4714E]/30", accent: "text-[#D4714E]", glow: "rgba(212,113,78,0.15)" },
  { gradient: "from-[#5A8A62]/20 to-[#7AAB82]/10", border: "border-[#5A8A62]/30", accent: "text-[#5A8A62]", glow: "rgba(90,138,98,0.15)" },
  { gradient: "from-[#A07850]/20 to-[#C4A882]/10", border: "border-[#A07850]/30", accent: "text-[#A07850]", glow: "rgba(160,120,80,0.15)" },
  { gradient: "from-[#E89868]/20 to-[#F2C078]/10", border: "border-[#E89868]/30", accent: "text-[#E89868]", glow: "rgba(232,152,104,0.15)" },
  { gradient: "from-[#D4714E]/15 to-[#5A8A62]/15", border: "border-[#D4714E]/25", accent: "text-[#D4714E]", glow: "rgba(212,113,78,0.12)" },
  { gradient: "from-[#5A8A62]/15 to-[#A07850]/15", border: "border-[#5A8A62]/25", accent: "text-[#5A8A62]", glow: "rgba(90,138,98,0.12)" },
  { gradient: "from-[#A07850]/15 to-[#E89868]/15", border: "border-[#A07850]/25", accent: "text-[#A07850]", glow: "rgba(160,120,80,0.12)" },
];

export default function Home() {
  const { t } = useApp();

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-[var(--primary)]/15 blob animate-blob animate-float" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--secondary)]/12 blob animate-blob animate-float-slow delay-300" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent)]/10 blob animate-blob delay-500" style={{ animationDuration: "12s" }} />
          {/* Decorative ring */}
          <div className="absolute top-[20%] right-[15%] w-60 h-60 deco-ring hidden lg:block" />
          {/* Dots grid */}
          <div className="absolute inset-0 bg-dots" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-down">
              <span className="inline-block px-5 py-2.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-8 border border-[var(--primary)]/20 animate-shimmer">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] mb-8 leading-[0.95] tracking-tight">
              {t("hero.title1")}{" "}
              <span className="gradient-text-warm relative">
                {t("hero.title2")}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[var(--primary)]/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-[var(--foreground)]/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="btn-shine px-10 py-4 bg-[var(--primary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all animate-pulse-glow hover:scale-105"
              >
                {t("hero.cta1")}
              </Link>
              <Link
                href="/services"
                className="group px-10 py-4 border-2 border-[var(--foreground)]/15 rounded-full font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-2"
              >
                {t("hero.cta2")}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-medium text-[var(--foreground)]/30 uppercase tracking-widest">Scroll</span>
          <span className="material-symbols-outlined text-2xl text-[var(--foreground)]/30">expand_more</span>
        </div>
      </section>

      {/* ========== MARQUEE ========== */}
      <section className="py-6 overflow-hidden border-y border-[var(--foreground)]/5">
        <Marquee items={marqueeItems} speed={40} />
      </section>

      {/* ========== PLAYGROUND IA ========== */}
      <PlaygroundSection />

      {/* ========== TEXT REVEAL: PROBLEM ========== */}
      <section className="py-12 md:py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
                {t("problems.title1")} <span className="gradient-text">{t("problems.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto mb-16">
            <TextReveal
              text={t("problems.subtitle") + ". " + t("problems.p1") + ". " + t("problems.p2") + ". " + t("problems.p3") + "."}
              as="p"
              className="text-xl md:text-2xl lg:text-3xl font-medium text-[var(--foreground)] leading-relaxed text-center"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal direction="left">
              <div className="card-glow p-8 rounded-2xl bg-red-500/5 border border-red-500/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-red-500">warning</span>
                  </div>
                  <h3 className="text-xl font-bold text-red-500 font-[family-name:var(--font-display)]">{t("problems.manual")}</h3>
                </div>
                <ul className="space-y-3">
                  {["p1", "p2", "p3", "p4", "p5"].map((key) => (
                    <li key={key} className="flex items-start gap-2 text-[var(--foreground)]/70">
                      <span className="material-symbols-outlined text-red-500 text-lg mt-0.5 flex-shrink-0">close</span>
                      {t(`problems.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="card-glow p-8 rounded-2xl bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-[var(--secondary)]">rocket_launch</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--secondary)] font-[family-name:var(--font-display)]">{t("problems.auto")}</h3>
                </div>
                <ul className="space-y-3">
                  {["s1", "s2", "s3", "s4", "s5"].map((key) => (
                    <li key={key} className="flex items-start gap-2 text-[var(--foreground)]/70">
                      <span className="material-symbols-outlined text-[var(--secondary)] text-lg mt-0.5 flex-shrink-0">check</span>
                      {t(`problems.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== STATS / COUNTERS ========== */}
      <section className="py-16 md:py-20 bg-gradient-mesh">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { target: 50, suffix: "+", label: t("about.stat1") },
              { target: 24, suffix: "/7", label: t("about.stat2") },
              { target: 100, suffix: "%", label: t("about.stat3") },
              { target: 0, suffix: "", label: t("about.stat4"), prefix: "" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl bg-[var(--surface)]/50 backdrop-blur-sm border border-[var(--foreground)]/5">
                  <div className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-display)] mb-2">
                    {stat.target > 0 ? (
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
                    ) : (
                      `${stat.target}${stat.suffix}`
                    )}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/50">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES: HORIZONTAL SCROLL CAROUSEL ========== */}
      <section className="relative">
        {/* Section header - sticky-ish */}
        <div className="py-16 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                  {t("services.title1")} <span className="gradient-text">{t("services.title2")}</span>
                </h2>
                <p className="text-[var(--foreground)]/60 text-lg">{t("services.subtitle")}</p>
                <p className="text-sm text-[var(--primary)]/60 mt-4 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">swipe_left</span>
                  Scroll para explorar
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <HorizontalScroll>
          {services.map((service, index) => {
            const color = hsCardColors[index % hsCardColors.length];
            return (
              <div
                key={index}
                className={`hs-card rounded-3xl bg-gradient-to-br ${color.gradient} border ${color.border} p-8 flex flex-col justify-between backdrop-blur-sm`}
                style={{ boxShadow: `0 20px 40px ${color.glow}` }}
              >
                <div>
                  <div className={`w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-6 shadow-lg ${color.accent}`}>
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-3">{service.title}</h3>
                  <p className="text-[var(--foreground)]/60 leading-relaxed mb-6">{service.description}</p>
                </div>
                <span className={`inline-block self-start px-4 py-2 rounded-full text-sm font-semibold bg-[var(--surface)]/80 ${color.accent} border ${color.border}`}>
                  {service.badge}
                </span>
              </div>
            );
          })}
        </HorizontalScroll>
      </section>

      {/* ========== MARQUEE REVERSE ========== */}
      <section className="py-4 overflow-hidden border-y border-[var(--foreground)]/5 bg-[var(--surface)]">
        <Marquee
          items={["Tiendas Online", "Apps", "Webs", "Chatbots", "Ads", "CRM", "Voice AI", "Automation"]}
          speed={50}
          reverse
          separator="*"
        />
      </section>

      {/* ========== PORTFOLIO: WHAT WE BUILD ========== */}
      <section className="py-20 md:py-28 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                {t("portfolio.title1")} <span className="gradient-text">{t("portfolio.title2")}</span>
              </h2>
              <p className="text-lg text-[var(--foreground)]/60">{t("portfolio.subtitle")}</p>
            </div>
          </ScrollReveal>

          {/* What We Build - 3 pillars */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {[
              { icon: "shopping_cart", titleKey: "portfolio.build_ecom", descKey: "portfolio.build_ecom_desc", gradient: "from-[var(--primary)] to-[#E89868]" },
              { icon: "language", titleKey: "portfolio.build_web", descKey: "portfolio.build_web_desc", gradient: "from-[var(--secondary)] to-[#7AAB82]" },
              { icon: "phone_iphone", titleKey: "portfolio.build_app", descKey: "portfolio.build_app_desc", gradient: "from-[#A07850] to-[#C4A882]" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-glow p-8 rounded-3xl bg-[var(--background)] border border-[var(--foreground)]/10 h-full text-center group">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="material-symbols-outlined text-3xl text-white">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t(item.titleKey)}</h3>
                  <p className="text-[var(--foreground)]/60 leading-relaxed">{t(item.descKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Case Study: Huella Urbana */}
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <div className="card-glow rounded-3xl bg-[var(--background)] border border-[var(--foreground)]/10 overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <a href="https://huellaurbanabcn.com/" target="_blank" rel="noopener noreferrer" className="block group">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--foreground)]/10 flex items-center justify-center group-hover:scale-105 transition-all">
                          <Image
                            src="/images/huellaurbana.svg"
                            alt="Huella Urbana BCN"
                            width={100}
                            height={40}
                            className="opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </a>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">Caso Real</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] mb-2">{t("portfolio.case_title")}</h3>
                      <p className="text-[var(--primary)] font-medium mb-4">{t("portfolio.case_role")}</p>
                      <p className="text-[var(--foreground)]/60 leading-relaxed mb-6">{t("portfolio.case_desc")}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { valueKey: "portfolio.stat1_value", labelKey: "portfolio.stat1_label" },
                          { valueKey: "portfolio.stat2_value", labelKey: "portfolio.stat2_label" },
                          { valueKey: "portfolio.stat3_value", labelKey: "portfolio.stat3_label" },
                        ].map((stat, i) => (
                          <div key={i} className="text-center p-4 rounded-xl bg-[var(--surface)] border border-[var(--foreground)]/5">
                            <div className="text-2xl md:text-3xl font-bold gradient-text font-[family-name:var(--font-display)]">{t(stat.valueKey)}</div>
                            <div className="text-xs text-[var(--foreground)]/50 mt-1">{t(stat.labelKey)}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {["WooCommerce", "PHP Custom", "AI Chatbots", "CRM", "WhatsApp", "Multi-store"].map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Phone Mockup - Huella Urbana preview */}
          <ScrollReveal direction="scale">
            <PhoneMockup className="mt-12">
              <HuellaProductScreen />
            </PhoneMockup>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== GUARANTEE ========== */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <TextReveal
                  text={t("about.guarantee_quote")}
                  as="h2"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight"
                />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal direction="left" delay={100}>
                <div className="card-glow p-8 rounded-3xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/5 border border-[var(--primary)]/20 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-3xl text-[var(--primary)]">shopping_bag</span>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.ecom_title")}</h3>
                  <p className="text-[var(--foreground)]/60 mb-5 leading-relaxed">{t("guarantee.ecom_desc")}</p>
                  <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] text-sm font-semibold">{t("guarantee.ecom_badge")}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={200}>
                <div className="card-glow p-8 rounded-3xl bg-gradient-to-br from-[var(--secondary)]/10 to-[#7AAB82]/5 border border-[var(--secondary)]/20 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)]/10 flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-3xl text-[var(--secondary)]">handshake</span>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.service_title")}</h3>
                  <p className="text-[var(--foreground)]/60 mb-5 leading-relaxed">{t("guarantee.service_desc")}</p>
                  <span className="inline-block px-4 py-2 rounded-full bg-[var(--secondary)]/15 text-[var(--secondary)] text-sm font-semibold">{t("guarantee.service_badge")}</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GROWTH PHASES: SCROLL-LOCK ========== */}
      <GrowthPhases />

      {/* ========== FINAL CTA ========== */}
      <section className="relative py-24 md:py-32 bg-gradient-animated overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-slow delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-orbit" style={{ animationDuration: "40s" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-display)] mb-8 leading-tight">
              {t("cta.title")}
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-80 leading-relaxed">{t("cta.subtitle")}</p>
            <Link
              href="/booking"
              className="inline-block px-12 py-5 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105 hover:shadow-white/20"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
