
"use client";

import { useState, useTransition } from "react";
import { Building2, ImageIcon, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProperty } from "../../_action/landlord_action/createProperty";


export default function CreatePropertyForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    rent: "",
    bedRoom: "",
    bathRooms: "",
    categoryId: "",
    image: "",
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Please select a property type");
      return;
    }

    startTransition(async () => {
      const result = await createProperty({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        rent: Number(formData.rent),
        bedRoom: Number(formData.bedRoom),
        bathRooms: Number(formData.bathRooms),
        categoryId: formData.categoryId,
        image: [formData.image],
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/landlord-dashboard/properties");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <section className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Property Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add the basic information about your property.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Property Title
            </label>

            <Input
              value={formData.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              placeholder="e.g. Modern 3 Bedroom Apartment in Gulshan"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <Textarea
              value={formData.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              placeholder="Describe your property..."
              rows={5}
              required
            />
          </div>

          {/* Location + Type */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={formData.location}
                  onChange={(e) =>
                    handleChange("location", e.target.value)
                  }
                  placeholder="e.g. Gulshan"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Property Type
              </label>

              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  handleChange("categoryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="C1">
                    Apartment
                  </SelectItem>

                  <SelectItem value="C2">
                    House
                  </SelectItem>

                  <SelectItem value="C3">
                    Studio / Office
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Property Details
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Set the pricing and property specifications.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {/* Rent */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Monthly Rent
            </label>

            <Input
              type="number"
              min="0"
              value={formData.rent}
              onChange={(e) =>
                handleChange("rent", e.target.value)
              }
              placeholder="25000"
              required
            />
          </div>

          {/* Bedroom */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Bedrooms
            </label>

            <Input
              type="number"
              min="0"
              value={formData.bedRoom}
              onChange={(e) =>
                handleChange("bedRoom", e.target.value)
              }
              placeholder="3"
              required
            />
          </div>

          {/* Bathroom */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Bathrooms
            </label>

            <Input
              type="number"
              min="0"
              value={formData.bathRooms}
              onChange={(e) =>
                handleChange("bathRooms", e.target.value)
              }
              placeholder="2"
              required
            />
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="rounded-3xl border border-border/60 bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <ImageIcon className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Property Image
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add an image URL for your property.
            </p>
          </div>
        </div>

        <Input
          type="url"
          value={formData.image}
          onChange={(e) =>
            handleChange("image", e.target.value)
          }
          placeholder="https://images.unsplash.com/..."
          required
        />
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={() =>
            router.push("/landlord-dashboard/properties")
          }
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="rounded-xl px-6"
          disabled={isPending}
        >
          <Plus className="mr-2 size-4" />

          {isPending ? "Creating..." : "Create Property"}
        </Button>
      </div>
    </form>
  );
}