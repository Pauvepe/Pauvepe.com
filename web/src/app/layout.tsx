import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FacebookPixel from "@/components/FacebookPixel";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Automation Expert | Pau Vera",
    template: "%s | Pau Vera",
  },
  description:
    "Escala tu negocio con automatización de IA. Transformo tu negocio para que vendas más mientras duermes.",
  keywords: [
    "automatización",
    "IA",
    "chatbots",
    "agentes de voz",
    "marketing digital",
    "e-commerce",
  ],
  authors: [{ name: "Pau Vera" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pauvepe.com",
    siteName: "Pau Vera - AI Automation",
    title: "AI Automation Expert | Pau Vera",
    description:
      "Escala tu negocio con automatización de IA. Transformo tu negocio para que vendas más mientras duermes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Expert | Pau Vera",
    description:
      "Escala tu negocio con automatización de IA. Transformo tu negocio para que vendas más mientras duermes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${notoSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <FacebookPixel />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
