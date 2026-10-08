"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, LayoutDashboard, Layers, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ITEM_TYPE_ICONS } from "@/lib/item-types";
import { typeColorVar } from "@/lib/type-color";
import type { SidebarCollection, SidebarData, SidebarItemType } from "@/types/dashboard";

const NEUTRAL_COLOR = "var(--color-muted-foreground)";

interface TypesGroupProps {
  itemTypes: SidebarItemType[];
  pathname: string;
}

function TypesGroup({ itemTypes, pathname }: TypesGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Types</SidebarGroupLabel>
      <SidebarMenu>
        {itemTypes.map((type) => {
          const Icon = ITEM_TYPE_ICONS[type.icon];
          return (
            <SidebarMenuItem key={type.id}>
              <SidebarMenuButton
                render={<Link href={type.href} />}
                isActive={pathname === type.href}
                tooltip={type.label}
              >
                {Icon && <Icon style={typeColorVar(type.color)} className="text-(--type-color)" />}
                <span>{type.label}</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Favorites show a star; recents show a dot in their most-used type's color.
function CollectionMarker({ variant, color }: { variant: "favorite" | "recent"; color: string | null }) {
  if (variant === "favorite") {
    return <Star className="fill-amber-400 text-amber-400" />;
  }
  return (
    <span className="flex size-4 shrink-0 items-center justify-center">
      <span
        style={typeColorVar(color ?? NEUTRAL_COLOR)}
        className="size-2 rounded-full bg-(--type-color)"
      />
    </span>
  );
}

interface CollectionGroupProps {
  label: string;
  variant: "favorite" | "recent";
  collections: SidebarCollection[];
  pathname: string;
}

function CollectionGroup({ label, variant, collections, pathname }: CollectionGroupProps) {
  if (collections.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {collections.map((collection) => (
          <SidebarMenuItem key={collection.id}>
            <SidebarMenuButton
              render={<Link href={collection.href} />}
              isActive={pathname === collection.href}
              tooltip={collection.name}
            >
              <CollectionMarker variant={variant} color={collection.color} />
              <span>{collection.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function ViewAllCollectionsLink({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup className="pt-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link href="/collections" />}
            isActive={pathname === "/collections"}
            tooltip="View all collections"
            className="text-muted-foreground"
          >
            <ArrowRight />
            <span>View all collections</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default function AppSidebar({
  itemTypes,
  favoriteCollections,
  recentCollections,
  user,
}: SidebarData) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers className="size-4" />
              </div>
              <span className="font-semibold">DevShelf</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard" />}
                isActive={pathname === "/dashboard"}
                tooltip="Dashboard"
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <TypesGroup itemTypes={itemTypes} pathname={pathname} />
        <CollectionGroup
          label="Favorite Collections"
          variant="favorite"
          collections={favoriteCollections}
          pathname={pathname}
        />
        <CollectionGroup
          label="Recent Collections"
          variant="recent"
          collections={recentCollections}
          pathname={pathname}
        />
        <ViewAllCollectionsLink pathname={pathname} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip={user.name}>
              <Avatar>
                {user.image && <AvatarImage src={user.image} alt={user.name} />}
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
