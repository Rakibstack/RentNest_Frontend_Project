
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Ruler,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const properties = [
  {
    id: "0dd97f72-0c68-4281-9cd5-96ce7bbdc06a",
    title: "Modern Green Residence",
    location: "Gulshan, Dhaka",
    type: "Apartment",
    price: "৳35,000",
    beds: 2,
    baths: 2,
    area: "1,200 sqft",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  },
  {
    id: "fc209bfa-0e78-4178-9c8d-d5540281de50",
    title: "Elegant City Apartment",
    location: "Banani, Dhaka",
    type: "Apartment",
    price: "৳42,000",
    beds: 3,
    baths: 2,
    area: "1,450 sqft",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
  },
  {
    id: "f724fdae-ad4c-4e24-afdd-053b3a9047d5",
    title: "Cozy Family Home",
    location: "Uttara, Dhaka",
    type: "House",
    price: "৳55,000",
    beds: 4,
    baths: 3,
    area: "1,900 sqft",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Featured Properties
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find a place that feels
              <span className="text-primary"> like home.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Explore some of the most popular rental properties available
              on RentNest. Every listing is carefully presented to help you
              make a confident decision.
            </p>
          </div>

          <Button
            variant="outline"
            asChild
            className="w-fit rounded-xl"
          >
            <Link href="/property">
              View All Properties
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Property Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <article
              key={property.id}
              className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Featured Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
                  Featured
                </div>

                {/* Favorite */}
                <button
                  type="button"
                  aria-label={`Save ${property.title}`}
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white"
                >
                  <Heart className="size-4" />
                </button>

                {/* Property Type */}
                <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  {property.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold tracking-tight">
                      {property.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0 text-primary" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-primary">
                      {property.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      / month
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-5 flex items-center gap-4 border-y border-border/60 py-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="size-4 text-foreground" />
                    {property.beds} Beds
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Bath className="size-4 text-foreground" />
                    {property.baths} Baths
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Ruler className="size-4 text-foreground" />
                    {property.area}
                  </span>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  asChild
                  className="mt-5 w-full rounded-xl transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Link href={`/property/${property.id}`}>
                    View Details
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}