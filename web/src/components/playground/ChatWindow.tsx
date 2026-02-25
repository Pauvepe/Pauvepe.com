"use client";

import { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="h-[260px] sm:h-[320px] md:h-[400px] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scroll-smooth"
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-[var(--foreground)]/50">
          <span className="material-symbols-outlined text-5xl mb-3 text-[var(--primary)]/30">
            chat_bubble
          </span>
          <p className="text-sm">
            Envía un mensaje, audio o imagen para empezar
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))
      )}
    </div>
  );
}
