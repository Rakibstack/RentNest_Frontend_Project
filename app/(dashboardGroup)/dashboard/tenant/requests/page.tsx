import { ClipboardList } from "lucide-react";

import { getMyRentalRequests } from "@/app/(dashboardGroup)/_action/tenant_action/getMyRentalRequests";
import RentalRequestList from "@/app/(dashboardGroup)/_components/tenant-components/RentalRequestList";

export default async function RentalRequestsPage() {
  const result = await getMyRentalRequests();

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardList className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">
                Tenant Workspace
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                My Rental Requests
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Track the properties you've requested and monitor
            the status of each rental request.
          </p>
        </div>

        <RentalRequestList
          requests={result?.data ?? []}
        />
      </div>
    </main>
  );
}