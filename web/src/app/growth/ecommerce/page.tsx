"use client";

import GrowthHeader from "@/components/growth/GrowthHeader";
import ROICalculator from "@/components/growth/ROICalculator";
import ContentIdeas from "@/components/growth/ContentIdeas";
import ServicesList from "@/components/growth/ServicesList";

const stats = [
  { value: "<5%", label: "de tiendas especializadas venden online" },
  { value: "x3", label: "objetivo de ROI sobre ads" },
  { value: "20%", label: "comision solo si vendes" },
  { value: "0", label: "riesgo para ti" },
];

const services = [
  {
    icon: "shopping_cart",
    title: "Tienda Online Profesional",
    desc: "Todo tu catalogo online: fotos, descripciones, precios, envios, pagos. Lista para vender.",
    highlight: true,
  },
  {
    icon: "smart_toy",
    title: "Chatbot WhatsApp",
    desc: "Responde consultas de productos, tallas, stock, envios. Atiende 24/7 sin que tu hagas nada.",
    highlight: true,
  },
  {
    icon: "forum",
    title: "Chatbot Instagram + Messenger",
    desc: "DMs respondidos al instante. Preguntas frecuentes, catalogo, ofertas. Todo automatico.",
  },
  {
    icon: "contact_page",
    title: "CRM de Clientes",
    desc: "Clientes de tienda + web + redes en un sitio. Historial de compras, preferencias, etiquetas.",
  },
  {
    icon: "mail",
    title: "Email Marketing con IA",
    desc: "Carritos abandonados, productos recomendados, ofertas flash, novedades. Tu lista genera ventas.",
    highlight: true,
  },
  {
    icon: "trending_up",
    title: "Redes Sociales",
    desc: "Tu grabas 8 min/dia. Yo edito, publico, hago crecer tu audiencia. Ventas organicas.",
  },
  {
    icon: "campaign",
    title: "Anuncios de Catalogo",
    desc: "Tus productos aparecen en Instagram y Facebook de quien los busca. Ventas directas.",
  },
  {
    icon: "bar_chart",
    title: "Dashboard de Ventas",
    desc: "Productos estrella, campanas que funcionan, clientes recurrentes. Datos para crecer.",
  },
];

const painPoints = [
  "Tus clientes vienen a la tienda, preguntan, tocan, y luego compran en internet. Pero no en TU internet.",
  "Tienes una lista de contactos/emails que no mueves. Son clientes que ya te compraron y que podrian repetir.",
  "Los DMs y WhatsApp se acumulan con preguntas de stock, precios y disponibilidad que no llegas a contestar.",
  "Tu competencia publica en redes cada dia. Tu no tienes tiempo. Y pierdes visibilidad.",
  "Cada mes que no vendes online, alguien mas se lleva ESA venta que era tuya.",
];

export default function EcommercePage() {
  return (
    <>
      <GrowthHeader />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--secondary)]/15 rounded-full blur-3xl animate-float delay-200" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6 animate-fade-in-up">
              Para tiendas especializadas
            </span>

            <h1 className="animate-fade-in-up delay-100 text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              Tu tienda fisica vende.{" "}
              <span className="gradient-text">Tu tienda online vende x2.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg text-[var(--foreground)]/70 max-w-xl mx-auto mb-8">
              Tu catalogo completo online + chatbots + email marketing + anuncios.
              Vendes las 24h del dia, los 7 dias de la semana. Sin estar tu.
            </p>

            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20una%20tienda%20y%20quiero%20vender%20online"
              className="animate-fade-in-up delay-300 btn-shine inline-block px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all animate-pulse-glow"
            >
              Quiero mi tienda online
            </a>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Esto esta pasando en tu tienda{" "}
            <span className="gradient-text">ahora mismo</span>
          </h2>
          <div className="space-y-4">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10"
              >
                <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
                <p className="text-[var(--foreground)]/80 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10"
              >
                <p className="text-2xl md:text-3xl font-bold gradient-text font-[family-name:var(--font-display)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--foreground)]/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <ServicesList services={services} title="Todo lo que hago por tu tienda" />
        </div>
      </section>

      {/* Content Ideas */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Tu unico trabajo: <span className="gradient-text">8 minutos al dia</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Graba con tu movil mostrando productos. Yo edito, publico y vendo.
          </p>
          <ContentIdeas industry="ecommerce" />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Los numeros <span className="gradient-text">no mienten</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Tu tienda se paga sola. Mueve los sliders.
          </p>
          <ROICalculator
            type="ecommerce"
            setupCost={1500}
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Que <span className="gradient-text">pagas</span>
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">Tienda online completa</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Diseno, productos, pagos, envios, SEO. Todo.</p>
                </div>
                <p className="text-xl font-bold text-[var(--primary)]">1.200-2.500 EUR</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">Fee mensual gestion ads</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Yo no cobro por gestionar tus anuncios.</p>
                </div>
                <p className="text-xl font-bold text-[var(--secondary)]">0 EUR</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">Presupuesto de anuncios</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Directo a Meta/Google. Tu dinero, tu control.</p>
                </div>
                <p className="text-xl font-bold text-[var(--primary)]">min. 300 EUR/mes</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">Comision por venta online</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Solo de ventas que genere TU web. Si no vendes, no pago.</p>
                </div>
                <p className="text-xl font-bold text-[var(--primary)]">20%</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-[var(--secondary)] bg-[var(--secondary)]/5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--secondary)]">shield</span>
                <div>
                  <h4 className="font-bold text-[var(--secondary)] font-[family-name:var(--font-display)]">
                    Garantia: x3 o te devuelvo
                  </h4>
                  <p className="text-sm text-[var(--foreground)]/70">
                    Si en 3 meses no triplico lo invertido en anuncios, te devuelvo
                    el dinero de los ads. <strong>Tu tienda online se queda tuya</strong> para siempre
                    con todos los productos, diseno y configuracion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Como <span className="gradient-text">funciona</span>
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Nos reunimos", desc: "Veo tu catalogo, tus mejores productos, y definimos la estrategia." },
              { step: "2", title: "Creo tu tienda online", desc: "Profesional, con todos tus productos, fotos, precios, envios. Lista en 10-15 dias." },
              { step: "3", title: "Conecto chatbots + email", desc: "WhatsApp, Instagram, email marketing, CRM. Todo automatizado y conectado." },
              { step: "4", title: "Lanzo anuncios de catalogo", desc: "Tus productos aparecen en el feed de quien los busca. Ventas desde el dia 1." },
              { step: "5", title: "Tu grabas 8 min/dia", desc: "Muestra productos, cuenta historias, da consejos. Yo edito y publico." },
              { step: "6", title: "Vendes 24/7", desc: "Tu duermes, tu tienda vende. Los chatbots atienden. El email marketing recuerda." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">{item.title}</h4>
                  <p className="text-sm text-[var(--foreground)]/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Vende online. Sin complicaciones.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Tu tienda fisica ya funciona. Ahora hazla vender las 24 horas.
            </p>
            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20una%20tienda%20y%20quiero%20vender%20online"
              className="inline-block px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Empezar ahora
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center">
        <p className="text-xs text-[var(--foreground)]/40">
          &copy; {new Date().getFullYear()} Pau Vera &middot; pauvepe.com
        </p>
      </footer>
    </>
  );
}
