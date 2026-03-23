import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CtaSection } from "@/components/sections/cta-section";
import { StorytellingSection } from "@/components/sections/storytelling-section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Historia",
  description: "La narrativa y vision tecnologica detras de VANTA.TECH.",
};

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-12">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-background via-secondary/50 to-background">
          <CardContent className="space-y-4 p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Nuestra historia
            </p>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">
              VANTA.TECH no vende gadgets, crea experiencias digitales con identidad.
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Este proyecto fue creado para representar un ecommerce moderno de tecnologia premium,
              con arquitectura escalable y una interfaz de alto nivel para portafolio profesional.
            </p>
          </CardContent>
        </Card>
      </section>
      <StorytellingSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

