import MyPropertyCard from "./MyPropertyCard";

export type MyProperty = {
  id: string;
  title: string;
  description: string;
  location: string;
  rent: number;
  bedRoom: number;
  bathRooms: number;
  image: string[];
  availability: "AVAILABLE" | "RENTED" | "UNAVAILABLE";
};

type MyPropertyListProps = {
  properties: MyProperty[];
};

export default function MyPropertyList({
  properties,
}: MyPropertyListProps) {
  if (!properties.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background px-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
          <span className="text-2xl">🏠</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold">
          No properties yet
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          You have not added any rental properties yet. Create your first
          property listing to start managing your rentals.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <MyPropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}