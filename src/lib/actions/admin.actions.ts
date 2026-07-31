'use server';

import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';

// --- Dashboard Stats ---
export async function getDashboardStats() {
  const totalProducts = await prisma.product.count();
  const outOfStock = await prisma.product.count({ where: { stock: { lte: 0 } } });
  const pendingInquiries = await prisma.inquiry.count({ where: { status: 'PENDING' } });
  
  return {
    totalProducts,
    outOfStock,
    pendingInquiries,
  };
}

// --- Product Management ---
export async function getAdminProducts() {
  return await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const categoryId = formData.get('categoryId') as string;
    let brandId = formData.get('brandId') as string;
    const imageMode = formData.get('imageMode') as string;
    const customBrandName = formData.get('customBrandName') as string;

    if (customBrandName) {
      const customSlug = customBrandName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const newBrand = await prisma.brand.upsert({
        where: { slug: customSlug },
        update: {},
        create: { name: customBrandName, slug: customSlug }
      });
      brandId = newBrand.id;
    }
    
    let finalImageUrl = '';

    if (imageMode === 'url') {
      finalImageUrl = formData.get('imageUrl') as string;
    } else {
      const file = formData.get('imageFile') as File;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate a unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        // Ensure directory exists (we assume it does or we can write directly to public for now, let's just write to public/uploads, Nextjs allows this but requires restart sometimes if the dir didn't exist, we will use a try-catch for dir creation if needed, but for simplicity let's assume public/uploads exists or create it)
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        finalImageUrl = `/uploads/${filename}`;
      }
    }
    
    // PC Builder Attributes
    let type = formData.get('type') as string;
    const customType = formData.get('customType') as string;
    const customDescription = formData.get('customDescription') as string;
    
    if (type === 'Custom' && customType) {
      type = customType;
    }

    const socket = formData.get('socket') as string;
    const ddr = formData.get('ddr') as string;
    const wattage = formData.get('wattage') as string;

    const attributes: any = { type };
    if (socket) attributes.socket = socket;
    if (ddr) attributes.ddr = ddr;
    if (wattage) attributes.wattage = wattage;
    if (customDescription) attributes.customDescription = customDescription;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,
        brandId,
        images: JSON.stringify([finalImageUrl]),
        attributes: JSON.stringify(attributes)
      }
    });

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/build-pc');
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function editProduct(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const categoryId = formData.get('categoryId') as string;
    let brandId = formData.get('brandId') as string;
    const imageMode = formData.get('imageMode') as string;
    const existingImage = formData.get('existingImage') as string;
    const customBrandName = formData.get('customBrandName') as string;
    
    if (customBrandName) {
      const customSlug = customBrandName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const newBrand = await prisma.brand.upsert({
        where: { slug: customSlug },
        update: {},
        create: { name: customBrandName, slug: customSlug }
      });
      brandId = newBrand.id;
    }

    let finalImageUrl = existingImage;

    if (imageMode === 'url') {
      const url = formData.get('imageUrl') as string;
      if (url) finalImageUrl = url;
    } else {
      const file = formData.get('imageFile') as File;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        finalImageUrl = `/uploads/${filename}`;
      }
    }
    
    let type = formData.get('type') as string;
    const customType = formData.get('customType') as string;
    const customDescription = formData.get('customDescription') as string;
    
    if (type === 'Custom' && customType) {
      type = customType;
    }

    const socket = formData.get('socket') as string;
    const ddr = formData.get('ddr') as string;
    const wattage = formData.get('wattage') as string;

    const attributes: any = { type };
    if (socket) attributes.socket = socket;
    if (ddr) attributes.ddr = ddr;
    if (wattage) attributes.wattage = wattage;
    if (customDescription) attributes.customDescription = customDescription;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,
        brandId,
        images: JSON.stringify([finalImageUrl]),
        attributes: JSON.stringify(attributes)
      }
    });

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/build-pc');
    return { success: true };
  } catch (error) {
    console.error("Failed to edit product:", error);
    return { success: false, error: "Failed to edit product" };
  }
}

// --- Inquiry Management ---
export async function getAdminInquiries() {
  return await prisma.inquiry.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error) {
    console.error("Failed to update inquiry:", error);
    return { success: false };
  }
}
