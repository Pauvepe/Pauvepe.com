"use client";

import { useRef } from "react";
import { useApp } from "@/context/AppContext";
import ScrollReveal from "./ScrollReveal";

const blogPosts = [
  {
    slug: "automatizacion-whatsapp-negocios",
    title: { es: "Como automatizar WhatsApp para tu negocio", ca: "Com automatitzar WhatsApp pel teu negoci", en: "How to automate WhatsApp for your business" },
    excerpt: { es: "Descubre como los chatbots de WhatsApp pueden triplicar tus ventas sin contratar personal.", ca: "Descobreix com els chatbots de WhatsApp poden triplicar les teves vendes.", en: "Discover how WhatsApp chatbots can triple your sales without hiring staff." },
    category: { es: "Automatizacion", ca: "Automatitzacio", en: "Automation" },
    image: "linear-gradient(135deg, #D4714E, #E89868)",
    readTime: "5 min",
    icon: "chat",
  },
  {
    slug: "chatbots-ia-atencion-cliente",
    title: { es: "Chatbots IA: el futuro de la atencion al cliente", ca: "Chatbots IA: el futur de latencio al client", en: "AI Chatbots: the future of customer service" },
    excerpt: { es: "Por que los negocios que no usan chatbots estan perdiendo dinero cada dia.", ca: "Per que els negocis que no utilitzen chatbots estan perdent diners cada dia.", en: "Why businesses not using chatbots are losing money every day." },
    category: { es: "Chatbots", ca: "Chatbots", en: "Chatbots" },
    image: "linear-gradient(135deg, #5A8A62, #7AAB82)",
    readTime: "7 min",
    icon: "smart_toy",
  },
  {
    slug: "ecommerce-automatizado-2026",
    title: { es: "E-commerce automatizado: guia completa 2026", ca: "E-commerce automatitzat: guia completa 2026", en: "Automated e-commerce: complete guide 2026" },
    excerpt: { es: "Todo lo que necesitas para montar una tienda online que venda sola con IA.", ca: "Tot el que necessites per muntar una botiga online que vengui sola amb IA.", en: "Everything you need to set up an online store that sells on its own with AI." },
    category: { es: "E-commerce", ca: "E-commerce", en: "E-commerce" },
    image: "linear-gradient(135deg, #059669, #10b981)",
    readTime: "10 min",
    icon: "shopping_cart",
  },
  {
    slug: "agentes-voz-ia-llamadas",
    title: { es: "Agentes de voz IA que contestan tus llamadas", ca: "Agents de veu IA que contesten les teves trucades", en: "AI voice agents that answer your calls" },
    excerpt: { es: "Imagina que cada llamada a tu negocio la contesta un asistente perfecto, 24/7.", ca: "Imagina que cada trucada al teu negoci la contesta un assistent perfecte, 24/7.", en: "Imagine every call to your business answered by a perfect assistant, 24/7." },
    category: { es: "Voz IA", ca: "Veu IA", en: "Voice AI" },
    image: "linear-gradient(135deg, #f59e0b, #ef4444)",
    readTime: "6 min",
    icon: "call",
  },
  {
    slug: "facebook-ads-ia-optimizacion",
    title: { es: "Facebook Ads + IA: optimizacion automatica", ca: "Facebook Ads + IA: optimitzacio automatica", en: "Facebook Ads + AI: automatic optimization" },
    excerpt: { es: "Como usar IA para que tus campanas se optimicen solas y reduzcan el coste por lead.", ca: "Com usar IA perque les teves campanyes soptimitzin soles.", en: "How to use AI to automatically optimize your campaigns and reduce cost per lead." },
    category: { es: "Ads", ca: "Ads", en: "Ads" },
    image: "linear-gradient(135deg, #A07850, #C4A882)",
    readTime: "8 min",
    icon: "ads_click",
  },
];

export default function BlogCarousel() {
  const { locale, t } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("blog.title1")} <span className="gradient-text">{t("blog.title2")}</span>
            </h2>
            <p className="text-[var(--foreground)]/60">{t("blog.subtitle")}</p>
          </div>
        </ScrollReveal>

        {/* Navigation arrows */}
        <div className="relative">
          <div className="hidden md:flex absolute -top-16 right-0 gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all hover:scale-110"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="blog-scroll flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth"
          >
            {blogPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="flex-shrink-0 w-[300px] md:w-[340px] rounded-3xl overflow-hidden border border-[var(--foreground)]/10 bg-[var(--surface)] card-glow group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image with icon */}
                <div
                  className="h-44 md:h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ background: post.image }}
                >
                  <span className="material-symbols-outlined text-white/20 text-7xl group-hover:scale-125 transition-transform duration-700">
                    {post.icon}
                  </span>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    {post.readTime}
                  </div>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                <div className="p-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold mb-3">
                    {post.category[locale]}
                  </span>
                  <h3 className="font-bold font-[family-name:var(--font-display)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                    {post.title[locale]}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/50 line-clamp-2 mb-4">
                    {post.excerpt[locale]}
                  </p>
                  <span className="text-sm font-semibold text-[var(--primary)]/50 flex items-center gap-1">
                    {t("blog.coming_soon")}
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
