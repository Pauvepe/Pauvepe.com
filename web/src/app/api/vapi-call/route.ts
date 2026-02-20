import { NextRequest, NextResponse } from "next/server";

const VAPI_API_KEY = process.env.VAPI_API_KEY || "";
const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID || "";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, locale = "es" } = await request.json();

    if (!phoneNumber || !/^\+?\d{9,15}$/.test(phoneNumber.replace(/\s/g, ""))) {
      return NextResponse.json(
        { success: false, error: "Numero de telefono invalido" },
        { status: 400 }
      );
    }

    // Ensure E.164 format
    let cleanNumber = phoneNumber.replace(/\s/g, "");
    if (!cleanNumber.startsWith("+")) {
      cleanNumber = "+34" + cleanNumber; // Default to Spain
    }

    const langPrompt =
      locale === "en"
        ? "Speak in English."
        : locale === "ca"
        ? "Speak in Catalan."
        : "Habla en castellano de Espana.";

    const firstMessage =
      locale === "en"
        ? "Hi! I'm Pau Vera's AI secretary. You requested a call from our website. How can I help you?"
        : locale === "ca"
        ? "Hola! Soc la secretaria IA de Pau Vera. Has demanat que et truquesim des de la web. En que et puc ajudar?"
        : "Hola! Soy la secretaria IA de Pau Vera. Has pedido que te llamemos desde la web. En que puedo ayudarte?";

    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        customer: { number: cleanNumber },
        assistant: {
          model: {
            provider: "openai",
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `Eres la secretaria virtual de Pau Vera (pauvepe.com). ${langPrompt}

Pau es un experto en automatizacion con IA en Barcelona. Ofrece: chatbots, agentes de voz, e-commerce automatizado, landing pages, automatizaciones, Facebook/Google Ads, excels complejas.

Tu objetivo: ser amable, responder preguntas, intentar vender los servicios y agendar citas. Puedes consultar el horario y agendar citas en pauvepe.com/booking.

Experiencia: trabajo con Huella Urbana BCN (+1200 productos, chatbots, CRM automatizado). La web es huellaurbanabcn.com.

Esto es una llamada real - menciona que este agente de voz es un ejemplo de lo que Pau puede crear para su negocio.

Respuestas cortas y naturales. Intenta que agenden una cita gratuita en pauvepe.com/booking.`,
              },
            ],
          },
          voice: {
            provider: "11labs",
            voiceId: "pFZP5JQG7iQjIQuC4Bku",
          },
          firstMessage,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Vapi API error:", response.status, errorData);
      return NextResponse.json(
        { success: false, error: "Error al iniciar la llamada" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, callId: data.id });
  } catch (error) {
    console.error("Vapi call error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
