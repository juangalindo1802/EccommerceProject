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
            <Card key={category.slug} className="min-h-44 transition-transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.description ?? "Categoria premium seleccionada"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
