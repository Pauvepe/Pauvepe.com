import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FacebookPixel from "@/components/FacebookPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
  icons: {
    icon: "/images/pau-icon.svg",
    apple: "/images/pau-icon.svg",
  },
  title: {
    default: "Pau Vera | Tu Negocio En Esteroides - Growth Partner Digital Barcelona",
    template: "%s | Pau Vera - Growth Partner Digital",
  },
  description:
    "Creamos e-commerce, apps y webs a medida. Experiencia real: Huella Urbana BCN (3 tiendas, 1200+ productos). Chatbots IA 24/7, Google Ads, Meta Ads, automatizacion completa. Auditoria gratuita en Barcelona.",
  keywords: [
    "crear tienda online Barcelona",
    "desarrollo ecommerce Barcelona",
    "crear app a medida",
    "desarrollo web Barcelona",
    "tienda online WooCommerce Shopify",
    "growth partner digital Barcelona",
    "chatbots IA para empresas",
    "secretaria IA virtual",
    "agente de voz IA",
    "landing pages conversion",
    "ecommerce automatizado",
    "Google Ads Barcelona",
    "Meta Ads especialista",
    "automatizacion ventas online",
    "chatbot WhatsApp business",
    "Pau Vera",
    "pauvepe",
    "creacion apps webs ecommerce",
  ],
  authors: [{ name: "Pau Vera" }],
  creator: "Pau Vera",
  publisher: "Pau Vera",
  metadataBase: new URL("https://pauvepe.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pauvepe.com",
    siteName: "Pau Vera - Growth Partner Digital Barcelona",
    title: "Pau Vera | Tu Negocio En Esteroides",
    description:
      "Creamos e-commerce, apps y webs a medida. Caso real: Huella Urbana BCN (3 tiendas, 1200+ productos). Chatbots IA, Google Ads, automatizacion completa.",
    images: [
      {
        url: "/images/pauvera.png",
        width: 600,
        height: 800,
        alt: "Pau Vera - AI Automation Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pau Vera | Tu Negocio En Esteroides",
    description:
      "E-commerce, apps y webs a medida. Caso real: Huella Urbana BCN (3 tiendas, 1200+ productos). Chatbots IA, ads y automatizacion.",
    images: ["/images/pauvera.png"],
    creator: "@pauvepe",
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Pau Vera - Growth Partner Digital",
                  url: "https://pauvepe.com",
                  logo: "https://pauvepe.com/images/logo-icon.svg",
                  image: "https://pauvepe.com/images/pauvera.png",
                  description:
                    "Creamos e-commerce, apps y webs a medida. Caso real: Huella Urbana BCN (3 tiendas, 1200+ productos). Chatbots IA 24/7, Google Ads, Meta Ads y automatizacion completa.",
                  founder: {
                    "@type": "Person",
                    name: "Pau Vera",
                    jobTitle: "AI Automation Expert & Growth Partner",
                    url: "https://pauvepe.com/about",
                    image: "https://pauvepe.com/images/pauvera.png",
                    sameAs: [],
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "Spain",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barcelona",
                    addressRegion: "Cataluna",
                    addressCountry: "ES",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+34637682568",
                    contactType: "sales",
                    availableLanguage: ["Spanish", "Catalan", "English"],
                  },
                  knowsAbout: [
                    "E-commerce Development",
                    "App Development",
                    "Web Development",
                    "Artificial Intelligence",
                    "Chatbots",
                    "Voice AI Agents",
                    "Google Ads",
                    "Meta Ads",
                    "WooCommerce",
                    "Shopify",
                    "Marketing Automation",
                    "CRM",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Pau Vera - Growth Partner Digital",
                  url: "https://pauvepe.com",
                  inLanguage: ["es", "ca", "en"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://pauvepe.com/services",
                  },
                },
                {
                  "@type": "ProfessionalService",
                  name: "Pau Vera - Growth Partner Digital",
                  url: "https://pauvepe.com",
                  image: "https://pauvepe.com/images/pauvera.png",
                  telephone: "+34637682568",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Barcelona",
                    addressCountry: "ES",
                  },
                  priceRange: "$$",
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "19:00",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Servicios de Growth Digital",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Publicidad Digital (Google Ads & Meta Ads)",
                          description: "Campanas de ads optimizadas con IA para captar clientes cualificados.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Chatbots IA y Secretaria Virtual",
                          description: "Asistentes inteligentes 24/7 para web, WhatsApp e Instagram.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "E-commerce / Tiendas Online",
                          description: "Tiendas online profesionales. Caso real: Huella Urbana BCN con 3 tiendas y 1200+ productos.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Desarrollo Web y Apps a Medida",
                          description: "Webs profesionales, apps personalizadas y landing pages de alta conversion con Next.js, React y WordPress.",
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
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
          <GoogleAnalytics />
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
