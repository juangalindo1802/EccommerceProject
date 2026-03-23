import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryView } from "@/types/category";

type FeaturedCategoriesSectionProps = {
  categories: CategoryView[];
};

export function FeaturedCategoriesSection({ categories }: FeaturedCategoriesSectionProps) {
  return (
    <section id="categorias" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          label="Categorías"
          title="Universo Tecnológico"
          description="Explora líneas de producto diseñadas para distintos estilos de trabajo y vida."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Card className="min-h-44 transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description ?? "Categoria premium seleccionada"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
