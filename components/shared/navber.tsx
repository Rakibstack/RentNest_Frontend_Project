
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";

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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            R
          </span>

          <span>RentNest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/auth/register?role=LANDLORD">
              List Your Property
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
       <MobileMenu />
      </div>
    </header>
  );
}