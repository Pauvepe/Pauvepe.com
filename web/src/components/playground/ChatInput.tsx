"use client";

import { useState, useRef, useEffect } from 'react';
import { FileAttachment } from '@/types/chat';
import { fileToBase64, generateId } from '@/lib/api';
import FilePreview from './FilePreview';

interface ChatInputProps {
  onSend: (message: string, attachments: FileAttachment[]) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (disabled) return;
    if (!message.trim() && attachments.length === 0) return;

    onSend(message.trim(), attachments);
    setMessage('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const base64 = await fileToBase64(new File([audioBlob], 'audio.webm'));

        setAttachments(prev => [...prev, {
          id: generateId(),
          type: 'audio',
          data: base64,
          name: 'Audio grabado'
        }]);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 30000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar 5MB');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setAttachments(prev => [...prev, {
        id: generateId(),
        type: 'image',
        data: base64,
        name: file.name
      }]);
    } catch (error) {
      console.error('Error processing image:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="border-t border-[var(--foreground)]/10 p-4">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map((file) => (
            <FilePreview
              key={file.id}
              file={file}
              onRemove={() => removeAttachment(file.id)}
            />
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Record button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled}
          className={`flex-shrink-0 p-2.5 sm:p-3 rounded-full transition-all ${
            isRecording
              ? 'bg-red-500 text-white animate-recording'
              : 'bg-[var(--surface)] hover:bg-[var(--primary)]/10 text-[var(--foreground)]'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={isRecording ? 'Detener grabación' : 'Grabar audio'}
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">
            {isRecording ? 'stop' : 'mic'}
          </span>
        </button>

        {/* Image button - hide on very small screens */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="hidden sm:flex flex-shrink-0 p-2.5 sm:p-3 rounded-full bg-[var(--surface)] hover:bg-[var(--primary)]/10 text-[var(--foreground)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Adjuntar imagen"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">image</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Text input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Escribe un mensaje..."
          className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[var(--surface)] border border-[var(--foreground)]/10 focus:border-[var(--primary)] focus:outline-none transition-colors disabled:opacity-50 text-sm sm:text-base"
        />

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
          className="flex-shrink-0 p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Enviar mensaje"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">send</span>
        </button>
      </div>
    </div>
  );
}
