import PropertyCard, {
  type Property,
} from "./PropertyCard";

const demoProperties: Property[] = [
  {
    id: "1d5497cf-22d0-44e3-9e66-478669913104",
    title: "Premium Office Space",
    description:
      "Commercial office space suitable for startups and small businesses with high-speed internet.",
    location: "Gulshan",
    rent: 50000,
    bedRoom: 0,
    bathRooms: 4,
    image: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    ],
    availability: "AVAILABLE",
    authorId: "ae2ad33d-058c-450e-bb67-3e24de5240df",
    categoryId: "C1",
    createdAt: "2026-07-31T04:38:31.481Z",
    updatedAt: "2026-07-31T04:38:31.481Z",
  },

  {
    id: "2",
    title: "Modern Family Apartment",
    description:
      "Beautiful modern apartment with spacious rooms, natural light and a convenient location.",
    location: "Banani",
    rent: 35000,
    bedRoom: 3,
    bathRooms: 2,
    image: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],
    availability: "AVAILABLE",
    authorId: "author-2",
    categoryId: "C2",
    createdAt: "2026-07-30T04:38:31.481Z",
    updatedAt: "2026-07-30T04:38:31.481Z",
  },

  {
    id: "3",
    title: "Luxury City Apartment",
    description:
      "Premium apartment with elegant interiors and excellent access to shopping and transportation.",
    location: "Dhanmondi",
    rent: 42000,
    bedRoom: 3,
    bathRooms: 3,
    image: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    ],
    availability: "AVAILABLE",
    authorId: "author-3",
    categoryId: "C2",
    createdAt: "2026-07-29T04:38:31.481Z",
    updatedAt: "2026-07-29T04:38:31.481Z",
  },

  {
    id: "4",
    title: "Cozy Studio Apartment",
    description:
      "A comfortable studio apartment perfect for professionals looking for a convenient city lifestyle.",
    location: "Uttara",
    rent: 22000,
    bedRoom: 1,
    bathRooms: 1,
    image: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    ],
    availability: "AVAILABLE",
    authorId: "author-4",
    categoryId: "C2",
    createdAt: "2026-07-28T04:38:31.481Z",
    updatedAt: "2026-07-28T04:38:31.481Z",
  },

  {
    id: "5",
    title: "Spacious Family Home",
    description:
      "Large family-friendly home with multiple bedrooms and a peaceful residential environment.",
    location: "Mirpur",
    rent: 28000,
    bedRoom: 4,
    bathRooms: 3,
    image: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
    availability: "AVAILABLE",
    authorId: "author-5",
    categoryId: "C2",
    createdAt: "2026-07-27T04:38:31.481Z",
    updatedAt: "2026-07-27T04:38:31.481Z",
  },

  {
    id: "6",
    title: "Premium Serviced Apartment",
    description:
      "Fully furnished serviced apartment designed for comfortable long-term living.",
    location: "Gulshan",
    rent: 55000,
    bedRoom: 2,
    bathRooms: 2,
    image: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    ],
    availability: "AVAILABLE",
    authorId: "author-6",
    categoryId: "C3",
    createdAt: "2026-07-26T04:38:31.481Z",
    updatedAt: "2026-07-26T04:38:31.481Z",
  },
];

type PropertyListProps = {
  properties?: Property[];
};

export default function PropertyList({
  properties = demoProperties,
}: PropertyListProps) {
  if (!properties.length) {
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
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}