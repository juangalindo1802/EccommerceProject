"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { CartProduct } from "@/store/cart-store";
import { useCartStore } from "@/store/cart-store";

type QuantitySelectorProps = {
  product: CartProduct;
};

export function QuantitySelector({ product }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const increase = () => setQuantity((current) => Math.min(product.stock, current + 1));
  const decrease = () => setQuantity((current) => Math.max(1, current - 1));

  const addToCart = () => {
    addItem(product, quantity);
    openDrawer();
    toast.success("Producto agregado al carrito.");
  };

  return (
    <div className="space-y-4">
      <div className="flex w-fit items-center gap-3 rounded-full border border-border/70 bg-card p-2">
        <Button variant="ghost" size="icon" onClick={decrease} aria-label="Restar cantidad">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 text-center font-semibold">{quantity}</span>
        <Button variant="ghost" size="icon" onClick={increase} aria-label="Sumar cantidad">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" onClick={addToCart} disabled={product.stock === 0}>
        {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </Button>
    </div>
  );
}
