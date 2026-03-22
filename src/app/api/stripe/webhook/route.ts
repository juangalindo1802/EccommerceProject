import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getStripeClient } from "@/lib/stripe";
import { cancelPendingOrderByStripeSession, markOrderPaid } from "@/services/orders.service";

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 500 });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Firma faltante." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Firma invalida." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (orderId) await markOrderPaid(orderId);
    }
    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.id) await cancelPendingOrderByStripeSession(session.id);
    }
  } catch {
    return NextResponse.json({ error: "No se pudo actualizar orden." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
