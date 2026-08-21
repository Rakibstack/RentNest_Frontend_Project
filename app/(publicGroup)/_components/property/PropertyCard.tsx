
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Maximize,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Property = {
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

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const image = property.image?.[0];

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Badge
            variant="secondary"
            className="rounded-full border border-white/20 bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            {property.availability}
          </Badge>

          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-full bg-background/90 shadow-sm backdrop-blur transition-colors hover:bg-background"
            aria-label="Save property"
          >
            <Heart className="size-4" />
          </Button>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 rounded-xl bg-background/95 px-3 py-2 shadow-sm backdrop-blur">
          <p className="text-base font-bold">
            ৳{property.rent.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              / month
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />

          <span className="truncate">
            {property.location}, Dhaka
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 line-clamp-1 text-lg font-semibold tracking-tight">
          {property.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {property.description}
        </p>

        {/* Features */}
        <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BedDouble className="size-4" />
            <span>
              {property.bedRoom === 0
                ? "Office"
                : `${property.bedRoom} Beds`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bath className="size-4" />
            <span>{property.bathRooms} Baths</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
            <Maximize className="size-4" />
            <span>View</span>
          </div>
        </div>

        {/* Action */}
        <Button
          asChild
          className="mt-5 w-full rounded-xl"
        >
          <Link href={`/properties/${property.id}`}>
            View Property
          </Link>
        </Button>
      </div>
    </article>
  );
}