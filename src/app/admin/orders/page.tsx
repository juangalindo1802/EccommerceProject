import { OrderStatus } from "@prisma/client";

import { updateOrderStatusAction } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminOrders } from "@/services/admin.service";

export const dynamic = "force-dynamic";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pendiente",
  paid: "Pagada",
  cancelled: "Cancelada",
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-4xl tracking-tight">Ordenes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Gestion de estados y seguimiento comercial.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            Todavia no hay ordenes.
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
                    {order.user.email} · {new Date(order.createdAt).toLocaleString("es-PE")}
                  </p>
                </div>
                <Badge>{statusLabel[order.status]}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm text-muted-foreground"
                  >
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>${item.lineTotal}</span>
                  </div>
                ))}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-display text-2xl">${order.subtotal}</p>
                  <form action={updateOrderStatusAction} className="flex gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="h-10 rounded-xl border border-input bg-background px-3 text-sm"
                    >
                      {Object.values(OrderStatus).map((status) => (
                        <option key={status} value={status}>
                          {statusLabel[status]}
                        </option>
                      ))}
                    </select>
                    <Button type="submit" size="sm" variant="outline">
                      Actualizar
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
