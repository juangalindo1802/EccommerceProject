import { notFound } from "next/navigation";

import { updateProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getAdminProductById } from "@/services/admin.service";

type AdminEditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditProductPage({ params }: AdminEditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-3xl">Editar producto</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductForm
          action={updateProductAction}
          categories={categories}
          initial={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            stock: product.stock,
            rating: product.rating,
            featured: product.featured,
            specs: product.specs,
            categoryId: product.categoryId,
            images: product.images.map((image) => image.url),
          }}
        />
      </CardContent>
    </Card>
  );
}

