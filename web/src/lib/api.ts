import { ChatRequest, ChatResponse } from '@/types/chat';

const VPS_CHAT_URL = 'https://n8nauto.pauvepe.com/webhook/web-chat';

/** Parse a data URL (data:type;base64,...) into { data, contentType } */
function parseDataUrl(dataUrl: string): { data: string; contentType: string } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { contentType: match[1], data: match[2] };
}

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const body: Record<string, unknown> = {
      sessionId: request.sessionId,
      message: request.message,
    };

    if (request.audio) {
      body.audio = parseDataUrl(request.audio);
    }

    if (request.image) {
      body.image = parseDataUrl(request.image);
    }

    const response = await fetch(VPS_CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return {
        success: false,
        response: '',
        error: 'Error al enviar el mensaje'
      };
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      response: '',
      error: 'Error de conexión. Inténtalo de nuevo.'
    };
  }
}

/** Fetch previous session history from VPS */
export async function fetchSessionHistory(sessionId: string): Promise<Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>> {
  try {
    const response = await fetch(`${VPS_CHAT_URL}/history?sessionId=${encodeURIComponent(sessionId)}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.messages || [];
  } catch {
    return [];
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
