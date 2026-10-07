import { FolderPlus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <SidebarTrigger />

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items, collections..."
          className="pr-12 pl-8"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:block">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" aria-label="New Collection">
          <FolderPlus />
          <span className="hidden sm:inline">New Collection</span>
        </Button>
        <Button aria-label="New Item">
          <Plus />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </div>
    </header>
  );
}
