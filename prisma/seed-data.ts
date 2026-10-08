// Sample data for prisma/seed.ts. See context/features/seed-spec.md.

export const DEMO_USER = {
  email: "demo@devshelf.io",
  name: "Demo User",
  password: "12345678",
};

export type SystemTypeName = "snippet" | "prompt" | "command" | "note" | "file" | "image" | "url";

export interface SeedItemType {
  name: SystemTypeName;
  icon: string;
  color: string;
}

// Colors are the UI theme's Tailwind palette values (see seed-spec.md). The UI
// reads them from the ItemType row.
export const SYSTEM_ITEM_TYPES: SeedItemType[] = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#10b981" },
  { name: "note", icon: "StickyNote", color: "#f59e0b" },
  { name: "file", icon: "File", color: "#94a3b8" },
  { name: "image", icon: "Image", color: "#f43f5e" },
  { name: "url", icon: "Link", color: "#06b6d4" },
];

export interface SeedItem {
  title: string;
  type: SystemTypeName;
  description?: string;
  content?: string;
  url?: string;
  language?: string;
  tags?: string[];
  isPinned?: boolean;
  isFavorite?: boolean;
}

export interface SeedCollection {
  name: string;
  description: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

const reactPatterns: SeedCollection = {
  name: "React Patterns",
  description: "Reusable React patterns and hooks",
  isFavorite: true,
  items: [
    {
      title: "useDebounce and useLocalStorage",
      type: "snippet",
      language: "typescript",
      tags: ["react", "hooks", "typescript"],
      isPinned: true,
      description: "Custom hooks for debounced values and persisted state.",
      content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    },
    {
      title: "Compound Tabs with context",
      type: "snippet",
      language: "typescript",
      description: "A context provider powering a compound component API.",
      content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === value} onClick={() => setActive(value)}>
      {children}
    </button>
  );
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === value ? <div>{children}</div> : null;
}`,
    },
    {
      title: "Everyday utility functions",
      type: "snippet",
      language: "typescript",
      description: "Small helpers for formatting, waiting, and grouping.",
      content: `export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return \`\${bytes.toFixed(1)} \${units[i]}\`;
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function groupBy<T, K extends PropertyKey>(list: T[], getKey: (item: T) => K) {
  return list.reduce(
    (groups, item) => {
      (groups[getKey(item)] ??= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}`,
    },
  ],
};

const aiWorkflows: SeedCollection = {
  name: "AI Workflows",
  description: "AI prompts and workflow automations",
  isFavorite: true,
  items: [
    {
      title: "Code review assistant",
      type: "prompt",
      isPinned: true,
      description: "Thoughtful, actionable reviews of a diff.",
      content: `You are a senior engineer reviewing a pull request.

Review the diff below for:
1. Correctness bugs and unhandled edge cases
2. Security issues (auth checks, input validation, injection)
3. Performance problems (N+1 queries, unnecessary re-renders)
4. Readability and consistency with the surrounding code

For each issue, quote the line, explain why it matters, and suggest a concrete fix.
Skip pure style nitpicks unless they hide a real bug.

<diff>
{{diff}}
</diff>`,
    },
    {
      title: "Documentation generator",
      type: "prompt",
      description: "Turn source code into clear developer docs.",
      content: `Write documentation for the code below for developers new to this codebase.

Include:
- A one-paragraph overview of what it does and when to use it
- Parameters and return values, with types
- One realistic usage example
- Edge cases, errors thrown, and side effects

Use Markdown. Keep it concise; do not restate the code line by line.

<code>
{{code}}
</code>`,
    },
    {
      title: "Refactoring assistant",
      type: "prompt",
      description: "Improve structure without changing behavior.",
      content: `Refactor the following code for clarity and maintainability.

Rules:
- Do not change its public API or observable behavior
- Prefer small, well-named functions over comments
- Remove duplication and dead code
- Keep the existing code style

Return the refactored code, then a bullet list of every change and why it is safe.

<code>
{{code}}
</code>`,
    },
  ],
};

const devOps: SeedCollection = {
  name: "DevOps",
  description: "Infrastructure and deployment resources",
  items: [
    {
      title: "Next.js production Dockerfile",
      type: "snippet",
      language: "dockerfile",
      tags: ["docker", "nextjs", "deployment"],
      description: "Multi-stage build using Next.js standalone output.",
      content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    {
      title: "Migrate and deploy to production",
      type: "command",
      language: "bash",
      description: "Apply pending migrations, then ship a production deploy.",
      content: "npx prisma migrate deploy && npx vercel deploy --prod",
    },
    {
      title: "Docker documentation",
      type: "url",
      description: "Official guides and reference for Docker.",
      url: "https://docs.docker.com/",
    },
    {
      title: "GitHub Actions documentation",
      type: "url",
      description: "Workflows, runners, and CI/CD reference.",
      url: "https://docs.github.com/en/actions",
    },
  ],
};

const terminalCommands: SeedCollection = {
  name: "Terminal Commands",
  description: "Useful shell commands for everyday development",
  items: [
    {
      title: "Undo the last commit, keep changes",
      type: "command",
      language: "bash",
      isFavorite: true,
      description: "Moves HEAD back one commit and leaves the changes staged.",
      content: "git reset --soft HEAD~1",
    },
    {
      title: "Clean up Docker disk usage",
      type: "command",
      language: "bash",
      description: "Removes stopped containers, unused images, networks, and volumes.",
      content: "docker system prune -af --volumes",
    },
    {
      title: "Kill the process on a port",
      type: "command",
      language: "bash",
      description: "Frees a port held by a stuck dev server.",
      content: "lsof -ti tcp:3000 | xargs kill -9",
    },
    {
      title: "Interactively update dependencies",
      type: "command",
      language: "bash",
      description: "Pick which outdated packages to upgrade.",
      content: "npx npm-check-updates --interactive",
    },
  ],
};

const designResources: SeedCollection = {
  name: "Design Resources",
  description: "UI/UX resources and references",
  items: [
    {
      title: "Tailwind CSS documentation",
      type: "url",
      description: "Utility classes, theming, and v4 configuration.",
      url: "https://tailwindcss.com/docs",
    },
    {
      title: "shadcn/ui",
      type: "url",
      description: "Copy-paste components built on accessible primitives.",
      url: "https://ui.shadcn.com",
    },
    {
      title: "Material Design 3",
      type: "url",
      description: "Google's design system: foundations, styles, and components.",
      url: "https://m3.material.io",
    },
    {
      title: "Lucide icons",
      type: "url",
      description: "Open-source icon library used across DevShelf.",
      url: "https://lucide.dev/icons",
    },
  ],
};

export const SEED_COLLECTIONS: SeedCollection[] = [
  reactPatterns,
  aiWorkflows,
  devOps,
  terminalCommands,
  designResources,
];
