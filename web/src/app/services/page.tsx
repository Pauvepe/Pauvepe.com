"use client";

import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
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
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
              {t("nav.services")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              {t("services.hero_title1")} <span className="gradient-text">{t("services.hero_title2")}</span>
            </h1>
            <p className="text-lg text-[var(--foreground)]/70">{t("services.hero_subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("services.process_title1")} <span className="gradient-text">{t("services.process_title2")}</span>
            </h2>
            <p className="text-[var(--foreground)]/70">{t("services.process_subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <div className="card-hover p-8 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-2xl text-white">{item.icon}</span>
                  </div>
                  <span className="text-5xl font-bold text-[var(--foreground)]/10 font-[family-name:var(--font-display)]">{item.step}</span>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mt-2 mb-3">{t(item.titleKey)}</h3>
                  <p className="text-[var(--foreground)]/70">{t(item.descKey)}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--primary)]/20">
              <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">thumb_up</span>
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.service_title")}</h3>
              <p className="text-[var(--foreground)]/70">{t("guarantee.service_desc")}</p>
            </div>
            <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--secondary)]/20">
              <span className="material-symbols-outlined text-4xl text-[var(--secondary)] mb-4">payments</span>
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.ecom_title")}</h3>
              <p className="text-[var(--foreground)]/70">{t("guarantee.ecom_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">{t("cta.title")}</h2>
            <p className="text-xl mb-10 opacity-90">{t("cta.subtitle")}</p>
            <Link
              href="/booking"
              className="inline-block px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
