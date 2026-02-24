import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mi",
  description:
    "Soy Pau Vera, experto en automatizacion con IA, chatbots y growth marketing en Barcelona. Ayudo a negocios a escalar con tecnologia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Sobre Pau Vera | AI Automation Expert",
    description:
      "Experto en automatizacion con IA, chatbots y growth marketing en Barcelona.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
