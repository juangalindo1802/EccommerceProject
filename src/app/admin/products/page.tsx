import Link from "next/link";

import { deleteProductAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminProducts } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-4xl tracking-tight">Productos</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Gestion completa del catalogo premium.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">Nuevo producto</Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No hay productos registrados.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    /products/{product.slug} · Stock {product.stock} · ${product.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>Editar</Link>
                  </Button>
                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={product.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      Eliminar
                    </Button>
                  </form>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

