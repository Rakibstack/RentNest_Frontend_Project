"use client";

import Link from "next/link";
import { Bell, ChevronDown, LogOut, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { logoutUser } from "@/service/logout-User";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DashboardUser = {
  success: boolean;
  data?: {
    name: string;
    email: string;
    role: string;
    profileImage?: string | null;
  };
};

interface DashboardNavbarProps {
  user: DashboardUser;
}

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const router = useRouter();

  const userData = user?.data;

  if (!userData) {
    return (
      <header className="flex h-16 items-center border-b border-border/60 bg-background px-4">
        <SidebarTrigger />
      </header>
    );
  }

  const initials = userData.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully");

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16
        items-center justify-between
        border-b border-border/60
        bg-background/90
        px-4
        backdrop-blur
        sm:px-6
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="hidden h-5 w-px bg-border sm:block" />

        <div className="hidden sm:block">
          <p className="text-sm font-medium">
            Welcome back, {userData.name.split(" ")[0]} 👋
          </p>

          <p className="text-xs text-muted-foreground">
            Manage your RentNest account
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          onClick={() => router.push("/notifications")}
          aria-label="Notifications"
        >
          <Bell className="size-5" />

          {/* Notification dot */}
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 rounded-full px-1.5 sm:px-2"
            >
              <Avatar size="sm">
                {userData.profileImage && (
                  <AvatarImage
                    src={userData.profileImage}
                    alt={userData.name}
                  />
                )}

                <AvatarFallback>
                  {initials || <UserRound className="size-4" />}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left sm:block">
                <p className="max-w-28 truncate text-sm font-medium">
                  {userData.name}
                </p>

                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {userData.role}
                </p>
              </div>

              <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60 rounded-xl">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  {userData.profileImage && (
                    <AvatarImage
                      src={userData.profileImage}
                      alt={userData.name}
                    />
                  )}

                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {userData.name}
                  </p>

                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserRound className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
