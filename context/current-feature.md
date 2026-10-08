# Current Feature

<!-- Feature Name -->

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

## Notes

<!-- Any extra notes -->

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
