"use client";

import Image from "next/image";
import {
  CalendarDays,
  Check,
  Clock3,
  Home,
  MapPin,
  MessageSquare,
  UserRound,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { RentalRequest } from "./LandlordRentalRequestList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateRentalRequestStatus } from "../../_action/landlord_action/updateRentalRequestStatus";

type Props = {
  request: RentalRequest;
};

export default function LandlordRentalRequestCard({ request }: Props) {
  const propertyImage =
    request.property.image?.[0] || "/placeholder-property.jpg";

  const formattedMoveInDate = new Date(request.moveInDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const formattedCreatedDate = new Date(request.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const statusStyles = {
    PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    ACCEPTED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    REJECTED: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  const statusClass =
    statusStyles[request.status as keyof typeof statusStyles] ||
    "bg-muted text-muted-foreground border-border";

    const router = useRouter()

  const handleStatusChange = async (status: "APPROVED" | "REJECTED") => {
    const result = await updateRentalRequestStatus(request.id, status);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm transition-all duration-200 hover:shadow-md">
      {/* =========================================
          Property Header
      ========================================= */}
      <div className="border-b border-border/60 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Property */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
              <Image
                src={propertyImage}
                alt={request.property.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Rental Request
                </p>
              </div>

              <h3 className="truncate text-base font-semibold sm:text-lg">
                {request.property.title}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                <span>{request.property.location}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <Badge
            variant="outline"
            className={`w-fit rounded-full px-3 py-1 font-medium ${statusClass}`}
          >
            {request.status === "PENDING" && (
              <Clock3 className="mr-1.5 size-3.5" />
            )}

            {request.status === "ACCEPTED" && (
              <Check className="mr-1.5 size-3.5" />
            )}

            {request.status === "REJECTED" && <X className="mr-1.5 size-3.5" />}

            {request.status}
          </Badge>
        </div>
      </div>

      {/* =========================================
          Request Content
      ========================================= */}
      <div className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Tenant */}
            <div>
              <p className="mb-3 text-sm font-semibold">Tenant Information</p>

              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <UserRound className="size-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Tenant ID</p>

                  <p className="mt-0.5 truncate text-sm font-semibold">
                    {request.tenantId}
                  </p>
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div>
              <p className="mb-3 text-sm font-semibold">Request Details</p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Move In */}
                <div className="rounded-2xl border border-border/60 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="size-4" />

                    <span className="text-xs">Requested Move-in</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {formattedMoveInDate}
                  </p>
                </div>

                {/* Request Date */}
                <div className="rounded-2xl border border-border/60 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 className="size-4" />

                    <span className="text-xs">Request Submitted</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {formattedCreatedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            {request.message && (
              <div className="rounded-2xl bg-muted/50 p-4">
                <div className="flex gap-3">
                  <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Tenant Message
                    </p>

                    <p className="mt-1 text-sm leading-6">{request.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================================
              Right Side
          ========================================= */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-muted/30 p-5">
            {/* Property Summary */}
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Monthly Rent
              </p>

              <p className="mt-1 text-2xl font-bold tracking-tight">
                ৳{request.property.rent.toLocaleString()}
              </p>

              <p className="text-xs text-muted-foreground">per month</p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Property</span>

                  <span className="font-medium">
                    <Home className="mr-1 inline size-3.5" />
                    {request.property.availability}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bedrooms</span>

                  <span className="font-medium">
                    {request.property.bedRoom}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bathrooms</span>

                  <span className="font-medium">
                    {request.property.bathRooms}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {request.status === "PENDING" && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleStatusChange("REJECTED")}
                >
                  <X className="mr-1.5 size-4" />
                  Reject
                </Button>

                <Button
                  className="rounded-xl"
                  onClick={() => handleStatusChange("APPROVED")}
                >
                  <Check className="mr-1.5 size-4" />
                  Accept
                </Button>
              </div>
            )}

            {request.status === "ACCEPTED" && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm font-medium text-emerald-600">
                <Check className="size-4" />
                Request accepted
              </div>
            )}

            {request.status === "REJECTED" && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-sm font-medium text-red-600">
                <X className="size-4" />
                Request rejected
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
