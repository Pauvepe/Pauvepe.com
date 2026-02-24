import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva tu Auditoria Gratuita",
  description:
    "Reserva una auditoria gratuita con Pau Vera. Analizamos tu negocio y te proponemos un plan de crecimiento con IA y automatizacion.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Reserva tu Auditoria Gratuita | Pau Vera",
    description:
      "Auditoria gratuita para tu negocio. Descubre como escalar con IA y automatizacion.",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
