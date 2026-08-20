import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background shadow-sm sm:rounded-[2.5rem]">
          <div className="grid items-center lg:grid-cols-[1fr_0.85fr]">
            {/* Content */}
            <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Your next home awaits
              </span>

              <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                A better place to live
                <span className="block text-primary">
                  starts with a better search.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Explore thoughtfully presented rental properties, connect
                with property owners, and make your next move with
                confidence.
              </p>

              {/* Trust points */}
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Verified listings
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Secure payments
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Simple requests
                </div>
              </div>

              {/* Actions */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-xl px-6 font-semibold"
                >
                  <Link href="/properties">
                    Find Your Home
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl px-6 font-semibold"
                >
                  <Link href="/auth/register?role=LANDLORD">
                    List a Property
                    <Plus className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative min-h-100 overflow-hidden lg:min-h-130">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                alt="Beautiful modern rental home"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent lg:from-background/40" />

              {/* Property floating card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-auto sm:right-7 sm:w-72">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground">
                      Featured home
                    </p>

                    <h3 className="mt-1 text-sm font-semibold">
                      Modern Green Residence
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Gulshan, Dhaka
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary px-3 py-2 text-primary-foreground">
                    <p className="text-sm font-bold">৳35K</p>
                    <p className="text-[10px] opacity-75">/ month</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-[11px] text-muted-foreground">
                    2 Beds · 2 Baths
                  </span>

                  <span className="text-[11px] font-semibold text-primary">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative background */}
          <div className="pointer-events-none absolute -bottom-32 -left-32 size-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}