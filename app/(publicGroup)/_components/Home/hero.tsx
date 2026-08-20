
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 size-125 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Content */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary">
              <span className="size-2 rounded-full bg-primary" />
              Find a place you'll love
            </div>

            {/* Heading */}
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Find your next
              <span className="block text-primary">perfect home.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover beautiful rental properties in the places you love.
              Search, compare, and find a home that fits your lifestyle and
              budget.
            </p>

            {/* Search Box */}
            <div className="mt-8 rounded-2xl border border-border/70 bg-card p-2 shadow-lg shadow-black/5 sm:rounded-3xl sm:p-2.5">
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Location */}
                <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl px-3 sm:min-h-14">
                  <MapPin className="size-5 shrink-0 text-primary" />

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="location"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Location
                    </label>

                    <Input
                      id="location"
                      placeholder="Where do you want to live?"
                      className="h-auto border-0 bg-transparent p-0 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden w-px bg-border sm:block" />

                {/* Property type */}
                <button
                  type="button"
                  className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-left transition-colors hover:bg-muted sm:min-h-14 sm:w-40"
                >
                  <BedDouble className="size-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Property
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Any type
                    </p>
                  </div>
                </button>

                {/* Search */}
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-6 font-semibold sm:h-14"
                >
                  <Search className="size-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="text-muted-foreground">Popular:</span>

              {["Dhaka", "Chattogram", "Sylhet"].map((location) => (
                <Link
                  key={location}
                  href={`/properties?location=${location}`}
                  className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {location}
                </Link>
              ))}

              <button
                type="button"
                className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
              >
                <SlidersHorizontal className="size-3.5" />
                More filters
              </button>
            </div>

            {/* Trust stats */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-border/60 pt-7">
              <div>
                <p className="text-xl font-bold tracking-tight">1,200+</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Properties listed
                </p>
              </div>

              <div>
                <p className="text-xl font-bold tracking-tight">850+</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Happy tenants
                </p>
              </div>

              <div>
                <p className="text-xl font-bold tracking-tight">50+</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Locations
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            {/* Main image */}
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                alt="Modern rental home interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Image badge */}
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md sm:left-7 sm:top-7">
                Verified properties
              </div>

              {/* Floating property card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:w-80">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Featured property
                    </p>

                    <h3 className="mt-1 font-semibold tracking-tight">
                      Modern Green Residence
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      Gulshan, Dhaka
                    </div>
                  </div>

                  <div className="rounded-xl bg-primary px-3 py-2 text-right text-primary-foreground">
                    <p className="text-sm font-bold">৳35K</p>
                    <p className="text-[10px] opacity-80">/ month</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-xs text-muted-foreground">
                    2 Beds · 2 Baths
                  </span>

                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Explore
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative card */}
            <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-border/60 bg-background p-4 shadow-xl sm:block lg:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Easy to find</p>
                  <p className="text-xs text-muted-foreground">
                    Search by location & budget
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}