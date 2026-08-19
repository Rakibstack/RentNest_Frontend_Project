
"use client";

import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Menu Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b bg-background shadow-lg">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t pt-4">
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/auth/login" onClick={closeMenu}>
                  Login
                </Link>
              </Button>

              <Button asChild>
                <Link
                  href="/auth/register?role=LANDLORD"
                  onClick={closeMenu}
                >
                  List Your Property
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}