import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropertyList from "../_components/property/PropertyList";

const PropertyListPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* =========================================
          Page Header
      ========================================= */}

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
              Explore verified rental properties across popular locations
              and find a home that fits your lifestyle and budget.
            </p>
          </div>

          {/* =========================================
              Search
          ========================================= */}

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/70 bg-background p-3 shadow-sm sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by location, property name..."
                className="h-11 border-0 bg-muted/40 pl-10 shadow-none focus-visible:ring-1"
              />
            </div>

            <Button className="h-11 rounded-xl px-6">
              Search Properties
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================
          Property Content
      ========================================= */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
            Showing <span className="font-medium text-foreground">24</span>{" "}
            properties
          </div>
        </div>

        {/* PropertyList will come here */}

        <PropertyList></PropertyList>
      </section>
    </main>
  );
};

export default PropertyListPage;