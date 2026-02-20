"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function AboutPage() {
  const { t } = useApp();

  const expertise = [
    "AI Agents",
    "Automation",
    "Growth Marketing",
    "Chatbots",
    "E-commerce",
    "n8n",
  ];

  const stats = [
    { number: "50+", labelKey: "about.stat1" },
    { number: "24/7", labelKey: "about.stat2" },
    { number: "100%", labelKey: "about.stat3" },
    { number: "0", labelKey: "about.stat4" },
  ];

  return (
    <>
      <section className="min-h-screen pt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-3xl blur-2xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--primary)]/30 rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--secondary)]/30 rounded-full blur-xl animate-float delay-200" />

                <div className="relative rounded-3xl overflow-hidden border-4 border-[var(--surface)] shadow-2xl">
                  <Image
                    src="/images/pauvera.png"
                    alt="Pau Vera - AI Automation Expert"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Pau Vera</h3>
                    <p className="text-white/80">AI Automation Expert</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
                  {t("nav.about")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
                  {t("about.title1")} <span className="gradient-text">{t("about.title2")}</span>
                </h1>
              </div>

              <div className="animate-fade-in-up delay-100 space-y-4 text-lg text-[var(--foreground)]/70">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </div>

              <div className="animate-fade-in-up delay-200 p-6 rounded-2xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-2xl text-[var(--primary)]">verified</span>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">{t("about.guarantee")}</h3>
                </div>
                <p className="text-2xl font-bold gradient-text">{t("about.guarantee_quote")}</p>
              </div>

              <div className="animate-fade-in-up delay-300">
                <h4 className="text-sm font-medium text-[var(--foreground)]/50 mb-3 uppercase tracking-wider">
                  {t("about.expertise")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--foreground)]/10 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-display)] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[var(--foreground)]/60">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-[var(--foreground)]/70 mb-8">{t("cta.subtitle")}</p>
            <Link
              href="/booking"
              className="btn-shine inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
