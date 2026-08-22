"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  Home,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locations = [
  "Gulshan",
  "Banani",
  "Uttara",
  "Bashundhara",
  "Mirpur",
  "Farmgate",
  "Motijheel",
  "Khulna",
];

const propertyTypes = [
  { label: "All Property Types", value: "all" },
  { label: "Apartment", value: "C1" },
  { label: "House", value: "C2" },
  { label: "Studio / Office", value: "C3" },
];

export default function PropertySearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || "all"
  );

  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "all"
  );

  const [minRent, setMinRent] = useState(
    searchParams.get("minRent") || ""
  );

  const [maxRent, setMaxRent] = useState(
    searchParams.get("maxRent") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    }

    if (location !== "all") {
      params.set("location", location);
    }

    if (categoryId !== "all") {
      params.set("categoryId", categoryId);
    }

    if (minRent) {
      params.set("minRent", minRent);
    }

    if (maxRent) {
      params.set("maxRent", maxRent);
    }

    params.set("page", "1");

    router.push(`/property?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchTerm("");
    setLocation("all");
    setCategoryId("all");
    setMinRent("");
    setMaxRent("");

    router.push("/property");
  };

  const hasFilters =
    searchTerm ||
    location !== "all" ||
    categoryId !== "all" ||
    minRent ||
    maxRent;

  return (
    <section className="relative z-10 -mt-5 mb-12 sm:-mt-7">
      <div className="rounded-3xl border border-border/70 bg-background/95 p-3 shadow-xl shadow-black/[0.04] backdrop-blur-xl sm:p-4">
        
        {/* Main Search */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search by property name, keyword..."
              className="h-14 rounded-2xl border-transparent bg-muted/50 pl-12 text-sm shadow-none transition-colors focus-visible:bg-background focus-visible:ring-1"
            />
          </div>

          <Button
            onClick={handleSearch}
            className="h-14 rounded-2xl px-7 shadow-sm"
          >
            <Search className="mr-2 size-4" />
            Search Properties
          </Button>
        </div>

        {/* Divider */}
        <div className="my-3 h-px bg-border/60" />

        {/* Filters */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">

          {/* Location */}
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-3 transition-colors hover:border-primary/30">
            <MapPin className="size-4 shrink-0 text-primary" />

            <div className="min-w-0 flex-1">
              <p className="px-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </p>

              <Select
                value={location}
                onValueChange={setLocation}
              >
                <SelectTrigger className="h-8 border-0 px-1 shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Locations
                  </SelectItem>

                  {locations.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Type */}
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-3 transition-colors hover:border-primary/30">
            <Home className="size-4 shrink-0 text-primary" />

            <div className="min-w-0 flex-1">
              <p className="px-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Property Type
              </p>

              <Select
                value={categoryId}
                onValueChange={setCategoryId}
              >
                <SelectTrigger className="h-8 border-0 px-1 shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {propertyTypes.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Minimum Rent */}
          <div className="rounded-2xl border border-border/60 bg-background px-3 transition-colors hover:border-primary/30">
            <p className="pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Minimum Rent
            </p>

            <Input
              type="number"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
              placeholder="৳ 10,000"
              className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Maximum Rent */}
          <div className="rounded-2xl border border-border/60 bg-background px-3 transition-colors hover:border-primary/30">
            <p className="pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Maximum Rent
            </p>

            <Input
              type="number"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              placeholder="৳ 100,000"
              className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant={hasFilters ? "outline" : "secondary"}
            onClick={handleSearch}
            className="h-[66px] rounded-2xl"
          >
            <SlidersHorizontal className="mr-2 size-4" />
            Apply Filters
          </Button>
        </div>

        {/* Bottom Info */}
        {hasFilters && (
          <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
            <p className="text-xs text-muted-foreground">
              Filters are ready to apply.
            </p>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 gap-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}