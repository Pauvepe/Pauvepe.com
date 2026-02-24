import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="growth-landing">
      {children}
    </div>
  );
}
