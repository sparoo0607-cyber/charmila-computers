import prisma from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@charmilacomputers.com';
  const password = 'admin123';
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Successfully seeded admin user:', admin.email);
  console.log('Password:', password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
