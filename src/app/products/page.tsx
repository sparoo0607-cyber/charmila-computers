import { getAllProducts } from '@/lib/actions/product.actions';
import { LayoutGrid, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductCardActions } from '@/components/products/ProductCardActions';

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => {
              const images = JSON.parse(product.images);
              const compareProduct = {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: images[0],
                category: { name: product.category.name, slug: product.category.slug },
                brand: { name: product.brand?.name || 'Unknown' },
                attributes: product.attributes || '{}',
              };
              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-4 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2563EB]/50 hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] overflow-hidden"
                >
                  {/* Hover glow line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Product Image */}
                  <Link href={`/products/${product.slug}`} className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-[#080C14] flex items-center justify-center">
                    <Image
                      src={images[0] || '/images/placeholder.png'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex flex-col flex-1">
                    <p className="text-[10px] font-black text-[#2563EB] tracking-[0.2em] uppercase mb-1">{product.brand?.name}</p>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-sm text-[#94A3B8] mb-3 line-clamp-2 hover:text-white transition-colors leading-snug">{product.name}</h3>
                    </Link>

                    <div className="mt-auto">
                      <span className="text-xl font-black text-white tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1E2D45]">
                      <ProductCardActions product={compareProduct} />
                      <Link href={`/products/${product.slug}`}>
                        <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all hover:shadow-[0_0_12px_rgba(37,99,235,0.4)] active:scale-95">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
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
