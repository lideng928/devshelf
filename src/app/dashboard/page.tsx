import PinnedItems from "@/components/dashboard/PinnedItems";
import RecentCollections from "@/components/dashboard/RecentCollections";
import RecentItems from "@/components/dashboard/RecentItems";
import StatsCards from "@/components/dashboard/StatsCards";
import { getDashboardData } from "@/lib/dashboard";
import { getCollectionStats, getRecentCollections } from "@/lib/db/collections";
import { getCurrentUserId } from "@/lib/db/current-user";

const EMPTY_COLLECTION_STATS = { collections: 0, favoriteCollections: 0 };

export default async function DashboardPage() {
  // Items still come from mock data; collections come from the database.
  const { firstName, itemStats, pinnedItems, recentItems } = getDashboardData();

  const userId = await getCurrentUserId();
  const [recentCollections, collectionStats] = userId
    ? await Promise.all([getRecentCollections(userId), getCollectionStats(userId)])
    : [[], EMPTY_COLLECTION_STATS];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, {firstName}</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s on your shelf today.</p>
      </div>

      <StatsCards stats={{ ...itemStats, ...collectionStats }} />
      <PinnedItems items={pinnedItems} />
      <RecentCollections collections={recentCollections} />
      <RecentItems items={recentItems} />
    </div>
  );
}
