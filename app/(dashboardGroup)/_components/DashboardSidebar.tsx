"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  HouseIcon,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { logoutUser } from "@/service/logout-User";
import { toast } from "sonner";
import { adminItems, landlordItems, tenantItems } from "../_config/sidebarItemConfig";

interface DashboardSidebarProps {
  role?: string;
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const getMenuItems = () => {
    switch (role) {
      case "ADMIN":
        return adminItems;

      case "LANDLORD":
        return landlordItems;

      case "TENANT":
      default:
        return tenantItems;
    }
  };

  const menuItems = getMenuItems();

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

  const panelTitle =
    role === "ADMIN"
      ? "Admin Panel"
      : role === "LANDLORD"
        ? "Landlord Panel"
        : "Tenant Dashboard";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/60"
    >
    
      <SidebarHeader className="border-b border-border/60">
        <Link
          href="/"
          className="group flex items-center gap-3 px-2 py-3"
        >
          {/* Logo */}
          <div
            className="
              flex size-8 shrink-0 items-center justify-center
              rounded-xl
              bg-primary
              text-primary-foreground
              shadow-sm
              transition-transform
              duration-200
              group-hover:scale-105
            "
          >
            <HouseIcon className="size-5" />
          </div>

          {/* Brand */}
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight">
              Rent<span className="text-primary">Nest</span>
            </span>

            <span className="mt-0.5 text-xs text-muted-foreground">
              {panelTitle}
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* =========================
          Navigation
      ========================= */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="
                        h-10
                        rounded-lg
                        transition-all
                      "
                    >
                      <Link href={item.href}>
                        <Icon className="size-4" />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* =========================
          Footer
      ========================= */}
      <SidebarFooter className="border-t border-border/60">
        <SidebarMenu>
          {/* Back to Website */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Back to website"
              className="h-10 rounded-lg"
            >
              <Link href="/">
                <Home className="size-4" />

                <span>Back to website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Sign out"
              className="
                h-10
                cursor-pointer
                rounded-lg
                text-destructive
                hover:bg-destructive/10
                hover:text-destructive
              "
            >
              <LogOut className="size-4" />

              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;