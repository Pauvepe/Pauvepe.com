import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FacebookPixel from "@/components/FacebookPixel";
import { AppProvider } from "@/context/AppContext";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pau Vera | Tu Negocio En Esteroides",
    template: "%s | Pau Vera",
  },
  description:
    "Escalamos tu negocio con ads, chatbots 24/7, secretaria IA, landing pages, ecommerce y sistemas post-venta. Vendemos por ti online. Auditoria gratuita.",
  keywords: [
    "growth partner digital",
    "publicidad digital",
    "chatbots para negocios",
    "secretaria IA",
    "landing pages conversion",
    "ecommerce",
    "Google Ads",
    "Meta Ads",
    "automatizacion ventas",
    "Pau Vera",
    "pauvepe",
    "Barcelona",
  ],
  authors: [{ name: "Pau Vera" }],
  creator: "Pau Vera",
  publisher: "Pau Vera",
  metadataBase: new URL("https://pauvepe.com"),
  alternates: {
    canonical: "https://pauvepe.com",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pauvepe.com",
    siteName: "Pau Vera - Tu Negocio En Esteroides",
    title: "Pau Vera | Tu Negocio En Esteroides",
    description:
      "Escalamos tu negocio con ads, chatbots 24/7, secretaria IA, landing pages y ecommerce. Vendemos por ti online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pau Vera | Tu Negocio En Esteroides",
    description:
      "Escalamos tu negocio con ads, chatbots 24/7, secretaria IA, landing pages y ecommerce. Vendemos por ti online.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme) document.documentElement.setAttribute('data-theme', theme);
                var locale = localStorage.getItem('locale');
                if (locale) document.documentElement.lang = locale === 'ca' ? 'ca' : locale === 'en' ? 'en' : 'es';
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${dmSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppProvider>
          <FacebookPixel />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/34637682568"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </AppProvider>
      </body>
    </html>
  );
}
