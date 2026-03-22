import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:p-12 md:text-left">
            <div>
              <h3 className="font-display text-3xl tracking-tight">
                Construye tu setup premium hoy.
              </h3>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                Descubre productos tecnológicos de nivel profesional y lleva tu rendimiento al
                siguiente estándar.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="#catalogo">Explorar catálogo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

