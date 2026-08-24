import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  Home,
  MapPin,
  Search,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =========================================
            Welcome Header
        ========================================= */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                Tenant Dashboard
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, Rakib 👋
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Manage your rental requests, saved properties, and payments
                from one place.
              </p>
            </div>

            <Button asChild className="w-fit rounded-xl">
              <Link href="/property">
                <Search className="mr-2 size-4" />
                Find a Property
              </Link>
            </Button>
          </div>
        </section>

        {/* =========================================
            Stats
        ========================================= */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Rental Requests"
            value="4"
            description="2 currently pending"
            icon={<Clock3 className="size-5" />}
          />

          <StatCard
            title="Approved Requests"
            value="2"
            description="Ready for next step"
            icon={<CheckCircle2 className="size-5" />}
          />

          <StatCard
            title="Saved Properties"
            value="8"
            description="Properties you liked"
            icon={<Heart className="size-5" />}
          />

          <StatCard
            title="Upcoming Payment"
            value="৳22,000"
            description="Due after approval"
            icon={<WalletCards className="size-5" />}
          />
        </section>

        {/* =========================================
            Main Grid
        ========================================= */}
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Rental Requests */}
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  Recent Rental Requests
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Track the status of your latest requests.
                </p>
              </div>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-xl"
              >
                <Link href="/dashboard/tenant/requests">
                  View all
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-3">
              <RentalRequest
                title="Modern Studio Apartment"
                location="Farmgate"
                date="Aug 24, 2026"
                status="PENDING"
                rent="৳22,000"
              />

              <RentalRequest
                title="Modern 3 Bedroom Apartment"
                location="Gulshan"
                date="Aug 22, 2026"
                status="APPROVED"
                rent="৳65,000"
              />

              <RentalRequest
                title="Family House"
                location="Uttara"
                date="Aug 20, 2026"
                status="REJECTED"
                rent="৳60,000"
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Quickly access the things you use most.
              </p>
            </CardHeader>

            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <QuickAction
                href="/property"
                icon={<Search className="size-5" />}
                title="Browse Properties"
                description="Find your next home"
              />

              <QuickAction
                href="/dashboard/tenant/requests"
                icon={<CalendarDays className="size-5" />}
                title="Rental Requests"
                description="Track your applications"
              />

              <QuickAction
                href="#"
                icon={<Heart className="size-5" />}
                title="Saved Properties"
                description="View your favorites"
              />

              <QuickAction
                href="/profile"
                icon={<Home className="size-5" />}
                title="My Profile"
                description="Manage your account"
              />
            </CardContent>
          </Card>
        </section>

        {/* =========================================
            Approved Property / Payment
        ========================================= */}
        <section className="mt-6">
          <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-0">
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <WalletCards className="size-6 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-primary">
                      Next Step
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      Complete your rental payment
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                      Your rental request has been approved. Complete the
                      payment to continue your rental process.
                    </p>
                  </div>
                </div>

                <Button className="rounded-xl lg:min-w-36">
                  Make Payment
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* =========================================
            Bottom Info
        ========================================= */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <InfoCard
            icon={<Heart className="size-5" />}
            title="Looking for a new place?"
            description="Explore available properties and save the ones that match your lifestyle."
            action="Explore Properties"
            href="/properties"
          />

          <InfoCard
            icon={<Clock3 className="size-5" />}
            title="Track your applications"
            description="Keep an eye on your rental requests and see when landlords respond."
            action="View Requests"
            href="/dashboard/tenant/requests"
          />
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;

/* =========================================
   Stat Card
========================================= */

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <Card className="rounded-3xl border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold tracking-tight">
              {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* =========================================
   Rental Request
========================================= */

type RentalRequestProps = {
  title: string;
  location: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rent: string;
};

function RentalRequest({
  title,
  location,
  date,
  status,
  rent,
}: RentalRequestProps) {
  const statusStyles = {
    PENDING:
      "bg-amber-500/10 text-amber-600 border-amber-500/20",
    APPROVED:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    REJECTED:
      "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Home className="size-5 text-muted-foreground" />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">
            {title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {location}
            </span>

            <span>{date}</span>

            <span>{rent}/month</span>
          </div>
        </div>
      </div>

      <Badge
        variant="outline"
        className={`w-fit rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[status]}`}
      >
        {status}
      </Badge>
    </div>
  );
}

/* =========================================
   Quick Action
========================================= */

type QuickActionProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

function QuickAction({
  href,
  icon,
  title,
  description,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-border/60 p-4 transition-all hover:border-primary/30 hover:bg-primary/[0.03]"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* =========================================
   Info Card
========================================= */

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
};

function InfoCard({
  icon,
  title,
  description,
  action,
  href,
}: InfoCardProps) {
  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>

            <Button
              asChild
              variant="link"
              className="mt-2 h-auto p-0 text-primary"
            >
              <Link href={href}>
                {action}
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}