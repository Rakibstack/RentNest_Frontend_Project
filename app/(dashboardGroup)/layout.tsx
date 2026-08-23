import { ReactNode } from "react";
import { getUser } from "@/service/getUser";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();

  const role = user?.data?.role;

  return (
   <TooltipProvider>
     <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        {/* Sidebar */}
        <DashboardSidebar role={role} />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Dashboard Navbar */}
          <DashboardNavbar user={user} />

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
   </TooltipProvider>
  );
}