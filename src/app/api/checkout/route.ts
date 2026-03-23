import { NextResponse } from "next/server";

import { isDatabaseConfigured, isStripeConfigured, isSupabaseConfigured } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  attachStripeSessionToOrder,
  createPendingOrderForUser,
  type CheckoutItemInput,
  OrderServiceError,
} from "@/services/orders.service";

type CheckoutRequestBody = {
  items?: CheckoutItemInput[];
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Auth no configurado." }, { status: 500 });
  }
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe no configurado." }, { status: 500 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Base de datos no configurada." }, { status: 500 });
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Debes iniciar sesion." }, { status: 401 });
    }

    const body = (await request.json()) as CheckoutRequestBody;
    const items = body.items ?? [];
    const order = await createPendingOrderForUser(user.id, items);

    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe no disponible." }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.unitPrice * 100,
          product_data: {
            name: item.productName,
          },
        },
      })),
      metadata: {
        orderId: order.id,
        userId: user.id,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel?order_id=${order.id}`,
    });

    await attachStripeSessionToOrder(order.id, session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof OrderServiceError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "No se pudo iniciar checkout." }, { status: 500 });
  }
}
