import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isStripeConfigured, isSupabaseConfigured } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getOrderByStripeSessionForUser,
  markOrderPaid,
  OrderServiceError,
} from "@/services/orders.service";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  if (!isSupabaseConfigured()) redirect("/login");
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) redirect("/cart");

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const order = await getOrderByStripeSessionForUser(sessionId, user.id);
  if (!order) redirect("/account/orders");

  let paymentConfirmed = false;
  if (isStripeConfigured()) {
    const stripe = getStripeClient();
    const session = stripe ? await stripe.checkout.sessions.retrieve(sessionId) : null;
    if (session?.payment_status === "paid") {
      try {
        await markOrderPaid(order.id);
        paymentConfirmed = true;
      } catch (error) {
        if (!(error instanceof OrderServiceError)) {
          paymentConfirmed = false;
        }
      }
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-20">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="space-y-4 py-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
            <h1 className="font-display text-4xl">Pago recibido</h1>
            <p className="text-sm text-muted-foreground">
              {paymentConfirmed || order.status === "paid"
                ? "Tu orden fue confirmada y esta en proceso."
                : "Tu orden esta registrada. Espera confirmacion de pago."}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/account/orders">Ver mis ordenes</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Seguir comprando</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}

