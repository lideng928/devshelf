import {
  collections,
  currentUser,
  items,
  itemTypes,
  type Collection,
  type Item,
  type ItemType,
} from "@/lib/mock-data";
import type {
  DashboardCollection,
  DashboardData,
  DashboardItem,
  SidebarCollection,
  SidebarData,
  TypeSummary,
} from "@/types/dashboard";

const RECENT_COLLECTIONS_LIMIT = 5;
const DASHBOARD_COLLECTIONS_LIMIT = 8;
const RECENT_ITEMS_LIMIT = 10;
const CODE_TYPE_SLUGS = new Set(["snippet", "command"]);

function byUpdatedAtDesc(a: { updatedAt: string }, b: { updatedAt: string }) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

function getType(typeId: string): ItemType | undefined {
  return itemTypes.find((type) => type.id === typeId);
}

function toTypeSummary(type: ItemType): TypeSummary {
  return { slug: type.slug, name: type.name, icon: type.icon };
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

function getItemPreview(item: Item, isCode: boolean): string | null {
  if (isCode) return item.content?.split("\n")[0] ?? null;
  return item.description ?? item.content ?? item.url ?? item.fileName;
}

function toDashboardItem(item: Item): DashboardItem | null {
  const type = getType(item.typeId);
  if (!type) return null;

  const isCode = CODE_TYPE_SLUGS.has(type.slug);
  return {
    id: item.id,
    title: item.title,
    preview: getItemPreview(item, isCode),
    isCode,
    isPinned: item.isPinned,
    type: toTypeSummary(type),
    collectionNames: collections
      .filter((collection) => item.collectionIds.includes(collection.id))
      .map((collection) => collection.name),
    updatedAt: item.updatedAt,
  };
}

function toDashboardCollection(collection: Collection): DashboardCollection {
  const types = getCollectionTypes(collection.id).map(toTypeSummary);
  return {
    id: collection.id,
    name: collection.name,
    description: collection.description,
    isFavorite: collection.isFavorite,
    href: `/collections/${collection.id}`,
    itemCount: items.filter((item) => item.collectionIds.includes(collection.id)).length,
    dominantType: types[0] ?? null,
    types,
    updatedAt: collection.updatedAt,
  };
}

function toDashboardItems(source: Item[]): DashboardItem[] {
  return source
    .map(toDashboardItem)
    .filter((item): item is DashboardItem => item !== null);
}

export function getDashboardData(): DashboardData {
  return {
    firstName: currentUser.name.split(" ")[0],
    stats: {
      items: items.length,
      collections: collections.length,
      favoriteItems: items.filter((item) => item.isFavorite).length,
      favoriteCollections: collections.filter((c) => c.isFavorite).length,
    },
    pinnedItems: toDashboardItems(items.filter((item) => item.isPinned).sort(byUpdatedAtDesc)),
    recentCollections: [...collections]
      .sort(byUpdatedAtDesc)
      .slice(0, DASHBOARD_COLLECTIONS_LIMIT)
      .map(toDashboardCollection),
    recentItems: toDashboardItems([...items].sort(byUpdatedAtDesc).slice(0, RECENT_ITEMS_LIMIT)),
  };
}
