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
  const [logoHovered, setLogoHovered] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-lg shadow-[var(--foreground)]/5 py-2.5"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <div
              ref={logoRef}
              className={`relative transition-all duration-500 ${
                isScrolled ? "h-8 w-8" : "h-9 w-9"
              }`}
            >
              <img
                src="/images/pau-icon.svg"
                alt="pauvepe"
                className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                  logoHovered ? "opacity-0 rotate-[360deg] scale-75" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <img
                src="/images/pau-icon-animated.svg"
                alt="pauvepe"
                className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                  logoHovered ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-[360deg] scale-75"
                }`}
              />
            </div>
            <span className={`font-bold font-[family-name:var(--font-display)] text-[var(--foreground)] transition-all duration-300 ${
              isScrolled ? "text-lg" : "text-xl"
            }`}>
              pauvepe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors hover:text-[var(--primary)] py-1 ${
                  pathname === link.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)]"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
                )}
              </Link>
            ))}

            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--primary)] transition-all text-sm"
              >
                <span className="material-symbols-outlined text-base">translate</span>
                <span className="uppercase font-medium">{locale}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--foreground)]/10 shadow-xl min-w-[140px] animate-fade-in-down">
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
              className="p-2 rounded-full border border-[var(--foreground)]/10 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-lg transition-transform hover:rotate-180 duration-500">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>

            <Link
              href="/booking"
              className="btn-shine px-6 py-2.5 bg-[var(--primary)] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[var(--primary)]/30 hover:scale-105 transition-all"
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
              <span className="material-symbols-outlined text-2xl transition-transform duration-300" style={{ transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-[60px] bg-[var(--background)]/98 backdrop-blur-xl transition-all duration-500 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-bold font-[family-name:var(--font-display)] transition-all duration-300 hover:text-[var(--primary)] ${
                  pathname === link.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)]"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${i * 100}ms` : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language */}
            <div className="flex gap-3" style={{ transitionDelay: isMenuOpen ? "300ms" : "0ms", opacity: isMenuOpen ? 1 : 0, transition: "all 0.3s" }}>
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setIsMenuOpen(false); }}
                  className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    locale === l
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--foreground)]/20 hover:border-[var(--primary)]"
                  }`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>

            <Link
              href="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="btn-shine px-10 py-4 bg-[var(--primary)] text-white font-semibold rounded-full text-xl"
              style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms", opacity: isMenuOpen ? 1 : 0, transition: "all 0.3s" }}
            >
              {t("nav.booking")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
