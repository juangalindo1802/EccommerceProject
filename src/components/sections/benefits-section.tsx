import Link from "next/link";
import { ShieldCheck, Truck, Zap } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Zap,
    title: "Curaduria Premium",
    description: "Solo productos de alto rendimiento y diseño superior para usuarios exigentes.",
  },
  {
    icon: Truck,
    title: "Despacho Rapido",
    description: "Logistica optimizada para entregas eficientes y experiencia de compra fluida.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia Extendida",
    description: "Cobertura extendida y soporte tecnico especializado para cada categoria.",
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          label="Beneficios"
          title="Compra con Confianza"
          description="Experiencia ecommerce pensada para una audiencia tech que valora calidad real."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="glass-panel">
              <CardHeader>
                <benefit.icon className="mb-3 h-6 w-6 text-primary" />
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/benefits">Ver pagina de beneficios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

