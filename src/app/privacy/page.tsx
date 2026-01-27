import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de AI Automation Expert - Pau Vera. Información sobre el tratamiento de datos.",
};

export default function PrivacyPage() {
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
              Política de Privacidad
            </h1>
            <p className="text-[var(--foreground)]/70">
              Última actualización: Enero 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
              <p className="text-[var(--foreground)]/80 leading-relaxed">
                Esta aplicación y servicios de automatización se conectan a
                diferentes APIs y plataformas (incluyendo TikTok, Instagram,
                Facebook, WhatsApp, sitios web y otras plataformas de
                comunicación) para ayudar a gestionar y responder a comentarios,
                mensajes directos e interacciones de usuarios de forma
                automatizada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  database
                </span>
                Recopilación de Datos
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  Solo procesamos los datos proporcionados por las plataformas
                  conectadas (comentarios, mensajes, interacciones de usuarios)
                  a través de nuestro servidor de automatización seguro. Los
                  datos que recopilamos incluyen:
                </p>
                <ul className="mt-4 space-y-2 text-[var(--foreground)]/70">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
                      check
                    </span>
                    Mensajes y comentarios recibidos en las plataformas
                    conectadas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
                      check
                    </span>
                    Información de contacto proporcionada voluntariamente
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
                      check
                    </span>
                    Datos necesarios para procesar respuestas automatizadas
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  settings
                </span>
                Uso de Datos
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
                  Los datos se utilizan estrictamente para:
                </p>
                <ul className="space-y-2 text-[var(--foreground)]/70">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
                      smart_toy
                    </span>
                    Responder a interacciones de usuarios de forma automatizada
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
                      support_agent
                    </span>
                    Mejorar la atención al cliente 24/7
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
                      analytics
                    </span>
                    Gestionar y optimizar la comunicación con clientes
                  </li>
                </ul>
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-emerald-600 font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined">
                      verified_user
                    </span>
                    No vendemos ni compartimos datos de usuarios con terceros.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  schedule
                </span>
                Retención de Datos
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  Los datos solo se almacenan durante el tiempo necesario para
                  procesar la respuesta automatizada y cumplir con las
                  obligaciones legales aplicables. Una vez procesada la
                  interacción, los datos temporales se eliminan de nuestros
                  sistemas de automatización.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  public
                </span>
                Plataformas Soportadas
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
                  Nuestros servicios de automatización pueden integrarse con:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "TikTok",
                    "Instagram",
                    "Facebook",
                    "WhatsApp",
                    "Telegram",
                    "Sitios Web",
                  ].map((platform) => (
                    <div
                      key={platform}
                      className="px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--foreground)]/10 text-center text-sm"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">
                  security
                </span>
                Seguridad
              </h2>
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  Implementamos medidas de seguridad técnicas y organizativas
                  para proteger los datos procesados, incluyendo cifrado de
                  datos en tránsito, acceso restringido a sistemas y monitoreo
                  continuo de seguridad.
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
                  Si tienes preguntas sobre esta política de privacidad o deseas
                  ejercer tus derechos sobre tus datos, puedes contactarnos en:
                </p>
                <a
                  href="mailto:contacto@pauvepe.com"
                  className="inline-block mt-4 text-[var(--primary)] font-medium hover:underline"
                >
                  contacto@pauvepe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
