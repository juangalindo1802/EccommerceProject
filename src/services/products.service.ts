import { isDatabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import type { CategoryView } from "@/types/category";
import type { ProductView } from "@/types/product";

const productInclude = {
  category: true,
  images: {
    orderBy: {
      sortOrder: "asc" as const,
    },
  },
};

function mapProduct(product: {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  stock: number;
  featured: boolean;
  specs: string[];
  category: { id: string; name: string; slug: string; description: string | null };
  images: { id: string; url: string; alt: string | null; sortOrder: number }[];
}): ProductView {
  return {
    ...product,
    images: product.images,
    category: product.category,
  };
}

export async function getCategories(): Promise<CategoryView[]> {
  if (!isDatabaseConfigured()) return [];
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getAllProducts(): Promise<ProductView[]> {
  if (!isDatabaseConfigured()) return [];
  const products = await prisma.product.findMany({
    include: productInclude,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return products.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<ProductView[]> {
  if (!isDatabaseConfigured()) return [];
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: productInclude,
    orderBy: [{ rating: "desc" }],
    take: 8,
  });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<ProductView | null> {
  if (!isDatabaseConfigured()) return null;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
  return product ? mapProduct(product) : null;
}

export async function getRelatedProducts(
  categoryId: string,
  currentSlug: string,
): Promise<ProductView[]> {
  if (!isDatabaseConfigured()) return [];
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      slug: { not: currentSlug },
    },
    include: productInclude,
    orderBy: [{ rating: "desc" }],
    take: 4,
  });
  return products.map(mapProduct);
}
