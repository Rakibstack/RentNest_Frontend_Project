
import {
  BadgeCheck,
  CreditCard,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: SearchCheck,
    number: "01",
    title: "Search with confidence",
    description:
      "Find properties that match your location, budget, property type, and lifestyle without wasting time.",
  },
  {
    icon: BadgeCheck,
    number: "02",
    title: "Verified listings",
    description:
      "Explore well-presented rental listings with clear property details so you know exactly what you're considering.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Rent securely",
    description:
      "Submit rental requests through a structured process and keep your rental journey organized in one place.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Secure payments",
    description:
      "Complete approved rental payments through a secure online payment experience powered by trusted gateways.",
  },
];

export default function WhyRentNest() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          {/* Left Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why RentNest
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Renting should feel
              <span className="text-primary"> simple.</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              From discovering your next home to completing your rental,
              RentNest keeps everything clear, convenient, and organized.
            </p>

            {/* Small trust statement */}
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/40 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Built for a better rental experience
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Search, request, approve, and pay—all in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.number}
                  className="group rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-black/5 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>

                    <span className="text-3xl font-bold tracking-tight text-muted-foreground/15">
                      {benefit.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}