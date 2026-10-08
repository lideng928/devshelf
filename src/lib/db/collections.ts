import { prisma } from "@/lib/prisma";
import type { CollectionStats, DashboardCollection, TypeSummary } from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 6;
const FALLBACK_TYPE_ICON = "File";
const FALLBACK_TYPE_COLOR = "#94a3b8";

interface TypeRow {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
}

function toTypeSummary(type: TypeRow): TypeSummary {
  return {
    slug: type.slug,
    name: type.name,
    icon: type.icon ?? FALLBACK_TYPE_ICON,
    color: type.color ?? FALLBACK_TYPE_COLOR,
  };
}

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
              type: { select: { id: true, name: true, slug: true, icon: true, color: true } },
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
