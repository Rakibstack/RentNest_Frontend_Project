import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import MyPropertyList from "../../_components/landlord-component/MyPropertyList";
import { getMyProperties } from "../../_action/getMyProperties";
import { Suspense } from "react";
import MyPropertySkeleton from "../../_components/landlord-component/MyPropertySkeleton";

const MyPropertiesPage = async () => {
    const result = await getMyProperties()
    
  const properties = result?.data?.result

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Property Management
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Properties
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Manage your rental listings and keep your properties up to date.
            </p>
          </div>

          <Button asChild className="w-full rounded-xl sm:w-auto">
            <Link href="/dashboard/landlord/my-properties/create">
              <Plus className="mr-2 size-4" />
              Add Property
            </Link>
          </Button>
        </div>

        {/* Properties */}
        <Suspense fallback={<MyPropertySkeleton></MyPropertySkeleton>}>

        <MyPropertyList properties={properties} />
        </Suspense>
      </div>
    </main>
  );
};

export default MyPropertiesPage;