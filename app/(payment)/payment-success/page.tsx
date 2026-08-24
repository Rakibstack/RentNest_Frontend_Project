import Link from "next/link";
import {
  ArrowRight,
  Check,
  Home,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 size-125 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl shadow-black/5 sm:p-10">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Check className="size-7" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-7 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" />
                Payment verified
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Payment successful!
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                Your rental payment has been completed successfully.
                Your property request is now being processed.
              </p>
            </div>

            {/* Payment Summary */}
            <div className="mt-8 rounded-2xl border border-border/70 bg-muted/30 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ReceiptText className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Payment confirmed
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Your transaction has been successfully processed.
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-border/60 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Payment status
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Next Step */}
            <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-5">
              <div className="flex gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Home className="size-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    What happens next?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your rental request has been submitted. You can track
                    its status from your tenant dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 flex-1 rounded-xl font-semibold"
              >
                <Link href="/dashboard/tenant/requests">
                  View my requests
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 flex-1 rounded-xl"
              >
                <Link href="/property">Browse properties</Link>
              </Button>
            </div>

            {/* Footer */}
            <p className="mt-7 text-center text-xs text-muted-foreground">
              Thank you for choosing{" "}
              <span className="font-semibold text-foreground">
                RentNest
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}