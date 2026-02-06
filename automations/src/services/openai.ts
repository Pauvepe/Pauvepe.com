import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `Eres el asistente virtual de Pau Vera, experto en automatización con IA para negocios.

Tu comportamiento:
- Si recibes un mensaje de texto: responde de forma útil y breve, e invita a agendar una auditoría gratuita en pauvepe.com/booking
- Si el usuario envió un audio: confirma lo que dijeron con "Entendido, dijiste:" seguido de un breve resumen, y responde
- Si el usuario envió una imagen: describe brevemente lo que ves y ofrece ayuda relacionada

Tono: Profesional pero cercano, en español.
Límite: Respuestas de máximo 100 palabras.
Siempre termina invitando a explorar los servicios de automatización.`;

interface ChatContext {
  hasAudio?: boolean;
  hasImage?: boolean;
  transcription?: string;
  imageDescription?: string;
}

export async function processChat(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  context: ChatContext = {}
): Promise<string> {

  let contextualMessage = message;

  if (context.hasAudio && context.transcription) {
    contextualMessage = `[El usuario envió un audio que dice: "${context.transcription}"]`;
  }

  if (context.hasImage && context.imageDescription) {
    contextualMessage = `[El usuario envió una imagen: ${context.imageDescription}]`;
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    })),
    { role: 'user', content: contextualMessage }
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    max_tokens: 200,
    temperature: 0.7
  });

  return completion.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.';
}

export async function transcribeAudio(base64Audio: string): Promise<string> {
  // Remove data URL prefix if present
  const audioData = base64Audio.replace(/^data:audio\/\w+;base64,/, '');
  const buffer = Buffer.from(audioData, 'base64');

  // Create a File-like object for the API
  const file = new File([buffer], 'audio.webm', { type: 'audio/webm' });

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    language: 'es'
  });

  return transcription.text;
}

export async function describeImage(base64Image: string): Promise<string> {
  // Ensure proper data URL format
  let imageUrl = base64Image;
  if (!imageUrl.startsWith('data:')) {
    imageUrl = `data:image/jpeg;base64,${imageUrl}`;
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Describe brevemente esta imagen en español, en máximo 2 oraciones. Solo describe lo que ves.'
          },
          {
            type: 'image_url',
            image_url: { url: imageUrl }
          }
        ]
      }
    ],
    max_tokens: 100
  });

  return response.choices[0]?.message?.content || 'Una imagen';
}
