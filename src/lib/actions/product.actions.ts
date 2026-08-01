'use server';

import prisma from '../prisma';

export interface ProductFilters {
  category?: string | string[];
  brand?: string | string[];
  sort?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
}

export async function getAllProducts(filters?: ProductFilters) {
  try {
    const where: any = {};
    
    if (filters?.category) {
      const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
      where.category = { slug: { in: categories } };
    }
    
    if (filters?.brand) {
      const brands = Array.isArray(filters.brand) ? filters.brand : [filters.brand];
      where.brand = { slug: { in: brands } };
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    }

    if (filters?.inStock === 'true') {
      where.stock = { gt: 0 };
    }

    if (filters?.minPrice || filters?.maxPrice) {
      where.price = {};
      if (filters?.minPrice) where.price.gte = parseInt(filters.minPrice);
      if (filters?.maxPrice) where.price.lte = parseInt(filters.maxPrice);
    }

    let orderBy: any = undefined;
    if (filters?.sort === 'price_asc') orderBy = { price: 'asc' };
    else if (filters?.sort === 'price_desc') orderBy = { price: 'desc' };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        brand: true,
      }
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
      }
    });
    return product;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getProductsForPCBuilder() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
      }
    });
    
    // Transform to match PCBuilderComponent structure
    return products.map(p => {
      let firstImage = undefined;
      try {
        const parsedImages = JSON.parse(p.images);
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
          firstImage = parsedImages[0];
        }
      } catch (e) {
        // Fallback if parsing fails
      }

      return {
        id: p.id,
        name: p.name,
        type: p.attributes ? JSON.parse(p.attributes).type : p.category.name, // e.g. "CPU"
        price: p.price,
        specs: p.attributes ? JSON.parse(p.attributes) : {},
        image: firstImage,
      };
    });
  } catch (error) {
    console.error("Error fetching PC builder products:", error);
    return [];
  }
}
