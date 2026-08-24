"use client";

import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    author: {
      id: string;
      name: string;
      email: string;
    };
  };
};

type RentalRequestListProps = {
  requests: RentalRequest[];
};

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-amber-500/10 text-amber-600 border-amber-500/20",

  APPROVED:
    "bg-blue-500/10 text-blue-600 border-blue-500/20",

  ACTIVE:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",

  REJECTED:
    "bg-red-500/10 text-red-600 border-red-500/20",

  CANCELLED:
    "bg-muted text-muted-foreground border-border",
};

export default function RentalRequestList({
  requests,
}: RentalRequestListProps) {
  if (!requests || requests.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 p-12 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Clock3 className="size-5 text-primary" />
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          No rental requests found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          There are no rental requests available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const property = request.property;

        const image = property?.image?.[0];

        return (
          <div
            key={request.id}
            className="group rounded-3xl border border-border/60 bg-background p-4 shadow-sm transition-all hover:shadow-md sm:p-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              {/* ==============================
                  Property Image
              ============================== */}

              <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-muted md:h-40 md:w-56">
                {image ? (
                  <Image
                    src={image}
                    alt={property.title}
                    fill
                    sizes="224px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {/* ==============================
                  Content
              ============================== */}

              <div className="min-w-0 flex-1">
                {/* Title + Status */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold">
                      {property.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      {property.location}
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[request.status] ??
                      ""
                    }`}
                  >
                    {request.status}
                  </Badge>
                </div>

                {/* Information */}

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Monthly Rent
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      ৳{property.rent.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Move-in Date
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                      <CalendarDays className="size-3.5 text-primary" />

                      {new Date(
                        request.moveInDate,
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Property
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {property.bedRoom} Beds ·{" "}
                      {property.bathRooms} Baths
                    </p>
                  </div>
                </div>

                {/* Landlord */}

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <UserRound className="size-4 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Landlord
                    </p>

                    <p className="truncate text-sm font-semibold">
                      {property.author.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {property.author.email}
                    </p>
                  </div>
                </div>

                {/* Message */}

                {request.message && (
                  <div className="mt-4 rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">
                      Tenant Message
                    </p>

                    <p className="mt-1 text-sm">
                      {request.message}
                    </p>
                  </div>
                )}

                {/* Footer */}

                <div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Requested{" "}
                    {new Date(
                      request.createdAt,
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-fit rounded-xl"
                  >
                    <Link
                      href={`/property/${property.id}`}
                    >
                      View Property
                      <ChevronRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}