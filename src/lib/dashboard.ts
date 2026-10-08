// Mock-data helpers for the parts of the dashboard not yet on the database:
// the sidebar user area and the greeting.
import { currentUser } from "@/lib/mock-data";
import type { SidebarUser } from "@/types/dashboard";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getSidebarUser(): SidebarUser {
  return {
    name: currentUser.name,
    email: currentUser.email,
    image: currentUser.image,
    initials: getInitials(currentUser.name),
  };
}

export function getGreetingName(): string {
  return currentUser.name.split(" ")[0];
}
