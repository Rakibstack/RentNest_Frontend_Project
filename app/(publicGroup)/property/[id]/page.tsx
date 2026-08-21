import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const property = {
  id: "1d5497cf-22d0-44e3-9e66-478669913104",
  title: "Premium Office Space",
  description:
    "Commercial office space suitable for startups and small businesses with high-speed internet. This premium property offers a comfortable and professional environment with excellent accessibility and modern facilities.",
  location: "Gulshan, Dhaka",
  rent: 50000,
  bedRoom: 0,
  bathRooms: 4,
  image:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  availability: "AVAILABLE",
  createdAt: "2026-07-31T04:38:31.481Z",
};

export default function SinglePropertyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================================
          Header / Breadcrumb
      ================================= */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Properties
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ================================
            Property Gallery
        ================================= */}
        <section className="grid gap-3 overflow-hidden rounded-3xl lg:grid-cols-[1.6fr_0.8fr]">
          <div className="group relative min-h-[320px] overflow-hidden rounded-3xl lg:min-h-[520px]">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            <div className="absolute left-5 top-5">
              <Badge className="gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-foreground shadow-sm backdrop-blur hover:bg-background">
                <CheckCircle2 className="size-3.5 text-primary" />
                {property.availability}
              </Badge>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
              <div>
                <p className="mb-1 text-sm text-white/80">Premium Property</p>
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {property.title}
                </h1>
              </div>

              <Button
                size="icon"
                variant="secondary"
                className="shrink-0 rounded-full bg-white/90 text-foreground hover:bg-white"
              >
                <Heart className="size-5" />
              </Button>
            </div>
          </div>

          <div className="hidden gap-3 lg:grid">
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                alt="Property interior"
                fill
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
                alt="Property workspace"
                fill
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  variant="secondary"
                  className="rounded-full bg-background/90 backdrop-blur"
                >
                  View all photos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================
            Main Content
        ================================= */}
        <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left Content */}
          <div>
            {/* Title */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  {property.location}
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {property.title}
                </h2>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="hidden shrink-0 rounded-full sm:flex"
              >
                <Share2 className="size-4" />
              </Button>
            </div>

            {/* Property Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatCard
                icon={<BedDouble className="size-5" />}
                label="Bedrooms"
                value={property.bedRoom.toString()}
              />

              <StatCard
                icon={<Bath className="size-5" />}
                label="Bathrooms"
                value={property.bathRooms.toString()}
              />

              <StatCard
                icon={<CheckCircle2 className="size-5" />}
                label="Availability"
                value="Available"
              />
            </div>

            <Separator className="my-9" />

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold">About this property</h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {property.description}
              </p>
            </div>

            <Separator className="my-9" />

            {/* Property Features */}
            <div>
              <h3 className="text-xl font-semibold">Property highlights</h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <FeatureItem text="High-speed internet" />
                <FeatureItem text="Prime Gulshan location" />
                <FeatureItem text="Suitable for startups" />
                <FeatureItem text="Professional environment" />
                <FeatureItem text="Modern facilities" />
                <FeatureItem text="Excellent accessibility" />
              </div>
            </div>

            <Separator className="my-9" />

            {/* Safety */}
            <div className="rounded-2xl border border-border/70 bg-muted/30 p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold">RentNest verified property</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    This property is listed through RentNest. Always verify
                    property details and communicate through trusted channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================
              Booking / Rent Card
          ================================= */}
          <aside>
            <Card className="sticky top-24 overflow-hidden rounded-3xl border-border/70 shadow-lg shadow-black/5">
              <CardHeader className="space-y-1 pb-4">
                <p className="text-sm text-muted-foreground">
                  Monthly rent
                </p>

                <CardTitle className="text-3xl font-bold">
                  ৳{property.rent.toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    / month
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="rounded-2xl bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 size-5 text-primary" />

                    <div>
                      <p className="text-sm font-medium">
                        Ready to rent?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Submit a rental request and the property owner can
                        review your request.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="h-12 w-full rounded-xl text-sm font-semibold">
                  Request to Rent
                </Button>

                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl"
                >
                  <Heart className="mr-2 size-4" />
                  Save Property
                </Button>

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  You wont be charged until your rental request is approved.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* ================================
            Bottom CTA
        ================================= */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:mt-20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
                <Sparkles className="size-4" />
                Find your next place with RentNest
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Interested in this property?
              </h2>

              <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                Send a rental request and take the next step toward finding
                your perfect place.
              </p>
            </div>

            <Button
              variant="secondary"
              className="h-11 rounded-xl px-6"
            >
              Request to Rent
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =================================
   Small reusable components
================================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-sm font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5">
      <CheckCircle2 className="size-4 shrink-0 text-primary" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}