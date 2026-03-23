import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/services/products.service";

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
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);

  if (!category) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-12">
        <Badge>Categoria</Badge>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          {category.description ?? "Seleccion premium dentro de esta linea de producto."}
        </p>

        {products.length === 0 ? (
          <Card className="mt-8 border-dashed">
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No hay productos disponibles en esta categoria.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}

