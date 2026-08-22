"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PropertySearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );

  const [isPending, startTransition] = useTransition();
  // const debounceReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1");

    startTransition(() => {
      router.replace(`/premium?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearchTerm("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    params.set("page", "1");

    startTransition(() => {
      router.replace(`/premium?${params.toString()}`);
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto  max-w-4xl">
      <div className="relative flex items-center ">
        <Search className="absolute left-4 size-5 text-muted-foreground" />

        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search premium news..."
          disabled={isPending}
          className="h-12 rounded-xl border-border bg-background pl-11 pr-28 shadow-sm"
        />

        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            disabled={isPending}
            className="absolute right-20 size-8"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        )}

        <Button
          type="button"
          onClick={handleSearch}
          disabled={isPending}
          className="absolute right-1.5 h-9 rounded-lg px-4"
        >
          {isPending ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
};

export default PropertySearch;
