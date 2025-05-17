// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (!existing) {
    const hashed = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashed,
      },
    });
    console.log('Test user created!');
  } else {
    console.log('ℹUser already exists.');
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
