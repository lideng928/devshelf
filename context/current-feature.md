# Current Feature

Seed Sample Data

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Create a seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos
- Demo user: demo@devshelf.io, "Demo User", password `12345678` hashed with bcryptjs (12 rounds), `isPro: false`, `emailVerified` = current date
- 7 system item types (`isSystem: true`, Lucide icon names, current UI colors):
  - snippet (Code, #3b82f6)
  - prompt (Sparkles, #8b5cf6)
  - command (Terminal, #10b981)
  - note (StickyNote, #f59e0b)
  - file (File, #94a3b8)
  - image (Image, #f43f5e)
  - url (Link, #06b6d4)
- 5 collections with items:
  - **React Patterns** (Reusable React patterns and hooks): 3 TypeScript snippets (custom hooks, component patterns, utility functions)
  - **AI Workflows** (AI prompts and workflow automations): 3 prompts (code review, documentation generation, refactoring assistance)
  - **DevOps** (Infrastructure and deployment resources): 1 snippet (Docker/CI-CD config), 1 command (deployment script), 2 urls (real documentation URLs)
  - **Terminal Commands** (Useful shell commands for everyday development): 4 commands (Git, Docker, process management, package manager utilities)
  - **Design Resources** (UI/UX resources and references): 4 urls (real URLs: CSS/Tailwind references, component libraries, design systems, icon libraries)

## Notes

<!-- Any extra notes -->

- Spec: @context/features/seed-spec.md
- Prisma 7 no longer seeds automatically: configure `migrations.seed` in `prisma.config.ts` and run `npx prisma db seed` explicitly
- Seed only the development branch (`DATABASE_URL`)
- Decisions (spec updated to match):
  - `ItemType.slug` is a random 6-character string (lowercase letters + digits); existing system types keep their slug on re-seed
  - The URL type is named `url`, following the schema's `Item.url` field
  - Type colors follow the current UI theme (`src/lib/item-types.ts`)
- Seed script: `prisma/seed.ts` (logic) + `prisma/seed-data.ts` (content); configured in `prisma.config.ts` as `tsx prisma/seed.ts`
- Re-running is safe: the demo user is upserted, system types are matched by name, and the demo user's collections and items are recreated
- Heads-up for wiring the UI to the DB: `src/lib/item-types.ts` keys colors/icons by slug; with random slugs, look them up by type `name` (or use the stored `icon`/`color`) instead

## History

<!-- Keep this updated. Earliest to latest -->

- Initial Next.js setup (Create Next App)
- Project setup and boilerplate cleanup
- Mock data for dashboard UI
- Dashboard UI Phase 1 (shadcn setup, /dashboard layout, dark mode, top bar with search, New Collection and New Item buttons)
- Dashboard UI Phase 2 (collapsible sidebar with type links and counts, favorite and recent collections, user avatar area, sidebar toggle, mobile drawer)
- Dashboard UI Phase 3 (main area with 4 stats cards, pinned items, recent collections, and 10 recent items)
- Prisma + Neon PostgreSQL setup (Prisma 7 with Neon adapter, initial schema with NextAuth models, many-to-many ItemCollection join table, indexes and cascade deletes, init and item_collections migrations, db:test script)
