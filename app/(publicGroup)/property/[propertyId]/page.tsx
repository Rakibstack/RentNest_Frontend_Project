import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getSingleProperty } from "../../_action/getSingleProperty";

type PropertyDetailsPageProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

export default async function SinglePropertyPage({
  params,
}: PropertyDetailsPageProps) {
  const { propertyId } = await params;
  const result = await getSingleProperty(propertyId);
  const property = result.data;
  const image = property.image[0];

  return (
    <main className="min-h-screen bg-background">
      {/* ================================
          Top Navigation / Back
      ================================= */}

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/propertypnpm"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to properties
        </Link>
      </div>

    
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {/* Image */}

            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-border/60 bg-muted">
              <Image
                src={image}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Availability */}
              <div className="absolute left-5 top-5">
                <div className="flex items-center gap-2 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  {property.availability}
                </div>
              </div>

              {/* Save */}
              <div className="absolute right-5 top-5">
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-10 rounded-full bg-background/90 shadow-sm backdrop-blur hover:bg-background"
                >
                  <Heart className="size-5" />
                </Button>
              </div>
            </div>

            {/* Property Heading */}
            <div className="mt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {property.title}
                  </h1>

                  <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    <span>{property.location}, Dhaka</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <p className="text-2xl font-bold text-primary">
                    ৳{property.rent.toLocaleString()}
                  </p>

                  <p className="text-right text-sm text-muted-foreground">
                    per month
                  </p>
                </div>
              </div>
            </div>

            {/* Property Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <BedDouble className="size-5 text-primary" />

                <p className="mt-3 text-lg font-semibold">{property.bedRoom}</p>

                <p className="text-sm text-muted-foreground">Bedroom</p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <Bath className="size-5 text-primary" />

                <p className="mt-3 text-lg font-semibold">
                  {property.bathRooms}
                </p>

                <p className="text-sm text-muted-foreground">Bathroom</p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                <CheckCircle2 className="size-5 text-primary" />

                <p className="mt-3 text-lg font-semibold">Ready</p>

                <p className="text-sm text-muted-foreground">Availability</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold">About this property</h2>

              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                {property.description}
              </p>
            </div>
          </div>

          {/* ================================
              Right Side
          ================================= */}

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm sm:p-6">
              {/* Rental Card */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly rent
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-bold tracking-tight">
                    ৳{property.rent.toLocaleString()}
                  </span>

                  <span className="pb-1 text-sm text-muted-foreground">
                    / month
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Rental Request */}
              <div>
                <h3 className="font-semibold">Interested in this property?</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Send a rental request to the landlord and start your
                  conversation.
                </p>

                <Button className="mt-5 w-full rounded-xl" size="lg">
                  <CalendarDays className="mr-2 size-4" />
                  Request to Rent
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Landlord */}
              <div>
                <p className="mb-4 text-sm font-semibold">Listed by</p>

                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-muted">
                    {property.author.profileImage ? (
                      <Image
                        src={property.author.profileImage}
                        alt={property.author.name}
                        fill
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
                        {property.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {property.author.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="size-3.5 text-primary" />
                      Verified landlord
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-5 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl"
                  >
                    <Mail className="mr-2 size-4" />
                    {property.author.email}
                  </Button>

                  {property.author.phone && (
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl"
                    >
                      <Phone className="mr-2 size-4" />
                      {property.author.phone}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
