import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Home,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 size-125 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl shadow-black/5 sm:p-10">
            {/* Cancel Icon */}
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                <div className="flex size-14 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm">
                  <X className="size-7" strokeWidth={2.2} />
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-7 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-2 text-xs font-semibold text-muted-foreground">
                <CreditCard className="size-3.5" />
                Payment cancelled
              </div>

              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Payment wasn&apos;t completed
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                No worries! Your payment was cancelled and no charge was
                made. You can return and complete the payment whenever
                you&apos;re ready.
              </p>
            </div>

            {/* Info Card */}
            <div className="mt-8 rounded-2xl border border-border/70 bg-muted/30 p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Your rental request is safe
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Cancelling the checkout does not affect your account.
                    You can go back to your request and try the payment
                    again.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-xl font-semibold"
              >
                <Link href="/dashboard/tenant/requests">
                  <RotateCcw className="size-4" />
                  Return to my request
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-xl"
              >
                <Link href="/property">
                  <Home className="size-4" />
                  Browse properties
                </Link>
              </Button>
            </div>

            {/* Back */}
            <div className="mt-7 flex justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Back to dashboard
              </Link>
            </div>
          </div>

          {/* Bottom Trust */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Secure payments powered by Stripe
          </div>
        </div>
      </div>
    </main>
  );
}