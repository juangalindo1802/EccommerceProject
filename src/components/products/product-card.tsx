"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WishlistToggleButton } from "@/components/wishlist/wishlist-toggle-button";
import { useCartStore } from "@/store/cart-store";
import type { ProductView } from "@/types/product";

type ProductCardProps = {
  product: ProductView;
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  return (
    <Card className="group overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative block h-56 overflow-hidden">
        <Image
          src={product.images[0]?.url ?? "https://images.unsplash.com/photo-1527814050087-3793815479db"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{product.category.name}</Badge>
          <span className="inline-flex items-center text-xs text-amber-600">
            <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
            {product.rating}
          </span>
        </div>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription>{product.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <p className="font-display text-2xl text-foreground">${product.price}</p>
          {product.compareAtPrice ? (
            <p className="text-xs text-muted-foreground line-through">${product.compareAtPrice}</p>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          className="w-full"
          onClick={() => {
            addItem(
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                stock: product.stock,
                image:
                  product.images[0]?.url ??
                  "https://images.unsplash.com/photo-1527814050087-3793815479db",
              },
              1,
            );
            openDrawer();
            toast.success("Producto agregado al carrito.");
          }}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Sin stock" : "Agregar"}
        </Button>
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/products/${product.slug}`}>Ver detalle</Link>
        </Button>
      </CardFooter>
      <div className="px-6 pb-6 pt-0">
        <WishlistToggleButton productId={product.id} />
      </div>
    </Card>
  );
}
