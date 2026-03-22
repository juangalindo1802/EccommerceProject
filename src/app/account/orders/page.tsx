import { redirect } from "next/navigation";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isDatabaseConfigured, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOrdersByUser } from "@/services/orders.service";

export const dynamic = "force-dynamic";

const statusLabel = {
  pending: "Pendiente",
  paid: "Pagada",
  cancelled: "Cancelada",
};

export default async function AccountOrdersPage() {
  if (!isSupabaseConfigured()) redirect("/login");

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  if (!isDatabaseConfigured()) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="container py-20">
          <Card className="mx-auto max-w-xl border-dashed">
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              Base de datos no configurada.
            </CardContent>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  const orders = await getOrdersByUser(user.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-tight md:text-5xl">Mis ordenes</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Historial personal de compras y estado de cada orden.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products">Seguir comprando</Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-14 text-center text-sm text-muted-foreground">
              Aun no tienes ordenes registradas.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">Orden #{order.id.slice(-8)}</CardTitle>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString("es-PE")}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "paid"
                        ? "default"
                        : order.status === "cancelled"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {statusLabel[order.status]}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-border/50 pb-2 text-sm last:border-b-0 last:pb-0"
                    >
                      <p>
                        {item.productName} x {item.quantity}
                      </p>
                      <p className="font-medium">${item.lineTotal}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="font-display text-2xl">${order.subtotal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
