
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    label: "Properties",
    href: "/properties",
  },
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/";
    }

    if (href === "/properties") {
      return pathname === "/properties" || pathname.startsWith("/properties/");
    }

    return pathname === href;
  };

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {navLinks.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {link.label}

            {/* {active && (
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" />
            )} */}
          </Link>
        );
      })}
    </nav>
  );
}