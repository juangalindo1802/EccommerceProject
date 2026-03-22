import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-28" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-11 w-full rounded-full" />
      </CardFooter>
    </Card>
  );
}

