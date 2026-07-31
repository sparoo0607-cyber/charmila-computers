import { getAllProducts } from '@/lib/actions/product.actions';
import { LayoutGrid, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductCardActions } from '@/components/products/ProductCardActions';
import { ProductGridCard } from '@/components/products/ProductGridCard';

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string | string[], brand?: string | string[], sort?: string, search?: string, minPrice?: string, maxPrice?: string, inStock?: string }>
}) {
  const searchParams = await props.searchParams;
  const products = await getAllProducts(searchParams);

  return (
    <div className="min-h-screen bg-[#080C14]">
      
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-[#1E2D45] py-12">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#2563EB] opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-[#475569] mb-4">
            <Link href="/" className="hover:text-[#00D4FF] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#94A3B8]">Products</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/30">
              <LayoutGrid className="h-5 w-5 text-[#2563EB]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">All Products</h1>
          </div>
          <p className="text-sm text-[#475569] ml-[52px]">Discover top-tier hardware for your next build.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Suspense fallback={<div className="h-96 bg-[#0F1624] rounded-2xl animate-pulse" />}>
            <ProductFilters />
          </Suspense>
        </div>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-[#475569]">
              Showing <span className="font-bold text-white">{products.length}</span> products
            </p>
            <ProductSort />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const images = JSON.parse(product.images || '[]');
              const compareProduct = {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: images[0] || '/images/placeholder.png',
                category: { name: product.category.name, slug: product.category.slug },
                brand: { name: product.brand?.name || 'Unknown' },
                attributes: product.attributes || '{}',
              };
              return (
                <ProductGridCard 
                  key={product.id} 
                  product={product} 
                  compareProduct={compareProduct} 
                />
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0F1624] border border-[#1E2D45] flex items-center justify-center">
                <SlidersHorizontal className="h-8 w-8 text-[#334155]" />
              </div>
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-sm text-[#475569]">Try adjusting your filters or search terms.</p>
              <Link href="/products" className="text-sm text-[#2563EB] hover:text-[#00D4FF] transition-colors font-semibold">
                Clear all filters →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
