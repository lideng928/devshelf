// Read-only check that the app's Prisma client can reach the database
// through DATABASE_URL. Run with: npm run db:test
import "dotenv/config";
import { prisma } from "../src/lib/prisma";

interface ServerInfo {
  database: string;
  version: string;
}

interface MigrationRow {
  migration_name: string;
  finished_at: Date | null;
}

function describeHost(url: string | undefined): string {
  if (!url) return "(DATABASE_URL is not set)";
  const { hostname } = new URL(url);
  return `${hostname} (${hostname.includes("-pooler.") ? "pooled" : "direct"})`;
}

async function main() {
  console.log(`Connecting to ${describeHost(process.env.DATABASE_URL)}...`);
  const started = Date.now();

  const [info] = await prisma.$queryRaw<ServerInfo[]>`
    SELECT current_database()::text AS database, version() AS version
  `;
  console.log(`✔ Connected in ${Date.now() - started}ms`);
  console.log(`  Database: ${info.database}`);
  console.log(`  Server:   ${info.version.split(",")[0]}`);

  const migrations = await prisma.$queryRaw<MigrationRow[]>`
    SELECT migration_name, finished_at FROM _prisma_migrations ORDER BY started_at
  `;
  console.log(`\nMigrations applied: ${migrations.length}`);
  for (const migration of migrations) {
    console.log(`  ${migration.finished_at ? "✔" : "✖"} ${migration.migration_name}`);
  }

  const [users, items, itemTypes, collections, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.itemType.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);
  console.log("\nRow counts:");
  console.table({ users, items, itemTypes, collections, tags });
}

main()
  .catch((error: unknown) => {
    console.error("✖ Database check failed:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
