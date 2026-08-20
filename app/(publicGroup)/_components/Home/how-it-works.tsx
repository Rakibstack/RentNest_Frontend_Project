
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Home,
  Search,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find your place",
    description:
      "Search through beautiful rental properties using location, price, property type, and amenities.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Send a request",
    description:
      "Found something you love? Submit a rental request directly to the property owner in just a few clicks.",
  },
  {
    number: "03",
    icon: Home,
    title: "Make it yours",
    description:
      "Once your request is approved, complete your secure payment and get ready to move into your new home.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your next home is just
            <span className="text-primary"> three steps away.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            We make the rental process simple, transparent, and stress-free
            from the first search to the day you move in.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-6 md:grid-cols-3 lg:mt-16">
          {/* Connecting line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-14 hidden h-px border-t border-dashed border-border md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-border/60 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 sm:p-8"
              >
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </div>

                  <span className="text-4xl font-bold tracking-tight text-muted-foreground/15">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-7 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {/* Bottom indicator */}
                <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="size-4" />
                  Simple & secure
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Start exploring properties
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}