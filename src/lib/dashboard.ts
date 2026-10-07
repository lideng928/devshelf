import {
  collections,
  currentUser,
  items,
  itemTypes,
  type Collection,
} from "@/lib/mock-data";
import type { SidebarCollection, SidebarData } from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 5;

// Slug of the item type that appears most often in a collection.
function getDominantTypeSlug(collectionId: string): string | null {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (item.collectionId === collectionId) {
      counts.set(item.typeId, (counts.get(item.typeId) ?? 0) + 1);
    }
  }

  let topTypeId: string | null = null;
  let topCount = 0;
  for (const [typeId, count] of counts) {
    if (count > topCount) {
      topTypeId = typeId;
      topCount = count;
    }
  }

  return itemTypes.find((type) => type.id === topTypeId)?.slug ?? null;
}

function toSidebarCollection(collection: Collection): SidebarCollection {
  return {
    id: collection.id,
    name: collection.name,
    href: `/collections/${collection.id}`,
    typeSlug: getDominantTypeSlug(collection.id),
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getSidebarData(): SidebarData {
  const recentCollections = [...collections]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_COLLECTIONS_LIMIT);

  return {
    itemTypes: itemTypes.map((type) => ({
      id: type.id,
      name: type.name,
      slug: type.slug,
      icon: type.icon,
      href: `/items/${type.name.toLowerCase()}`,
      count: items.filter((item) => item.typeId === type.id).length,
    })),
    favoriteCollections: collections
      .filter((collection) => collection.isFavorite)
      .map(toSidebarCollection),
    recentCollections: recentCollections.map(toSidebarCollection),
    user: {
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      initials: getInitials(currentUser.name),
    },
  };
}
