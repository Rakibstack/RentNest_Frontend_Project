"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { updateProperty } from "../../_action/updateProperty";

export type EditProperty = {
  id: string;
  title: string;
  description: string;
  location: string;
  rent: number;
  bedRoom: number;
  bathRooms: number;
  categoryId: string;
};

type EditPropertyDialogProps = {
  property: EditProperty;
};

export default function EditPropertyDialog({
  property,
}: EditPropertyDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: property.title,
    description: property.description,
    location: property.location,
    rent: property.rent,
    bedRoom: property.bedRoom,
    bathRooms: property.bathRooms,
    categoryId: property.categoryId,
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await updateProperty(property.id, formData);

      if (!result.success) {
        toast.error(result.message || "Failed to update property");
        return;
      }

      toast.success("Property updated successfully");

      setOpen(false);

      // Refresh server components
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          <Pencil className="mr-2 size-4" />
          Edit Property
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>

          <DialogDescription>
            Update your property information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter property title"
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
              placeholder="Describe your property"
              rows={4}
              required
            />
          </div>

          {/* Location + Rent */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Location
              </label>

              <Input
                value={formData.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                placeholder="e.g. Gulshan"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Monthly Rent
              </label>

              <Input
                type="number"
                value={formData.rent}
                onChange={(e) =>
                  handleChange("rent", Number(e.target.value))
                }
                min={0}
                required
              />
            </div>
          </div>

          {/* Bedrooms + Bathrooms */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Bedrooms
              </label>

              <Input
                type="number"
                value={formData.bedRoom}
                onChange={(e) =>
                  handleChange(
                    "bedRoom",
                    Number(e.target.value)
                  )
                }
                min={0}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Bathrooms
              </label>

              <Input
                type="number"
                value={formData.bathRooms}
                onChange={(e) =>
                  handleChange(
                    "bathRooms",
                    Number(e.target.value)
                  )
                }
                min={0}
                required
              />
            </div>
          </div>

          {/* Category + Availability */}
          <div className="grid gap-4 sm:grid-cols-2">
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
{/* 
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Availability
              </label>

              <Select
                value={formData.availability}
                onValueChange={(value) =>
                  handleChange("availability", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="AVAILABLE">
                    Available
                  </SelectItem>

                  <SelectItem value="RENTED">
                    Rented
                  </SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}