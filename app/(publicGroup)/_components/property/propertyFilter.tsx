"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "ALL",
  "Apartment",
  "House",
  "Studio",
];

const PropertyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "ALL";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    // Filter change হলে page 1 এ চলে যাবে
    params.set("page", "1");

    startTransition(() => {
      router.replace(`/premium?${params.toString()}`);
    });
  };

  return (
    <Select
      value={currentCategory}
      onValueChange={handleCategoryChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>

      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category === "ALL"
              ? "All Categories"
              : category.charAt(0) + category.slice(1).toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PropertyFilter;