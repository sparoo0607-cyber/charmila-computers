import { getProductBySlug, getAllProducts } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WhatsAppBuyButton } from '@/components/products/WhatsAppBuyButton';
import { CompareButton } from '@/components/products/CompareButton';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images = JSON.parse(product.images);
  const attributes = product.attributes ? JSON.parse(product.attributes) : {};

  const compareProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: images[0],
    category: { name: product.category.name, slug: product.category.slug },
    brand: { name: product.brand.name },
    attributes: product.attributes || '{}',
  };

  const allInCategory = await getAllProducts({ category: product.category.slug });
  const recommendations = allInCategory
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-blue-600">{product.category.name}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12">
          {/* Images */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[400px] lg:h-[500px] w-full bg-gray-50 rounded-2xl p-8 mb-4 border border-gray-100 flex items-center justify-center">
              <Image 
                src={images[0]} 
                alt={product.name} 
                fill 
                className="object-contain p-8 mix-blend-multiply" 
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img: string, i: number) => (
                  <button key={i} className={`w-20 h-20 relative bg-gray-50 rounded-xl border ${i === 0 ? 'border-blue-600' : 'border-gray-200'}`}>
                    <Image src={img} alt={`Thumb ${i}`} fill className="object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">{product.brand.name}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-6">
              <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Tech Specs Summary */}
            {Object.keys(attributes).length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Quick Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(attributes).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">{key}</span>
                      <span className="font-semibold text-gray-900">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto flex gap-4 pt-8 border-t border-gray-100">
              <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 text-lg font-bold shadow-lg shadow-blue-600/20">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <WhatsAppBuyButton 
                productName={product.name} 
                price={product.price}
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-14 text-lg font-bold shadow-lg shadow-green-600/20"
              />
              <CompareButton product={compareProduct} />
              <Button size="lg" variant="outline" className="w-14 h-14 rounded-xl border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 p-0 flex-shrink-0">
                <Heart className="h-6 w-6" />
              </Button>
            </div>

          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map(rec => {
                const recImages = JSON.parse(rec.images);
                return (
                  <Link href={`/products/${rec.slug}`} key={rec.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col h-full">
                    <div className="relative h-40 w-full mb-4 p-2 bg-gray-50 rounded-xl">
                      <Image 
                        src={recImages[0]} 
                        alt={rec.name} 
                        fill 
                        className="object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">{rec.brand?.name}</p>
                      <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{rec.name}</h3>
                      <div className="flex items-end gap-2 mt-auto">
                        <span className="text-lg font-black text-gray-900">₹{rec.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
