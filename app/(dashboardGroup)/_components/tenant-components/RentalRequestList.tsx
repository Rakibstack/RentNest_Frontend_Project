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
  MessageSquare,
  Send,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createRentalPayment } from "../../_action/tenant_action/createRentalPayment";

import { toast } from "sonner";
import { createReview } from "../../_action/tenant_action/createReview";

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

  ACTIVE:
    "bg-primary/10 text-primary border-primary/20",

  REJECTED:
    "bg-destructive/10 text-destructive border-destructive/20",

  CANCELLED:
    "bg-muted text-muted-foreground border-border",
};

export default function RentalRequestList({
  requests,
}: RentalRequestListProps) {
  const [isPaying, setIsPaying] = useState<string | null>(null);

  // Review states
  const [reviewRequest, setReviewRequest] =
    useState<RentalRequest | null>(null);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [isSubmittingReview, setIsSubmittingReview] =
    useState(false);


  const handlePayment = async (requestId: string) => {
    try {
      setIsPaying(requestId);

      await createRentalPayment(requestId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPaying(null);
    }
  };

  const handleOpenReview = (request: RentalRequest) => {
    setReviewRequest(request);
    setRating(0);
    setComment("");
  };

  // --------------------------------------------------
  // Close Review Dialog
  // --------------------------------------------------

  const handleCloseReview = () => {
    if (isSubmittingReview) return;

    setReviewRequest(null);
    setRating(0);
    setComment("");
  };

  // --------------------------------------------------
  // Submit Review
  // --------------------------------------------------

  const handleReviewSubmit = async () => {
    if (!reviewRequest) return;

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      setIsSubmittingReview(true);

      const result = await createReview({
        rentalRequestId: reviewRequest.id,
        rating,
        comment: comment.trim(),
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        result.message || "Review submitted successfully!",
      );

      handleCloseReview();
    } catch (error) {
      console.error("Review submission error:", error);

      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // --------------------------------------------------
  // Empty State
  // --------------------------------------------------

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
    <>
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
                {/* -------------------------------- */}
                {/* Property Image */}
                {/* -------------------------------- */}

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

                {/* -------------------------------- */}
                {/* Content */}
                {/* -------------------------------- */}

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

                  {/* -------------------------------- */}
                  {/* Property Info */}
                  {/* -------------------------------- */}

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
                          request.moveInDate,
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------- */}
                  {/* Approved Payment */}
                  {/* -------------------------------- */}

                  {request.status === "APPROVED" && (
                    <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-emerald-600">
                            Your request has been approved
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Complete the payment to continue with
                            your rental.
                          </p>
                        </div>

                        <Button
                          onClick={() =>
                            handlePayment(request.id)
                          }
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

                  {/* -------------------------------- */}
                  {/* Active Rental / Review */}
                  {/* -------------------------------- */}

                  {request.status === "ACTIVE" && (
                    <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <MessageSquare className="size-4" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              Enjoying your new home?
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Share your experience and help other
                              tenants.
                            </p>
                          </div>
                        </div>

                        <Button
                          onClick={() =>
                            handleOpenReview(request)
                          }
                          className="w-full rounded-xl sm:w-auto"
                        >
                          <Star className="mr-2 size-4" />
                          Leave a Review
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* -------------------------------- */}
                  {/* Footer */}
                  {/* -------------------------------- */}

                  <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
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

      {/* ================================================= */}
      {/* Review Dialog */}
      {/* ================================================= */}

      <Dialog
        open={!!reviewRequest}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseReview();
          }
        }}
      >
        <DialogContent className="overflow-hidden rounded-3xl border-border/70 p-0 sm:max-w-lg">
          {/* Header */}

          <div className="border-b border-border/60 bg-primary/5 px-6 py-6">
            <DialogHeader>
              <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="size-5" />
              </div>

              <DialogTitle className="text-xl tracking-tight">
                Share your experience
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm leading-6">
                Tell us what you think about your rental
                experience.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Body */}

          <div className="space-y-6 px-6 py-6">
            {/* Property */}

            {reviewRequest && (
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Your rental
                </p>

                <h3 className="mt-1 text-sm font-semibold">
                  {reviewRequest.property.title}
                </h3>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />

                  {reviewRequest.property.location}
                </div>
              </div>
            )}

            {/* Rating */}

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Your rating
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    How would you rate your experience?
                  </p>
                </div>

                {rating > 0 && (
                  <span className="text-sm font-semibold text-primary">
                    {rating}/5
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="rounded-xl p-2 transition-colors hover:bg-primary/10"
                    aria-label={`Rate ${star} out of 5`}
                  >
                    <Star
                      className={`size-7 transition-all ${
                        star <= rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}

            <div>
              <label
                htmlFor="review-comment"
                className="text-sm font-semibold"
              >
                Your comment{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>

              <Textarea
                id="review-comment"
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                placeholder="Share your experience with this property..."
                maxLength={1000}
                className="mt-2 min-h-28 resize-none rounded-2xl border-border/70 bg-background"
              />

              <p className="mt-1.5 text-right text-[11px] text-muted-foreground">
                {comment.length}/1000
              </p>
            </div>
          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-2 border-t border-border/60 bg-muted/20 px-6 py-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl"
              onClick={handleCloseReview}
              disabled={isSubmittingReview}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="rounded-xl"
              disabled={!rating || isSubmittingReview}
              onClick={handleReviewSubmit}
            >
              {isSubmittingReview ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}