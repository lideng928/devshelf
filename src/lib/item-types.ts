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

// Soft background + border for icon tiles.
export const ITEM_TYPE_TILE_CLASSES: Record<string, string> = {
  snippet: "bg-blue-500/10 border-blue-500/25",
  prompt: "bg-violet-500/10 border-violet-500/25",
  note: "bg-amber-500/10 border-amber-500/25",
  command: "bg-emerald-500/10 border-emerald-500/25",
  file: "bg-slate-400/10 border-slate-400/25",
  image: "bg-rose-500/10 border-rose-500/25",
  url: "bg-cyan-500/10 border-cyan-500/25",
};

// Gradient start color for collection cards.
export const ITEM_TYPE_GRADIENT_CLASSES: Record<string, string> = {
  snippet: "from-blue-500/10",
  prompt: "from-violet-500/10",
  note: "from-amber-500/10",
  command: "from-emerald-500/10",
  file: "from-slate-400/10",
  image: "from-rose-500/10",
  url: "from-cyan-500/10",
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
