const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatRelativeTime(isoDate: string, now: Date = new Date()): string {
  const diff = now.getTime() - new Date(isoDate).getTime();

  if (diff < MINUTE) return "Just now";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} min ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)} hr ago`;
  if (diff < 2 * DAY) return "Yesterday";
  if (diff < 30 * DAY) return `${Math.floor(diff / DAY)} days ago`;

  return new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
