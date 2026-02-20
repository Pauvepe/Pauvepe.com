"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Locale, localeNames } from "@/lib/i18n";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme, locale, setLocale, t } = useApp();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/freelance", label: t("nav.freelance") },
  ];

  const locales: Locale[] = ["es", "ca", "en"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/pau-icon.svg"
              alt="pauvepe"
              className="h-9 w-auto transition-transform group-hover:scale-105 group-hover:hidden"
            />
            <img
              src="/images/pau-icon-animated.svg"
              alt="pauvepe"
              className="h-9 w-auto transition-transform hidden group-hover:block group-hover:scale-105"
            />
            <span className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--foreground)]">
              pauvepe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-[var(--primary)] ${
                  pathname === link.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--primary)] transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-base">translate</span>
                <span className="uppercase font-medium">{locale}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 py-1 rounded-xl bg-[var(--surface)] border border-[var(--foreground)]/10 shadow-lg min-w-[140px]">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--primary)]/10 transition-colors ${
                        locale === l ? "text-[var(--primary)] font-semibold" : ""
                      }`}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--primary)] transition-colors"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-lg">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <Link
              href="/booking"
              className="btn-shine px-6 py-2.5 bg-[var(--primary)] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[var(--primary)]/30 transition-all"
            >
              {t("nav.booking")}
            </Link>
          </div>

          {/* Mobile: theme + lang + menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-xl">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-[72px] bg-[var(--background)]/95 backdrop-blur-lg transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-medium transition-colors hover:text-[var(--primary)] ${
                  pathname === link.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language */}
            <div className="flex gap-3">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setIsMenuOpen(false); }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    locale === l
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--foreground)]/20"
                  }`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>

            <Link
              href="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="btn-shine px-8 py-3 bg-[var(--primary)] text-white font-semibold rounded-full text-xl"
            >
              {t("nav.booking")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
