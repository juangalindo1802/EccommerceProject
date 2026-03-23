import Link from "next/link";
import { CircleOff } from "lucide-react";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cancelPendingOrderForUser } from "@/services/orders.service";

type CheckoutCancelPageProps = {
  searchParams: Promise<{ order_id?: string }>;
};

export const dynamic = "force-dynamic";

export default async function CheckoutCancelPage({ searchParams }: CheckoutCancelPageProps) {
  if (!isSupabaseConfigured()) redirect("/login");
  const { order_id: orderId } = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  if (orderId) await cancelPendingOrderForUser(orderId, user.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-20">
        <Card className="mx-auto max-w-2xl border-dashed">
          <CardContent className="space-y-4 py-12 text-center">
            <CircleOff className="mx-auto h-12 w-12 text-amber-600" />
            <h1 className="font-display text-4xl">Checkout cancelado</h1>
            <p className="text-sm text-muted-foreground">
              Tu orden pendiente fue cancelada. Puedes volver a intentarlo cuando quieras.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/cart">Volver al carrito</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Ver catalogo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
