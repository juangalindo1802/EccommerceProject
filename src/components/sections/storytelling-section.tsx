import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function StorytellingSection() {
  return (
    <section id="historia" className="py-16 md:py-20">
      <div className="container">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-background via-secondary/40 to-background">
          <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Storytelling tecnologico
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Diseñamos una tienda para personas que construyen el futuro digital.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                VANTA.TECH nace como un concepto ecommerce que mezcla rendimiento, estetica y
                narrativa visual. No vendemos gadgets, curamos herramientas de trabajo moderno.
              </p>
              <p>
                Desde estudios creativos hasta oficinas remotas, cada producto fue elegido para
                elevar setups con identidad propia.
              </p>
              <Button variant="outline" asChild>
                <Link href="/story">Leer historia completa</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

