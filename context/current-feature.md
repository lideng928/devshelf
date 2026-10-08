# Current Feature

Stats & Sidebar (Database)

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Display stats from the database, keeping the current design/layout (already done in the dashboard items feature)
- Display the system item types in the sidebar with their icons, linking to `/items/[typename]`
- Show the actual collection data from the database in the sidebar
- Add a "View all collections" link under the collections list that goes to `/collections`
- Favorite collections keep a star icon; recent collections show a colored circle based on the most-used item type in that collection
- Add the database functions to `src/lib/db/items.ts` (using `src/lib/db/collections.ts` for reference)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/stats-sidebar-spec.md
- All 4 main-area stats already come from the DB (`getItemStats`, `getCollectionStats`), so this feature only updates the sidebar
- Type colors and icons come from the `ItemType` row via the `--type-color` CSS variable; the demo user stands in until auth
- Decisions:
  - Type links use the type name as stored: `/items/snippet`, `/items/url`, ...; labels are the capitalized plural ("Snippets", "Urls")
  - System types are listed in the seed-spec order (ItemType has no ordering column), with the user's item count per type
  - Sidebar shows 5 recent collections; favorites are listed by name, and the group is hidden when there are none (the seed has no favorite collections)
  - The slug-keyed Tailwind color maps were removed; everything reads colors from the DB now
  - The sidebar user area and the greeting are still mock data (not in this spec)

## History

<!-- Keep this updated. Earliest to latest -->

- Initial Next.js setup (Create Next App)
- Project setup and boilerplate cleanup
- Mock data for dashboard UI
- Dashboard UI Phase 1 (shadcn setup, /dashboard layout, dark mode, top bar with search, New Collection and New Item buttons)
- Dashboard UI Phase 2 (collapsible sidebar with type links and counts, favorite and recent collections, user avatar area, sidebar toggle, mobile drawer)
- Dashboard UI Phase 3 (main area with 4 stats cards, pinned items, recent collections, and 10 recent items)
- Prisma + Neon PostgreSQL setup (Prisma 7 with Neon adapter, initial schema with NextAuth models, many-to-many ItemCollection join table, indexes and cascade deletes, init and item_collections migrations, db:test script)
- Seed sample data (prisma/seed.ts: demo user with bcrypt password, 7 system item types with random slugs and UI colors, 5 collections with 18 items; re-runnable via `npx prisma db seed`)
- Dashboard collections from the database (src/lib/db/collections.ts; 6 recent collections with border/tint from the most-used type's stored color and icons of all types; Collections and Favorite collections stats from the DB; demo user stands in until auth; items still on mock data)
- Dashboard items from the database (src/lib/db/items.ts; pinned items hidden when empty, 10 recent items, type-colored borders, type labels by name, item tags; all 4 stats from the DB; seed now has 2 pinned items, 1 favorite and tags on 2 items; sidebar and greeting still mock)
