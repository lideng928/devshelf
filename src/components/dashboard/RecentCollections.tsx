import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import { typeColorVar } from "@/lib/type-color";
import type { DashboardCollection } from "@/types/dashboard";
import SectionHeader from "./SectionHeader";
import TypeIcon from "./TypeIcon";

const NEUTRAL_COLOR = "var(--color-foreground)";

function CollectionCard({ collection }: { collection: DashboardCollection }) {
  const { dominantType } = collection;

  return (
    <Link
      href={collection.href}
      style={typeColorVar(dominantType?.color ?? NEUTRAL_COLOR)}
      className="flex flex-col gap-3 rounded-xl border border-(--type-color)/30 bg-card bg-linear-to-br from-(--type-color)/10 to-transparent p-4 transition-colors hover:border-(--type-color)/60"
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
      {collections.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No collections yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </section>
  );
}
