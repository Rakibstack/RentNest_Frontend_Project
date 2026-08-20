"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Heart,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* User Trigger */}
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="group h-11 gap-2 rounded-full border border-border/70 bg-background px-2 pr-3 shadow-sm transition-all duration-200 hover:bg-muted"
      >
        {/* Avatar */}
        <div className="relative size-8 overflow-hidden rounded-full bg-primary/10">
          <Image
            src="/images/avatar-placeholder.jpg"
            alt="User profile"
            fill
            sizes="28px"
            className="object-cover"
          />
        </div>

        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-[calc(100%+0.75rem)] w-64 origin-top-right transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-background p-2 shadow-xl shadow-black/5">
          {/* User Info */}
          <div className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3">
            <div className="relative size-10 overflow-hidden rounded-full bg-primary/10">
              <Image
                src="/images/avatar-placeholder.jpg"
                alt="Rakib profile"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Rakib
              </p>

              <p className="truncate text-xs text-muted-foreground">
                rakib@example.com
              </p>
            </div>
          </div>

          <div className="my-1 h-px bg-border" />

          {/* Menu Items */}
          <div className="space-y-1">
            <DropdownLink
              href="/dashboard"
              icon={<LayoutDashboard className="size-4" />}
              label="Dashboard"
              onClick={() => setOpen(false)}
            />

            <DropdownLink
              href="/dashboard/tenant/requests"
              icon={<ClipboardList className="size-4" />}
              label="My Rental Requests"
              onClick={() => setOpen(false)}
            />

            <DropdownLink
              href="/favorites"
              icon={<Heart className="size-4" />}
              label="Saved Properties"
              onClick={() => setOpen(false)}
            />

            <DropdownLink
              href="/profile"
              icon={<User className="size-4" />}
              label="Profile"
              onClick={() => setOpen(false)}
            />

            <DropdownLink
              href="/settings"
              icon={<Settings className="size-4" />}
              label="Settings"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="my-1 h-px bg-border" />

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              // logout logic will be added later
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

type DropdownLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function DropdownLink({
  href,
  icon,
  label,
  onClick,
}: DropdownLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}