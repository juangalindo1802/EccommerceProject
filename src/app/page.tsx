import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FeaturedCategoriesSection } from "@/components/sections/featured-categories-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { HeroSection } from "@/components/sections/hero-section";
import { StorytellingSection } from "@/components/sections/storytelling-section";
import { getCategories, getFeaturedProducts } from "@/services/products.service";
import type { CategoryView } from "@/types/category";
import type { ProductView } from "@/types/product";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Inicio",
  description: "Ecommerce premium de tecnologia para portafolio profesional.",
  openGraph: {
    title: "VANTA.TECH | Tecnologia Premium",
    description: "Catalogo premium, UX moderna y arquitectura full stack profesional.",
    type: "website",
  },
};

export default async function HomePage() {
  let products: ProductView[] = [];
  let categories: CategoryView[] = [];

  try {
    [products, categories] = await Promise.all([getFeaturedProducts(), getCategories()]);
  } catch {
    products = [];
    categories = [];
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturedProductsSection products={products} />
      <FeaturedCategoriesSection categories={categories} />
      <BenefitsSection />
      <StorytellingSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
