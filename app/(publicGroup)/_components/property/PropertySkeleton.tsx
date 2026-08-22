
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background">
      {/* Image */}
      <Skeleton className="h-60 w-full rounded-none" />

      <div className="space-y-4 p-5">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        {/* Property info */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}