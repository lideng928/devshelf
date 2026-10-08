export interface SidebarItemType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  href: string;
  count: number;
}

export interface SidebarCollection {
  id: string;
  name: string;
  href: string;
  typeSlug: string | null;
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

export interface DashboardData {
  firstName: string;
  itemStats: Pick<DashboardStats, "items" | "favoriteItems">;
  pinnedItems: DashboardItem[];
  recentItems: DashboardItem[];
}

export interface SidebarData {
  itemTypes: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
  user: SidebarUser;
}
