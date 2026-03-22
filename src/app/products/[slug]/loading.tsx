import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-8 md:py-12">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-[360px] w-full sm:h-[460px]" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-14 w-4/5" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-44" />
            <Skeleton className="h-24 w-72" />
            <Skeleton className="h-36 w-full" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

