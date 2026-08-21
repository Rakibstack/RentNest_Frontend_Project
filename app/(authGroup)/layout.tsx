import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navber";
import { getUser } from "@/service/getUser";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {

  const user = await getUser()
  return (
    <div>
      <Navbar user={user}></Navbar>

      <main className="min-h-screen px-24 bg-muted/30">
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Left - Visual */}
          <div className="relative hidden overflow-hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
              alt="Beautiful modern home"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

            {/* Logo */}
            <div className="absolute left-8 top-8">
              <Link href="/" className="flex items-center gap-2 text-white">
                <span className="flex size-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-foreground">
                  R
                </span>

                <span className="text-xl font-bold tracking-tight">
                  Rent<span className="text-white/70">Nest</span>
                </span>
              </Link>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-10 left-8 right-8 text-white xl:bottom-14 xl:left-12 xl:right-12">
              <div className="max-w-lg">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                  Find your next place
                </p>

                <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                  A place that feels
                  <span className="block text-white/70">like home.</span>
                </h1>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
                  Discover beautiful rental properties, connect with trusted
                  property owners, and make your next move with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex min-h-screen flex-col">
            {/* Mobile Logo */}
            <div className="flex items-center justify-between px-5 py-5 lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  R
                </span>

                <span className="text-xl font-bold tracking-tight">
                  Rent<span className="text-primary">Nest</span>
                </span>
              </Link>
            </div>

            {/* Form container */}
            <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
              <div className="w-full max-w-md">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
