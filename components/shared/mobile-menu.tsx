"use client";

import {
  ChevronDown,
  ClipboardList,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Properties",
    href: "/properties",
  },
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
    label: "About",
    href: "/#about",
  },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setAccountOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="size-10 rounded-xl"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </Button>

      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 top-18 z-40 bg-black/10 backdrop-blur-[2px] transition-opacity duration-200 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Panel */}
      <div
        className={`absolute inset-x-0 top-full z-50 border-b border-border/60 bg-background shadow-xl transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          {/* Navigation */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="my-4 h-px bg-border" />

          {/* Account */}
          <button
            type="button"
            onClick={() => setAccountOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                R
              </span>

              <span>
                <span className="block text-left font-semibold">
                  Rakib
                </span>

                <span className="block text-left text-xs text-muted-foreground">
                  My Account
                </span>
              </span>
            </span>

            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform duration-200 ${
                accountOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Account Links */}
          <div
            className={`grid transition-all duration-200 ${
              accountOpen
                ? "mt-2 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="ml-3 space-y-1 border-l pl-3">
                <MobileAccountLink
                  href="/dashboard"
                  icon={<LayoutDashboard className="size-4" />}
                  label="Dashboard"
                  onClick={closeMenu}
                />

                <MobileAccountLink
                  href="/dashboard/tenant/requests"
                  icon={<ClipboardList className="size-4" />}
                  label="My Rental Requests"
                  onClick={closeMenu}
                />

                <MobileAccountLink
                  href="/favorites"
                  icon={<Heart className="size-4" />}
                  label="Saved Properties"
                  onClick={closeMenu}
                />

                <MobileAccountLink
                  href="/profile"
                  icon={<User className="size-4" />}
                  label="Profile"
                  onClick={closeMenu}
                />

                <MobileAccountLink
                  href="/settings"
                  icon={<Settings className="size-4" />}
                  label="Settings"
                  onClick={closeMenu}
                />

                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

type MobileAccountLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function MobileAccountLink({
  href,
  icon,
  label,
  onClick,
}: MobileAccountLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}