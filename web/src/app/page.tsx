"use client";

import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import PlaygroundSection from "@/components/playground/PlaygroundSection";
import BlogCarousel from "@/components/BlogCarousel";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { t } = useApp();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl animate-float delay-200" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              {t("hero.title1")}{" "}
              <span className="gradient-text">{t("hero.title2")}</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto mb-10">
              {t("hero.subtitle")}
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="btn-shine px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all animate-pulse-glow"
              >
                {t("hero.cta1")}
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-[var(--foreground)]/20 rounded-full font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-3xl text-[var(--foreground)]/40">expand_more</span>
        </div>
      </section>

      {/* Playground IA Section */}
      <PlaygroundSection />

      {/* Problem/Solution Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("problems.title1")} <span className="gradient-text">{t("problems.title2")}</span>
            </h2>
            <p className="text-[var(--foreground)]/70">{t("problems.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-hover p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl text-red-500">warning</span>
                <h3 className="text-xl font-bold text-red-500 font-[family-name:var(--font-display)]">{t("problems.manual")}</h3>
              </div>
              <ul className="space-y-3">
                {["p1", "p2", "p3", "p4", "p5"].map((key) => (
                  <li key={key} className="flex items-start gap-2 text-[var(--foreground)]/70">
                    <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">close</span>
                    {t(`problems.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-hover p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl text-emerald-500">rocket_launch</span>
                <h3 className="text-xl font-bold text-emerald-500 font-[family-name:var(--font-display)]">{t("problems.auto")}</h3>
              </div>
              <ul className="space-y-3">
                {["s1", "s2", "s3", "s4", "s5"].map((key) => (
                  <li key={key} className="flex items-start gap-2 text-[var(--foreground)]/70">
                    <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5">check</span>
                    {t(`problems.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("services.title1")} <span className="gradient-text">{t("services.title2")}</span>
            </h2>
            <p className="text-[var(--foreground)]/70">{t("services.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Carousel */}
      <BlogCarousel />

      {/* Social Proof Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("trust.title1")} <span className="gradient-text">{t("trust.title2")}</span>
            </h2>
            <p className="text-[var(--foreground)]/70">{t("trust.subtitle")}</p>
          </div>

          <div className="flex justify-center">
            <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10 flex items-center justify-center">
              <a href="https://huellaurbanabcn.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/huellaurbana.svg"
                  alt="Huella Urbana"
                  width={200}
                  height={80}
                  className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="card-hover p-8 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
              <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">shopping_bag</span>
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.ecom_title")}</h3>
              <p className="text-[var(--foreground)]/70 mb-4">{t("guarantee.ecom_desc")}</p>
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">{t("guarantee.ecom_badge")}</span>
            </div>
            <div className="card-hover p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <span className="material-symbols-outlined text-4xl text-purple-500 mb-4">handshake</span>
              <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">{t("guarantee.service_title")}</h3>
              <p className="text-[var(--foreground)]/70 mb-4">{t("guarantee.service_desc")}</p>
              <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-500 text-sm font-medium">{t("guarantee.service_badge")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              {t("cta.title")}
            </h2>
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
