import { OrderStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type CheckoutItemInput = {
  productId: string;
  quantity: number;
};

export class OrderServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OrderServiceError";
  }
}

export async function createPendingOrderForUser(userId: string, items: CheckoutItemInput[]) {
  if (items.length === 0) throw new OrderServiceError("El carrito esta vacio.");

  const groupedItems = Array.from(
    new Map(items.map((item) => [item.productId, item])).values(),
  ).map((item) => ({
    ...item,
    quantity: Math.max(1, Math.floor(item.quantity)),
  }));

  const products = await prisma.product.findMany({
    where: { id: { in: groupedItems.map((item) => item.productId) } },
    select: { id: true, name: true, price: true, stock: true },
  });

  if (products.length !== groupedItems.length) {
    throw new OrderServiceError("Uno o mas productos ya no estan disponibles.");
  }

  const itemsWithPricing = groupedItems.map((item) => {
    const product = products.find((value) => value.id === item.productId);
    if (!product) throw new OrderServiceError("Producto invalido en el carrito.");
    if (item.quantity > product.stock) {
      throw new OrderServiceError(`Stock insuficiente para ${product.name}.`);
    }
    return {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });

  const subtotal = itemsWithPricing.reduce((sum, item) => sum + item.lineTotal, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      subtotal,
      status: OrderStatus.pending,
      items: {
        create: itemsWithPricing,
      },
    },
    include: {
      items: true,
    },
  });

  return order;
}

export async function attachStripeSessionToOrder(orderId: string, stripeSessionId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { stripeSessionId },
  });
}

export async function markOrderPaid(orderId: string) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new OrderServiceError("Orden no encontrada.");
    if (order.status !== OrderStatus.pending) return order;

    for (const item of order.items) {
      if (!item.productId) continue;
      const updated = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });
      if (updated.count === 0) {
        throw new OrderServiceError(`Sin stock para completar ${item.productName}.`);
      }
    }

    return tx.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.paid },
    });
  });
}

export async function cancelPendingOrderForUser(orderId: string, userId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
  });
  if (!order) return null;
  if (order.status !== OrderStatus.pending) return order;

  return prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.cancelled },
  });
}

export async function getOrdersByUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderByIdForUser(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true },
  });
}

export async function getOrderByStripeSessionForUser(
  stripeSessionId: string,
  userId: string,
) {
  return prisma.order.findFirst({
    where: { stripeSessionId, userId },
    include: { items: true },
  });
}

export async function cancelPendingOrderByStripeSession(stripeSessionId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId },
  });
  if (!order) return null;
  if (order.status !== OrderStatus.pending) return order;

  return prisma.order.update({
    where: { id: order.id },
    data: { status: OrderStatus.cancelled },
  });
}
