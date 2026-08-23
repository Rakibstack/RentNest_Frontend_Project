
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  LockKeyhole,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-7 flex size-20 items-center justify-center rounded-3xl bg-destructive/10">
          <LockKeyhole className="size-9 text-destructive" />
        </div>

        {/* Status */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          403 • Unauthorized
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Access denied
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          You don&apos;t have permission to access this page. Please make sure
          you&apos;re logged in with an account that has the required access.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="rounded-xl px-6">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-xl px-6"
          >
            <Link href="/property">
              Explore Properties
            </Link>
          </Button>
        </div>

        {/* Security note */}
        <div className="mx-auto mt-10 flex max-w-md items-start gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 text-left">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">
              Protected area
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              This page is protected by RentNest&apos;s authentication and
              authorization system.
            </p>
          </div>
        </div>

        {/* Back */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Return to RentNest
        </Link>
      </div>
    </main>
  );
}