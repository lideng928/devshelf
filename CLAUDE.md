# DevShelf

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links, and custom types.

## Context files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config with `eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit` — type check

## Neon Database (MCP)

- **Project:** `devshelf` (`sweet-queen-37079194`)
- **Development branch:** `development` (`br-patient-night-b87uy7nb`) is the ONLY branch to use
- **Production branch:** `production` (`br-patient-dew-b8q5oamm`) is OFF LIMITS

Rules for every Neon MCP tool call:

- Always pass `branch_id: "br-patient-night-b87uy7nb"` explicitly. Never leave `branch_id` out: the default branch is production.
- Never read, query, write, migrate, reset, restore, or delete anything on the production branch, even when asked indirectly (e.g. "check the database"). Use development.
- If a task seems to need production, stop and ask first. Don't fall back to it on your own.
- Never change the default branch, and never delete or reset either branch.
- Before running a migration or destructive SQL (DELETE, DROP, TRUNCATE, UPDATE without a narrow WHERE) on development, show the statement and ask for confirmation.

These rules are enforced by a `PreToolUse` hook (`.claude/hooks/neon-guard.js`, registered in `.claude/settings.json`) that blocks Neon calls targeting production or missing the development `branch_id`. If the development branch is recreated, update `DEV_BRANCH_ID` in that script.





<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
