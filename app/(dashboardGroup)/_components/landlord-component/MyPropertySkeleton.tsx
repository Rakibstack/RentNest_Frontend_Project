
import { Skeleton } from "@/components/ui/skeleton";

export default function MyPropertySkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-border/60 bg-background"
        >
          {/* Image */}
          <Skeleton className="aspect-[16/10] w-full rounded-none" />

          <div className="space-y-4 p-5">
            {/* Title + location */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Price */}
            <Skeleton className="h-6 w-32" />

            {/* Features */}
            <div className="flex gap-4 border-y border-border/60 py-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}