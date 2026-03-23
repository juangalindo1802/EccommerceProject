import { NextResponse } from "next/server";

import { isDatabaseConfigured, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { toggleWishlistItem } from "@/services/wishlist.service";

type ToggleWishlistRequest = {
  productId?: string;
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Auth no configurado." }, { status: 500 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Base de datos no configurada." }, { status: 500 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Debes iniciar sesion." }, { status: 401 });

  const body = (await request.json()) as ToggleWishlistRequest;
  const productId = body.productId;
  if (!productId) return NextResponse.json({ error: "Producto invalido." }, { status: 400 });

  try {
    const result = await toggleWishlistItem(user.id, productId);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "No se pudo actualizar wishlist." }, { status: 500 });
  }
}
