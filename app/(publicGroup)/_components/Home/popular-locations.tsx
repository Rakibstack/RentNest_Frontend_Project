import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

const locations = [
  {
    name: "Gulshan",
    city: "Dhaka",
    properties: "240+ properties",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    className: "md:col-span-2",
  },
  {
    name: "Banani",
    city: "Dhaka",
    properties: "180+ properties",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
    className: "",
  },
  {
    name: "Uttara",
    city: "Dhaka",
    properties: "150+ properties",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    className: "",
  },
  {
    name: "Chattogram",
    city: "Chattogram",
    properties: "120+ properties",
    image:
      "https://plus.unsplash.com/premium_photo-1687960117069-567a456fe5f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:col-span-2",
  },
  {
    name: "Dhanmondi",
    city: "Dhaka",
    properties: "135+ properties",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    className: "md:col-span-2",
  },
];

export default function PopularLocations() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Explore Locations
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find your home in
              <span className="text-primary"> the right neighborhood.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Explore popular neighborhoods and discover rental properties in
              locations that match your lifestyle.
            </p>
          </div>

          <Link
            href="/properties"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore all locations
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Location Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-4 md:grid-rows-2">
          {locations.map((location) => (
            <Link
              key={`${location.name}-${location.city}`}
              href={`/properties?location=${location.name}`}
              className={`group relative min-h-70 overflow-hidden rounded-3xl ${location.className}`}
            >
              {/* Image */}
              <Image
                src={location.image}
                alt={`${location.name}, ${location.city}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5 transition-colors duration-300 group-hover:from-black/80" />

              {/* Top badge */}
              <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <MapPin className="size-3.5" />
                Popular area
              </div>

              {/* Arrow */}
              <div className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-foreground">
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-6" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-sm font-medium text-white/70">
                  {location.city}
                </p>

                <h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {location.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-white/75">
                  <span>{location.properties}</span>

                  <span className="size-1 rounded-full bg-white/50" />

                  <span>Explore rentals</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
