"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TextReveal from "@/components/TextReveal";

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
    { target: 50, suffix: "+", labelKey: "about.stat1" },
    { target: 24, suffix: "/7", labelKey: "about.stat2" },
    { target: 100, suffix: "%", labelKey: "about.stat3" },
    { target: 0, suffix: "", labelKey: "about.stat4" },
  ];

  return (
    <>
      <section className="min-h-screen pt-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[30%] right-[5%] w-72 h-72 bg-[var(--primary)]/10 blob animate-blob" />
          <div className="absolute bottom-[20%] left-[10%] w-56 h-56 bg-[var(--secondary)]/10 blob animate-blob delay-300" />
          <div className="absolute inset-0 bg-dots" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-3xl blur-2xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--primary)]/30 rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--secondary)]/30 rounded-full blur-xl animate-float-slow delay-200" />
                {/* Decorative ring */}
                <div className="absolute -top-10 -right-10 w-40 h-40 deco-ring hidden lg:block" />

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
                <span className="inline-block px-5 py-2.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-4 border border-[var(--primary)]/20">
                  {t("nav.about")}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
                  {t("about.title1")} <span className="gradient-text">{t("about.title2")}</span>
                </h1>
              </div>

              <div className="animate-fade-in-up delay-100 space-y-4 text-lg text-[var(--foreground)]/60 leading-relaxed">
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
                <h4 className="text-sm font-medium text-[var(--foreground)]/40 mb-3 uppercase tracking-wider">
                  {t("about.expertise")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--foreground)]/10 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all hover:scale-105"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center p-6 rounded-2xl bg-[var(--background)]/50 border border-[var(--foreground)]/5">
                  <div className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-display)] mb-2">
                    {stat.target > 0 ? (
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    ) : (
                      `${stat.target}${stat.suffix}`
                    )}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/50">{t(stat.labelKey)}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal
              text={t("cta.title") + " " + t("cta.subtitle")}
              as="h2"
              className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-display)] leading-relaxed"
            />
            <div className="mt-8">
              <Link
                href="/booking"
                className="btn-shine inline-block px-10 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all hover:scale-105"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
