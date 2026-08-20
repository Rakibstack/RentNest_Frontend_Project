import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const footerLinks = {
  explore: [
    { label: "Properties", href: "/properties" },
    { label: "Popular Locations", href: "/#locations" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  company: [
    { label: "About RentNest", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
  ],
  account: [
    { label: "Login", href: "/auth/login" },
    { label: "Create Account", href: "/auth/register" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="RentNest home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                R
              </span>

              <span className="text-xl font-bold tracking-tight">
                Rent<span className="text-primary">Nest</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              A simpler way to discover rental properties, connect with property
              owners, and find a place that feels like home.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <FaFacebookF className="size-4" />
              </Link>

              <Link
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <FaInstagram className="size-4" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <FaLinkedinIn className="size-4" />
              </Link>

              <Link
                href="#"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <FaGithub className="size-4" />
              </Link>
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore" links={footerLinks.explore} />

          {/* Company */}
          <FooterColumn title="Company" links={footerLinks.company} />

          {/* Account */}
          <FooterColumn title="Account" links={footerLinks.account} />
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-border/60 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} RentNest. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-1 font-medium text-foreground"
            >
              Contact
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
