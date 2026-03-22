import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-hero-pattern opacity-80" />
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            Tecnología premium para setups modernos
          </Badge>
          <h1 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
            Equipamiento tech de alto nivel para crear, trabajar y destacar.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Curamos productos con diseño sofisticado, rendimiento real y experiencia impecable
            para profesionales digitales.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#catalogo">
                Ver productos destacados
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#historia">Conoce la visión</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

