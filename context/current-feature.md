# Current Feature

Dashboard Items (Database)

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Replace the mock item data in the dashboard main area with real data from Neon via Prisma, for both pinned items and recent items
- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in the server component
- Item card icon/border derived from the item type
- Display the item type tags and everything else currently on the cards
- Keep the current design
- If there are no pinned items, show nothing for that section
- Update the stats display: move the Items and Favorite items counts (still mock) to the DB

## Notes

<!-- Any extra notes -->

- Spec: @context/features/dashboard-items-spec.md
- Visual reference: @context/screenshots/dashboard-ui-1.JPG
- Follow the patterns from the dashboard collections feature: `src/lib/db/current-user.ts` for the demo user, and the type's stored `color`/`icon` via the `--type-color` CSS variable
- Decisions:
  - Seed updated first (see seed-spec.md): 2 pinned items, 1 favorite, and tags on 2 items; re-seeded the Neon dev branch (no schema change, so no migration)
  - Cards show both the type label and the item's own tags (`#react`, ...)
  - Type label and the monospace-preview rule (snippets/commands) use the type `name`, since DB slugs are random
  - Pinned cards: border and label in the type's color; recent item rows: left edge in the type's color
  - All 4 stats now come from the DB; the greeting and sidebar are still mock data

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
