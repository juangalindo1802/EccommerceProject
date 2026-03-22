"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <>
      {isDrawerOpen ? (
        <button
          aria-label="Cerrar carrito"
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px]"
          onClick={closeDrawer}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-background shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-2xl">Tu carrito</h2>
            <Button variant="ghost" size="icon" onClick={closeDrawer} aria-label="Cerrar">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Tu carrito esta vacio.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.productId} className="rounded-2xl border border-border/70 p-3">
                  <div className="flex gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price}</p>
                      <p className="text-xs text-muted-foreground">Stock: {item.stock}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <p className="ml-auto text-sm font-semibold">
                      ${item.quantity * item.price}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-3 border-t border-border p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="font-display text-2xl">${subtotal}</p>
            </div>
            <Button className="w-full" asChild onClick={closeDrawer}>
              <Link href="/cart">Ir al carrito</Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

