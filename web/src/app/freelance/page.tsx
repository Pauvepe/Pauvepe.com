import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PhoneMockup from "@/components/PhoneMockup";
import HuellaProductScreen from "@/components/HuellaProductScreen";

export const metadata: Metadata = {
  title: "Freelance Services",
  description:
    "AI Engineer & Creative Developer. Web development, e-commerce, chatbots, voice agents, and automation. From €250.",
  alternates: {
    canonical: "/freelance",
  },
};

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PHP",
  "n8n",
  "Make",
  "OpenAI",
  "Supabase",
  "WordPress",
  "WooCommerce",
  "Shopify",
  "Stripe",
  "Tailwind CSS",
  "Google Cloud",
];

const freelanceServices = [
  {
    icon: "web",
    title: "Websites & Landing Pages",
    description:
      "High-converting websites built with Next.js, React, or WordPress. Fast, responsive, SEO-optimized.",
    price: "From €300",
    timeline: "3-7 days",
  },
  {
    icon: "shopping_cart",
    title: "E-commerce",
    description:
      "Full online stores with WooCommerce, Shopify, or custom solutions. Payment integration, inventory sync, automated marketing.",
    price: "From €500",
    timeline: "5-14 days",
  },
  {
    icon: "smart_toy",
    title: "AI Chatbots",
    description:
      "Intelligent chatbots for WhatsApp, Telegram, or your website. Trained on your business data, 24/7 customer support.",
    price: "From €350",
    timeline: "3-5 days",
  },
  {
    icon: "call",
    title: "Voice Agents",
    description:
      "AI-powered voice agents that make and receive calls. Appointment scheduling, lead qualification, customer service.",
    price: "From €400",
    timeline: "3-7 days",
  },
  {
    icon: "settings_suggest",
    title: "Automation & Integrations",
    description:
      "Connect anything to anything. n8n/Make workflows, API integrations, CRM automation, email sequences.",
    price: "From €250",
    timeline: "1-5 days",
  },
  {
    icon: "campaign",
    title: "Facebook & Google Ads",
    description:
      "Campaign setup, pixel configuration, audience targeting, analytics dashboards, and reporting.",
    price: "From €300",
    timeline: "2-5 days",
  },
];

export default function FreelancePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[80vh] pt-24 flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-[var(--surface)] shadow-2xl">
                  <Image
                    src="/images/fotoperfil.jpg"
                    alt="Pau Vera - AI Engineer"
                    width={400}
                    height={500}
                    className="object-cover w-full"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                      Pau Vera
                    </h3>
                    <p className="text-white/80">
                      AI Engineer & Creative Developer
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      Barcelona, Spain
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Info */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
                  Available for Hire
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-4 leading-tight">
                  I Build & <span className="gradient-text">Automate</span>
                </h1>
                <p className="text-lg text-[var(--foreground)]/70">
                  Full-stack developer specialized in AI automation. I turn your
                  business ideas into working products — fast. Websites,
                  e-commerce, chatbots, voice agents, and custom integrations.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="animate-fade-in-up delay-100 grid grid-cols-3 gap-4">
                {[
                  { value: "2+", label: "Years Experience" },
                  { value: "1K+", label: "Products Managed" },
                  { value: "24/7", label: "AI Agents Built" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-3 rounded-xl bg-[var(--surface)] border border-[var(--foreground)]/10"
                  >
                    <div className="text-2xl font-bold gradient-text font-[family-name:var(--font-display)]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--foreground)]/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-in-up delay-200 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="btn-shine px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full hover:shadow-lg transition-all"
                >
                  Book a Free Call
                </Link>
                <a
                  href="mailto:info@pauvepe.com"
                  className="px-6 py-3 border-2 border-[var(--foreground)]/20 rounded-full font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  info@pauvepe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-center text-sm font-medium text-[var(--foreground)]/50 mb-6 uppercase tracking-wider">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-[var(--background)] border border-[var(--foreground)]/10 text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              What I <span className="gradient-text">Build</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              Short-term projects, delivered fast. No long contracts, no
              overhead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelanceServices.map((service, i) => (
              <div
                key={i}
                className="card-hover p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10"
              >
                <span className="material-symbols-outlined text-3xl text-[var(--primary)] mb-4">
                  {service.icon}
                </span>
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/70 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[var(--primary)]">
                    {service.price}
                  </span>
                  <span className="text-[var(--foreground)]/50">
                    {service.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Case Study */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Real <span className="gradient-text">Results</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-hover p-8 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/10">
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/huellaurbana.svg"
                    alt="Huella Urbana"
                    width={120}
                    height={48}
                    className="opacity-80"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-1">
                    Huella Urbana BCN
                  </h3>
                  <p className="text-sm text-[var(--primary)] mb-3">
                    Lead AI & Web Engineer (2024-2026)
                  </p>
                  <p className="text-[var(--foreground)]/70 mb-4">
                    Full e-commerce infrastructure for a pet store chain with 3
                    physical locations in Barcelona + online store. 1,200+
                    products synchronized across all channels.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "WooCommerce",
                      "Custom PHP Plugins",
                      "AI Chatbots",
                      "CRM Automation",
                      "WhatsApp Commerce",
                      "Multi-store Sync",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup - Huella Urbana preview */}
            <PhoneMockup className="mt-12">
              <HuellaProductScreen />
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20">
              <span className="material-symbols-outlined text-5xl text-[var(--primary)] mb-4">
                verified
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
                Risk-Free Guarantee
              </h2>
              <p className="text-lg text-[var(--foreground)]/70 mb-2">
                Not happy with the result? You don&apos;t pay. Simple as that.
              </p>
              <p className="text-sm text-[var(--foreground)]/50">
                I believe in my work. If it doesn&apos;t meet your expectations,
                there&apos;s no charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-animated">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              Let&apos;s Build Something
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tell me what you need. I&apos;ll tell you how fast I can deliver
              it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="px-10 py-4 bg-white text-[var(--primary)] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                Book a Free Call
              </Link>
              <a
                href="https://wa.me/34637682568"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all"
              >
                WhatsApp Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
