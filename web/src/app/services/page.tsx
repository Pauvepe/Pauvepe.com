"use client";

import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import { services } from "@/lib/services";
import { useApp } from "@/context/AppContext";

export default function ServicesPage() {
  const { t } = useApp();

  const steps = [
    { step: "01", icon: "search", titleKey: "services.step1_title", descKey: "services.step1_desc" },
    { step: "02", icon: "build", titleKey: "services.step2_title", descKey: "services.step2_desc" },
    { step: "03", icon: "trending_up", titleKey: "services.step3_title", descKey: "services.step3_desc" },
  ];

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-[var(--primary)]/10 blob animate-blob" />
          <div className="absolute bottom-[10%] left-[5%] w-60 h-60 bg-[var(--secondary)]/10 blob animate-blob delay-300" />
          <div className="absolute inset-0 bg-dots" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-5 py-2.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-6 border border-[var(--primary)]/20 animate-fade-in-down">
              {t("nav.services")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight animate-fade-in-up">
              {t("services.hero_title1")} <span className="gradient-text">{t("services.hero_title2")}</span>
            </h1>
            <p className="text-lg text-[var(--foreground)]/60 animate-fade-in-up delay-200">{t("services.hero_subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <ServiceCard {...service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
                {t("services.process_title1")} <span className="gradient-text">{t("services.process_title2")}</span>
              </h2>
              <p className="text-[var(--foreground)]/60">{t("services.process_subtitle")}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="relative h-full">
                  <div className="card-glow p-8 rounded-3xl bg-[var(--surface)] border border-[var(--foreground)]/10 text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="material-symbols-outlined text-2xl text-white">{item.icon}</span>
                    </div>
                    <span className="text-5xl font-bold text-[var(--foreground)]/[0.06] font-[family-name:var(--font-display)]">{item.step}</span>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mt-2 mb-3">{t(item.titleKey)}</h3>
                    <p className="text-[var(--foreground)]/60 leading-relaxed">{t(item.descKey)}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 w-8 items-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-[var(--primary)]/30 to-[var(--secondary)]/30" />
                      <span className="material-symbols-outlined text-[var(--primary)]/30 text-sm -ml-1">chevron_right</span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <TextReveal
              text={t("about.guarantee_quote")}
              as="h2"
              className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-center leading-tight"
            />
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="card-glow p-8 rounded-3xl bg-[var(--background)] border border-[var(--primary)]/20 h-full">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-3xl text-[var(--primary)]">thumb_up</span>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.service_title")}</h3>
                <p className="text-[var(--foreground)]/60 leading-relaxed">{t("guarantee.service_desc")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="card-glow p-8 rounded-3xl bg-[var(--background)] border border-[var(--secondary)]/20 h-full">
                <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)]/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-3xl text-[var(--secondary)]">payments</span>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.ecom_title")}</h3>
                <p className="text-[var(--foreground)]/60 leading-relaxed">{t("guarantee.ecom_desc")}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-gradient-animated overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-slow delay-300" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">{t("cta.title")}</h2>
            <p className="text-xl mb-10 opacity-80">{t("cta.subtitle")}</p>
            <Link
              href="/booking"
              className="inline-block px-12 py-5 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
