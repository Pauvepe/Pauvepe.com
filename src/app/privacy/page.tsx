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

           <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-8">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">
                info
              </span>
              Información de la Aplicación
            </h3>
             <div>
  <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
    <span className="material-symbols-outlined text-[var(--primary)]">
      integration_instructions
    </span>
    Integración con TikTok
  </h2>
  <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
    <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
      Pauvepe Automation se integra con TikTok para proporcionar servicios de automatización de respuestas. Cuando utilizas nuestra aplicación conectada a tu cuenta de TikTok:
    </p>
    <ul className="space-y-2 text-[var(--foreground)]/70">
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        Accedemos a comentarios y mensajes directos recibidos en tu cuenta de TikTok
      </li>
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        Procesamos estos datos únicamente para generar respuestas automatizadas
      </li>
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        Publicamos respuestas en tu nombre según la configuración que hayas establecido
      </li>
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        No almacenamos contenido de TikTok más allá del tiempo necesario para procesar la respuesta
      </li>
    </ul>
    <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
      <p className="text-blue-600 text-sm">
        <strong>Importante:</strong> Cumplimos estrictamente con las políticas de uso de datos de TikTok y sus términos de servicio de API. Puedes revocar el acceso de Pauvepe Automation a tu cuenta de TikTok en cualquier momento desde la configuración de tu cuenta.
      </p>
    </div>
  </div>
</div>
            <p className="text-[var(--foreground)]/80 leading-relaxed">
              Esta política de privacidad aplica a <strong>Pauvepe Automation</strong> 
              (la "App" o "Aplicación"), disponible en pauvepe.com y sus servicios 
              de automatización conectados a diferentes plataformas de redes sociales.
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
    <p className="text-[var(--foreground)]/80 leading-relaxed mb-4">
      Pauvepe Automation recopila y procesa únicamente los datos necesarios para proporcionar servicios de automatización. Los tipos de datos que procesamos incluyen:
    </p>
    <ul className="mt-4 space-y-3 text-[var(--foreground)]/70">
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        <div>
          <strong>Datos de TikTok:</strong> Comentarios, mensajes directos, nombre de usuario público, e información de perfil público necesaria para contextualizar respuestas
        </div>
      </li>
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        <div>
          <strong>Datos de otras plataformas:</strong> Mensajes y comentarios de Instagram, Facebook, WhatsApp según las plataformas que conectes
        </div>
      </li>
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        <div>
          <strong>Datos de configuración:</strong> Preferencias de automatización, horarios programados, y parámetros de respuesta que configures
        </div>
      </li>
      <li className="flex items-start gap-2">
        <span className="material-symbols-outlined text-[var(--primary)] text-lg mt-0.5">
          check
        </span>
        <div>
          <strong>Datos de contacto:</strong> Email de contacto para soporte y notificaciones del servicio
        </div>
      </li>
    </ul>
    <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
      <p className="text-purple-600 font-medium text-sm">
        <strong>Nota:</strong> NO recopilamos información personal sensible, datos financieros, ni información no relacionada con el servicio de automatización.
      </p>
    </div>
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
