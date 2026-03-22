import { prisma } from "@/lib/prisma";

export async function getWishlistProductIds(userId: string) {
  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    select: { productId: true },
  });
  return new Set(items.map((item) => item.productId));
}

export async function getWishlistProductsByUser(userId: string) {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          category: true,
          images: { orderBy: { sortOrder: "asc" } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleWishlistItem(userId: string, productId: string) {
  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
    return { added: false };
  }

  await prisma.wishlistItem.create({
    data: { userId, productId },
  });
  return { added: true };
}

