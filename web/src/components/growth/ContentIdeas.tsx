"use client";

import { useState } from "react";

interface ContentIdeasProps {
  industry: "veterinaria" | "ortopedia" | "servicios" | "ecommerce";
}

const ideasByIndustry = {
  veterinaria: [
    { icon: "pets", text: "Graba mientras revisas a un paciente (con permiso del dueno)" },
    { icon: "vaccines", text: "Explica en 30 seg por que las vacunas son importantes" },
    { icon: "store", text: "Abre la clinica por la manana y muestra como preparas todo" },
    { icon: "emergency", text: "Cuenta una urgencia que atendiste (sin datos personales)" },
    { icon: "nutrition", text: "3 alimentos que NUNCA debe comer un perro/gato" },
    { icon: "favorite", text: "Presenta al equipo: cada uno dice su animal favorito" },
    { icon: "monitoring", text: "Muestra como haces una ecografia o radiografia" },
    { icon: "spa", text: "Tips de higiene dental para mascotas" },
    { icon: "calendar_month", text: "Recuerda las desparasitaciones de primavera/otono" },
    { icon: "local_hospital", text: "Desmiente un mito veterinario popular" },
    { icon: "videocam", text: "Un dia normal en la clinica en 60 segundos" },
    { icon: "mood", text: "El momento mas tierno de la semana con un paciente" },
    { icon: "help", text: "Responde la pregunta mas comun que te hacen los clientes" },
    { icon: "elderly", text: "Cuidados especiales para mascotas senior" },
    { icon: "thermostat", text: "Como proteger a tu mascota del calor/frio" },
    { icon: "restaurant", text: "Receta casera sana para perros" },
    { icon: "child_care", text: "Como presentar un bebe al perro/gato de casa" },
    { icon: "directions_walk", text: "Cuanto ejercicio necesita tu raza de perro" },
    { icon: "psychology", text: "Senales de que tu mascota tiene ansiedad" },
    { icon: "inventory_2", text: "Muestra los productos que recomiendas y por que" },
    { icon: "thumb_up", text: "Un antes y despues de un tratamiento" },
    { icon: "groups", text: "Pide al cliente que deje una resena en camara" },
    { icon: "celebration", text: "Celebra un cumpleanos de un paciente habitual" },
    { icon: "school", text: "Explica algo que la gente siempre hace mal" },
    { icon: "trending_up", text: "Comparte las estadisticas de tu clinica (pacientes/mes)" },
  ],
  ortopedia: [
    { icon: "accessible", text: "Muestra como ajustar correctamente una silla de ruedas" },
    { icon: "store", text: "Abre la tienda y prepara el escaparate de la manana" },
    { icon: "health_and_safety", text: "3 errores al elegir una faja lumbar" },
    { icon: "elderly", text: "Productos que mejoran la vida de personas mayores" },
    { icon: "directions_walk", text: "Como elegir el baston o andador correcto" },
    { icon: "bed", text: "Diferencias entre camas articuladas (vale la pena ver)" },
    { icon: "inventory_2", text: "Producto nuevo que acaba de llegar a la tienda" },
    { icon: "sports", text: "Rodilleras deportivas: cual es para ti" },
    { icon: "psychology", text: "El consejo que das 10 veces al dia a tus clientes" },
    { icon: "thumb_up", text: "Un cliente cuenta como le cambio X producto" },
    { icon: "help", text: "Responde la pregunta mas frecuente de tus clientes" },
    { icon: "medical_information", text: "Explica un producto tecnico de forma sencilla" },
    { icon: "school", text: "Desmiente un mito sobre ortopedia" },
    { icon: "build", text: "Muestra como reparas o ajustas algo en el taller" },
    { icon: "local_shipping", text: "Detras de camaras: como preparas un pedido" },
    { icon: "volunteer_activism", text: "Por que el asesoramiento personalizado importa" },
    { icon: "trending_up", text: "Un producto que se esta vendiendo mucho y por que" },
    { icon: "calendar_month", text: "Tips de cuidado segun la temporada" },
    { icon: "groups", text: "Presenta a tu equipo y sus especialidades" },
    { icon: "star", text: "Los 3 productos mas vendidos de la semana" },
    { icon: "videocam", text: "Un dia normal en la ortopedia en 60 seg" },
    { icon: "compare", text: "Compara dos productos similares: cual elegir" },
    { icon: "celebration", text: "Celebra un hito: X anos, X clientes..." },
    { icon: "workspace_premium", text: "Muestra las marcas premium que trabajas" },
    { icon: "support", text: "Como funciona la garantia y el servicio postventa" },
  ],
  servicios: [
    { icon: "store", text: "Abre el negocio por la manana y muestra tu rutina" },
    { icon: "engineering", text: "Graba mientras trabajas (el proceso real)" },
    { icon: "lightbulb", text: "Un consejo rapido que tus clientes siempre necesitan" },
    { icon: "help", text: "Responde la pregunta que te hacen 5 veces al dia" },
    { icon: "school", text: "Desmiente el mito mas comun de tu sector" },
    { icon: "groups", text: "Presenta a tu equipo (nombre, que hace, dato curioso)" },
    { icon: "thumb_up", text: "Un antes y despues de tu trabajo" },
    { icon: "reviews", text: "Lee en voz alta una resena real de un cliente" },
    { icon: "build", text: "Muestra tus herramientas favoritas y por que" },
    { icon: "videocam", text: "Un dia completo en 60 segundos" },
    { icon: "calendar_month", text: "Tips de temporada relacionados con tu servicio" },
    { icon: "trending_up", text: "Comparte un resultado o estadistica real" },
    { icon: "psychology", text: "3 senales de que necesitas [tu servicio]" },
    { icon: "warning", text: "El error mas comun que comete la gente" },
    { icon: "history", text: "Cuenta la historia de como empezaste" },
    { icon: "volunteer_activism", text: "Por que te apasiona lo que haces" },
    { icon: "workspace_premium", text: "Muestra un certificado o formacion reciente" },
    { icon: "local_offer", text: "Presenta una promo o novedad del mes" },
    { icon: "support_agent", text: "Explica como es tu proceso de atencion" },
    { icon: "star", text: "El servicio mas pedido y por que funciona" },
    { icon: "handshake", text: "Pide a un cliente que cuente su experiencia" },
    { icon: "inventory_2", text: "Muestra los productos/materiales que usas" },
    { icon: "emoji_events", text: "Celebra un logro del negocio" },
    { icon: "compare", text: "Compara opciones que confunden a tus clientes" },
    { icon: "new_releases", text: "Algo nuevo que has incorporado al servicio" },
  ],
  ecommerce: [
    { icon: "store", text: "Abre la tienda y muestra las novedades del dia" },
    { icon: "inventory_2", text: "Muestra un producto nuevo que acaba de llegar" },
    { icon: "local_shipping", text: "Detras de camaras: preparando un pedido" },
    { icon: "star", text: "Los 3 productos mas vendidos esta semana" },
    { icon: "thumb_up", text: "Un cliente cuenta por que le encanta X producto" },
    { icon: "compare", text: "Compara dos productos similares y ayuda a elegir" },
    { icon: "help", text: "Responde la pregunta que mas te hacen" },
    { icon: "school", text: "Ensenale al cliente como usar/cuidar un producto" },
    { icon: "local_offer", text: "Presenta la promo de la semana" },
    { icon: "workspace_premium", text: "Explica por que trabajas con X marca" },
    { icon: "videocam", text: "Un dia en la tienda en 60 segundos" },
    { icon: "groups", text: "Presenta a tu equipo" },
    { icon: "lightbulb", text: "Un consejo de uso que la gente no sabe" },
    { icon: "trending_up", text: "Un producto que esta de moda y por que" },
    { icon: "celebration", text: "Celebra un hito de la tienda" },
    { icon: "psychology", text: "Como elegir el [producto] perfecto para ti" },
    { icon: "history", text: "La historia de tu tienda en 60 segundos" },
    { icon: "build", text: "Muestra como reparas o personalizas algo" },
    { icon: "reviews", text: "Lee una resena real de un cliente" },
    { icon: "calendar_month", text: "Productos de temporada que no te puedes perder" },
    { icon: "unboxing", text: "Unboxing de nuevos productos que llegan" },
    { icon: "volunteer_activism", text: "Por que amas lo que vendes" },
    { icon: "support", text: "Muestra tu atencion al cliente en accion" },
    { icon: "new_releases", text: "Novedad que vas a incorporar pronto" },
    { icon: "emoji_events", text: "Muestra premios o reconocimientos" },
  ],
};

