import PinnedItems from "@/components/dashboard/PinnedItems";
import RecentCollections from "@/components/dashboard/RecentCollections";
import RecentItems from "@/components/dashboard/RecentItems";
import StatsCards from "@/components/dashboard/StatsCards";
import { getDashboardData } from "@/lib/dashboard";

export default function DashboardPage() {
  const { firstName, stats, pinnedItems, recentCollections, recentItems } = getDashboardData();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, {firstName}</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s on your shelf today.</p>
      </div>

      <StatsCards stats={stats} />
      <PinnedItems items={pinnedItems} />
      <RecentCollections collections={recentCollections} />
      <RecentItems items={recentItems} />
    </div>
  );
}
