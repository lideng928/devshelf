import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  description: string;
  count?: number;
}

export default function SectionHeader({ icon, title, description, count }: SectionHeaderProps) {
  return (
    <div className="mb-3">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
        {count !== undefined && (
          <span className="rounded-md bg-muted px-1.5 text-xs font-medium text-muted-foreground">
            {count}
          </span>
        )}
      </h2>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
