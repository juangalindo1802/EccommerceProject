import { OrderStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getAdminDashboardStats() {
  const [productsCount, ordersCount, paidSales] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { subtotal: true },
      where: { status: OrderStatus.paid },
    }),
  ]);

  return {
    productsCount,
    ordersCount,
    paidSales: paidSales._sum.subtotal ?? 0,
  };
}

export async function getAdminProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getAdminOrders() {
  return prisma.order.findMany({
    include: {
      user: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

