"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, t as translate } from "@/lib/i18n";

type Theme = "light" | "dark";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocaleState] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedTheme) setTheme(savedTheme);
    if (savedLocale) setLocaleState(savedLocale);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "ca" ? "ca" : locale === "en" ? "en" : "es";
    localStorage.setItem("locale", locale);
  }, [locale, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const setLocale = (l: Locale) => setLocaleState(l);
  const t = (key: string) => translate(key, locale);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, locale, setLocale, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
