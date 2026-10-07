import { cookies } from "next/headers";
import AppSidebar from "@/components/dashboard/AppSidebar";
import TopBar from "@/components/dashboard/TopBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSidebarData } from "@/lib/dashboard";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar {...getSidebarData()} />
        <SidebarInset>
          <TopBar />
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
