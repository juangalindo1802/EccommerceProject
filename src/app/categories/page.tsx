import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/services/products.service";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Categorias",
  description: "Explora categorias tecnologicas premium con curaduria especializada.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-12">
        <Badge>Categorias Interactivas</Badge>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
          Elige un universo de producto
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Cada categoria abre una seleccion especializada para una necesidad concreta.
        </p>

        {categories.length === 0 ? (
          <Card className="mt-8 border-dashed">
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              Aun no hay categorias disponibles.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group min-h-44 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category.description ?? "Categoria tecnologica premium"}
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-primary">
                      Explorar categoria
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}

