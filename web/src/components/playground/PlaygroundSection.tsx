"use client";

import { useState } from 'react';
import { Message, FileAttachment } from '@/types/chat';
import { sendMessage, generateId } from '@/lib/api';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

export default function PlaygroundSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string, attachments: FileAttachment[]) => {
    // Create user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add typing indicator
    const typingId = generateId();
    setMessages(prev => [...prev, {
      id: typingId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    }]);

    try {
      // Prepare request
      const audio = attachments.find(a => a.type === 'audio')?.data;
      const image = attachments.find(a => a.type === 'image')?.data;

      const history = messages
        .filter(m => !m.isTyping)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await sendMessage({
        message: text || undefined,
        audio,
        image,
        history
      });

      // Remove typing indicator and add real response
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingId);

        if (response.success) {
          let content = response.response;

          // If there was a transcription, prepend it
          if (response.transcription && audio) {
            content = `*Tu dijiste: "${response.transcription}"*\n\n${content}`;
          }

          return [...filtered, {
            id: generateId(),
            role: 'assistant',
            content,
            timestamp: new Date()
          }];
        } else {
          return [...filtered, {
            id: generateId(),
            role: 'assistant',
            content: response.error || 'Lo siento, ha ocurrido un error. Inténtalo de nuevo.',
            timestamp: new Date()
          }];
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingId);
        return [...filtered, {
          id: generateId(),
          role: 'assistant',
          content: 'Lo siento, ha ocurrido un error. Inténtalo de nuevo.',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[var(--surface)]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            Playground IA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            Prueba Nuestra <span className="gradient-text">Inteligencia</span>
          </h2>
          <p className="text-[var(--foreground)]/70">
            Experimenta con nuestro asistente. Envía texto, graba un audio o sube una imagen.
          </p>
        </div>

        {/* Chat container */}
        <div className="max-w-2xl mx-auto animate-fade-in-up delay-200">
          <div className="glass rounded-2xl border border-[var(--primary)]/20 overflow-hidden shadow-xl shadow-[var(--primary)]/5">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--foreground)]/10 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                <span className="material-symbols-outlined text-white">smart_toy</span>
              </div>
              <div>
                <h3 className="font-semibold font-[family-name:var(--font-display)] text-sm">
                  Asistente Pauvepe
                </h3>
                <p className="text-xs text-[var(--foreground)]/60">
                  {isLoading ? 'Escribiendo...' : 'En línea'}
                </p>
              </div>
              <div className={`ml-auto w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
            </div>

            {/* Messages */}
            <ChatWindow messages={messages} />

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-[var(--foreground)]/40 mt-4">
            Respuestas generadas por IA. Para consultas específicas, agenda una auditoría gratuita.
          </p>
        </div>
      </div>
    </section>
  );
}
