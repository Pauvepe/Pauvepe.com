"use client";

import { FileAttachment } from '@/types/chat';

interface FilePreviewProps {
  file: FileAttachment;
  onRemove: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--foreground)]/10 animate-fade-in-up">
      {file.type === 'image' ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
          <img
            src={file.data}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[var(--primary)]">
          <span className="material-symbols-outlined text-xl">graphic_eq</span>
          <span className="text-sm font-medium">Audio</span>
        </div>
      )}

      <span className="text-xs text-[var(--foreground)]/60 max-w-[100px] truncate">
        {file.name}
      </span>

      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
        aria-label="Eliminar archivo"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}
