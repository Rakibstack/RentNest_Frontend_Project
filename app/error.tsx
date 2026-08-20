"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="size-7 text-destructive" />
        </div>

        {/* Content */}
        <p className="mb-2 text-sm font-medium text-primary">
          Something went wrong
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          We couldn&apos;t load this page
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Something unexpected happened while loading this page.
          Please try again or return to the RentNest homepage.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => reset()}
            className="rounded-xl"
          >
            <RefreshCw className="size-4" />
            Try again
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-xl"
          >
            <Link href="/">
              <Home className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}