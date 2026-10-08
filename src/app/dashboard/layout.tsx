import { cookies } from "next/headers";
import AppSidebar from "@/components/dashboard/AppSidebar";
import TopBar from "@/components/dashboard/TopBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSidebarUser } from "@/lib/dashboard";
import { getFavoriteCollections, getSidebarRecentCollections } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/current-user";
import { getSidebarItemTypes } from "@/lib/db/items";
import type { SidebarData } from "@/types/dashboard";

async function getSidebarData(): Promise<SidebarData> {
  const userId = await getCurrentUserId();
  const user = getSidebarUser();
  if (!userId) {
    return { itemTypes: [], favoriteCollections: [], recentCollections: [], user };
  }

  const [itemTypes, favoriteCollections, recentCollections] = await Promise.all([
    getSidebarItemTypes(userId),
    getFavoriteCollections(userId),
    getSidebarRecentCollections(userId),
  ]);
  return { itemTypes, favoriteCollections, recentCollections, user };
}

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const [cookieStore, sidebarData] = await Promise.all([cookies(), getSidebarData()]);
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar {...sidebarData} />
        <SidebarInset>
          <TopBar />
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
