export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: FileAttachment[];
  isTyping?: boolean;
}

export interface FileAttachment {
  id: string;
  type: 'audio' | 'image';
  data: string; // base64
  preview?: string; // thumbnail URL for images
  name: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  transcription?: string;
  imageDescription?: string;
  error?: string;
}

export interface ChatRequest {
  message?: string;
  audio?: string;
  image?: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  locale?: string;
}
