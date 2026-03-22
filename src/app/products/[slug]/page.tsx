import Link from "next/link";
import { ArrowLeft, CircleAlert, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { ProductGallery } from "@/components/products/product-gallery";
import { QuantitySelector } from "@/components/products/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WishlistToggleButton } from "@/components/wishlist/wishlist-toggle-button";
import { isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProductBySlug, getRelatedProducts } from "@/services/products.service";
import type { ProductView } from "@/types/product";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | VANTA.TECH`,
      description: product.shortDescription,
      images: product.images[0]?.url ? [product.images[0].url] : [],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }
  if (!product) notFound();

  let relatedProducts: ProductView[] = [];
  try {
    relatedProducts = await getRelatedProducts(product.category.id, product.slug);
  } catch {
    relatedProducts = [];
  }

  let initiallyWishlisted = false;
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const wish = await prisma.wishlistItem.findUnique({
          where: { userId_productId: { userId: user.id, productId: product.id } },
          select: { id: true },
        });
        initiallyWishlisted = Boolean(wish);
      }
    } catch {
      initiallyWishlisted = false;
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-8 md:py-12">
        <div className="container space-y-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catalogo
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            <ProductGallery
              name={product.name}
              images={product.images.map((image) => image.url)}
            />

            <div className="space-y-6">
              <div className="space-y-3">
                <Badge variant="outline">{product.category.name}</Badge>
                <h1 className="font-display text-4xl tracking-tight md:text-5xl">{product.name}</h1>
                <p className="text-base text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <p className="font-display text-4xl">${product.price}</p>
                {product.compareAtPrice ? (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.compareAtPrice}
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1 text-amber-600">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  {product.rating} / 5
                </span>
                <span
                  className={`inline-flex items-center gap-1 ${
                    product.stock > 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  <CircleAlert className="h-4 w-4" />
                  {product.stock > 0 ? `${product.stock} unidades disponibles` : "Sin stock"}
                </span>
              </div>

              <QuantitySelector
                product={{
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  stock: product.stock,
                  image:
                    product.images[0]?.url ??
                    "https://images.unsplash.com/photo-1527814050087-3793815479db",
                }}
              />
              <WishlistToggleButton
                productId={product.id}
                initiallyWishlisted={initiallyWishlisted}
              />

              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="font-semibold">Especificaciones destacadas</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2">
                        <PackageCheck className="h-4 w-4 text-primary" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-4 sm:grid-cols-2">
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" /> Entrega premium en 24-72h
                </p>
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Garantia extendida 24 meses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <h2 className="font-display text-3xl tracking-tight">Productos relacionados</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tambien puede interesarte dentro de esta categoria.
          </p>
          {relatedProducts.length === 0 ? (
            <Card className="mt-6 border-dashed">
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                No hay productos relacionados disponibles por el momento.
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
