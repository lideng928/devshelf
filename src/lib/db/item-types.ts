import type { TypeSummary } from "@/types/dashboard";

const FALLBACK_TYPE_ICON = "File";
const FALLBACK_TYPE_COLOR = "#94a3b8";

// Prisma select for the ItemType fields the UI needs.
export const TYPE_SELECT = {
  id: true,
  name: true,
  slug: true,
  icon: true,
  color: true,
} as const;

export interface TypeRow {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
}

export function toTypeSummary(type: TypeRow): TypeSummary {
  return {
    slug: type.slug,
    name: type.name,
    icon: type.icon ?? FALLBACK_TYPE_ICON,
    color: type.color ?? FALLBACK_TYPE_COLOR,
  };
}
