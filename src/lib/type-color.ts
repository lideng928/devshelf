import type { CSSProperties } from "react";

// Item type colors come from the database (ItemType.color), so they can't be
// Tailwind classes. Expose the color as a CSS variable and style with
// arbitrary-value classes such as `text-(--type-color)`.
export function typeColorVar(color: string): CSSProperties {
  return { "--type-color": color } as CSSProperties;
}
