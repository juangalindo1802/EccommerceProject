import { Skeleton } from "@/components/ui/skeleton";

export default function AccountOrdersLoading() {
  return (
    <section className="container py-12">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="mt-8 h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </section>
  );
}

