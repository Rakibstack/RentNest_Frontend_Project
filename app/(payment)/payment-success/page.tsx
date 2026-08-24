import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  ReceiptText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccessPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-10">
      <Card className="w-full max-w-lg overflow-hidden rounded-3xl border-border/60 bg-background shadow-sm">
        <CardContent className="p-8 text-center sm:p-10">
          {/* Icon */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/10">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-8 text-emerald-600" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Payment Successful
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Your payment is complete!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              Your rental payment has been successfully processed.
              Thank you for choosing RentNest.
            </p>
          </div>

          {/* Status */}
          <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-background">
                <ReceiptText className="size-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Payment confirmed
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Your rental payment has been recorded successfully.
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
                Go to Dashboard
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 rounded-xl"
            >
              <Link href="/property">
                <Home className="mr-2 size-4" />
                Explore Properties
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentSuccessPage;