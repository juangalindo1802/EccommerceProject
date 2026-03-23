import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryBySlug } from "@/services/products.service";

type CategoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Categoria" };
  return {
    title: category.name,
    description: category.description ?? "Categoria de productos premium",
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-12">
        <Badge>Categoria</Badge>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          {category.description ?? "Linea tecnologica premium para setups modernos."}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="border-border/70">
            <CardContent className="space-y-3 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Para quien es
              </p>
              <p className="text-sm text-muted-foreground">
                Personas que priorizan rendimiento, estetica limpia y una experiencia confiable en
                su ecosistema digital diario.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="space-y-3 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Que resuelve
              </p>
              <p className="text-sm text-muted-foreground">
                Optimiza productividad y entretenimiento con equipamiento que equilibra potencia,
                precision y durabilidad.
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="space-y-3 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Valor premium
              </p>
              <p className="text-sm text-muted-foreground">
                Materiales superiores, mejor ingenieria termica/acustica y diseno coherente para un
                setup profesional de largo plazo.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-primary/20 bg-gradient-to-r from-background via-secondary/50 to-background">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Esta pagina describe la categoria. Si quieres ver productos concretos, entra al
                catalogo completo.
              </p>
            </div>
            <Button asChild>
              <Link href="/products">Ir al catalogo</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
