import PropertyCard, {
  type Property,
} from "./PropertyCard";

type PropertyListProps = {
  properties: {
    data : Property[];
  }
};

export default async function PropertyList({
  properties
}: PropertyListProps) {
  
  if (!properties.data.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-12 text-center">
        <h3 className="text-lg font-semibold">
          No properties found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {properties.data.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}