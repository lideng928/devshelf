# Current Feature

Dashboard Collections (Database)

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Replace the mock collection data in the dashboard main area with real data from Neon via Prisma
- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in the server component
- Collection card border color derived from the most-used content type in that collection
- Show small icons of all types in that collection
- Keep the current design
- Update the collection stats display
- Do not change the items sections yet (pinned items, recent items); that comes later

## Notes

<!-- Any extra notes -->

- Spec: @context/features/dashboard-collections-spec.md
- Visual references: @context/screenshots/dashboard-ui-1.JPG, @context/screenshots/dashboard-ui-2.JPG
- Decisions:
  - Show 6 recent collections (spec), newest first
  - No auth yet: `src/lib/db/current-user.ts` returns the seeded demo user (demo@devshelf.io); swap for the session user later
  - Type colors and icons come from the `ItemType` row (`color`, `icon`); colors are applied through a `--type-color` CSS variable (`src/lib/type-color.ts`), the one place we set an inline style
  - Card border and gradient use the most-used type's color
  - Stats: Collections and Favorite collections come from the DB; Items and Favorite items stay on mock data until the items work

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
