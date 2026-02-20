import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getSystemPrompt(locale: string): string {
  const langInstruction =
    locale === "en"
      ? "IMPORTANT: You MUST respond in English. If the user writes in another language, still respond in English unless they explicitly ask otherwise."
      : locale === "ca"
      ? "IMPORTANT: Has de respondre SEMPRE en catala. Si l'usuari t'escriu en un altre idioma, respon en catala a menys que et demanin explicitament un altre idioma."
      : "IMPORTANTE: Responde SIEMPRE en castellano de Espana. Si el usuario te habla en otro idioma, responde en castellano a menos que te pidan explicitamente otro idioma.";

  return `Eres el asistente virtual de Pau Vera (pauvepe.com), un experto en automatizacion con IA basado en Barcelona, Espana.

${langInstruction}

## Sobre Pau Vera y su negocio:
- Especialista en automatizacion de negocios con IA
- Servicios: chatbots inteligentes, agentes de voz IA, e-commerce automatizado (WooCommerce/Shopify), landing pages de alta conversion, automatizaciones complejas (n8n, Make), Facebook & Google Ads, excels y calculadoras complejas con graficos y variables
- Experiencia real: trabajo con Huella Urbana BCN (tienda de mascotas con 2 locales fisicos + online, +1200 productos sincronizados, chatbots, CRM automatizado, WhatsApp Commerce)
- Tecnologias: Next.js, React, TypeScript, Python, PHP, WordPress, WooCommerce, Shopify, Stripe, Supabase, Twilio, Vapi, OpenAI, n8n
- Garantia: si no te gusta el resultado, no pagas
- Ubicacion: Barcelona, Espana

## Tu objetivo:
1. Ser amable, profesional y cercano
2. VENDER los servicios de Pau - intenta que el usuario se interese y agende una cita
3. Responder preguntas sobre los servicios
4. Si el usuario quiere un correo, responde con la accion [SEND_EMAIL]
5. Este chatbot es una DEMO - un ejemplo de lo que Pau puede crear para cualquier negocio

## Cuando te pidan enviar un correo:
Responde exactamente asi (sin variaciones):
[SEND_EMAIL:destinatario@email.com:asunto:cuerpo del correo]
Y luego explica que has enviado el correo.

## Cuando te pidan llamar:
Si el usuario te da su numero de telefono y quiere que le llamen, responde con la accion:
[CALL_ME:+34XXXXXXXXX]
Donde XXXXXXXXX es su numero en formato internacional. Luego explica que le llamaras en segundos.
Si NO te da numero, dile que puede pulsar el boton "Llamame" en las sugerencias del chat o el boton morado debajo, o que te diga su numero para llamarle.

## Reglas:
- Respuestas cortas y directas (max 3-4 frases)
- Siempre intenta dirigir hacia agendar una cita gratuita
- No inventes informacion - si no sabes algo, sugiere agendar cita para hablar con Pau
- Puedes usar markdown basico para formatear
- Eres un ejemplo de lo que Pau puede crear - mencionalo si viene al caso`;
}

export async function chatWithAI(
  message: string | undefined,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  imageBase64?: string,
  audioTranscription?: string,
  locale?: string
): Promise<{ response: string; transcription?: string }> {
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: getSystemPrompt(locale || "es") },
  ];

  // Add history
  for (const msg of history.slice(-10)) {
    messages.push({ role: msg.role, content: msg.content });
  }

  // Build current message
  if (audioTranscription) {
    messages.push({
      role: "user",
      content: `[Audio transcrito]: ${audioTranscription}`,
    });
  }

  if (imageBase64) {
    const content: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [];
    if (message) content.push({ type: "text", text: message });
    content.push({
      type: "image_url",
      image_url: { url: imageBase64, detail: "low" },
    });
    messages.push({ role: "user", content });
  } else if (message) {
    messages.push({ role: "user", content: message });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    max_tokens: 500,
    temperature: 0.7,
  });

  return {
    response: completion.choices[0]?.message?.content || "Lo siento, no he podido procesar tu mensaje.",
    transcription: audioTranscription,
  };
}

export async function transcribeAudio(audioBase64: string): Promise<string> {
  // Extract base64 data after the data URL prefix
  const base64Data = audioBase64.includes(",")
    ? audioBase64.split(",")[1]
    : audioBase64;
  const buffer = Buffer.from(base64Data, "base64");

  const file = new File([buffer], "audio.webm", { type: "audio/webm" });

  const transcription = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file,
    language: "es",
  });

  return transcription.text;
}
