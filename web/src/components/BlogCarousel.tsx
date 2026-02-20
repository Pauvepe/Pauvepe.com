"use client";

import { useApp } from "@/context/AppContext";

const blogPosts = [
  {
    slug: "automatizacion-whatsapp-negocios",
    title: { es: "Como automatizar WhatsApp para tu negocio", ca: "Com automatitzar WhatsApp pel teu negoci", en: "How to automate WhatsApp for your business" },
    excerpt: { es: "Descubre como los chatbots de WhatsApp pueden triplicar tus ventas sin contratar personal.", ca: "Descobreix com els chatbots de WhatsApp poden triplicar les teves vendes.", en: "Discover how WhatsApp chatbots can triple your sales without hiring staff." },
    category: { es: "Automatizacion", ca: "Automatitzacio", en: "Automation" },
    image: "linear-gradient(135deg, #0062ff, #00c6ff)",
    readTime: "5 min",
  },
  {
    slug: "chatbots-ia-atencion-cliente",
    title: { es: "Chatbots IA: el futuro de la atencion al cliente", ca: "Chatbots IA: el futur de latencio al client", en: "AI Chatbots: the future of customer service" },
    excerpt: { es: "Por que los negocios que no usan chatbots estan perdiendo dinero cada dia.", ca: "Per que els negocis que no utilitzen chatbots estan perdent diners cada dia.", en: "Why businesses not using chatbots are losing money every day." },
    category: { es: "Chatbots", ca: "Chatbots", en: "Chatbots" },
    image: "linear-gradient(135deg, #7c3aed, #ec4899)",
    readTime: "7 min",
  },
  {
    slug: "ecommerce-automatizado-2026",
    title: { es: "E-commerce automatizado: guia completa 2026", ca: "E-commerce automatitzat: guia completa 2026", en: "Automated e-commerce: complete guide 2026" },
    excerpt: { es: "Todo lo que necesitas para montar una tienda online que venda sola con IA.", ca: "Tot el que necessites per muntar una botiga online que vengui sola amb IA.", en: "Everything you need to set up an online store that sells on its own with AI." },
    category: { es: "E-commerce", ca: "E-commerce", en: "E-commerce" },
    image: "linear-gradient(135deg, #059669, #10b981)",
    readTime: "10 min",
  },
  {
    slug: "agentes-voz-ia-llamadas",
    title: { es: "Agentes de voz IA que contestan tus llamadas", ca: "Agents de veu IA que contesten les teves trucades", en: "AI voice agents that answer your calls" },
    excerpt: { es: "Imagina que cada llamada a tu negocio la contesta un asistente perfecto, 24/7.", ca: "Imagina que cada trucada al teu negoci la contesta un assistent perfecte, 24/7.", en: "Imagine every call to your business answered by a perfect assistant, 24/7." },
    category: { es: "Voz IA", ca: "Veu IA", en: "Voice AI" },
    image: "linear-gradient(135deg, #f59e0b, #ef4444)",
    readTime: "6 min",
  },
  {
    slug: "facebook-ads-ia-optimizacion",
    title: { es: "Facebook Ads + IA: optimizacion automatica", ca: "Facebook Ads + IA: optimitzacio automatica", en: "Facebook Ads + AI: automatic optimization" },
    excerpt: { es: "Como usar IA para que tus campanas se optimicen solas y reduzcan el coste por lead.", ca: "Com usar IA perque les teves campanyes soptimitzin soles.", en: "How to use AI to automatically optimize your campaigns and reduce cost per lead." },
    category: { es: "Ads", ca: "Ads", en: "Ads" },
    image: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    readTime: "8 min",
  },
];

export default function BlogCarousel() {
  const { locale, t } = useApp();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            {t("blog.title1")} <span className="gradient-text">{t("blog.title2")}</span>
          </h2>
          <p className="text-[var(--foreground)]/70">{t("blog.subtitle")}</p>
        </div>

        <div className="blog-scroll flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex-shrink-0 w-[320px] rounded-2xl overflow-hidden border border-[var(--foreground)]/10 bg-[var(--surface)] card-hover"
            >
              {/* Image placeholder */}
              <div
                className="h-48 flex items-center justify-center relative"
                style={{ background: post.image }}
              >
                <span className="text-white/30 text-6xl font-bold font-[family-name:var(--font-display)]">
                  {post.category[locale]}
                </span>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                  {post.readTime}
                </div>
              </div>

              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium mb-3">
                  {post.category[locale]}
                </span>
                <h3 className="font-bold font-[family-name:var(--font-display)] mb-2 line-clamp-2">
                  {post.title[locale]}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60 line-clamp-2 mb-4">
                  {post.excerpt[locale]}
                </p>
                <span className="text-sm font-medium text-[var(--primary)] flex items-center gap-1 opacity-50">
                  {t("blog.coming_soon")}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
