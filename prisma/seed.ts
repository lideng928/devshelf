// Populates the development database with demo data.
// Run with: npx prisma db seed
// Safe to re-run: the demo user's collections, items and tags are recreated each time.
import "dotenv/config";
import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import {
  DEMO_USER,
  SEED_COLLECTIONS,
  SYSTEM_ITEM_TYPES,
  type SeedCollection,
  type SystemTypeName,
} from "./seed-data";

const BCRYPT_ROUNDS = 12;
const SLUG_LENGTH = 6;
const SLUG_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomSlug(): string {
  let slug = "";
  for (let i = 0; i < SLUG_LENGTH; i++) {
    slug += SLUG_CHARS[randomInt(SLUG_CHARS.length)];
  }
  return slug;
}

async function seedDemoUser() {
  const password = await bcrypt.hash(DEMO_USER.password, BCRYPT_ROUNDS);
  const fields = {
    name: DEMO_USER.name,
    password,
    isPro: false,
    emailVerified: new Date(),
  };

  return prisma.user.upsert({
    where: { email: DEMO_USER.email },
    create: { email: DEMO_USER.email, ...fields },
    update: fields,
  });
}

// System types have no owner, so they are matched by name. Existing types
// keep their slug; new ones get a random one.
async function seedSystemTypes(): Promise<Map<SystemTypeName, string>> {
  const typeIds = new Map<SystemTypeName, string>();

  for (const { name, icon, color } of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { name, isSystem: true, userId: null },
    });

    const type = existing
      ? await prisma.itemType.update({ where: { id: existing.id }, data: { icon, color } })
      : await prisma.itemType.create({
          data: { name, icon, color, slug: randomSlug(), isSystem: true },
        });

    typeIds.set(name, type.id);
  }

  return typeIds;
}

function getTypeId(typeIds: Map<SystemTypeName, string>, name: SystemTypeName): string {
  const id = typeIds.get(name);
  if (!id) throw new Error(`Unknown item type: ${name}`);
  return id;
}

// Tag names are unique per user, so reuse the tag if another item created it.
function toTagLink(name: string, userId: string) {
  return {
    tag: {
      connectOrCreate: {
        where: { userId_name: { userId, name } },
        create: { name, user: { connect: { id: userId } } },
      },
    },
  };
}

async function seedCollection(
  collection: SeedCollection,
  userId: string,
  typeIds: Map<SystemTypeName, string>,
) {
  return prisma.collection.create({
    data: {
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite ?? false,
      user: { connect: { id: userId } },
      items: {
        create: collection.items.map(({ type, tags = [], ...item }) => ({
          item: {
            create: {
              ...item,
              contentType: "text",
              user: { connect: { id: userId } },
              type: { connect: { id: getTypeId(typeIds, type) } },
              tags: { create: tags.map((name) => toTagLink(name, userId)) },
            },
          },
        })),
      },
    },
  });
}

async function main() {
  const user = await seedDemoUser();
  console.log(`✔ User: ${user.email}`);

  const typeIds = await seedSystemTypes();
  console.log(`✔ System item types: ${typeIds.size}`);

  // Deleting items, collections and tags also removes their ItemCollection
  // and ItemTag links.
  await prisma.$transaction([
    prisma.item.deleteMany({ where: { userId: user.id } }),
    prisma.collection.deleteMany({ where: { userId: user.id } }),
    prisma.tag.deleteMany({ where: { userId: user.id } }),
  ]);

  for (const collection of SEED_COLLECTIONS) {
    await seedCollection(collection, user.id, typeIds);
    console.log(`✔ Collection: ${collection.name} (${collection.items.length} items)`);
  }
}

main()
  .catch((error: unknown) => {
    console.error("✖ Seeding failed:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
