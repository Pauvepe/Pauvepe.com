import { ChatRequest, ChatResponse } from '@/types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        response: '',
        error: error.error || 'Error al enviar el mensaje'
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

/** Fetch previous session history from the server */
export async function fetchSessionHistory(sessionId: string): Promise<Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>> {
  try {
    const response = await fetch(`${API_URL}/chat/history?sessionId=${encodeURIComponent(sessionId)}`);
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
