import { Boxes, DollarSign, ReceiptText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminDashboardStats } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-4xl tracking-tight">Dashboard</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Vista general del ecommerce en tiempo real.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Total productos</CardTitle>
            <Boxes className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-4xl">{stats.productsCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Total ordenes</CardTitle>
            <ReceiptText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-4xl">{stats.ordersCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Ventas pagadas</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-4xl">${stats.paidSales}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

