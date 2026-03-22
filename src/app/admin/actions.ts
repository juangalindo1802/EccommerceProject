"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ProductPayload = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  rating: number;
  featured: boolean;
  specs: string[];
  imageUrls: string[];
  categoryId: string;
};

function parseProductForm(formData: FormData): ProductPayload {
  const imageUrls = String(formData.get("imageUrls") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    description: String(formData.get("description") ?? ""),
    price: Number(formData.get("price") ?? 0),
    compareAtPrice: formData.get("compareAtPrice")
      ? Number(formData.get("compareAtPrice"))
      : null,
    stock: Number(formData.get("stock") ?? 0),
    rating: Number(formData.get("rating") ?? 0),
    featured: String(formData.get("featured") ?? "") === "on",
    specs: String(formData.get("specs") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    imageUrls,
    categoryId: String(formData.get("categoryId") ?? ""),
  };
}

function validateProductPayload(payload: ProductPayload) {
  if (!payload.name || !payload.slug || !payload.categoryId) {
    throw new Error("Nombre, slug y categoria son obligatorios.");
  }
  if (payload.price <= 0) throw new Error("El precio debe ser mayor a cero.");
  if (payload.stock < 0) throw new Error("Stock invalido.");
  if (payload.imageUrls.length === 0) {
    throw new Error("Sube al menos una imagen.");
  }
}

export async function createProductAction(formData: FormData) {
  await requireAdminUser();

  const payload = parseProductForm(formData);
  validateProductPayload(payload);

  await prisma.product.create({
    data: {
      name: payload.name,
      slug: payload.slug,
      shortDescription: payload.shortDescription,
      description: payload.description,
      price: payload.price,
      compareAtPrice: payload.compareAtPrice,
      stock: payload.stock,
      rating: payload.rating,
      featured: payload.featured,
      specs: payload.specs,
      categoryId: payload.categoryId,
      images: {
        create: payload.imageUrls.map((url, index) => ({
          url,
          alt: payload.name,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProductAction(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID de producto faltante.");

  const payload = parseProductForm(formData);
  validateProductPayload(payload);

  await prisma.product.update({
    where: { id },
    data: {
      name: payload.name,
      slug: payload.slug,
      shortDescription: payload.shortDescription,
      description: payload.description,
      price: payload.price,
      compareAtPrice: payload.compareAtPrice,
      stock: payload.stock,
      rating: payload.rating,
      featured: payload.featured,
      specs: payload.specs,
      categoryId: payload.categoryId,
      images: {
        deleteMany: {},
        create: payload.imageUrls.map((url, index) => ({
          url,
          alt: payload.name,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/products/${payload.slug}`);
  revalidatePath("/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("ID de producto faltante.");

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  if (!id || !Object.values(OrderStatus).includes(status)) {
    throw new Error("Datos invalidos.");
  }

  await prisma.order.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/orders");
  revalidatePath("/account/orders");
}
