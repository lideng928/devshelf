import { Clock, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import type { DashboardItem } from "@/types/dashboard";
import SectionHeader from "./SectionHeader";
import TypeIcon from "./TypeIcon";

export default function RecentItems({ items }: { items: DashboardItem[] }) {
  return (
    <section>
      <SectionHeader
        icon={<Clock className="size-4 text-muted-foreground" />}
        title="Recent items"
        description="The last things you touched."
      />
      <Card className="gap-0 py-0">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              <TypeIcon type={item.type} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate font-medium">
                  {item.title}
                  {item.isPinned && <Pin className="size-3 shrink-0 text-primary" />}
                </p>
                {item.preview && (
                  <p
                    className={cn(
                      "truncate text-xs text-muted-foreground",
                      item.isCode && "font-mono",
                    )}
                  >
                    {item.preview}
                  </p>
                )}
              </div>
              <div className="hidden shrink-0 text-right text-xs sm:block">
                <p className="text-muted-foreground">{item.collectionName ?? "Unsorted"}</p>
                <p className="text-[11px] text-muted-foreground/70">
                  {formatRelativeTime(item.updatedAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
