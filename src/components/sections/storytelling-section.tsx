import { Card, CardContent } from "@/components/ui/card";

export function StorytellingSection() {
  return (
    <section id="historia" className="py-16 md:py-20">
      <div className="container">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-background via-secondary/40 to-background">
          <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Storytelling Tecnológico
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Diseñamos una experiencia para personas que construyen el futuro.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                VANTA.TECH nace como un concepto de ecommerce que combina rendimiento,
                estética y enfoque editorial. No vendemos gadgets: curamos herramientas para
                potenciar la vida digital.
              </p>
              <p>
                Desde estudios creativos hasta oficinas remotas, cada producto fue elegido para
                elevar setups modernos con identidad propia.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

