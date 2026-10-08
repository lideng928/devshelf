// Mock-data helpers for the parts of the dashboard not yet on the database:
// the sidebar and the greeting.
import {
  collections,
  currentUser,
  items,
  itemTypes,
  type Collection,
  type ItemType,
} from "@/lib/mock-data";
import type { SidebarCollection, SidebarData } from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 5;

function byUpdatedAtDesc(a: { updatedAt: string }, b: { updatedAt: string }) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

function getType(typeId: string): ItemType | undefined {
  return itemTypes.find((type) => type.id === typeId);
}

// Item types in a collection, most frequent first.
function getCollectionTypes(collectionId: string): ItemType[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (item.collectionIds.includes(collectionId)) {
      counts.set(item.typeId, (counts.get(item.typeId) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([typeId]) => getType(typeId))
    .filter((type): type is ItemType => type !== undefined);
}

function toSidebarCollection(collection: Collection): SidebarCollection {
  return {
    id: collection.id,
    name: collection.name,
    href: `/collections/${collection.id}`,
    typeSlug: getCollectionTypes(collection.id)[0]?.slug ?? null,
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
    recentCollections: [...collections]
      .sort(byUpdatedAtDesc)
      .slice(0, RECENT_COLLECTIONS_LIMIT)
      .map(toSidebarCollection),
    user: {
      name: currentUser.name,
      email: currentUser.email,
      image: currentUser.image,
      initials: getInitials(currentUser.name),
    },
  };
}

export function getGreetingName(): string {
  return currentUser.name.split(" ")[0];
}
