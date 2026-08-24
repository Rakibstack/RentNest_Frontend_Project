import LandlordRentalRequestCard from "./LandlordRentalRequestCard";

export type RentalRequest = {
  id: string;
  tenantId: string;
  propertyId: string;
  status: string;
  moveInDate: string;
  agreedRent: number | null;
  message: string | null;
  createdAt: string;
  updatedAt: string;
  review: unknown | null;

  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    rent: number;
    bedRoom: number;
    bathRooms: number;
    image: string[];
    availability: string;
    authorId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
};

type LandlordRentalRequestListProps = {
  requests: RentalRequest[];
};

export default function LandlordRentalRequestList({
  requests,
}: LandlordRentalRequestListProps) {
  if (!requests.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 bg-background p-12 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
          <span className="text-xl">📋</span>
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          No rental requests yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Rental requests from tenants will appear here when someone
          requests one of your properties.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {requests.map((request) => (
        <LandlordRentalRequestCard
          key={request.id}
          request={request}
        />
      ))}
    </div>
  );
}