export default function ContentIdeas({ industry }: ContentIdeasProps) {
  const [showAll, setShowAll] = useState(false);
  const ideas = ideasByIndustry[industry];
  const visible = showAll ? ideas : ideas.slice(0, 8);

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--foreground)]/10 overflow-hidden">
      <div className="p-6 border-b border-[var(--foreground)]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[var(--primary)]">videocam</span>
          </div>
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">
              25 Ideas de Contenido
            </h3>
            <p className="text-xs text-[var(--foreground)]/50">
              Solo 8 minutos al dia. Sin guion. Desde tu movil.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-2">
          {visible.map((idea, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--foreground)]/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-sm text-[var(--primary)]">
                  {idea.icon}
                </span>
              </div>
              <p className="text-sm text-[var(--foreground)]/80">{idea.text}</p>
            </div>
          ))}
        </div>

        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-3 py-3 rounded-xl border border-[var(--primary)]/30 text-[var(--primary)] font-medium text-sm hover:bg-[var(--primary)]/5 transition-colors"
          >
            Ver las {ideas.length - 8} ideas restantes
          </button>
        )}
      </div>

      <div className="p-4 bg-[var(--foreground)]/5 border-t border-[var(--foreground)]/10">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-[var(--secondary)] text-lg mt-0.5">tips_and_updates</span>
          <p className="text-xs text-[var(--foreground)]/60">
            <strong>Te doy mi cuenta de CapCut</strong> con teleprompter para que leas mientras grabas.
            Unas veces con guion, otras sin el. Tu solo dale al rec.
          </p>
        </div>
      </div>
    </div>
  );
}
