# Current Feature

Prisma + Neon PostgreSQL Setup

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Set up Prisma ORM with Neon PostgreSQL (serverless)
- Create initial schema based on data models in @context/project-overview.md (this will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Items ↔ Collections many-to-many via an `ItemCollection` join table (added on request; replaces `Item.collectionId`)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/database-spec.md
- Use Prisma 7, which has breaking changes. Read the upgrade guide first: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup guide: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- `DATABASE_URL` points to the Neon development branch; there is a separate production branch
- ALWAYS create migrations (`prisma migrate dev`); never use `db push` unless specified
- `prisma.config.ts` uses the pooled `DATABASE_URL`; migrations work over the pooler (verified with the `item_collections` migration)
- `npm run db:test` (scripts/test-db.ts) checks the DB connection read-only
- Migrations: `init`, `item_collections`

## History

<!-- Keep this updated. Earliest to latest -->

- Initial Next.js setup (Create Next App)
- Project setup and boilerplate cleanup
- Mock data for dashboard UI
- Dashboard UI Phase 1 (shadcn setup, /dashboard layout, dark mode, top bar with search, New Collection and New Item buttons)
- Dashboard UI Phase 2 (collapsible sidebar with type links and counts, favorite and recent collections, user avatar area, sidebar toggle, mobile drawer)
- Dashboard UI Phase 3 (main area with 4 stats cards, pinned items, recent collections, and 10 recent items)
