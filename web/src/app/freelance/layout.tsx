import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelance Services",
  description:
    "AI Engineer & Creative Developer. Web development, e-commerce, chatbots, voice agents, and automation. From €250.",
  alternates: {
    canonical: "/freelance",
  },
};

export default function FreelanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
