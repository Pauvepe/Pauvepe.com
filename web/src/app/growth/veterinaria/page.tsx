"use client";

import GrowthHeader from "@/components/growth/GrowthHeader";
import ROICalculator from "@/components/growth/ROICalculator";
import ContentIdeas from "@/components/growth/ContentIdeas";
import ServicesList from "@/components/growth/ServicesList";

const stats = [
  { value: "62%", label: "de llamadas se pierden" },
  { value: "85%", label: "no vuelven a llamar" },
  { value: "126K", label: "EUR perdidos/ano por pyme" },
  { value: "24/7", label: "atencion con IA" },
];

const services = [
  {
    icon: "smart_toy",
    title: "Chatbot WhatsApp",
    desc: "Responde consultas, agenda citas y envia recordatorios de vacunas automaticamente.",
    highlight: true,
  },
  {
    icon: "forum",
    title: "Chatbot Instagram + Messenger",
    desc: "Contesta DMs con info de servicios, precios y horarios. Nunca pierdas un mensaje.",
    highlight: true,
  },
  {
    icon: "contact_page",
    title: "CRM Centralizado",
    desc: "Todos tus contactos de todos los canales en un sitio. Con historial, etiquetas y seguimiento.",
  },
  {
    icon: "mail",
    title: "Email Marketing con IA",
    desc: "Recordatorios de vacunas, revisiones, promos personalizadas. Tu lista por fin se mueve.",
    highlight: true,
  },
  {
    icon: "trending_up",
    title: "Redes Sociales",
    desc: "Tu grabas 8 min/dia con el movil. Yo edito, publico y hago crecer tu cuenta.",
  },
  {
    icon: "campaign",
    title: "Anuncios en Instagram/Facebook",
    desc: "Contenido de mascotas genera el engagement mas alto. Traemos clientes nuevos cada mes.",
  },
  {
    icon: "call",
    title: "Secretaria IA 24/7",
    desc: "Contesta llamadas cuando no puedes, agenda citas y filtra urgencias. Nunca mas pierdes una llamada.",
  },
  {
    icon: "bar_chart",
    title: "Reportes Automaticos",
    desc: "Cada semana recibes un resumen: cuantos leads, cuantas citas, cuanto has facturado de mas.",
  },
];

const painPoints = [
  "El 35% de tus llamadas no se contestan. Cada una es un paciente que va a otra clinica.",
  "Tu lista de emails de clientes esta parada. Tienen mascota, pero no les mandas nada.",
  "Tus DMs de Instagram acumulan mensajes sin responder durante horas.",
  "No tienes tiempo de publicar en redes y los que publican te roban clientes.",
  "Tus clientes vienen una vez y no vuelven porque nadie les recuerda las revisiones.",
];

export default function VeterinariaPage() {
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
              Para clinicas veterinarias
            </span>

            <h1 className="animate-fade-in-up delay-100 text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              Tus pacientes te buscan.{" "}
              <span className="gradient-text">Tu competencia les contesta.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg text-[var(--foreground)]/70 max-w-xl mx-auto mb-8">
              Chatbots que responden 24/7, emails que recuerdan vacunas, redes que atraen
              nuevos duenos de mascotas. Todo automatizado. Tu solo atiende.
            </p>

            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20una%20cl%C3%ADnica%20veterinaria%20y%20me%20interesa"
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
            Esto esta pasando en tu clinica{" "}
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
          <ServicesList services={services} title="Todo lo que hago por tu clinica" />
        </div>
      </section>

      {/* Content Ideas */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Tu unico trabajo: <span className="gradient-text">8 minutos al dia</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Graba con tu movil. Yo me encargo del resto.
          </p>
          <ContentIdeas industry="veterinaria" />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-center mb-2">
            Los numeros <span className="gradient-text">no mienten</span>
          </h2>
          <p className="text-center text-[var(--foreground)]/60 mb-8 text-sm">
            Mueve los sliders y mira lo que puedes ganar.
          </p>
          <ROICalculator
            type="servicios"
            setupCost={600}
            crmMonthly={100}
            crmFreeMonths={3}
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
              { step: "1", title: "Nos reunimos", desc: "Te explico todo, vemos tu situacion actual y definimos objetivos." },
              { step: "2", title: "Monto todo en 7 dias", desc: "Chatbots, CRM, email marketing, redes sociales, anuncios. Todo listo." },
              { step: "3", title: "Tu grabas 8 min/dia", desc: "Con el movil, desde la clinica. Con teleprompter si quieres. Sin complicaciones." },
              { step: "4", title: "Los clientes llegan", desc: "Los anuncios traen leads, los chatbots los atienden, el CRM hace seguimiento." },
              { step: "5", title: "Resultados medibles", desc: "Cada semana ves exactamente cuantos clientes nuevos, cuanto has ganado." },
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
              Deja de perder pacientes
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Cada dia que pasa sin sistema, tu competencia se lleva tus clientes.
            </p>
            <a
              href="https://wa.me/34637682568?text=Hola%20Pau%2C%20tengo%20una%20cl%C3%ADnica%20veterinaria%20y%20quiero%20empezar"
              className="inline-block px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Empezar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-[var(--foreground)]/40">
          &copy; {new Date().getFullYear()} Pau Vera &middot; pauvepe.com
        </p>
      </footer>
    </>
  );
}
