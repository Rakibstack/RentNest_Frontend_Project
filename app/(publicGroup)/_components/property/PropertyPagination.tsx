
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type PropertyPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function PropertyPagination({
  currentPage,
  totalPages,
}: PropertyPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`/property?${params.toString()}`);
  };

  return (
  <div className="mt-10 flex items-center justify-center gap-2">
  {/* Previous */}
  {currentPage > 1 && (
    <Button
      variant="outline"
      size="icon"
      onClick={() => goToPage(currentPage - 1)}
      className="size-10 rounded-xl"
    >
      <ChevronLeft className="size-4" />
    </Button>
  )}

  {/* Page Numbers */}
  <div className="flex items-center gap-1">
    {Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      const isActive = page === currentPage;

      return (
        <Button
          key={page}
          variant={isActive ? "default" : "ghost"}
          onClick={() => goToPage(page)}
          className={`size-10 rounded-xl ${
            isActive
              ? "cursor-default shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {page}
        </Button>
      );
    })}
  </div>

  {/* Next */}
  {currentPage < totalPages && (
    <Button
      variant="outline"
      size="icon"
      onClick={() => goToPage(currentPage + 1)}
      className="size-10 rounded-xl"
    >
      <ChevronRight className="size-4" />
    </Button>
  )}
</div>
  );
}