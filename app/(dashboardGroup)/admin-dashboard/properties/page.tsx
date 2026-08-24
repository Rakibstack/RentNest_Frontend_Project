
import { Building2, Home } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import PropertyList from "@/app/(publicGroup)/_components/property/PropertyList";
export const dynamic = "force-dynamic";
import { getAllProperties } from "../../_action/admin_action/getAllProperties";

const AdminPropertiesPage = async () => {
  const result = await getAllProperties();

  const properties = result?.data ?? [];

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1"
              >
                <Building2 className="mr-1.5 size-3.5 text-primary" />
                Property Management
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All Properties
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              View and manage all properties listed on RentNest.
            </p>
          </div>

          {/* Total */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3 shadow-sm">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <Home className="size-4 text-primary" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Total Properties
              </p>

              <p className="text-lg font-bold">
                {properties.length}
              </p>
            </div>
          </div>
        </div>

        {/* Property Content */}
        <section>
          {properties.length > 0 ? (
            <PropertyList properties={{ data: properties }} />
          ) : (
            <div className="rounded-3xl border border-dashed border-border/70 bg-background p-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                <Building2 className="size-5 text-primary" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                No properties found
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are currently no properties listed on RentNest.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminPropertiesPage;