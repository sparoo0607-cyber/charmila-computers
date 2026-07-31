import { getAllProducts } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import { Scale } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductCardActions } from '@/components/products/ProductCardActions';

export default async function ProductsPage(props: { searchParams: Promise<{ category?: string | string[], brand?: string | string[], sort?: string, search?: string, minPrice?: string, maxPrice?: string, inStock?: string }> }) {
  const searchParams = await props.searchParams;
  const products = await getAllProducts(searchParams);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-2">Shop Premium Components</h1>
          <p className="text-gray-400">Discover top-tier hardware for your next build.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500 font-medium">Showing <span className="font-bold text-gray-900">{products.length}</span> products</p>
            <ProductSort />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all group flex flex-col h-full">
                  
                  <Link href={`/products/${product.slug}`} className="h-48 w-full relative mb-4 p-4 bg-white block">
                    <Image 
                      src={images[0] || 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400'} 
                      alt={product.name} 
                      fill 
                      className="object-contain group-hover:scale-105 transition-transform duration-500" 
                    />
                  </Link>
                  
                  <div className="flex flex-col flex-1">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">{product.brand?.name}</p>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
                    </Link>
                    
                    <div className="flex items-end gap-2 mb-4 mt-auto">
                      <span className="text-xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <ProductCardActions product={compareProduct} />
                      
                      <Link href={`/products/${product.slug}`}>
                        <Button size="sm" className="bg-gray-900 hover:bg-blue-600 text-white rounded-full px-4 transition-colors">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
