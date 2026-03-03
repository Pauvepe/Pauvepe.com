"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import PhoneMockup from "@/components/PhoneMockup";
import HuellaProductScreen from "@/components/HuellaProductScreen";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PHP",
  "n8n",
  "Make",
  "OpenAI",
  "Supabase",
  "WordPress",
  "WooCommerce",
  "Shopify",
  "Stripe",
  "Tailwind CSS",
  "Google Cloud",
];

export default function FreelancePage() {
  const { t } = useApp();

  const freelanceServices = [
    {
      icon: "web",
      titleKey: "freelance.svc1_title",
      descKey: "freelance.svc1_desc",
      priceKey: "freelance.svc1_price",
      timeKey: "freelance.svc1_time",
    },
    {
      icon: "shopping_cart",
      titleKey: "freelance.svc2_title",
      descKey: "freelance.svc2_desc",
      priceKey: "freelance.svc2_price",
      timeKey: "freelance.svc2_time",
    },
    {
      icon: "smart_toy",
      titleKey: "freelance.svc3_title",
      descKey: "freelance.svc3_desc",
      priceKey: "freelance.svc3_price",
      timeKey: "freelance.svc3_time",
    },
    {
      icon: "call",
      titleKey: "freelance.svc4_title",
      descKey: "freelance.svc4_desc",
      priceKey: "freelance.svc4_price",
      timeKey: "freelance.svc4_time",
    },
    {
      icon: "settings_suggest",
      titleKey: "freelance.svc5_title",
      descKey: "freelance.svc5_desc",
      priceKey: "freelance.svc5_price",
      timeKey: "freelance.svc5_time",
    },
    {
      icon: "campaign",
      titleKey: "freelance.svc6_title",
      descKey: "freelance.svc6_desc",
      priceKey: "freelance.svc6_price",
      timeKey: "freelance.svc6_time",
    },
  ];

  const caseTags = [
    "WooCommerce",
    "Custom PHP Plugins",
    "AI Chatbots",
    "CRM Automation",
    "WhatsApp Commerce",
    "Multi-store Sync",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[80vh] pt-24 flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-[var(--surface)] shadow-2xl">
                  <Image
                    src="/images/fotoperfil.jpg"
                    alt="Pau Vera - AI Engineer"
                    width={400}
                    height={500}
                    className="object-cover w-full"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                      Pau Vera
                    </h3>
                    <p className="text-white/80">
                      AI Engineer & Creative Developer
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      Barcelona, Spain
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Info */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
                  {t("freelance.available")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-4 leading-tight">
                  {t("freelance.title1")} <span className="gradient-text">{t("freelance.title2")}</span>
                </h1>
                <p className="text-lg text-[var(--foreground)]/70">
                  {t("freelance.subtitle")}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="animate-fade-in-up delay-100 grid grid-cols-3 gap-4">
                {[
                  { valueKey: "freelance.stat1_value", labelKey: "freelance.stat1_label" },
                  { valueKey: "freelance.stat2_value", labelKey: "freelance.stat2_label" },
                  { valueKey: "freelance.stat3_value", labelKey: "freelance.stat3_label" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-3 rounded-xl bg-[var(--surface)] border border-[var(--foreground)]/10"
                  >
                    <div className="text-2xl font-bold gradient-text font-[family-name:var(--font-display)]">
                      {t(stat.valueKey)}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/60">
                      {t(stat.labelKey)}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-in-up delay-200 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="btn-shine px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full hover:shadow-lg transition-all"
                >
                  {t("freelance.cta_call")}
                </Link>
                <a
                  href="mailto:info@pauvepe.com"
                  className="px-6 py-3 border-2 border-[var(--foreground)]/20 rounded-full font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  info@pauvepe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-center text-sm font-medium text-[var(--foreground)]/50 mb-6 uppercase tracking-wider">
            {t("freelance.tech_stack")}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-[var(--background)] border border-[var(--foreground)]/10 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("freelance.what_title1")} <span className="gradient-text">{t("freelance.what_title2")}</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              {t("freelance.what_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelanceServices.map((service, i) => (
              <div
                key={i}
                className="card-hover p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10"
              >
                <span className="material-symbols-outlined text-3xl text-[var(--primary)] mb-4">
                  {service.icon}
                </span>
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] mb-2">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-[var(--foreground)]/70 mb-4">
                  {t(service.descKey)}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[var(--primary)]">
                    {t(service.priceKey)}
                  </span>
                  <span className="text-[var(--foreground)]/50">
                    {t(service.timeKey)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Case Study */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("freelance.results_title1")} <span className="gradient-text">{t("freelance.results_title2")}</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/huellaurbana.svg"
                    alt="Huella Urbana"
                    width={120}
                    height={48}
                    className="opacity-80"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-1">
                    Huella Urbana BCN
                  </h3>
                  <p className="text-sm text-[var(--primary)] mb-3">
                    {t("freelance.case_role")}
                  </p>
                  <p className="text-[var(--foreground)]/70 mb-4">
                    {t("freelance.case_desc")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caseTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup - Huella Urbana preview */}
            <PhoneMockup className="mt-12">
              <HuellaProductScreen />
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
              <span className="material-symbols-outlined text-5xl text-[var(--primary)] mb-4">
                verified
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
                {t("freelance.guarantee_title")}
              </h2>
              <p className="text-lg text-[var(--foreground)]/70 mb-2">
                {t("freelance.guarantee_p1")}
              </p>
              <p className="text-sm text-[var(--foreground)]/50">
                {t("freelance.guarantee_p2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              {t("freelance.final_title")}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t("freelance.final_subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                {t("freelance.cta_call")}
              </Link>
              <a
                href="https://wa.me/34637682568"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all"
              >
                {t("freelance.whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
