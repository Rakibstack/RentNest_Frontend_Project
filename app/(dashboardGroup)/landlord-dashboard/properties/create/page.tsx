
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CreatePropertyForm from "@/app/(dashboardGroup)/_components/landlord-component/CreatePropertyForm";

export default function CreatePropertyPage() {
  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/landlord-dashboard/properties">
            <Button
              variant="ghost"
              className="mb-5 -ml-2 rounded-xl"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Properties
            </Button>
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Building2 className="size-6" />
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">
                Landlord Workspace
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Create a Property
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Add a new rental property and make it available
                for tenants on RentNest.
              </p>
            </div>
          </div>
        </div>

        <CreatePropertyForm />
      </div>
    </main>
  );
}