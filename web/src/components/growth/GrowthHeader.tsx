"use client";

import Link from "next/link";

export default function GrowthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm py-3">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/pau-icon.svg"
              alt="pauvepe"
              className="h-8 w-auto transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--foreground)]">
              pauvepe
            </span>
          </Link>
          <a
            href="https://wa.me/34637682568"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine px-5 py-2 bg-[var(--primary)] text-white font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all"
          >
            Hablemos
          </a>
        </div>
      </nav>
    </header>
  );
}
