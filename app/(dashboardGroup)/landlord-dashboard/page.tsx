import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Properties",
    value: "12",
    description: "2 added this month",
    icon: Building2,
  },
  {
    title: "Available Properties",
    value: "8",
    description: "Ready for tenants",
    icon: CheckCircle2,
  },
  {
    title: "Rental Requests",
    value: "24",
    description: "6 pending review",
    icon: CalendarCheck2,
  },
  {
    title: "Monthly Revenue",
    value: "৳ 3.45L",
    description: "+12.5% from last month",
    icon: TrendingUp,
  },
];

const recentProperties = [
  {
    title: "Modern Apartment in Gulshan",
    location: "Gulshan, Dhaka",
    rent: "৳65,000",
    status: "AVAILABLE",
  },
  {
    title: "Family House in Uttara",
    location: "Uttara, Dhaka",
    rent: "৳60,000",
    status: "RENTED",
  },
  {
    title: "Premium Office Space",
    location: "Banani, Dhaka",
    rent: "৳85,000",
    status: "AVAILABLE",
  },
];

const recentRequests = [
  {
    name: "Rakib Hasan",
    property: "Modern Apartment in Gulshan",
    date: "Today",
    status: "PENDING",
  },
  {
    name: "Siam Ahmed",
    property: "Family House in Uttara",
    date: "Yesterday",
    status: "APPROVED",
  },
  {
    name: "Nayeem Rahman",
    property: "Premium Office Space",
    date: "2 days ago",
    status: "PENDING",
  },
];

const LandlordDashboard = () => {
  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================================
            Welcome Header
        ========================================= */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                Landlord Workspace
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, Ali 👋
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Manage your properties, rental requests, and earnings
                from one place.
              </p>
            </div>

            <Button asChild className="w-fit rounded-xl">
              <Link href="/landlord-dashboard/properties/create">
                <Plus className="size-4" />
                Add Property
              </Link>
            </Button>
          </div>
        </section>

        {/* =========================================
            Stats
        ========================================= */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="rounded-2xl border-border/60 shadow-sm"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-2xl font-bold tracking-tight">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>

                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* =========================================
            Main Dashboard Grid
        ========================================= */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          {/* Recent Properties */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  Recent Properties
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your latest property listings.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-lg"
              >
                <Link href="/landlord-dashboard/properties">
                  View all
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {recentProperties.map((property) => (
                  <div
                    key={property.title}
                    className="
                      flex flex-col gap-3
                      rounded-xl
                      border border-border/60
                      p-4
                      transition-colors
                      hover:bg-muted/40
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <Building2 className="size-5 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {property.title}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {property.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="text-sm font-semibold">
                        {property.rent}
                      </span>

                      <Badge
                        variant={
                          property.status === "AVAILABLE"
                            ? "default"
                            : "secondary"
                        }
                        className="rounded-full text-[10px]"
                      >
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rental Requests */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  Rental Requests
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Recent tenant requests.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-lg"
              >
                <Link href="/landlord-dashboard/requests">
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={`${request.name}-${request.property}`}
                    className="flex items-start gap-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Users className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold">
                          {request.name}
                        </p>

                        <Badge
                          variant={
                            request.status === "APPROVED"
                              ? "default"
                              : "secondary"
                          }
                          className="rounded-full text-[9px]"
                        >
                          {request.status}
                        </Badge>
                      </div>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {request.property}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock3 className="size-3" />
                        {request.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* =========================================
            Quick Actions
        ========================================= */}
        <section className="mt-6">
          <Card className="overflow-hidden rounded-2xl border-border/60 bg-primary text-primary-foreground shadow-sm">
            <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Grow your rental business
                </h2>

                <p className="mt-1 max-w-xl text-sm text-primary-foreground/75">
                  Add more properties and keep your rental requests
                  organized from your RentNest workspace.
                </p>
              </div>

              <Button
                asChild
                variant="secondary"
                className="w-fit rounded-xl"
              >
                <Link href="/landlord-dashboard/properties/create">
                  <Plus className="size-4" />
                  List a Property
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default LandlordDashboard;