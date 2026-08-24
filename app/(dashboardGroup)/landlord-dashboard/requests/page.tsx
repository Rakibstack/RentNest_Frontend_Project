import { getLandlordRentalRequest } from "../../_action/landlord_action/getLandlordRentalRequest";
import LandlordRentalRequestList from "../../_components/landlord-component/LandlordRentalRequestList";

const LandlordRentalRequestPage = async () => {
  const result = await getLandlordRentalRequest();

  const requests = result?.data ?? [];

  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING"
  ).length;

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Rental Management
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Rental Requests
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Review and manage rental requests submitted by tenants.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background px-5 py-4 shadow-sm">
            <p className="text-xs text-muted-foreground">
              Pending Requests
            </p>

            <p className="mt-1 text-2xl font-bold">
              {pendingRequests}
            </p>
          </div>
        </div>

        {/* Requests */}
        <LandlordRentalRequestList requests={requests} />
      </div>
    </main>
  );
};

export default LandlordRentalRequestPage;