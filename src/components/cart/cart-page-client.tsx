"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageFallback } from "@/components/ui/image-fallback";
import { useCartStore } from "@/store/cart-store";

export function CartPageClient() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkout = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setErrorMessage(data.error ?? "No se pudo iniciar checkout.");
        return;
      }

      clearCart();
      window.location.href = data.url;
    } catch {
      setErrorMessage("Error de red. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="container py-16">
        <Card className="mx-auto max-w-2xl border-dashed">
          <CardContent className="space-y-4 py-14 text-center">
            <h1 className="font-display text-4xl">Tu carrito esta vacio</h1>
            <p className="text-sm text-muted-foreground">
              Agrega productos premium para continuar al checkout.
            </p>
            <Button asChild>
              <Link href="/products">Explorar catalogo</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container py-12">
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">Carrito</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.productId}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                  <ImageFallback src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">${item.price} c/u</p>
                  <p className="text-xs text-muted-foreground">Stock: {item.stock}</p>
                </div>
                <div className="flex items-center gap-2">
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
                </div>
                <p className="w-24 text-right text-base font-semibold">
                  ${item.price * item.quantity}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.productId)}
                  aria-label={`Eliminar ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Envio</span>
              <span>Calculado en checkout</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl">${subtotal}</span>
            </div>
            {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
            <Button className="w-full" onClick={checkout} disabled={isLoading}>
              {isLoading ? "Procesando..." : "Pagar con Stripe"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
