"use client"
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        {/* 404 */}
        <div className="mb-6">
          <span className="text-[100px] font-bold leading-none tracking-tighter text-primary/10 sm:text-[140px]">
            404
          </span>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Page not found
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Looks like you&apos;ve taken a wrong turn.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-xl"
          >
            <Link href="/">
              <Home className="size-4" />
              Back to home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-xl"
          >
            <Link href="/properties">
              <Search className="size-4" />
              Explore properties
            </Link>
          </Button>
        </div>

        {/* Back */}
       <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Go back
        </button>
      </div>
    </main>
  );
}