import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistLoading() {
  return (
    <section className="container py-12">
      <Skeleton className="h-12 w-64" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    </section>
  );
}

