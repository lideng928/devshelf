import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

// Keyed by the `icon` field on ItemType.
export const ITEM_TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
};

// Keyed by ItemType slug. Values match the hex colors in mock-data.ts.
export const ITEM_TYPE_TEXT_CLASSES: Record<string, string> = {
  snippet: "text-blue-500",
  prompt: "text-violet-500",
  note: "text-amber-500",
  command: "text-emerald-500",
  file: "text-slate-400",
  image: "text-rose-500",
  url: "text-cyan-500",
};

export const ITEM_TYPE_BG_CLASSES: Record<string, string> = {
  snippet: "bg-blue-500",
  prompt: "bg-violet-500",
  note: "bg-amber-500",
  command: "bg-emerald-500",
  file: "bg-slate-400",
  image: "bg-rose-500",
  url: "bg-cyan-500",
};
