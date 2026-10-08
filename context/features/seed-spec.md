# Seed Data Specification

## Overview

Create a seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos.

## Requirements

### User

- **Email:** demo@devshelf.io
- **Name:** Demo User
- **Password:** 12345678 (hash with bcryptjs, 12 rounds)
- **isPro:** false
- **emailVerified:** current date

### System Item Types

| Name    | Icon       | Color   | Tailwind     |
| ------- | ---------- | ------- | ------------ |
| snippet | Code       | #3b82f6 | blue-500     |
| prompt  | Sparkles   | #8b5cf6 | violet-500   |
| command | Terminal   | #10b981 | emerald-500  |
| note    | StickyNote | #f59e0b | amber-500    |
| file    | File       | #94a3b8 | slate-400    |
| image   | Image      | #f43f5e | rose-500     |
| url     | Link       | #06b6d4 | cyan-500     |

Icons are Lucide React component names. All types have `isSystem: true`.

Colors match the current UI theme (the Tailwind palette values in the table). The UI reads each type's `color` and `icon` from the database. The URL type is named `url` to match the `Item.url` field in the schema.

Each type gets a random 6-character slug (lowercase letters and digits), since the schema requires a `slug`.

### Collections & Items

#### React Patterns

_Description: Reusable React patterns and hooks_

3 snippets (TypeScript):

- Custom hooks (useDebounce, useLocalStorage, etc.)
- Component patterns (Context providers, compound components)
- Utility functions

#### AI Workflows

_Description: AI prompts and workflow automations_

3 prompts:

- Code review prompts
- Documentation generation
- Refactoring assistance

#### DevOps

_Description: Infrastructure and deployment resources_

- 1 snippet (Docker, CI/CD config)
- 1 command (deployment scripts)
- 2 urls (documentation URLs - use real URLs)

#### Terminal Commands

_Description: Useful shell commands for everyday development_

4 commands:

- Git operations
- Docker commands
- Process management
- Package manager utilities

#### Design Resources

_Description: UI/UX resources and references_

4 urls (use real URLs):

- CSS/Tailwind references
- Component libraries
- Design systems
- Icon libraries

### Pinned, Favorite & Tags

- **Favorite collections:** React Patterns, AI Workflows
- **Pinned:** "useDebounce and useLocalStorage" (React Patterns), "Code review assistant" (AI Workflows)
- **Favorite:** "Undo the last commit, keep changes" (Terminal Commands)
- **Tags** (tag names are unique per user):
  - "useDebounce and useLocalStorage": react, hooks, typescript
  - "Next.js production Dockerfile": docker, nextjs, deployment
