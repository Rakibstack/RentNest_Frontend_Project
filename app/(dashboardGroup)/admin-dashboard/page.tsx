import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  Home,
  ShieldCheck,
  Users,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12.5%",
      description: "from last month",
      icon: Users,
    },
    {
      title: "Total Properties",
      value: "486",
      change: "+8.2%",
      description: "active listings",
      icon: Building2,
    },
    {
      title: "Rental Requests",
      value: "164",
      change: "+18.4%",
      description: "this month",
      icon: Clock3,
    },
    {
      title: "Active Landlords",
      value: "286",
      change: "+6.7%",
      description: "verified accounts",
      icon: UserRoundCheck,
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage platform users",
      href: "/admin-dashboard/users",
      icon: Users,
    },
    {
      title: "Manage Properties",
      description: "Review all listed properties",
      href: "/admin-dashboard/properties",
      icon: Building2,
    },
    {
      title: "Rental Requests",
      description: "Monitor rental activities",
      href: "/admin-dashboard/rental-request",
      icon: Home,
    },
  ];

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1"
              >
                <ShieldCheck className="mr-1.5 size-3.5 text-primary" />
                Admin Panel
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Monitor your RentNest platform, manage users, properties,
              and rental activities from one place.
            </p>
          </div>

          <Button asChild className="w-fit rounded-xl">
            <Link href="/admin-dashboard/users">
              Manage Users
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="rounded-3xl border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>

                    <Badge
                      variant="outline"
                      className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-600"
                    >
                      {stat.change}
                    </Badge>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>

                    <h2 className="mt-1 text-3xl font-bold tracking-tight">
                      {stat.value}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Platform Overview */}
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Platform Overview
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Current health of your RentNest platform.
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background">
                      <UserRoundCheck className="size-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Active Users
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Users currently active
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    1,186
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background">
                      <Building2 className="size-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Available Properties
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Currently available for rent
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    392
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background">
                      <Clock3 className="size-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Pending Requests
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Waiting for landlord review
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold">
                    28
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                Quick Actions
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Frequently used admin tools.
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Button
                    key={action.title}
                    asChild
                    variant="outline"
                    className="h-auto w-full justify-start rounded-2xl p-4 text-left"
                  >
                    <Link href={action.href}>
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>

                      <div className="ml-3 min-w-0">
                        <p className="text-sm font-semibold">
                          {action.title}
                        </p>

                        <p className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                          {action.description}
                        </p>
                      </div>

                      <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10">
                  <Clock3 className="size-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Pending Reviews
                  </p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Properties waiting for admin review.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <UserRoundCheck className="size-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Verified Landlords
                  </p>
                  <p className="text-xl font-bold">286</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Landlords currently active on RentNest.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10">
                  <UserRoundX className="size-5 text-destructive" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Suspended Accounts
                  </p>
                  <p className="text-xl font-bold">19</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Accounts currently restricted from the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default adminDashboard;