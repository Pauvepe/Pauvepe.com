import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description:
    "Pasión por la IA y Resultados Reales. Experto en agentes de IA y automatización de marketing.",
};

export default function AboutPage() {
  const expertise = [
    "AI Agents",
    "Automatización",
    "Growth Marketing",
    "Chatbots",
    "E-commerce",
    "n8n",
  ];

  return (
    <>
      {/* Hero Section with Side Image */}
      <section className="min-h-screen pt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Column - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-3xl blur-2xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--primary)]/30 rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--secondary)]/30 rounded-full blur-xl animate-float delay-200" />

                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-[var(--surface)] shadow-2xl">
                  <Image
                    src="/images/pauvera.png"
                    alt="Pau Vera - AI Automation Expert"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />

                  {/* Name overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                      Pau Vera
                    </h3>
                    <p className="text-white/80">AI Automation Expert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
                  Sobre Mí
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
                  Pasión por la IA y{" "}
                  <span className="gradient-text">Resultados Reales</span>
                </h1>
              </div>

              <div className="animate-fade-in-up delay-100 space-y-4 text-lg text-[var(--foreground)]/70">
                <p>
                  Soy experto en agentes de IA y automatización de marketing.
                  Ayudo a negocios a escalar sus ventas y atención al cliente
                  sin contratar más personal.
                </p>
                <p>
                  Mi enfoque es simple: implementar soluciones que funcionan y
                  generan resultados medibles. No teoría, no humo, solo
                  automatización que transforma negocios.
                </p>
              </div>

              {/* Guarantee Highlight */}
              <div className="animate-fade-in-up delay-200 p-6 rounded-2xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-2xl text-[var(--primary)]">
                    verified
                  </span>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">
                    Mi Garantía
                  </h3>
                </div>
                <p className="text-2xl font-bold gradient-text">
                  &ldquo;Si tú no ganas, yo no cobro&rdquo;
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="animate-fade-in-up delay-300">
                <h4 className="text-sm font-medium text-[var(--foreground)]/50 mb-3 uppercase tracking-wider">
                  Especialidades
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

      {/* Stats Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Automatizaciones Creadas" },
              { number: "24/7", label: "Atención al Cliente" },
              { number: "100%", label: "Orientado a Resultados" },
              { number: "0", label: "Riesgo para Ti" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-display)] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[var(--foreground)]/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-6">
              ¿Listo para <span className="gradient-text">Escalar</span>?
            </h2>
            <p className="text-lg text-[var(--foreground)]/70 mb-8">
              Agenda una auditoría gratuita y descubre cómo puedo ayudarte a
              automatizar tu negocio.
            </p>
            <Link
              href="/booking"
              className="btn-shine inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all"
            >
              Agenda una cita
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
