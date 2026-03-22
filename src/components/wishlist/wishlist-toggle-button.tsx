"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type WishlistToggleButtonProps = {
  productId: string;
  initiallyWishlisted?: boolean;
};

export function WishlistToggleButton({
  productId,
  initiallyWishlisted = false,
}: WishlistToggleButtonProps) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(initiallyWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (response.status === 401) {
        router.push("/login");
        return;
      }
      const data = (await response.json()) as { added?: boolean; error?: string };
      if (!response.ok) {
        toast.error(data.error ?? "No se pudo actualizar wishlist.");
        return;
      }
      setIsWishlisted(Boolean(data.added));
      toast.success(data.added ? "Agregado a wishlist." : "Eliminado de wishlist.");
      router.refresh();
    } catch {
      toast.error("Error de red.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={isWishlisted ? "secondary" : "outline"} onClick={toggle} disabled={isLoading}>
      <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
      {isWishlisted ? "En wishlist" : "Wishlist"}
    </Button>
  );
}

