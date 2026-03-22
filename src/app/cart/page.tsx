import { CartPageClient } from "@/components/cart/cart-page-client";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartPageClient />
      <Footer />
    </main>
  );
}

