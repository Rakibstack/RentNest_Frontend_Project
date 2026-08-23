"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Bath,
  BedDouble,
  Edit3,
  MapPin,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { MyProperty } from "./MyPropertyList";

type MyPropertyCardProps = {
  property: MyProperty;
};

export default function MyPropertyCard({
  property,
}: MyPropertyCardProps) {
  const image = property.image?.[0];

  return (
    <article className="group overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image
          </div>
        )}

        {/* Status */}
        <div className="absolute left-4 top-4">
          <Badge
            className={
              property.availability === "AVAILABLE"
                ? "rounded-full bg-emerald-500/90 px-3 py-1 text-white hover:bg-emerald-500/90"
                : "rounded-full px-3 py-1"
            }
          >
            {property.availability}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight">
              {property.title}
            </h2>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5">
          <span className="text-xl font-bold">
            ৳{property.rent.toLocaleString()}
          </span>

          <span className="ml-1 text-sm text-muted-foreground">
            / month
          </span>
        </div>

        {/* Features */}
        <div className="mt-4 flex items-center gap-4 border-y border-border/60 py-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-4" />
            <span>{property.bedRoom} Beds</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="size-4" />
            <span>{property.bathRooms} Baths</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-xl"
          >
            <Link
              href={`/dashboard/landlord/my-properties/${property.id}/edit`}
            >
              <Edit3 className="mr-2 size-4" />
              Edit
            </Link>
          </Button>

          <Button
            variant="outline"
            className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}