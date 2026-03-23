import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-[#021A15] via-[#043126] to-[#0A5A43] text-white shadow-2xl shadow-primary/20">
          <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between md:p-12">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                Siguiente paso
              </p>
              <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                Explora el catalogo completo y arma tu setup premium.
              </h2>
              <p className="max-w-2xl text-sm text-white/80 md:text-base">
                Descubre productos de alto rendimiento con diseno elegante, detalles tecnicos claros
                y una experiencia pensada para conversion real.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/products">Explorar catalogo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="/categories">Ver categorias</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
