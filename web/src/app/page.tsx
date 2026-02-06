import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import PlaygroundSection from "@/components/playground/PlaygroundSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl animate-float delay-200" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
                Automatización con Inteligencia Artificial
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mb-6 leading-tight">
              Automatiza tus Ventas y{" "}
              <span className="gradient-text">Escala tu Negocio</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto mb-10">
              Transformo tu negocio para que vendas más mientras duermes.
              Chatbots, agentes de voz, automatización de marketing y más.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="btn-shine px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all animate-pulse-glow"
              >
                Empieza la Transformación
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-[var(--foreground)]/20 rounded-full font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-3xl text-[var(--foreground)]/40">
            expand_more
          </span>
        </div>
      </section>

      {/* Playground IA Section */}
      <PlaygroundSection />

      {/* Problem/Solution Section */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              De Manual a <span className="gradient-text">Automático</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              Deja de perder tiempo en tareas repetitivas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Problem Card */}
            <div className="card-hover p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl text-red-500">
                  warning
                </span>
                <h3 className="text-xl font-bold text-red-500 font-[family-name:var(--font-display)]">
                  Negocio Manual
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Respondes mensajes todo el día",
                  "Pierdes clientes por no contestar rápido",
                  "No puedes escalar sin contratar más",
                  "Horario limitado de atención",
                  "Tareas repetitivas te agotan",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[var(--foreground)]/70"
                  >
                    <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">
                      close
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution Card */}
            <div className="card-hover p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl text-emerald-500">
                  rocket_launch
                </span>
                <h3 className="text-xl font-bold text-emerald-500 font-[family-name:var(--font-display)]">
                  Automatización Total
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Chatbots responden por ti 24/7",
                  "Nunca pierdes un lead",
                  "Escalas sin límites",
                  "Atención constante sin esfuerzo",
                  "Más tiempo para lo importante",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[var(--foreground)]/70"
                  >
                    <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5">
                      check
                    </span>
                    {item}
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
              Soluciones que <span className="gradient-text">Funcionan</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              Herramientas probadas para automatizar y escalar tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Social Proof Section - Only Huella Urbana */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Empresas que <span className="gradient-text">Confían</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              Negocios que ya están automatizando y creciendo
            </p>
          </div>

          <div className="flex justify-center">
            <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10 flex items-center justify-center">
              <Link href="https://huellaurbanabcn.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/huellaurbana.svg"
                  alt="Huella Urbana"
                  width={200}
                  height={80}
                  className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* E-commerce Guarantee */}
              <div className="card-hover p-8 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
                <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">
                  shopping_bag
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">
                  Garantía E-commerce
                </h3>
                <p className="text-[var(--foreground)]/70 mb-4">
                  Si tu tienda online no aumenta ventas en 30 días, trabajamos
                  gratis hasta que lo haga.
                </p>
                <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
                  Resultados Garantizados
                </span>
              </div>

              {/* Services Guarantee */}
              <div className="card-hover p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <span className="material-symbols-outlined text-4xl text-purple-500 mb-4">
                  handshake
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">
                  Pago por Resultados
                </h3>
                <p className="text-[var(--foreground)]/70 mb-4">
                  Para servicios: si no te gusta el resultado, no pagas. Así de
                  simple.
                </p>
                <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-500 text-sm font-medium">
                  Sin Riesgos
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              ¿Listo para Escalar?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Agenda una auditoría gratuita y descubre cómo la IA puede
              transformar tu negocio
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
