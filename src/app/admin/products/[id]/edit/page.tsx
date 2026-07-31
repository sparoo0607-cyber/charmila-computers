import { EditProductForm } from '@/components/admin/EditProductForm';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Edit Product</h1>
        <p className="text-gray-500">Update details for {product.name}.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <EditProductForm product={product} categories={categories} brands={brands} />
      </div>
    </div>
  );
}
