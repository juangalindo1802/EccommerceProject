import { ArrowRight, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-24">
      <div className="absolute inset-0 -z-10 bg-hero-pattern opacity-80" />
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Badge className="mb-5">
              <Sparkles className="mr-1 h-3 w-3" />
              Tecnologia premium para setups modernos
            </Badge>

            <h1 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              El ecommerce tech para crear setups con presencia profesional.
            </h1>

            <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
              Curaduria de dispositivos de alto rendimiento, experiencia editorial y arquitectura
              moderna para una tienda que se siente premium de principio a fin.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/products">
                  Explorar catalogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/story">Conocer la historia</Link>
              </Button>
            </div>
          </div>

          <Card className="glass-panel overflow-hidden">
            <CardContent className="space-y-5 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Curaduria activa
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3">
                  <p className="text-sm">Categorias premium</p>
                  <p className="font-display text-2xl">10</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3">
                  <p className="text-sm">Productos curados</p>
                  <p className="font-display text-2xl">+10</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3">
                  <p className="text-sm">Experiencia visual</p>
                  <p className="font-display text-2xl">A+</p>
                </div>
              </div>
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link href="/benefits">
                  <Layers className="mr-2 h-4 w-4" />
                  Ver beneficios de la experiencia
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

