import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { toTypeSummary, type TypeRow } from "@/lib/db/item-types";
import type {
  CollectionStats,
  DashboardCollection,
  SidebarCollection,
  TypeSummary,
} from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 6;
const SIDEBAR_RECENT_COLLECTIONS_LIMIT = 5;

interface CollectionTypeRow extends TypeRow {
  collectionId: string;
}

// Distinct item types per collection, most-used first, in one grouped query.
async function getRankedTypes(collectionIds: string[]): Promise<Map<string, TypeSummary[]>> {
  const ranked = new Map<string, TypeSummary[]>();
  if (collectionIds.length === 0) return ranked;

  const rows = await prisma.$queryRaw<CollectionTypeRow[]>`
    SELECT ic."collectionId", t.id, t.name, t.slug, t.icon, t.color
    FROM "ItemCollection" ic
    JOIN "Item" i ON i.id = ic."itemId"
    JOIN "ItemType" t ON t.id = i."typeId"
    WHERE ic."collectionId" IN (${Prisma.join(collectionIds)})
    GROUP BY ic."collectionId", t.id
    ORDER BY ic."collectionId", COUNT(*) DESC, t.name
  `;

  for (const { collectionId, ...type } of rows) {
    const types = ranked.get(collectionId) ?? [];
    types.push(toTypeSummary(type));
    ranked.set(collectionId, types);
  }
  return ranked;
}

// Cached per request: the dashboard layout (sidebar) and page both use it.
export const getRecentCollections = cache(
  async (userId: string): Promise<DashboardCollection[]> => {
    const collections = await prisma.collection.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: RECENT_COLLECTIONS_LIMIT,
      select: {
        id: true,
        name: true,
        description: true,
        isFavorite: true,
        updatedAt: true,
        _count: { select: { items: true } },
      },
    });
    const rankedTypes = await getRankedTypes(collections.map(({ id }) => id));

    return collections.map((collection) => {
      const types = rankedTypes.get(collection.id) ?? [];
      return {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        isFavorite: collection.isFavorite,
        href: `/collections/${collection.id}`,
        itemCount: collection._count.items,
        dominantType: types[0] ?? null,
        types,
        updatedAt: collection.updatedAt.toISOString(),
      };
    });
  },
);

export async function getFavoriteCollections(userId: string): Promise<SidebarCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId, isFavorite: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
  return collections.map(({ id, name }) => ({
    id,
    name,
    href: `/collections/${id}`,
    color: null,
  }));
}

export async function getSidebarRecentCollections(userId: string): Promise<SidebarCollection[]> {
  const collections = await getRecentCollections(userId);
  return collections.slice(0, SIDEBAR_RECENT_COLLECTIONS_LIMIT).map(({ id, name, href, dominantType }) => ({
    id,
    name,
    href,
    color: dominantType?.color ?? null,
  }));
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [collections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { collections, favoriteCollections };
}
