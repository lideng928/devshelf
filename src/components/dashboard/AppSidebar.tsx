"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  ITEM_TYPE_BG_CLASSES,
  ITEM_TYPE_ICONS,
  ITEM_TYPE_TEXT_CLASSES,
} from "@/lib/item-types";
import type { SidebarCollection, SidebarData } from "@/types/dashboard";

interface CollectionGroupProps {
  label: string;
  collections: SidebarCollection[];
  pathname: string;
}

function CollectionGroup({ label, collections, pathname }: CollectionGroupProps) {
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
              <span className="flex size-4 shrink-0 items-center justify-center">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    (collection.typeSlug && ITEM_TYPE_BG_CLASSES[collection.typeSlug]) ??
                      "bg-muted-foreground",
                  )}
                />
              </span>
              <span>{collection.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
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
                    tooltip={type.name}
                  >
                    {Icon && <Icon className={ITEM_TYPE_TEXT_CLASSES[type.slug]} />}
                    <span>{type.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <CollectionGroup
          label="Favorite Collections"
          collections={favoriteCollections}
          pathname={pathname}
        />
        <CollectionGroup
          label="Recent Collections"
          collections={recentCollections}
          pathname={pathname}
        />
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
