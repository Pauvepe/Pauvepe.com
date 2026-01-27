import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de automatización, chatbots y estrategias de IA para escalar tu negocio.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
              Servicios
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              Transforma tu Negocio con{" "}
              <span className="gradient-text">Automatización Inteligente</span>
            </h1>
            <p className="text-lg text-[var(--foreground)]/70">
              Soluciones personalizadas de IA que trabajan para ti 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Cómo <span className="gradient-text">Trabajamos</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              Un proceso simple y efectivo para automatizar tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Auditoría",
                description:
                  "Analizamos tu negocio para identificar oportunidades de automatización.",
                icon: "search",
              },
              {
                step: "02",
                title: "Implementación",
                description:
                  "Diseñamos e implementamos las soluciones a medida para ti.",
                icon: "build",
              },
              {
                step: "03",
                title: "Resultados",
                description:
                  "Monitoreamos y optimizamos para maximizar tu ROI.",
                icon: "trending_up",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="card-hover p-8 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-2xl text-white">
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-5xl font-bold text-[var(--foreground)]/10 font-[family-name:var(--font-display)]">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--foreground)]/70">
                    {item.description}
                  </p>
                </div>
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Guarantee 1 */}
              <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--primary)]/20">
                <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">
                  thumb_up
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">
                  Si no te gusta, no pagas
                </h3>
                <p className="text-[var(--foreground)]/70">
                  Trabajamos con una garantía de satisfacción. Si el resultado
                  no cumple tus expectativas, no cobro.
                </p>
              </div>

              {/* Guarantee 2 */}
              <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--secondary)]/20">
                <span className="material-symbols-outlined text-4xl text-[var(--secondary)] mb-4">
                  payments
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">
                  Pago por Resultados
                </h3>
                <p className="text-[var(--foreground)]/70">
                  En proyectos de e-commerce, mi comisión va ligada a tus
                  ventas. Si tú ganas, yo gano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              ¿Listo para Automatizar?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Agenda una llamada gratuita y descubre qué podemos hacer por tu
              negocio
            </p>
            <Link
              href="/booking"
              className="inline-block px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Agenda tu Auditoría Gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
