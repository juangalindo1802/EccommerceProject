import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "@/components/products/product-card";
import type { ProductView } from "@/types/product";

type FeaturedProductsSectionProps = {
  products: ProductView[];
};

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section id="catalogo" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          label="Seleccion Curada"
          title="Productos Destacados"
          description="Una coleccion premium elegida por diseno, calidad y desempeno superior."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
