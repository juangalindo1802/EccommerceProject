import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Beneficios",
  description: "Conoce los beneficios premium de la experiencia VANTA.TECH.",
};

export default function BenefitsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container pt-10">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">Beneficios premium</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          Disenamos un ecommerce enfocado en confianza, velocidad y calidad para usuarios exigentes.
        </p>
      </section>
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
