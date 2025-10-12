import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function measureQuery(label: string, queryFn: () => Promise<void>) {
  const start = performance.now();
  await queryFn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(3)} ms`);
}

async function main() {
  console.log("Checking dummy data...");
  const count = await prisma.user.count();

  if (count < 50000) {
    console.log("Inserting 50,000 dummy users...");
    const batch = [];
    for (let i = count + 1; i <= 50000; i++) {
      batch.push({
        name: `User${i}`,
        email: `user${i}@example.com`,
        number: `99999${i}`,
        password: "password",
      });
      if (i % 5000 === 0 || i === 50000) {
        await prisma.user.createMany({ data: batch });
        console.log(`${i} users inserted...`);
        batch.length = 0;
      }
    }
  }

  // Drop index temporarily for true "no index" test
  console.log("Dropping index if exists...");
  await prisma.$executeRawUnsafe(`DROP INDEX IF EXISTS idx_user_email;`);

  console.log("Running query without index...");
  await measureQuery("Find by email (no index)", async () => {
    await prisma.user.findMany({
      where: { email: "user49999@example.com" },
    });
  });

  console.log("Creating index on email...");
  await prisma.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);`,
  );

  console.log("Running query with index...");
  await measureQuery("Find by email (with index)", async () => {
    await prisma.user.findMany({
      where: { email: "user49999@example.com" },
    });
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
