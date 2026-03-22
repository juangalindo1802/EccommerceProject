import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProductsCatalogClient } from "@/components/products/products-catalog-client";
import { getAllProducts } from "@/services/products.service";
import type { ProductView } from "@/types/product";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Catalogo",
  description: "Explora productos tecnologicos premium con filtros y busqueda inteligente.",
  openGraph: {
    title: "Catalogo | VANTA.TECH",
    description: "Coleccion premium de dispositivos para setups modernos.",
    type: "website",
  },
};

export default async function ProductsPage() {
  let products: ProductView[] = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ProductsCatalogClient products={products} />
      <Footer />
    </main>
  );
}
