import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Home,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-10">
      <Card className="w-full max-w-lg overflow-hidden rounded-3xl border-border/60 bg-background shadow-sm">
        <CardContent className="p-8 text-center sm:p-10">
          {/* Icon */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-500/10">
            <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/10">
              <XCircle className="size-8 text-amber-600" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Payment Cancelled
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Payment wasn&apos;t completed
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              Your payment process was cancelled or interrupted.
              No payment has been completed for this rental.
            </p>
          </div>

          {/* Notice */}
          <div className="mt-7 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-background">
                <CreditCard className="size-5 text-amber-600" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Payment not completed
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  You can return to your dashboard and try again.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 flex-1 rounded-xl"
            >
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 size-4" />
                Back to Dashboard
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 rounded-xl"
            >
              <Link href="/property">
                <Home className="mr-2 size-4" />
                Browse Properties
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentCancelPage;