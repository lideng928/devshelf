import { Files, Folder, FolderHeart, Star, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardStats } from "@/types/dashboard";

interface Stat {
  label: string;
  value: number;
  hint: string;
  icon: LucideIcon;
}

export default function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards: Stat[] = [
    { label: "Items", value: stats.items, hint: "Across all types", icon: Files },
    { label: "Collections", value: stats.collections, hint: "Organizing your items", icon: Folder },
    { label: "Favorite items", value: stats.favoriteItems, hint: "Starred for later", icon: Star },
    {
      label: "Favorite collections",
      value: stats.favoriteCollections,
      hint: "Pinned for quick access",
      icon: FolderHeart,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ label, value, hint, icon: Icon }) => (
        <Card key={label} className="gap-1 px-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {label}
            <Icon className="size-4" />
          </div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </Card>
      ))}
    </div>
  );
}
