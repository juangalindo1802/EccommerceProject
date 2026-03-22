import { ShieldCheck, Truck, Zap } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Zap,
    title: "Curaduría Premium",
    description: "Solo productos de alto rendimiento y diseño superior para usuarios exigentes.",
  },
  {
    icon: Truck,
    title: "Despacho Rápido",
    description: "Logística optimizada para entregas eficientes y experiencia de compra fluida.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía Extendida",
    description: "Cobertura extendida y soporte técnico especializado para cada categoría.",
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          label="Beneficios"
          title="Compra con Confianza"
          description="Experiencia de ecommerce pensada para una audiencia tech que valora calidad real."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="bg-secondary/30">
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
      </div>
    </section>
  );
}

