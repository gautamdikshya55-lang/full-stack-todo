const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log(" Seeding database...");

  // Delete old data
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const password = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      password: password
    }
  });

  console.log("User created:", user.email);

  // Add sample todos
  await prisma.todo.createMany({
    data: [
      { text: "Learn Node.js", userId: user.id },
      { text: "Learn Prisma ORM", userId: user.id },
      { text: "Build a Todo API", userId: user.id }
    ]
  });

  console.log(" Todos seeded!");
}

main()
  .then(() => {
    console.log("Seeding complete.");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
