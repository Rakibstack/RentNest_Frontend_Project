"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BellIcon,
  CreditCardIcon,
  HeartIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  SparklesIcon,
  UserIcon,
  ClipboardListIcon,
  ChevronDownIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { toast } from "sonner";
import { logoutUser } from "@/service/logout-User";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Properties",
    href: "/property",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const accountItems = [
  {
    label: "Profile",
    icon: UserIcon,
    action: "profile",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    action: "dashboard",
  },
  {
    label: "My Rental Requests",
    icon: ClipboardListIcon,
    action: "requests",
  },
  {
    label: "Saved Properties",
    icon: HeartIcon,
    action: "favorites",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    action: "settings",
  },
  {
    label: "Billing",
    icon: CreditCardIcon,
    action: "billing",
  },
];

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    name: string;
    email: string;
    role: string;
    profileImage: string | null;
  };
};

export type NavbarProps = {
  user: IUser;
};

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const role = user?.data?.role;

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      if (role === "TENANT") {
        router.push("/dashboard");
      } else if (role === "LANDLORD") {
        router.push("/landlord-dashboard");
      } else if (role === "ADMIN") {
        router.push("/admin-dashboard");
      }

      return;
    }

    /* Profile */

    if (action === "profile") {
      router.push("/profile");
      return;
    }

    /* Rental Requests */

    if (action === "requests") {
      router.push("/dashboard/tenant/requests");
      return;
    }

    /* Logout */

    if (action === "logout") {
      try {
        await logoutUser();

        toast.success("Logged out successfully");

        router.push("/login");
      } catch {
        toast.error("Failed to logout. Please try again.");
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2"
          aria-label="RentNest home"
        >
          <span
            className="
              flex size-9 items-center justify-center
              rounded-xl
              bg-primary
              text-primary-foreground
              shadow-sm
              transition-transform
              duration-200
              group-hover:scale-105
            "
          >
            <SparklesIcon className="size-5" />
          </span>

          <span className="text-lg font-bold tracking-tight">
            Rent
            <span className="text-primary">Nest</span>
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={`
                        ${navigationMenuTriggerStyle()}
                        relative
                        transition-colors
                        ${
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }
                      `}
                    >
                      {item.label}

                      {/* Active indicator */}

                      {isActive && (
                        <span
                          className="
                            absolute
                            bottom-1
                            left-1/2
                            h-0.5
                            w-5
                            -translate-x-1/2
                            rounded-full
                            bg-primary
                          "
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {user?.success ? (
          <div className="flex items-center gap-2">
            {/* Notification */}

            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => router.push("#")}
              className="
                size-10
                rounded-full
                text-muted-foreground
                transition-all
                duration-200
                hover:bg-muted
                hover:text-foreground
              "
            >
              <BellIcon className="size-5" />
            </Button>

            {/* =================================
                User Dropdown
            ================================= */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="Open user menu"
                  className="
                    group
                    h-11
                    gap-2
                    rounded-full
                    border
                    border-border/70
                    bg-background
                    px-1.5
                    pr-2.5
                    shadow-sm
                    transition-all
                    duration-200
                    hover:bg-muted
                    sm:pr-3
                  "
                >
                  {/* Avatar */}

                  <Avatar size="sm" className="ring-1 ring-border/70">
                    {user?.data?.profileImage && (
                      <AvatarImage
                        src={user.data.profileImage}
                        alt={user.data.name}
                      />
                    )}

                    <AvatarFallback className="bg-primary/10 text-primary">
                      <UserIcon className="size-4" />
                    </AvatarFallback>
                  </Avatar>

                  {/* Name */}

                  <span
                    className="
                      hidden
                      max-w-28
                      truncate
                      text-sm
                      font-medium
                      sm:block
                    "
                  >
                    {user.data.name}
                  </span>

                  {/* Chevron */}

                  <ChevronDownIcon
                    className="
                      hidden
                      size-4
                      text-muted-foreground
                      transition-transform
                      duration-200
                      group-data-[state=open]:rotate-180
                      sm:block
                    "
                  />
                </Button>
              </DropdownMenuTrigger>

              {/* =================================
                  Dropdown Content
              ================================= */}

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="
                  w-64
                  rounded-2xl
                  border-border/70
                  bg-background/95
                  p-2
                  shadow-xl
                  backdrop-blur-xl
                "
              >
                {/* =================================
                    User Information
                ================================= */}

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="ring-1 ring-border/70">
                        {user.data.profileImage && (
                          <AvatarImage
                            src={user.data.profileImage}
                            alt={user.data.name}
                          />
                        )}

                        <AvatarFallback className="bg-primary/10 text-primary">
                          <UserIcon className="size-4" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {user.data.name}
                        </span>

                        <span className="block truncate text-xs font-normal text-muted-foreground">
                          {user.data.email}
                        </span>

                        <span
                          className="
                            mt-1
                            inline-block
                            rounded-full
                            bg-primary/10
                            px-2
                            py-0.5
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-primary
                          "
                        >
                          {user.data.role}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* =================================
                    Account Items
                ================================= */}

                <DropdownMenuGroup>
                  {accountItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                        className="
                          cursor-pointer
                          rounded-xl
                          px-3
                          py-2.5
                          text-sm
                          transition-colors
                          focus:bg-muted
                        "
                      >
                        <Icon className="size-4 text-muted-foreground" />

                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* =================================
                    Logout
                ================================= */}

                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("logout")}
                  className="
                    cursor-pointer
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-destructive
                    transition-colors
                    focus:bg-destructive/10
                    focus:text-destructive
                  "
                >
                  <LogOutIcon className="size-4" />

                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          /* =================================
             Guest Navigation
          ================================= */

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button className="rounded-full font-medium cursor-pointer px-4 py-4 shadow-sm">
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button className="rounded-full font-medium cursor-pointer px-5 py-4 shadow-sm">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
