import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import { ITEM_TYPE_GRADIENT_CLASSES } from "@/lib/item-types";
import type { DashboardCollection } from "@/types/dashboard";
import SectionHeader from "./SectionHeader";
import TypeIcon from "./TypeIcon";

function CollectionCard({ collection }: { collection: DashboardCollection }) {
  const { dominantType } = collection;

  return (
    <Link
      href={collection.href}
      className={cn(
        "flex flex-col gap-3 rounded-xl bg-card bg-linear-to-br to-transparent p-4 ring-1 ring-foreground/10 transition-colors hover:ring-foreground/20",
        dominantType && ITEM_TYPE_GRADIENT_CLASSES[dominantType.slug],
      )}
    >
      <div className="flex items-start justify-between">
        {dominantType && <TypeIcon type={dominantType} size="lg" />}
        <Star
          className={cn(
            "size-4",
            collection.isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground",
          )}
          aria-label={collection.isFavorite ? "Favorite" : undefined}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{collection.name}</h3>
        {collection.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {collection.description}
          </p>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div className="flex gap-1">
          {collection.types.map((type) => (
            <TypeIcon key={type.slug} type={type} size="sm" />
          ))}
        </div>
        <div className="text-right">
          <p className="font-mono text-xs">{collection.itemCount} items</p>
          <p className="text-[11px] text-muted-foreground">
            {formatRelativeTime(collection.updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function RecentCollections({
  collections,
}: {
  collections: DashboardCollection[];
}) {
  return (
    <section>
      <SectionHeader
        title="Recent collections"
        description="Grouped by the type of content they mostly hold."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}
