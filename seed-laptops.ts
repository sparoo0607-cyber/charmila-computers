import prisma from './src/lib/prisma';

async function main() {
  // Ensure 'laptops' category exists
  let category = await prisma.category.findUnique({ where: { slug: 'laptops' } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Laptops',
        slug: 'laptops',
        description: 'High-performance gaming and productivity laptops.',
      }
    });
  }

  // Ensure brands exist
  const brandAsus = await prisma.brand.upsert({
    where: { slug: 'asus' },
    update: {},
    create: { name: 'ASUS', slug: 'asus' }
  });
  
  const brandLenovo = await prisma.brand.upsert({
    where: { slug: 'lenovo' },
    update: {},
    create: { name: 'Lenovo', slug: 'lenovo' }
  });

  const brandApple = await prisma.brand.upsert({
    where: { slug: 'apple' },
    update: {},
    create: { name: 'Apple', slug: 'apple' }
  });

  // Seed Laptops
  const products = [
    {
      name: 'ASUS ROG Strix G16 (2024)',
      slug: 'asus-rog-strix-g16-2024',
      description: '16-inch Gaming Laptop with RTX 4070 and Intel Core i9.',
      price: 189990,
      images: JSON.stringify(['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800']), // Generic laptop
      categoryId: category.id,
      brandId: brandAsus.id,
      stock: 5,
      attributes: JSON.stringify({
        type: 'Laptop',
        processor: 'Intel Core i9-13980HX',
        graphics: 'NVIDIA RTX 4070 8GB',
        ram: '16GB DDR5',
        storage: '1TB NVMe SSD',
        display: '16" QHD+ 240Hz',
        customDescription: 'ROG Gaming Laptop'
      })
    },
    {
      name: 'Lenovo Legion Pro 5i',
      slug: 'lenovo-legion-pro-5i',
      description: 'AI-Tuned Gaming Laptop with RTX 4060.',
      price: 145990,
      images: JSON.stringify(['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800']), // Generic laptop
      categoryId: category.id,
      brandId: brandLenovo.id,
      stock: 12,
      attributes: JSON.stringify({
        type: 'Laptop',
        processor: 'Intel Core i7-13700HX',
        graphics: 'NVIDIA RTX 4060 8GB',
        ram: '16GB DDR5',
        storage: '1TB NVMe SSD',
        display: '16" WQXGA 165Hz',
        customDescription: 'Legion Gaming Laptop'
      })
    },
    {
      name: 'Apple MacBook Pro 16" (M3 Max)',
      slug: 'apple-macbook-pro-16-m3-max',
      description: 'The ultimate pro laptop with M3 Max chip.',
      price: 349900,
      images: JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800']), // Generic macbook
      categoryId: category.id,
      brandId: brandApple.id,
      stock: 3,
      attributes: JSON.stringify({
        type: 'Laptop',
        processor: 'Apple M3 Max (16-core)',
        graphics: '40-core GPU',
        ram: '48GB Unified Memory',
        storage: '1TB SSD',
        display: '16.2" Liquid Retina XDR',
        customDescription: 'Premium Creator Laptop'
      })
    }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log('Successfully seeded laptops!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Wait a brief moment to ensure connections close cleanly
    await new Promise(resolve => setTimeout(resolve, 500));
  });
