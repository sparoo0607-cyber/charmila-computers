import { EditProductForm } from '@/components/admin/EditProductForm';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Edit3 } from 'lucide-react';
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
      <Link href="/admin/products" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#64748B] hover:text-[#00D4FF] mb-8 transition-colors group">
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
      </Link>
      
      <div className="mb-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <Edit3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">Edit Product</h1>
          <p className="text-[#64748B] text-sm">Update details for {product.name}.</p>
        </div>
      </div>

      <div className="bg-[#0A0F1A]/80 backdrop-blur-md border border-[#1E2D45] rounded-3xl shadow-[0_0_0_rgba(0,0,0,0)] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B] opacity-5 blur-3xl rounded-full pointer-events-none" />
        <EditProductForm product={product} categories={categories} brands={brands} />
      </div>
    </div>
  );
}
