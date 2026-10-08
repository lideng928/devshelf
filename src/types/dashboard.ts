export interface SidebarItemType {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  href: string;
  count: number;
}

export interface SidebarCollection {
  id: string;
  name: string;
  href: string;
  // Color of the most-used item type; null for an empty collection.
  color: string | null;
}

export interface SidebarUser {
  name: string;
  email: string;
  image: string | null;
  initials: string;
}

export interface TypeSummary {
  slug: string;
  name: string;
  icon: string;
  color: string;
}

export interface DashboardStats {
  items: number;
  collections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

export interface DashboardItem {
  id: string;
  title: string;
  preview: string | null;
  isCode: boolean;
  isPinned: boolean;
  type: TypeSummary;
  collectionNames: string[];
  tags: string[];
  updatedAt: string;
}

export interface DashboardCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  href: string;
  itemCount: number;
  dominantType: TypeSummary | null;
  types: TypeSummary[];
  updatedAt: string;
}

export interface CollectionStats {
  collections: number;
  favoriteCollections: number;
}

export type ItemStats = Pick<DashboardStats, "items" | "favoriteItems">;

export interface SidebarData {
  itemTypes: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
  user: SidebarUser;
}
