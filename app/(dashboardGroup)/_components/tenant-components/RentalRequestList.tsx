import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RentalRequest = {
  id: string;
  moveInDate: string;
  message?: string | null;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
    location: string;
    rent: number;
    image: string[];
  };
};

type RentalRequestListProps = {
  requests: RentalRequest[];
};

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-amber-500/10 text-amber-600 border-amber-500/20",
  APPROVED:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  REJECTED:
    "bg-destructive/10 text-destructive border-destructive/20",
  CANCELLED:
    "bg-muted text-muted-foreground border-border",
};

export default function RentalRequestList({
  requests,
}: RentalRequestListProps) {
  if (!requests.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 bg-background p-12 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Clock3 className="size-5 text-primary" />
        </div>

        <h3 className="mt-4 text-lg font-semibold">
          No rental requests yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          You have not sent any rental requests yet. Explore
          properties and find a place that feels like home.
        </p>

        <Button asChild className="mt-5 rounded-xl">
          <Link href="/property">
            Explore Properties
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        
        const propertyImage = request.property.image?.[0];

        return (
          <div
            key={request.id}
            className="group rounded-3xl border border-border/60 bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              {/* Property Image */}
              <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-36 sm:w-52">
                {propertyImage ? (
                  <Image
                    src={propertyImage}
                    alt={request.property.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 208px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold tracking-tight">
                      {request.property.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {request.property.location}
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[request.status] || ""
                    }`}
                  >
                    {request.status}
                  </Badge>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-md">
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Monthly Rent
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      ৳{request.property.rent.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Move-in Date
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                      <CalendarDays className="size-3.5 text-primary" />

                      {new Date(
                        request.moveInDate
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  <p className="text-xs text-muted-foreground">
                    Requested{" "}
                    {new Date(
                      request.createdAt
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
                    className="rounded-xl"
                  >
                    <Link href={`/property/${request.property.id}`}>
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