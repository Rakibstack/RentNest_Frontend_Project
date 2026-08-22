import PropertySkeleton from "../_components/property/PropertySkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full max-w-2xl animate-pulse rounded bg-muted" />
            <div className="h-5 w-full max-w-xl animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 space-y-2">
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}