import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  // Get the first user in the database
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error('No users found! Please log in via the web interface first.');
    process.exit(1);
  }

  console.log(`Found user: ${user.name || user.email}`);

  // Create a dummy case
  const newCase = await prisma.case.create({
    data: {
      userId: user.id,
      title: 'Suspicious login attempt detected',
      description: 'Multiple failed login attempts followed by a successful login from an unknown IP address in a different country. User agent indicates a headless browser. Please investigate immediately.',
      source: 'splunk',
      severity: 'high',
      xpReward: 50,
      status: 'open',
    },
  });

  console.log('Successfully created test case:', newCase.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
