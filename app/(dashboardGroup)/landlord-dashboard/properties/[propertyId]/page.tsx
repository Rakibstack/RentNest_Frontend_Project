import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSingleProperty } from "@/app/(publicGroup)/_action/getSingleProperty";
import EditPropertyDialog from "@/app/(dashboardGroup)/_components/landlord-component/EditPropertyDialog";
import DeletePropertyButton from "@/app/(dashboardGroup)/_components/landlord-component/DeletePropertyButton";

const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const { propertyId } = await params;

  const result = await getSingleProperty(propertyId);
  const property = result?.data;

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Button asChild variant="ghost" className="mb-6 -ml-2 rounded-xl">
          <Link href="/landlord-dashboard/properties">
            <ArrowLeft className="mr-2 size-4" />
            Back to My Properties
          </Link>
        </Button>

        {/* Main */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Image */}
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm">
            <Image
              src={property.image[0]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            <div className="absolute left-5 top-5">
              <Badge className="rounded-full bg-emerald-500 px-4 py-1.5 text-white hover:bg-emerald-500">
                <CheckCircle2 className="mr-1.5 size-3.5" />
                {property.availability}
              </Badge>
            </div>
          </div>

          {/* Property Info */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Property Details
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {property.title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-5 text-primary" />
              <span>{property.location}</span>
            </div>

            {/* Price */}
            <div className="mt-7">
              <span className="text-3xl font-bold">
                ৳{property.rent.toLocaleString()}
              </span>

              <span className="ml-2 text-sm text-muted-foreground">
                / month
              </span>
            </div>

            {/* Features */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/60 bg-background p-4">
                <BedDouble className="size-5 text-primary" />

                <p className="mt-2 text-lg font-semibold">{property.bedRoom}</p>

                <p className="text-xs text-muted-foreground">Bedrooms</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background p-4">
                <Bath className="size-5 text-primary" />

                <p className="mt-2 text-lg font-semibold">
                  {property.bathRooms}
                </p>

                <p className="text-xs text-muted-foreground">Bathrooms</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <EditPropertyDialog
                property={{
                  id: property.id,
                  title: property.title,
                  description: property.description,
                  location: property.location,
                  rent: property.rent,
                  bedRoom: property.bedRoom,
                  bathRooms: property.bathRooms,
                  categoryId: property.categoryId,
                }}
              />

             <DeletePropertyButton propertyId={property.id}>

             </DeletePropertyButton>
            </div>
          </div>
        </div>

        {/* Description + Management */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Description */}
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold">About this property</h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {property.description}
              </p>

              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <CalendarDays className="size-4 text-primary" />

                <span>
                  Listed{" "}
                  {new Date(property.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Property Management */}
          <Card className="rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Property Management</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage the current availability of this property.
              </p>

              {/* Availability */}
              <div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Current availability
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-semibold">{property.availability}</span>

                  <Badge
                    variant="outline"
                    className="rounded-full text-emerald-600"
                  >
                    Active Listing
                  </Badge>
                </div>
              </div>

              {/* Change Availability */}
              <Button variant="outline" className="mt-4 w-full rounded-xl">
                Change Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsPage;
