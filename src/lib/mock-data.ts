// Temporary single source of truth for UI development.
// Shapes mirror the Prisma draft in context/project-overview.md so the
// swap to real database queries later is mostly mechanical.

export type ContentType = "text" | "file";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ItemType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isSystem: boolean;
  userId: string | null;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  title: string;
  contentType: ContentType;
  content: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  url: string | null;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  language: string | null;
  tags: string[];
  userId: string;
  typeId: string;
  collectionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: User = {
  id: "user_1",
  name: "Alex Kim",
  email: "alex@devshelf.dev",
  image: null,
  isPro: true,
  createdAt: "2026-01-12T09:00:00.000Z",
  updatedAt: "2026-10-07T08:00:00.000Z",
};

// `icon` values are lucide-react icon names.
export const itemTypes: ItemType[] = [
  { id: "type_snippet", name: "Snippets", slug: "snippet", icon: "Code", color: "#3b82f6", isSystem: true, userId: null },
  { id: "type_prompt", name: "Prompts", slug: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true, userId: null },
  { id: "type_note", name: "Notes", slug: "note", icon: "StickyNote", color: "#f59e0b", isSystem: true, userId: null },
  { id: "type_command", name: "Commands", slug: "command", icon: "Terminal", color: "#10b981", isSystem: true, userId: null },
  { id: "type_file", name: "Files", slug: "file", icon: "File", color: "#94a3b8", isSystem: true, userId: null },
  { id: "type_image", name: "Images", slug: "image", icon: "Image", color: "#f43f5e", isSystem: true, userId: null },
  { id: "type_url", name: "Links", slug: "url", icon: "Link", color: "#06b6d4", isSystem: true, userId: null },
];

export const collections: Collection[] = [
  {
    id: "col_react_hooks",
    name: "React Hooks",
    description: "Custom hooks for state, effects, and data fetching patterns.",
    isFavorite: true,
    userId: "user_1",
    createdAt: "2026-03-02T10:00:00.000Z",
    updatedAt: "2026-10-07T07:48:00.000Z",
  },
  {
    id: "col_system_prompts",
    name: "System Prompts",
    description: "Reusable agent personas and code review instructions.",
    isFavorite: true,
    userId: "user_1",
    createdAt: "2026-04-15T10:00:00.000Z",
    updatedAt: "2026-10-07T07:00:00.000Z",
  },
  {
    id: "col_git_workflows",
    name: "Git Workflows",
    description: "Rebasing, bisecting, and cleaning up messy branches.",
    isFavorite: false,
    userId: "user_1",
    createdAt: "2026-02-20T10:00:00.000Z",
    updatedAt: "2026-10-07T05:00:00.000Z",
  },
  {
    id: "col_architecture_notes",
    name: "Architecture Notes",
    description: "ADRs, trade-offs, and design decisions for the platform.",
    isFavorite: true,
    userId: "user_1",
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-10-06T16:00:00.000Z",
  },
  {
    id: "col_docker_k8s",
    name: "Docker & K8s",
    description: "Compose files, kubectl one-liners, and Helm notes.",
    isFavorite: false,
    userId: "user_1",
    createdAt: "2026-06-10T10:00:00.000Z",
    updatedAt: "2026-10-05T12:00:00.000Z",
  },
  {
    id: "col_ui_references",
    name: "UI References",
    description: "Screenshots and inspiration for interface design.",
    isFavorite: false,
    userId: "user_1",
    createdAt: "2026-07-08T10:00:00.000Z",
    updatedAt: "2026-10-03T12:00:00.000Z",
  },
  {
    id: "col_config_files",
    name: "Config Files",
    description: "tsconfig, eslint, prettier, and CI templates.",
    isFavorite: true,
    userId: "user_1",
    createdAt: "2026-08-01T10:00:00.000Z",
    updatedAt: "2026-10-01T12:00:00.000Z",
  },
  {
    id: "col_reading_list",
    name: "Reading List",
    description: "Articles, RFCs, and talks worth revisiting.",
    isFavorite: false,
    userId: "user_1",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-30T12:00:00.000Z",
  },
];

const itemDefaults = {
  contentType: "text" as const,
  content: null,
  fileUrl: null,
  fileName: null,
  fileSize: null,
  url: null,
  description: null,
  isFavorite: false,
  isPinned: false,
  language: null,
  userId: "user_1",
};

