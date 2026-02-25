"use client";

import GrowthHeader from "@/components/growth/GrowthHeader";
import ROICalculator from "@/components/growth/ROICalculator";
import ContentIdeas from "@/components/growth/ContentIdeas";
import ServicesList from "@/components/growth/ServicesList";

const stats = [
  { value: "62%", label: "llamadas no contestadas" },
  { value: "85%", label: "no vuelve a llamar nunca" },
  { value: "75%", label: "deja un negocio por mala atencion" },
  { value: "0", label: "riesgo para ti" },
];

const services = [
  {
    icon: "smart_toy",
    title: "Chatbot WhatsApp 24/7",
    desc: "Responde preguntas, agenda citas, envia recordatorios. Nunca pierdas un cliente por no contestar.",
    highlight: true,
  },
  {
    icon: "forum",
    title: "Chatbot Instagram + Messenger",
    desc: "Contesta DMs automaticamente con info de servicios, precios y disponibilidad.",
    highlight: true,
  },
  {
    icon: "contact_page",
    title: "CRM Centralizado",
    desc: "Todos los contactos de WhatsApp, Instagram, email, telefono en UN sitio. Historial completo.",
  },
  {
    icon: "mail",
    title: "Email Marketing con IA",
    desc: "Tu lista de emails por fin se mueve. Promos, recordatorios, novedades. Personalizado con IA.",
    highlight: true,
  },
  {
    icon: "trending_up",
    title: "Redes Sociales",
    desc: "Tu grabas 8 min/dia. Yo edito, publico, optimizo. Tu cuenta crece y atrae clientes.",
  },
  {
    icon: "campaign",
    title: "Anuncios en Instagram/Facebook",
    desc: "Campanas que traen clientes nuevos a tu puerta. Segmentado por zona y perfil.",
  },
  {
    icon: "call",
    title: "Secretaria IA 24/7",
    desc: "Una IA contesta tus llamadas cuando no puedes. Agenda citas, resuelve dudas, filtra urgencias.",
  },
  {
    icon: "bar_chart",
    title: "Reportes Semanales",
    desc: "Leads nuevos, citas agendadas, conversiones. Sabes exactamente lo que funciona.",
  },
];

const painPoints = [
  "El 62% de tus llamadas no se contestan. Cada una es dinero que va a tu competencia.",
  "Tu lista de contactos/emails esta muerta. Tienes clientes que no saben que existes.",
  "Los mensajes de Instagram y WhatsApp se acumulan sin responder durante horas.",
  "No publicas en redes porque no tienes tiempo. Tu competencia si publica.",
  "No sabes cuantos clientes vienen por boca a boca, por Google o por redes. Sin datos, no mejoras.",
];

export default function ServiciosPage() {
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
              Para negocios de servicios
            </span>

            <h1 className="animate-fade-in-up delay-100 text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              Tus clientes te llaman.{" "}
              <span className="gradient-text">Nadie contesta.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg text-[var(--foreground)]/70 max-w-xl mx-auto mb-8">
              Chatbots que atienden 24/7, email marketing que activa tu lista dormida,
              redes que atraen clientes nuevos. Tu solo haz lo que mejor sabes hacer.
            </p>

            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20un%20negocio%20de%20servicios%20y%20me%20interesa"
              className="animate-fade-in-up delay-300 btn-shine inline-block px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all animate-pulse-glow"
            >
              Quiero mas clientes
            </a>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Esto esta pasando en tu negocio{" "}
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
          <ServicesList services={services} title="Todo lo que hago por tu negocio" />
        </div>
      </section>

      {/* Content Ideas */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Tu unico trabajo: <span className="gradient-text">8 minutos al dia</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Graba con tu movil. Sin guion. Con teleprompter si quieres. Yo hago el resto.
          </p>
          <ContentIdeas industry="servicios" />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Los numeros <span className="gradient-text">no mienten</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Mueve los sliders con tus datos reales.
          </p>
          <ROICalculator
            type="servicios"
            setupCost={600}
            crmMonthly={100}
            crmFreeMonths={3}
          />
        </div>
      </section>

      {/* Pricing breakdown */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
            Que <span className="gradient-text">pagas</span>
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">Setup + 3 meses de CRM con IA gratis</h4>
                  <p className="text-xs text-[var(--foreground)]/50">CRM + chatbots + integraciones + email marketing + 3 meses de IA incluidos</p>
                </div>
                <p className="text-xl font-bold text-[var(--primary)]">600 EUR</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">CRM basico despues de 3 meses</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Contactos, historial, etiquetas. Tuyo para siempre.</p>
                </div>
                <p className="text-xl font-bold text-[var(--secondary)]">GRATIS</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">IA + marketing automatico (opcional)</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Chatbots IA, email con IA, ideas de contenido, reportes</p>
                </div>
                <p className="text-xl font-bold text-[var(--primary)]">100 EUR/mes</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold font-[family-name:var(--font-display)]">Presupuesto de anuncios</h4>
                  <p className="text-xs text-[var(--foreground)]/50">Lo pagas directo a Meta/Google. Yo no toco tu dinero.</p>
                </div>
                <p className="text-xl font-bold text-[var(--primary)]">min. 300 EUR/mes</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-[var(--secondary)] bg-[var(--secondary)]/5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--secondary)]">shield</span>
                <div>
                  <h4 className="font-bold text-[var(--secondary)] font-[family-name:var(--font-display)]">
                    Garantia total
                  </h4>
                  <p className="text-sm text-[var(--foreground)]/70">
                    Si en 3 meses no hay resultados, te devuelvo el dinero de los anuncios.
                    El CRM, chatbots y todo el sistema <strong>se queda tuyo</strong>.
                    Tu unico riesgo: 8 minutos de video al dia.
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
              { step: "1", title: "Nos reunimos", desc: "Analizo tu negocio, tus canales, tu lista de contactos." },
              { step: "2", title: "Monto todo en 5-7 dias", desc: "CRM, chatbots, email marketing, redes sociales, anuncios. Todo conectado." },
              { step: "3", title: "Tu grabas 8 min/dia", desc: "Con CapCut y teleprompter. Te doy 25 ideas y guiones. Solo graba." },
              { step: "4", title: "Los clientes llegan", desc: "Anuncios + contenido organico + chatbots que atienden = clientes nuevos." },
              { step: "5", title: "Todo se mide", desc: "Cada semana: cuantos leads, cuantas citas, cuanto dinero nuevo." },
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
              Deja de perder clientes
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Cada llamada sin contestar, cada DM sin responder, cada email sin enviar es dinero que pierdes.
            </p>
            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20un%20negocio%20y%20quiero%20empezar"
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
