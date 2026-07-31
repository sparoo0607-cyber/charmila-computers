import prisma from './src/lib/prisma';

async function main() {
  console.log('Adding missing categories...');

  const missingCategories = [
    { name: 'Cabinets', slug: 'cabinets', description: 'PC Cases and Chassis' },
    { name: 'Coolers', slug: 'coolers', description: 'CPU Coolers and AIOs' },
    { name: 'Case Fans', slug: 'case-fans', description: 'System Cooling Fans' },
  ];

  for (const cat of missingCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  console.log('Adding custom brand...');

  await prisma.brand.upsert({
    where: { slug: 'custom' },
    update: {},
    create: {
      name: 'Custom / Unbranded',
      slug: 'custom',
    }
  });

  console.log('Successfully seeded missing categories and custom brand!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
