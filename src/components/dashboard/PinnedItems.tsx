import { Folder, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ITEM_TYPE_TEXT_CLASSES } from "@/lib/item-types";
import type { DashboardItem } from "@/types/dashboard";
import SectionHeader from "./SectionHeader";
import TypeIcon from "./TypeIcon";

function PinnedItemCard({ item }: { item: DashboardItem }) {
  return (
    <Card className="gap-3 px-4">
      <div className="flex items-center gap-2">
        <TypeIcon type={item.type} size="sm" />
        <span
          className={cn(
            "text-[11px] font-semibold tracking-wide uppercase",
            ITEM_TYPE_TEXT_CLASSES[item.type.slug],
          )}
        >
          {item.type.slug}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold">{item.title}</h3>
        {item.preview && (
          <p
            className={cn(
              "mt-1 line-clamp-2 text-xs text-muted-foreground",
              item.isCode && "font-mono",
            )}
          >
            {item.preview}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <Folder className="size-3.5 shrink-0" />
          <span className="truncate">{item.collectionName ?? "Unsorted"}</span>
        </span>
        <Pin className="size-3.5 shrink-0 text-primary" />
      </div>
    </Card>
  );
}

export default function PinnedItems({ items }: { items: DashboardItem[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <SectionHeader
        icon={<Pin className="size-4 text-primary" />}
        title="Pinned items"
        description="Your everyday essentials, one click away."
        count={items.length}
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <PinnedItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
