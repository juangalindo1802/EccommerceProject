import { createProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-3xl">Nuevo producto</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductForm action={createProductAction} categories={categories} />
      </CardContent>
    </Card>
  );
}
