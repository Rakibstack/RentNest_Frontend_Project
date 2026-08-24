"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  CreditCard,
  Loader2,
  MapPin,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { createRentalPayment } from "../../_action/tenant_action/createRentalPayment";

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
  const [isPaying, setIsPaying] = useState<string | null>(null);

  const handlePayment = async (requestId: string) => {
    try {
      setIsPaying(requestId);

      const result = await createRentalPayment(requestId);

    } catch (error) {
      console.error(error);
    } finally {
      setIsPaying(null);
    }
  };

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
          You have not sent any rental requests yet. Explore properties
          and find a place that feels like home.
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

        const paying = isPaying === request.id;

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

                {/* Header */}
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

                {/* Property Info */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-md">
                  {/* Rent */}
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Monthly Rent
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      ৳{request.property.rent.toLocaleString()}
                    </p>
                  </div>

                  {/* Move In */}
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

                {/* Approved Payment */}
                {request.status === "APPROVED" && (
                  <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-emerald-600">
                          Your request has been approved
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Complete the payment to continue with your rental.
                        </p>
                      </div>

                      <Button
                        onClick={() => handlePayment(request.id)}
                        disabled={paying}
                        className="w-full rounded-xl sm:w-auto"
                      >
                        {paying ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 size-4" />
                            Pay Rent
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
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
                    className="w-fit rounded-xl"
                  >
                    <Link
                      href={`/property/${request.property.id}`}
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