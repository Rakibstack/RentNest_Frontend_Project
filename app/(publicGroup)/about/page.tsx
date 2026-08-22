import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Home,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Home,
    title: "Better Homes",
    description:
      "We make it easier to discover quality properties that match your lifestyle and budget.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Platform",
    description:
      "RentNest is designed to make the rental journey transparent, simple, and secure.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description:
      "Whether you are looking for a home or listing a property, RentNest brings both sides together.",
  },
];

const benefits = [
  "Verified and quality-focused property listings",
  "Simple property discovery experience",
  "Easy rental request management",
  "Built for tenants and property owners",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
              About RentNest
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Finding the right place
              <span className="text-primary"> should feel simple.</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              RentNest is a modern property rental platform built to make
              finding, listing, and managing rental properties easier for
              everyone.
            </p>
          </div>

          {/* Images */}
          <div className="relative mx-auto mt-14 max-w-6xl">
            <div className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[440px] lg:h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                alt="Modern home interior"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating image */}
            <div className="absolute -bottom-10 right-5 hidden h-48 w-64 overflow-hidden rounded-2xl border-8 border-background shadow-2xl sm:block lg:right-12 lg:h-56 lg:w-80">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Beautiful modern property"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Our Story
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A smarter way to find your next home.
            </h2>

            <p className="mt-6 leading-7 text-muted-foreground">
              Searching for a rental property can often be time-consuming and
              confusing. RentNest was created to bring the entire experience
              into one simple platform.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              From discovering properties to sending rental requests, our goal
              is to remove unnecessary complexity and help people make better
              rental decisions.
            </p>

            <div className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-muted/50 p-8 sm:p-10">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold">1K+</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Properties listed
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">500+</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Happy tenants
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">50+</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Locations
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">24/7</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Platform access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What We Believe
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around a better rental experience.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border/70 bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 lg:px-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to find your next place?
              </h2>

              <p className="mt-4 text-primary-foreground/75">
                Explore properties and discover a place that feels like home.
              </p>
            </div>

            <Link
              href="/property"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105"
            >
              Explore Properties
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}