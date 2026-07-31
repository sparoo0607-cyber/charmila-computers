import prisma from './src/lib/prisma';

async function main() {
  const categories = await prisma.category.findMany();
  console.log("Current Categories in DB:", categories.map(c => c.name));
  
  const requestedCategories = [
    { name: 'Processors', slug: 'processors', description: 'CPUs' },
    { name: 'Motherboards', slug: 'motherboards', description: 'Motherboards' },
    { name: 'Graphics Cards', slug: 'graphics-cards', description: 'GPUs' },
    { name: 'Memory', slug: 'memory', description: 'RAM' },
    { name: 'Storage', slug: 'storage', description: 'SSD & HDD' },
    { name: 'Power Supplies', slug: 'power-supplies', description: 'PSUs' },
    { name: 'Gears', slug: 'gears', description: 'Peripherals' },
    { name: 'Laptops', slug: 'laptops', description: 'Laptops' },
  ];

  for (const cat of requestedCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const updated = await prisma.category.findMany();
  console.log("Updated Categories in DB:", updated.map(c => c.name));
}

main().catch(console.error).finally(() => prisma.$disconnect());
