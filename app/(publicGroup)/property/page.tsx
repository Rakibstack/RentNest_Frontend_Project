import PropertyList from "../_components/property/PropertyList";
import PropertySearchFilter from "../_components/property/PropertySearchFilter";
import { getAllProperty } from "../_action/getAllProperty";

type PropertyListPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    location?: string;
    categoryId?: string;
    minRent?: string;
    maxRent?: string;
    page?: string;
  }>;
};

const PropertyListPage = async ({
  searchParams,
}: PropertyListPageProps) => {
  const params = await searchParams;

  const result = await getAllProperty({
    searchTerm: params.searchTerm,
    location: params.location,
    categoryId: params.categoryId,
    minRent: params.minRent
      ? Number(params.minRent)
      : undefined,
    maxRent: params.maxRent
      ? Number(params.maxRent)
      : undefined,
    page: params.page
      ? Number(params.page)
      : 1,
    limit: 9,
  });

  return (
    <main className="min-h-screen bg-background">

      {/* Page Header */}
      <section className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Explore Properties
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find a place that feels like home.
            </h1>

            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Explore verified rental properties across popular
              locations and find a home that fits your lifestyle and
              budget.
            </p>
          </div>
        </div>
      </section>

      {/* Property Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Search + Filter */}
        <PropertySearchFilter />

        {/* Top Row */}
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Available Properties
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Discover your next home from our latest listings.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            ( All Properties{" "}
            <span className="font-medium text-foreground">
              {result.meta.total}
            </span>{" "}
            )
            <span className="ml-1">
              Showing{" "}
              <span className="font-medium text-foreground">
                {result.data.length}
              </span>{" "}
              properties
            </span>
          </div>
        </div>

        {/* Property List */}
        <PropertyList properties={result} />

      </section>
    </main>
  );
};

export default PropertyListPage;