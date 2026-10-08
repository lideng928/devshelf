import { prisma } from "@/lib/prisma";
import { TYPE_SELECT, toTypeSummary } from "@/lib/db/item-types";
import type { Prisma } from "@/generated/prisma/client";
import type { DashboardItem, ItemStats } from "@/types/dashboard";

const RECENT_ITEMS_LIMIT = 10;
// Matched by type name: DB slugs are random.
const CODE_TYPE_NAMES = new Set(["snippet", "command"]);

const DASHBOARD_ITEM_SELECT = {
  id: true,
  title: true,
  description: true,
  content: true,
  url: true,
  fileName: true,
  isPinned: true,
  updatedAt: true,
  type: { select: TYPE_SELECT },
  collections: {
    select: { collection: { select: { name: true } } },
    orderBy: { addedAt: "asc" },
  },
  tags: {
    select: { tag: { select: { name: true } } },
    orderBy: { tag: { name: "asc" } },
  },
} satisfies Prisma.ItemSelect;

type DashboardItemRow = Prisma.ItemGetPayload<{ select: typeof DASHBOARD_ITEM_SELECT }>;

function getPreview(item: DashboardItemRow, isCode: boolean): string | null {
  if (isCode) return item.content?.split("\n")[0] ?? null;
  return item.description ?? item.content ?? item.url ?? item.fileName;
}

function toDashboardItem(item: DashboardItemRow): DashboardItem {
  const isCode = CODE_TYPE_NAMES.has(item.type.name);
  return {
    id: item.id,
    title: item.title,
    preview: getPreview(item, isCode),
    isCode,
    isPinned: item.isPinned,
    type: toTypeSummary(item.type),
    collectionNames: item.collections.map(({ collection }) => collection.name),
    tags: item.tags.map(({ tag }) => tag.name),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export async function getPinnedItems(userId: string): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: DASHBOARD_ITEM_SELECT,
  });
  return items.map(toDashboardItem);
}

export async function getRecentItems(
  userId: string,
  limit = RECENT_ITEMS_LIMIT,
): Promise<DashboardItem[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: DASHBOARD_ITEM_SELECT,
  });
  return items.map(toDashboardItem);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const [items, favoriteItems] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);
  return { items, favoriteItems };
}
