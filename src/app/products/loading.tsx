import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-10 md:py-12">
        <div className="container space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-12 w-full max-w-xl" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
          <Skeleton className="h-36 w-full" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

