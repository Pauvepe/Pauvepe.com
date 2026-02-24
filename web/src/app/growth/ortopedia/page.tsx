"use client";

import GrowthHeader from "@/components/growth/GrowthHeader";
import ROICalculator from "@/components/growth/ROICalculator";
import ContentIdeas from "@/components/growth/ContentIdeas";
import ServicesList from "@/components/growth/ServicesList";

const stats = [
  { value: "97%", label: "compra en Amazon, no en tu tienda" },
  { value: "3%", label: "del sector esta online" },
  { value: "x3", label: "lo que Queralto factura ahora" },
  { value: "0", label: "riesgo para ti" },
];

const services = [
  {
    icon: "shopping_cart",
    title: "Tienda Online Completa",
    desc: "Todos tus productos online con fotos, precios, envios y pasarela de pago. Profesional.",
    highlight: true,
  },
  {
    icon: "smart_toy",
    title: "Chatbot WhatsApp",
    desc: "Responde consultas de productos, tallas, disponibilidad. Atiende fuera de horario.",
    highlight: true,
  },
  {
    icon: "forum",
    title: "Chatbot Instagram + Messenger",
    desc: "Contesta DMs con info de productos, precios y ofertas. Captura leads 24/7.",
  },
  {
    icon: "contact_page",
    title: "CRM Centralizado",
    desc: "Clientes de tienda fisica + online, todos en un sitio. Historial de compras y preferencias.",
  },
  {
    icon: "mail",
    title: "Email Marketing con IA",
    desc: "Newsletters de productos nuevos, ofertas personalizadas, carritos abandonados. Tu lista funciona.",
    highlight: true,
  },
  {
    icon: "trending_up",
    title: "Redes Sociales",
    desc: "Tu grabas 8 min/dia mostrando productos. Yo edito y publico en IG, FB, TikTok.",
  },
  {
    icon: "campaign",
    title: "Anuncios en Instagram/Facebook",
    desc: "Catalogo de productos en anuncios. Llegan clientes nuevos que compran online.",
  },
  {
    icon: "bar_chart",
    title: "Reportes Automaticos",
    desc: "Ventas online, productos estrella, campanas que funcionan. Todo medido.",
  },
];

const painPoints = [
  "Tus clientes vienen, les asesoras 30 minutos gratis, y luego compran en Amazon.",
  "Tu lista de emails tiene cientos de contactos pero no les mandas NADA.",
  "Los DMs de Instagram se acumulan con preguntas que tardas horas en responder.",
  "No publicas en redes porque no tienes tiempo, y pierdes visibilidad cada dia.",
  "El 97% de las ventas de tu sector son offline. Pero el online esta creciendo y tu no estas.",
];

export default function OrtopediaPage() {
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
              Para ortopedias
            </span>

            <h1 className="animate-fade-in-up delay-100 text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              Tus clientes te asesoran aqui.{" "}
              <span className="gradient-text">Compran en Amazon.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg text-[var(--foreground)]/70 max-w-xl mx-auto mb-8">
              Tu tienda online profesional + chatbots + email marketing que convierten
              a tus visitantes en compradores. Que la venta sea tuya, no de Amazon.
            </p>

            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20una%20ortopedia%20y%20me%20interesa"
              className="animate-fade-in-up delay-300 btn-shine inline-block px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all animate-pulse-glow"
            >
              Quiero vender online
            </a>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Esto esta pasando en tu ortopedia{" "}
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

          {/* Queralto case */}
          <div className="mt-8 p-6 rounded-2xl bg-[var(--secondary)]/5 border border-[var(--secondary)]/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--secondary)] text-2xl">emoji_events</span>
              <div>
                <h4 className="font-bold font-[family-name:var(--font-display)] text-[var(--secondary)]">
                  Caso real: Queralto (Sevilla)
                </h4>
                <p className="text-sm text-[var(--foreground)]/70 mt-1">
                  Ortopedia familiar que facturo 3 millones EUR. Abrieron tienda online.
                  Hoy facturan <strong>101 millones EUR</strong>. El 90% de sus ventas son online.
                  Ganaron el premio a <strong>Mejor PYME de Espana</strong>.
                </p>
              </div>
            </div>
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
          <ServicesList services={services} title="Todo lo que hago por tu ortopedia" />
        </div>
      </section>

      {/* Content Ideas */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Tu unico trabajo: <span className="gradient-text">8 minutos al dia</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Graba con tu movil mostrando productos y consejos. Yo hago el resto.
          </p>
          <ContentIdeas industry="ortopedia" />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Los numeros <span className="gradient-text">no mienten</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Tu tienda online se paga sola. Mira.
          </p>
          <ROICalculator
            type="ecommerce"
            defaultTicket={150}
            defaultClients={20}
            setupCost={1800}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Como <span className="gradient-text">funciona</span>
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Nos reunimos", desc: "Veo tu catalogo, tu situacion y definimos la estrategia." },
              { step: "2", title: "Creo tu tienda online", desc: "Todos tus productos con fotos, precios, envios. Profesional y lista para vender." },
              { step: "3", title: "Monto el sistema completo", desc: "Chatbots, CRM, email marketing, redes. Todo conectado a tu tienda." },
              { step: "4", title: "Lanzamos anuncios", desc: "Tu catalogo en Instagram y Facebook. Clientes nuevos cada dia." },
              { step: "5", title: "Tu grabas 8 min/dia", desc: "Muestra productos, da consejos, cuenta historias. Yo edito y publico." },
              { step: "6", title: "Vendes online", desc: "Pedidos 24/7. Email marketing que recomienda productos. CRM que hace seguimiento." },
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
              Deja de regalar ventas a Amazon
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Tu asesoras. Amazon factura. Con tu tienda online, la venta es tuya.
            </p>
            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20una%20ortopedia%20y%20quiero%20vender%20online"
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