export const items: Item[] = [
  {
    ...itemDefaults,
    id: "item_use_debounce",
    title: "useDebounce",
    description: "Delay updating a value until input settles.",
    content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// const query = useDebounce(value, 300)`,
    language: "typescript",
    isPinned: true,
    isFavorite: true,
    tags: ["react", "hooks", "performance"],
    typeId: "type_snippet",
    collectionId: "col_react_hooks",
    createdAt: "2026-03-02T10:30:00.000Z",
    updatedAt: "2026-10-07T07:48:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_use_local_storage",
    title: "useLocalStorage",
    description: "useState that persists to localStorage.",
    content: `export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    language: "typescript",
    tags: ["react", "hooks", "storage"],
    typeId: "type_snippet",
    collectionId: "col_react_hooks",
    createdAt: "2026-03-10T10:00:00.000Z",
    updatedAt: "2026-09-28T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_react_hooks_rules",
    title: "Rules of Hooks cheatsheet",
    content: "- Only call hooks at the top level\n- Only call hooks from React functions\n- Custom hooks must start with `use`",
    tags: ["react", "hooks"],
    typeId: "type_note",
    collectionId: "col_react_hooks",
    createdAt: "2026-03-12T10:00:00.000Z",
    updatedAt: "2026-09-20T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_react_docs_link",
    title: "React docs: Reusing logic with custom hooks",
    url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
    tags: ["react", "docs"],
    typeId: "type_url",
    collectionId: "col_react_hooks",
    createdAt: "2026-03-15T10:00:00.000Z",
    updatedAt: "2026-09-15T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_code_review_prompt",
    title: "Code review assistant",
    description: "A second pair of eyes for thoughtful, actionable code reviews.",
    content:
      "You are a senior engineer reviewing a pull request. Focus on correctness, security, and readability. For each issue, explain why it matters and suggest a concrete fix. Skip nitpicks unless they hide a real bug.",
    isPinned: true,
    isFavorite: true,
    tags: ["ai", "code-review"],
    typeId: "type_prompt",
    collectionId: "col_system_prompts",
    createdAt: "2026-04-15T10:30:00.000Z",
    updatedAt: "2026-10-07T07:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_refactor_prompt",
    title: "Refactor without changing behavior",
    content:
      "Refactor the following code for clarity. Do not change its public API or observable behavior. List every change you made and why.",
    tags: ["ai", "refactoring"],
    typeId: "type_prompt",
    collectionId: "col_system_prompts",
    createdAt: "2026-05-02T10:00:00.000Z",
    updatedAt: "2026-09-25T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_prompt_guidelines",
    title: "Prompt writing guidelines",
    content: "1. State the role\n2. Give context\n3. Define the output format\n4. Provide an example",
    tags: ["ai", "writing"],
    typeId: "type_note",
    collectionId: "col_system_prompts",
    createdAt: "2026-05-10T10:00:00.000Z",
    updatedAt: "2026-09-18T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_git_log",
    title: "A better Git log",
    content: "git log --graph --oneline --decorate --all",
    language: "bash",
    isPinned: true,
    tags: ["git", "cli"],
    typeId: "type_command",
    collectionId: "col_git_workflows",
    createdAt: "2026-02-20T10:30:00.000Z",
    updatedAt: "2026-10-07T05:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_git_rebase",
    title: "Interactive rebase last N commits",
    content: "git rebase -i HEAD~5",
    language: "bash",
    tags: ["git", "cli"],
    typeId: "type_command",
    collectionId: "col_git_workflows",
    createdAt: "2026-02-22T10:00:00.000Z",
    updatedAt: "2026-09-10T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_git_bisect",
    title: "Bisecting a regression",
    content: "1. `git bisect start`\n2. `git bisect bad`\n3. `git bisect good <sha>`\n4. Test, mark, repeat\n5. `git bisect reset`",
    tags: ["git", "debugging"],
    typeId: "type_note",
    collectionId: "col_git_workflows",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-09-05T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_api_conventions",
    title: "API conventions",
    description: "The small decisions that keep our endpoints consistent.",
    content:
      "- Plural resource names (`/items`, `/collections`)\n- camelCase JSON fields\n- Return `{ success, data, error }`\n- ISO 8601 timestamps",
    isPinned: true,
    tags: ["api", "architecture"],
    typeId: "type_note",
    collectionId: "col_architecture_notes",
    createdAt: "2026-05-01T10:30:00.000Z",
    updatedAt: "2026-10-06T16:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_architecture_diagram",
    title: "System architecture diagram",
    contentType: "file",
    fileUrl: "/mock/architecture-diagram.png",
    fileName: "architecture-diagram.png",
    fileSize: 284_000,
    tags: ["architecture", "diagram"],
    typeId: "type_image",
    collectionId: "col_architecture_notes",
    createdAt: "2026-05-05T10:00:00.000Z",
    updatedAt: "2026-09-12T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_adr_link",
    title: "ADR templates on GitHub",
    url: "https://github.com/joelparkerhenderson/architecture-decision-record",
    tags: ["architecture", "adr"],
    typeId: "type_url",
    collectionId: "col_architecture_notes",
    createdAt: "2026-05-08T10:00:00.000Z",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_docker_prune",
    title: "Clean up Docker disk usage",
    content: "docker system prune -af --volumes",
    language: "bash",
    tags: ["docker", "cli"],
    typeId: "type_command",
    collectionId: "col_docker_k8s",
    createdAt: "2026-06-10T10:30:00.000Z",
    updatedAt: "2026-10-05T12:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_kubectl_logs",
    title: "Tail logs for a deployment",
    content: "kubectl logs -f deployment/<name> --all-containers",
    language: "bash",
    tags: ["kubernetes", "cli"],
    typeId: "type_command",
    collectionId: "col_docker_k8s",
    createdAt: "2026-06-12T10:00:00.000Z",
    updatedAt: "2026-09-22T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_dashboard_inspo",
    title: "Linear dashboard inspiration",
    contentType: "file",
    fileUrl: "/mock/linear-dashboard.png",
    fileName: "linear-dashboard.png",
    fileSize: 512_000,
    isFavorite: true,
    tags: ["ui", "inspiration"],
    typeId: "type_image",
    collectionId: "col_ui_references",
    createdAt: "2026-07-08T10:30:00.000Z",
    updatedAt: "2026-10-03T12:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_tsconfig",
    title: "Strict tsconfig.json",
    contentType: "file",
    fileUrl: "/mock/tsconfig.json",
    fileName: "tsconfig.json",
    fileSize: 1_200,
    tags: ["typescript", "config"],
    typeId: "type_file",
    collectionId: "col_config_files",
    createdAt: "2026-08-01T10:30:00.000Z",
    updatedAt: "2026-10-01T12:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_ci_workflow",
    title: "GitHub Actions CI template",
    contentType: "file",
    fileUrl: "/mock/ci.yml",
    fileName: "ci.yml",
    fileSize: 2_400,
    tags: ["ci", "github-actions"],
    typeId: "type_file",
    collectionId: "col_config_files",
    createdAt: "2026-08-05T10:00:00.000Z",
    updatedAt: "2026-09-08T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_server_components_article",
    title: "Making sense of React Server Components",
    url: "https://www.joshwcomeau.com/react/server-components/",
    tags: ["react", "rsc", "article"],
    typeId: "type_url",
    collectionId: "col_reading_list",
    createdAt: "2026-09-01T10:30:00.000Z",
    updatedAt: "2026-09-30T12:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_http_semantics_rfc",
    title: "RFC 9110: HTTP Semantics",
    url: "https://www.rfc-editor.org/rfc/rfc9110",
    tags: ["http", "rfc"],
    typeId: "type_url",
    collectionId: "col_reading_list",
    createdAt: "2026-09-03T10:00:00.000Z",
    updatedAt: "2026-09-20T10:00:00.000Z",
  },
  {
    ...itemDefaults,
    id: "item_unsorted_snippet",
    title: "Format bytes as human-readable",
    content: `export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return \`\${bytes.toFixed(1)} \${units[i]}\`;
}`,
    language: "typescript",
    tags: ["utils"],
    typeId: "type_snippet",
    collectionId: null,
    createdAt: "2026-09-15T10:00:00.000Z",
    updatedAt: "2026-09-15T10:00:00.000Z",
  },
];
