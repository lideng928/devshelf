import { prisma } from "@/lib/prisma";
import { TYPE_SELECT, toTypeSummary, type TypeRow } from "@/lib/db/item-types";
import type { CollectionStats, DashboardCollection, TypeSummary } from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 6;

// Distinct item types in a collection, most-used first.
function rankTypes(types: TypeRow[]): TypeSummary[] {
  const counts = new Map<string, { type: TypeRow; count: number }>();
  for (const type of types) {
    const entry = counts.get(type.id);
    if (entry) entry.count++;
    else counts.set(type.id, { type, count: 1 });
  }

  return [...counts.values()]
    .sort((a, b) => b.count - a.count)
    .map(({ type }) => toTypeSummary(type));
}

export async function getRecentCollections(
  userId: string,
  limit = RECENT_COLLECTIONS_LIMIT,
): Promise<DashboardCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      updatedAt: true,
      items: {
        select: {
          item: {
            select: {
              type: { select: TYPE_SELECT },
            },
          },
        },
      },
    },
  });

  return collections.map((collection) => {
    const types = rankTypes(collection.items.map(({ item }) => item.type));
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      href: `/collections/${collection.id}`,
      itemCount: collection.items.length,
      dominantType: types[0] ?? null,
      types,
      updatedAt: collection.updatedAt.toISOString(),
    };
  });
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [collections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { collections, favoriteCollections };
}
