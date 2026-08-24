"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  DollarSign,
  ExternalLink,
  MapPin,
  ReceiptText,
  Search,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PaymentStatus =
  | "PAID"
  | "PENDING"
  | "FAILED"
  | "CANCELLED";

type PaymentProvider = "STRIPE";

type Payment = {
  id: string;
  rentalRequestId: string;
  transactionId: string;
  checkoutSessionId: string;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;

  rentalRequest: {
    id: string;
    tenantId: string;
    propertyId: string;
    status: string;
    moveInDate: string;
    agreedRent: number;
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
      authorId: string;
      categoryId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type PaymentHistoryProps = {
  payments: Payment[];
};

const paymentStatusStyles: Record<string, string> = {
  PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",

  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",

  FAILED:
    "bg-destructive/10 text-destructive border-destructive/20",

  CANCELLED: "bg-muted text-muted-foreground border-border",
};

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatusIcon(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return CheckCircle2;

    case "PENDING":
      return Clock3;

    case "FAILED":
      return XCircle;

    default:
      return Clock3;
  }
}

export default function PaymentHistory({
  payments,
}: PaymentHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return payments;

    return payments.filter((payment) => {
      return (
        payment.transactionId
          .toLowerCase()
          .includes(query) ||
        payment.rentalRequest.property.title
          .toLowerCase()
          .includes(query) ||
        payment.rentalRequest.property.location
          .toLowerCase()
          .includes(query) ||
        payment.status.toLowerCase().includes(query)
      );
    });
  }, [payments, searchQuery]);

  const totalPaid = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "PAID")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const paidCount = payments.filter(
    (payment) => payment.status === "PAID",
  ).length;

  const pendingCount = payments.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  if (!payments.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 bg-background p-12 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
          <WalletCards className="size-6 text-primary" />
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          No payment history yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Your rental payments will appear here once you complete
          a payment for a property.
        </p>

        <Button
          asChild
          className="mt-6 rounded-xl"
        >
          <Link href="/property">
            Explore Properties
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="size-3.5" />
              Secure payment records
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Payment History
            </h1>

            <p className="mt-1.5 text-sm text-muted-foreground">
              Track your rental payments and transaction details.
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* Summary Cards */}
        {/* ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Paid */}

          <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Paid
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight">
                  ৳{totalPaid.toLocaleString()}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <DollarSign className="size-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Across {paidCount} successful{" "}
              {paidCount === 1 ? "payment" : "payments"}
            </p>
          </div>

          {/* Successful Payments */}

          <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Successful Payments
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {paidCount}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="size-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Successfully processed transactions
            </p>
          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Pending Payments
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {pendingCount}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Clock3 className="size-5" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Awaiting payment confirmation
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* Search / Toolbar */}
        {/* ================================================= */}

        <div className="rounded-2xl border border-border/60 bg-background p-3 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search by property, transaction ID or status..."
              className="h-11 rounded-xl border-0 bg-muted/50 pl-10 shadow-none focus-visible:ring-1"
            />
          </div>
        </div>

        {/* ================================================= */}
        {/* Payment List */}
        {/* ================================================= */}

        {!filteredPayments.length ? (
          <div className="rounded-3xl border border-dashed border-border/70 p-12 text-center">
            <Search className="mx-auto size-6 text-muted-foreground" />

            <h3 className="mt-4 text-base font-semibold">
              No payments found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try searching with another property or transaction
              ID.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const property =
                payment.rentalRequest.property;

              const StatusIcon = getStatusIcon(payment.status);

              const propertyImage = property.image?.[0];

              return (
                <div
                  key={payment.id}
                  className="group rounded-3xl border border-border/60 bg-background p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    {/* Property Image */}

                    <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-36 sm:w-52">
                      {propertyImage ? (
                        <Image
                          src={propertyImage}
                          alt={property.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 208px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Building2 className="size-6 text-muted-foreground" />
                        </div>
                      )}

                      <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur-md">
                        {property.categoryId === "C1"
                          ? "Apartment"
                          : property.categoryId === "C2"
                            ? "House"
                            : "Studio"}
                      </div>
                    </div>

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      {/* Top */}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-lg font-semibold tracking-tight">
                              {property.title}
                            </h3>
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="size-3.5 shrink-0" />

                            {property.location}
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                            paymentStatusStyles[
                              payment.status
                            ] || ""
                          }`}
                        >
                          <StatusIcon className="mr-1.5 size-3.5" />

                          {payment.status}
                        </Badge>
                      </div>

                      {/* Payment Information */}

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {/* Amount */}

                        <div className="rounded-xl bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">
                            Amount
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            ৳{payment.amount.toLocaleString()}
                          </p>
                        </div>

                        {/* Provider */}

                        <div className="rounded-xl bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">
                            Provider
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                            <CreditCard className="size-3.5 text-primary" />

                            {payment.provider}
                          </div>
                        </div>

                        {/* Paid At */}

                        <div className="rounded-xl bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">
                            Paid On
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                            <CalendarDays className="size-3.5 text-primary" />

                            {formatDate(payment.paidAt)}
                          </div>
                        </div>

                        {/* Move In */}

                        <div className="rounded-xl bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">
                            Move-in
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                            <CalendarDays className="size-3.5 text-primary" />

                            {formatDate(
                              payment.rentalRequest.moveInDate,
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Transaction */}

                      <div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Transaction ID
                          </p>

                          <p className="mt-1 truncate font-mono text-xs text-foreground">
                            {payment.transactionId}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            onClick={() =>
                              setSelectedPayment(payment)
                            }
                          >
                            <ReceiptText className="mr-1.5 size-3.5" />

                            Details
                          </Button>

                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="rounded-xl"
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
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* Payment Details Dialog */}
      {/* ================================================= */}

      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-border/70 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Dialog Header */}

            <div className="border-b border-border/60 bg-primary/5 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ReceiptText className="size-5" />
                  </div>

                  <h2 className="mt-3 text-lg font-bold tracking-tight">
                    Payment Details
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Transaction information and rental details
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPayment(null)}
                  className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close payment details"
                >
                  <XCircle className="size-5" />
                </button>
              </div>
            </div>

            {/* Dialog Body */}

            <div className="space-y-5 p-6">
              {/* Amount */}

              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  Payment Amount
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight">
                  ৳
                  {selectedPayment.amount.toLocaleString()}
                </p>

                <Badge
                  variant="outline"
                  className={`mt-3 rounded-full ${
                    paymentStatusStyles[
                      selectedPayment.status
                    ] || ""
                  }`}
                >
                  {selectedPayment.status}
                </Badge>
              </div>

              {/* Property */}

              <div className="rounded-2xl border border-border/60 p-4">
                <div className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {selectedPayment.rentalRequest.property
                      .image?.[0] ? (
                      <Image
                        src={
                          selectedPayment.rentalRequest
                            .property.image[0]
                        }
                        alt={
                          selectedPayment.rentalRequest.property
                            .title
                        }
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <Building2 className="m-auto size-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {
                        selectedPayment.rentalRequest.property
                          .title
                      }
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />

                      {
                        selectedPayment.rentalRequest.property
                          .location
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Transaction ID
                  </span>

                  <span className="max-w-[240px] truncate font-mono text-xs font-medium">
                    {selectedPayment.transactionId}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Payment Provider
                  </span>

                  <span className="text-xs font-semibold">
                    {selectedPayment.provider}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Paid At
                  </span>

                  <span className="text-xs font-semibold">
                    {formatDateTime(selectedPayment.paidAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Move-in Date
                  </span>

                  <span className="text-xs font-semibold">
                    {formatDate(
                      selectedPayment.rentalRequest
                        .moveInDate,
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Rental Status
                  </span>

                  <Badge
                    variant="outline"
                    className="rounded-full text-[10px]"
                  >
                    {selectedPayment.rentalRequest.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}

            <div className="flex items-center justify-end gap-2 border-t border-border/60 bg-muted/20 px-6 py-4">
              <Button
                variant="ghost"
                className="rounded-xl"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </Button>

              <Button
                asChild
                className="rounded-xl"
              >
                <Link
                  href={`/property/${selectedPayment.rentalRequest.property.id}`}
                >
                  View Property
                  <ExternalLink className="ml-2 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}