import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Publicidad digital, chatbots IA 24/7, secretaria virtual, landing pages, ecommerce y automatizacion de ventas. Escalamos tu negocio.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Servicios | Pau Vera",
    description:
      "Ads, chatbots IA, landing pages, ecommerce y automatizacion. Todo lo que necesitas para escalar.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
