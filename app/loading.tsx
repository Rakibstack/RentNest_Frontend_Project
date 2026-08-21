import { Home } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        {/* Logo Loader */}
        <div className="relative mb-6">
          {/* Outer glow */}
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/10" />

          {/* Logo container */}
          <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Home className="size-6 animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-xl font-bold tracking-tight">
          Rent<span className="text-primary">Nest</span>
        </h2>

        {/* Loading message */}
        <p className="mt-2 text-sm text-muted-foreground">
          Finding your perfect place...
        </p>

        {/* Loading indicator */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}