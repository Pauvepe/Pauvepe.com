"use client";

import { Message } from '@/types/chat';
import TypewriterText from './TypewriterText';

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export default function ChatMessage({ message, isLatest = false }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]'
            : 'bg-[var(--surface)] border border-[var(--primary)]/30'
        }`}
      >
        <span className={`material-symbols-outlined text-sm ${isUser ? 'text-white' : 'text-[var(--primary)]'}`}>
          {isUser ? 'person' : 'smart_toy'}
        </span>
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-br-md'
            : 'glass border border-[var(--primary)]/20 rounded-bl-md'
        }`}
      >
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="rounded-lg overflow-hidden">
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.data}
                    alt="Imagen adjunta"
                    className="max-w-[200px] max-h-[150px] object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                    <span className="material-symbols-outlined text-lg">graphic_eq</span>
                    <span className="text-sm">Audio enviado</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Text content */}
        {message.isTyping ? (
          <div className="flex items-center gap-1">
            <span className="typing-dot w-2 h-2 rounded-full bg-current opacity-60" style={{ animationDelay: '0ms' }} />
            <span className="typing-dot w-2 h-2 rounded-full bg-current opacity-60" style={{ animationDelay: '200ms' }} />
            <span className="typing-dot w-2 h-2 rounded-full bg-current opacity-60" style={{ animationDelay: '400ms' }} />
          </div>
        ) : isLatest && !isUser ? (
          <TypewriterText text={message.content} speed={15} />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
}
