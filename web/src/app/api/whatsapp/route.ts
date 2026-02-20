import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabase, findOrCreateContact, logInteraction } from "@/lib/supabase";

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER || "+34930346775";

const SYSTEM_PROMPT = `Eres el asistente virtual de Pau Vera por WhatsApp. Pau es un experto en automatizacion con IA en Barcelona.

Servicios: chatbots, agentes de voz IA, e-commerce automatizado (WooCommerce/Shopify), landing pages, automatizaciones (n8n), Facebook/Google Ads, excels y calculadoras complejas.
Experiencia: Huella Urbana BCN (+1200 productos, chatbots, CRM). Web: huellaurbanabcn.com
Garantia: si no te gusta, no pagas.

Tu objetivo: ser amable, responder preguntas, vender servicios, y que agende cita en pauvepe.com/booking
Respuestas cortas (max 3 frases). Esto es una demo de lo que Pau puede crear.
Responde en el idioma que te hablen. Si te hablan en catalan, responde en catalan.`;

async function getConversationHistory(contactId: string): Promise<Array<{ role: string; content: string }>> {
  const { data } = await getSupabase()
    .from("interactions")
    .select("role, message")
    .eq("contact_id", contactId)
    .eq("channel", "whatsapp")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!data) return [];
  return (data as Array<{ role: string; message: string }>).reverse().map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.message || "",
  }));
}

async function sendWhatsAppReply(to: string, body: string) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const params = new URLSearchParams({
    From: `whatsapp:${TWILIO_PHONE}`,
    To: to,
    Body: body,
  });

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get("From") as string; // whatsapp:+34...
    const body = formData.get("Body") as string;
    const numMedia = parseInt((formData.get("NumMedia") as string) || "0");

    const phone = from.replace("whatsapp:", "");

    // Find or create contact
    const contactId = await findOrCreateContact({
      phone,
      channel: "whatsapp",
    });

    // Log user message
    const images: string[] = [];
    for (let i = 0; i < numMedia; i++) {
      const mediaUrl = formData.get(`MediaUrl${i}`) as string;
      if (mediaUrl) images.push(mediaUrl);
    }

    await logInteraction({
      contact_id: contactId,
      channel: "whatsapp",
      role: "user",
      message: body || "(media)",
      images: images.length > 0 ? images : undefined,
    });

    // Get conversation history
    const history = await getConversationHistory(contactId);

    // Chat with OpenAI
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: body || "He enviado una imagen" },
    ];

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Lo siento, no he podido procesar tu mensaje.";

    // Log assistant reply
    await logInteraction({
      contact_id: contactId,
      channel: "whatsapp",
      role: "assistant",
      message: reply,
    });

    // Send reply via Twilio
    await sendWhatsAppReply(from, reply);

    // Return TwiML empty response (we already sent the message via API)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { headers: { "Content-Type": "text/xml" } }
    );
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { headers: { "Content-Type": "text/xml" } }
    );
  }
}
