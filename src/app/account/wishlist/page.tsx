import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getWishlistProductsByUser } from "@/services/wishlist.service";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  if (!isSupabaseConfigured()) redirect("/login");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const wishlistItems = await getWishlistProductsByUser(user.id);
  const products = wishlistItems.map((item) => item.product);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-12">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">Mi wishlist</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Productos guardados para comprar mas tarde.
        </p>

        {products.length === 0 ? (
          <Card className="mt-8 border-dashed">
            <CardContent className="py-14 text-center text-sm text-muted-foreground">
              Tu wishlist esta vacia.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}

