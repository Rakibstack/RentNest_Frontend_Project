import Link from "next/link";

import MobileMenu from "@/components/shared/mobile-menu";
import NavLinks from "./nav-links";
import UserMenu from "./user-menu";

type Iuser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
      id: string;
      name: string;
      email: string;
      status: string;
      phone?: string;
      profileImage?:string;
      role: string;
      createdAt: string;
      updatedAt: string;
  };
};

export type navberProps = {
  user: Iuser
}

export default function Navbar({user}: navberProps) {

  console.log(user,'user profile');
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="RentNest home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            R
          </span>

          <span className="text-xl font-bold tracking-tight text-foreground">
            Rent<span className="text-primary">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Desktop User Actions */}
        <div className="hidden items-center md:flex">
          <UserMenu user={user} />
        </div>

        {/* Mobile Navigation */}
        <MobileMenu />
      </div>
    </header>
  );
}