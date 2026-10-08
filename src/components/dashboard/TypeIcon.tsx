import { cn } from "@/lib/utils";
import { ITEM_TYPE_ICONS } from "@/lib/item-types";
import { typeColorVar } from "@/lib/type-color";
import type { TypeSummary } from "@/types/dashboard";

const SIZE_CLASSES = {
  sm: "size-6 rounded-md [&>svg]:size-3.5",
  md: "size-8 rounded-lg [&>svg]:size-4",
  lg: "size-11 rounded-xl [&>svg]:size-5",
} as const;

interface TypeIconProps {
  type: TypeSummary;
  size?: keyof typeof SIZE_CLASSES;
}

export default function TypeIcon({ type, size = "md" }: TypeIconProps) {
  const Icon = ITEM_TYPE_ICONS[type.icon];

  return (
    <span
      title={type.name}
      style={typeColorVar(type.color)}
      className={cn(
        "flex shrink-0 items-center justify-center border border-(--type-color)/25 bg-(--type-color)/10 text-(--type-color)",
        SIZE_CLASSES[size],
      )}
    >
      {Icon && <Icon />}
    </span>
  );
}
