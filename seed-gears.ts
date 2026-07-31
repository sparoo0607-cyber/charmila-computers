import prisma from './src/lib/prisma';

async function main() {
  // Ensure 'peripherals' category exists
  let category = await prisma.category.findUnique({ where: { slug: 'peripherals' } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Peripherals',
        slug: 'peripherals',
        description: 'Gaming mice, keyboards, and audio.',
      }
    });
  }

  // Ensure brands exist
  const brandLogitech = await prisma.brand.upsert({
    where: { slug: 'logitech' },
    update: {},
    create: { name: 'Logitech', slug: 'logitech' }
  });
  
  const brandRazer = await prisma.brand.upsert({
    where: { slug: 'razer' },
    update: {},
    create: { name: 'Razer', slug: 'razer' }
  });

  const brandCorsair = await prisma.brand.upsert({
    where: { slug: 'corsair' },
    update: {},
    create: { name: 'Corsair', slug: 'corsair' }
  });

  // Seed Gears (Peripherals)
  const products = [
    {
      name: 'Logitech G Pro X Superlight',
      slug: 'logitech-g-pro-x-superlight',
      description: 'Ultra-lightweight wireless gaming mouse.',
      price: 12999,
      images: JSON.stringify(['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800']), // Generic mouse
      categoryId: category.id,
      brandId: brandLogitech.id,
      stock: 15,
      attributes: JSON.stringify({
        type: 'Mouse',
        dpi: '25600',
        weight: '63g',
        customDescription: 'Wireless Gaming Mouse'
      })
    },
    {
      name: 'Razer Huntsman V2',
      slug: 'razer-huntsman-v2',
      description: 'Optical gaming keyboard with near-zero latency.',
      price: 15999,
      images: JSON.stringify(['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800']), // Generic keyboard
      categoryId: category.id,
      brandId: brandRazer.id,
      stock: 10,
      attributes: JSON.stringify({
        type: 'Keyboard',
        switches: 'Optical Red',
        customDescription: 'Optical Gaming Keyboard'
      })
    },
    {
      name: 'Corsair HS80 RGB Wireless',
      slug: 'corsair-hs80-rgb-wireless',
      description: 'Premium wireless gaming headset with Dolby Atmos.',
      price: 13999,
      images: JSON.stringify(['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800']), // Generic headset
      categoryId: category.id,
      brandId: brandCorsair.id,
      stock: 25,
      attributes: JSON.stringify({
        type: 'Headset',
        connectivity: 'Wireless',
        audio: 'Dolby Atmos',
        customDescription: 'Wireless Gaming Headset'
      })
    },
    {
      name: 'Logitech G915 TKL',
      slug: 'logitech-g915-tkl',
      description: 'Tenkeyless lightspeed wireless RGB mechanical gaming keyboard.',
      price: 18999,
      images: JSON.stringify(['https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=800']), 
      categoryId: category.id,
      brandId: brandLogitech.id,
      stock: 8,
      attributes: JSON.stringify({
        type: 'Keyboard',
        switches: 'GL Tactile',
        customDescription: 'TKL Wireless Keyboard'
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

  console.log('Successfully seeded peripherals!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
