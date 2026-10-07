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

export interface SidebarData {
  itemTypes: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
  user: SidebarUser;
}
