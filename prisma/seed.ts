import prisma from '../src/lib/prisma';


async function main() {
  console.log('Clearing old data...');
  await prisma.inquiryItem.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding Categories...');
  const catCPU = await prisma.category.create({ data: { name: 'Processors', slug: 'processors', description: 'CPUs from Intel and AMD' } });
  const catMotherboard = await prisma.category.create({ data: { name: 'Motherboards', slug: 'motherboards', description: 'Motherboards for all sockets' } });
  const catGPU = await prisma.category.create({ data: { name: 'Graphics Cards', slug: 'graphics-cards', description: 'GPUs for gaming and rendering' } });
  const catRAM = await prisma.category.create({ data: { name: 'Memory', slug: 'memory', description: 'DDR4 and DDR5 RAM' } });
  const catStorage = await prisma.category.create({ data: { name: 'Storage', slug: 'storage', description: 'SSDs and HDDs' } });
  const catPSU = await prisma.category.create({ data: { name: 'Power Supplies', slug: 'power-supplies', description: 'PSUs' } });

  console.log('Seeding Brands...');
  const brandIntel = await prisma.brand.create({ data: { name: 'Intel', slug: 'intel' } });
  const brandAMD = await prisma.brand.create({ data: { name: 'AMD', slug: 'amd' } });
  const brandNvidia = await prisma.brand.create({ data: { name: 'NVIDIA', slug: 'nvidia' } });
  const brandAsus = await prisma.brand.create({ data: { name: 'ASUS', slug: 'asus' } });
  const brandCorsair = await prisma.brand.create({ data: { name: 'Corsair', slug: 'corsair' } });
  const brandSamsung = await prisma.brand.create({ data: { name: 'Samsung', slug: 'samsung' } });

  console.log('Seeding Products...');
  
  // CPUs
  await prisma.product.create({
    data: {
      name: 'Intel Core i9-14900K',
      slug: 'intel-core-i9-14900k',
      description: '24 cores (8 P-cores + 16 E-cores) and 32 threads.',
      price: 589,
      stock: 15,
      images: JSON.stringify(['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400']),
      categoryId: catCPU.id,
      brandId: brandIntel.id,
      attributes: JSON.stringify({ type: 'CPU', socket: 'LGA1700' })
    }
  });

  await prisma.product.create({
    data: {
      name: 'AMD Ryzen 9 7950X3D',
      slug: 'amd-ryzen-9-7950x3d',
      description: '16 cores and 32 threads, built with AMD 3D V-Cache technology.',
      price: 699,
      stock: 10,
      images: JSON.stringify(['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400']),
      categoryId: catCPU.id,
      brandId: brandAMD.id,
      attributes: JSON.stringify({ type: 'CPU', socket: 'AM5' })
    }
  });

  // Motherboards
  await prisma.product.create({
    data: {
      name: 'ASUS ROG Crosshair X670E Hero',
      slug: 'asus-rog-crosshair-x670e-hero',
      description: 'ATX motherboard with robust power delivery.',
      price: 499,
      stock: 5,
      images: JSON.stringify(['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400']),
      categoryId: catMotherboard.id,
      brandId: brandAsus.id,
      attributes: JSON.stringify({ type: 'Motherboard', socket: 'AM5' })
    }
  });

  await prisma.product.create({
    data: {
      name: 'ASUS ROG Maximus Z790 Hero',
      slug: 'asus-rog-maximus-z790-hero',
      description: 'ATX motherboard for Intel 13th/14th Gen processors.',
      price: 549,
      stock: 8,
      images: JSON.stringify(['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400']),
      categoryId: catMotherboard.id,
      brandId: brandAsus.id,
      attributes: JSON.stringify({ type: 'Motherboard', socket: 'LGA1700' })
    }
  });

  // GPUs
  await prisma.product.create({
    data: {
      name: 'NVIDIA GeForce RTX 4090 Founders Edition',
      slug: 'nvidia-geforce-rtx-4090',
      description: 'The ultimate GeForce GPU. It brings an enormous leap in performance.',
      price: 1599,
      stock: 2,
      images: JSON.stringify(['https://images.unsplash.com/photo-1675789182315-bd3511eb9fba?auto=format&fit=crop&q=80&w=400']),
      categoryId: catGPU.id,
      brandId: brandNvidia.id,
      attributes: JSON.stringify({ type: 'GPU' })
    }
  });

  // RAM
  await prisma.product.create({
    data: {
      name: 'Corsair Dominator Titanium 64GB (2x32GB) DDR5',
      slug: 'corsair-dominator-titanium-64gb-ddr5',
      description: 'Premium DDR5 memory with customizable RGB.',
      price: 310,
      stock: 20,
      images: JSON.stringify(['https://images.unsplash.com/photo-1541029071515-84cc54f84cb5?auto=format&fit=crop&q=80&w=400']),
      categoryId: catRAM.id,
      brandId: brandCorsair.id,
      attributes: JSON.stringify({ type: 'RAM', ddr: 'DDR5' })
    }
  });

  // Storage
  await prisma.product.create({
    data: {
      name: 'Samsung 990 PRO 2TB NVMe SSD',
      slug: 'samsung-990-pro-2tb',
      description: 'Blazing fast PCIe 4.0 NVMe storage.',
      price: 169,
      stock: 30,
      images: JSON.stringify(['https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&q=80&w=400']),
      categoryId: catStorage.id,
      brandId: brandSamsung.id,
      attributes: JSON.stringify({ type: 'SSD' })
    }
  });

  // PSU
  await prisma.product.create({
    data: {
      name: 'Corsair RM1000x 1000W',
      slug: 'corsair-rm1000x-1000w',
      description: 'Fully modular ATX power supply.',
      price: 189,
      stock: 12,
      images: JSON.stringify(['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400']),
      categoryId: catPSU.id,
      brandId: brandCorsair.id,
      attributes: JSON.stringify({ type: 'PSU', wattage: '1000W' })
    }
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
