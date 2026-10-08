import PinnedItems from "@/components/dashboard/PinnedItems";
import RecentCollections from "@/components/dashboard/RecentCollections";
import RecentItems from "@/components/dashboard/RecentItems";
import StatsCards from "@/components/dashboard/StatsCards";
import { getGreetingName } from "@/lib/dashboard";
import { getCollectionStats, getRecentCollections } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/current-user";
import { getItemStats, getPinnedItems, getRecentItems } from "@/lib/db/items";
import type { DashboardCollection, DashboardItem, DashboardStats } from "@/types/dashboard";

interface MainAreaData {
  stats: DashboardStats;
  pinnedItems: DashboardItem[];
  recentCollections: DashboardCollection[];
  recentItems: DashboardItem[];
}

const EMPTY_DATA: MainAreaData = {
  stats: { items: 0, collections: 0, favoriteItems: 0, favoriteCollections: 0 },
  pinnedItems: [],
  recentCollections: [],
  recentItems: [],
};

async function getMainAreaData(userId: string | null): Promise<MainAreaData> {
  if (!userId) return EMPTY_DATA;

  const [itemStats, collectionStats, pinnedItems, recentCollections, recentItems] =
    await Promise.all([
      getItemStats(userId),
      getCollectionStats(userId),
      getPinnedItems(userId),
      getRecentCollections(userId),
      getRecentItems(userId),
    ]);

  return {
    stats: { ...itemStats, ...collectionStats },
    pinnedItems,
    recentCollections,
    recentItems,
  };
}

export default async function DashboardPage() {
  const { stats, pinnedItems, recentCollections, recentItems } = await getMainAreaData(
    await getCurrentUserId(),
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, {getGreetingName()}</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s on your shelf today.</p>
      </div>

      <StatsCards stats={stats} />
      <PinnedItems items={pinnedItems} />
      <RecentCollections collections={recentCollections} />
      <RecentItems items={recentItems} />
    </div>
  );
}
