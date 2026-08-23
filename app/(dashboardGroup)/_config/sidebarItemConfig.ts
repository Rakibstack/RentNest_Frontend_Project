
import {
  LayoutDashboard,
  UserRound,
  ClipboardList,
  Heart,
  Building2,
  PlusCircle,
  House,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

export const tenantItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "My Rental Requests",
    href: "/dashboard/tenant/requests",
    icon: ClipboardList,
  },

  {
    title: "Browse Properties",
    href: "/property",
    icon: House,
  },
];

export const landlordItems = [
  {
    title: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "My Properties",
    href: "/landlord-dashboard/properties",
    icon: Building2,
  },
  {
    title: "Add Property",
    href: "/landlord-dashboard/properties/create",
    icon: PlusCircle,
  },
  {
    title: "Rental Requests",
    href: "/landlord-dashboard/requests",
    icon: ClipboardList,
  },
  {
    title: "Analytics",
    href: "/landlord-dashboard/analytics",
    icon: BarChart3,
  },
];

export const adminItems = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "Manage Users",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Manage Properties",
    href: "/admin-dashboard/properties",
    icon: Building2,
  },
  {
    title: "Rental Requests",
    href: "/admin-dashboard/requests",
    icon: ClipboardList,
  },
  {
    title: "Analytics",
    href: "/admin-dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
];