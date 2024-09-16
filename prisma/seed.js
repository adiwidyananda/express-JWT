// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: password,
    },
  });

  // Create products for users
  await prisma.product.createMany({
    data: [
      { name: 'Product 1', price: 10.99, userId: user1.id },
      { name: 'Product 2', price: 19.99, userId: user1.id },
      { name: 'Product 3', price: 29.99, userId: user2.id },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());