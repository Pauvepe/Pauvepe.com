import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos de Servicio",
  description:
    "Terminos de servicio de AI Automation Expert - Pau Vera. Condiciones de uso de nuestros servicios de automatizacion.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
              Legal
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Términos de Servicio
            </h1>
            <p className="text-[var(--foreground)]/70">
              Última actualización: Enero 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <p className="text-[var(--foreground)]/80 leading-relaxed">
                Al interactuar con nuestras cuentas en redes sociales (TikTok,
                Instagram, Facebook, WhatsApp, etc.) o con nuestro sitio web,
                reconoces que tus comentarios, mensajes directos o interacciones
                pueden ser procesados por nuestro asistente automatizado
                (&quot;AI Automation&quot;).
              </p>
            </div>

          <div className="p-6 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-8">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--primary)]">
                info
              </span>
              Sobre la Aplicación
            </h3>

            <div>
  <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
    <span className="material-symbols-outlined text-[var(--primary)]">
      policy
    </span>
    Uso de la API de TikTok
  </h2>
  <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
    <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
      Pauvepe Automation utiliza la API oficial de TikTok para proporcionar servicios de automatización. Al usar nuestra aplicación:
    </p>
    <ul className="space-y-3 text-[var(--foreground)]/70">
      <li className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
          verified
        </span>
        <span>
          Aceptas que accedamos a tu cuenta de TikTok con los permisos que autorices
        </span>
      </li>
      <li className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
          verified
        </span>
        <span>
          Eres responsable del contenido publicado automáticamente en tu nombre
        </span>
      </li>
      <li className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
          verified
        </span>
        <span>
          Debes cumplir con las Directrices de la Comunidad de TikTok y sus Términos de Servicio
        </span>
      </li>
      <li className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
          verified
        </span>
        <span>
          Puedes revocar el acceso desde la configuración de tu cuenta de TikTok en cualquier momento
        </span>
      </li>
    </ul>
    <div className="mt-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
      <p className="text-orange-600 text-sm flex items-start gap-2">
        <span className="material-symbols-outlined mt-0.5">
          info
        </span>
        <span>
          <strong>Importante:</strong> No somos responsables si TikTok suspende o limita tu cuenta por violación de sus políticas. Es tu responsabilidad asegurar que el uso de automatización cumpla con todas las reglas de TikTok.
        </span>
      </p>
    </div>
  </div>
</div>
            <p className="text-[var(--foreground)]/80 leading-relaxed">
              Estos términos de servicio aplican al uso de <strong>Pauvepe Automation</strong> 
              (la "App"), una plataforma de automatización con inteligencia artificial 
              desarrollada por Pau Vera, disponible en pauvepe.com.
            </p>
          </div>


 

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  description
                </span>
                Propósito del Servicio
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
                  Nuestros servicios de automatización están diseñados para:
                </p>
                <ul className="space-y-3 text-[var(--foreground)]/70">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
                      speed
                    </span>
                    <span>
                      Proporcionar tiempos de respuesta más rápidos a consultas
                      y mensajes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
                      groups
                    </span>
                    <span>
                      Mejorar la gestión de la comunidad y atención al cliente
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
                      schedule
                    </span>
                    <span>
                      Ofrecer atención 24/7 sin importar la zona horaria
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">
                      auto_awesome
                    </span>
                    <span>
                      Automatizar respuestas a preguntas frecuentes y consultas
                      comunes
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  gavel
                </span>
                Limitaciones
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
                  Es importante que entiendas las siguientes limitaciones:
                </p>
                <ul className="space-y-3 text-[var(--foreground)]/70">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 mt-0.5">
                      warning
                    </span>
                    <span>
                      No somos responsables de retrasos técnicos causados por
                      las APIs de terceros (TikTok, Meta, etc.) o servidores
                      externos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 mt-0.5">
                      warning
                    </span>
                    <span>
                      Las respuestas automatizadas son generadas por
                      inteligencia artificial y pueden requerir seguimiento
                      humano en casos complejos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 mt-0.5">
                      warning
                    </span>
                    <span>
                      La disponibilidad del servicio depende del funcionamiento
                      de las plataformas de terceros.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  handshake
                </span>
                Servicios de Automatización
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
                  Ofrecemos servicios de automatización para negocios que
                  incluyen:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "support_agent",
                      title: "Chatbots Inteligentes",
                      desc: "Atención al cliente automatizada",
                    },
                    {
                      icon: "call",
                      title: "Agentes de Voz",
                      desc: "Llamadas automatizadas con IA",
                    },
                    {
                      icon: "campaign",
                      title: "Marketing Automatizado",
                      desc: "Campañas y seguimiento automático",
                    },
                    {
                      icon: "shopping_cart",
                      title: "E-commerce",
                      desc: "Automatización de tiendas online",
                    },
                  ].map((service) => (
                    <div
                      key={service.title}
                      className="p-4 rounded-xl bg-[var(--background)] border border-[var(--foreground)]/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-[var(--primary)]">
                          {service.icon}
                        </span>
                        <span className="font-medium">{service.title}</span>
                      </div>
                      <p className="text-sm text-[var(--foreground)]/60">
                        {service.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  verified
                </span>
                Garantías
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-2xl">
                      thumb_up
                    </span>
                    <div>
                      <h3 className="font-bold mb-1">
                        Satisfacción Garantizada
                      </h3>
                      <p className="text-[var(--foreground)]/70 text-sm">
                        Si no estás satisfecho con el servicio, no pagas. Así de
                        simple.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-2xl">
                      payments
                    </span>
                    <div>
                      <h3 className="font-bold mb-1">Pago por Resultados</h3>
                      <p className="text-[var(--foreground)]/70 text-sm">
                        En proyectos de e-commerce, nuestra comisión va ligada a
                        tus ventas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  edit_document
                </span>
                Modificaciones
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en
                  cualquier momento. Los cambios significativos serán
                  notificados a través de nuestros canales oficiales. El uso
                  continuado del servicio después de cualquier modificación
                  constituye la aceptación de los nuevos términos.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  mail
                </span>
                Contacto
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  Si tienes preguntas sobre estos términos de servicio, puedes
                  contactarnos en:
                </p>
                <a
                  href="mailto:info@pauvepe.com"
                  className="inline-block mt-4 text-[var(--primary)] font-medium hover:underline"
                >
                  info@pauvepe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
