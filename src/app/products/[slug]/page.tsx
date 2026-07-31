import { getProductBySlug, getAllProducts } from '@/lib/actions/product.actions';
import { ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WhatsAppBuyButton } from '@/components/products/WhatsAppBuyButton';
import { CompareButton } from '@/components/products/CompareButton';
import { ProductGridCard } from '@/components/products/ProductGridCard';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

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
  const recommendations = allInCategory.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#080C14]">
      <div className="container mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#475569] mb-8">
          <Link href="/" className="hover:text-[#00D4FF] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-[#00D4FF] transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-[#00D4FF] transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#94A3B8] truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Card */}
        <div className="rounded-2xl border border-[#1E2D45] bg-[#0F1624] overflow-hidden flex flex-col lg:flex-row">

          {/* Image Panel */}
          <div className="w-full lg:w-1/2 p-6 lg:p-10 bg-[#080C14] border-b lg:border-b-0 lg:border-r border-[#1E2D45] flex flex-col gap-4">
            <div className="relative h-[360px] lg:h-[480px] w-full rounded-2xl overflow-hidden flex items-center justify-center bg-[#0A0E1A] border border-[#1E2D45]">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8 drop-shadow-[0_8px_32px_rgba(37,99,235,0.25)]"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: string, i: number) => (
                  <button key={i} className={`relative w-18 h-18 rounded-xl border overflow-hidden bg-[#080C14] ${i === 0 ? 'border-[#2563EB]' : 'border-[#1E2D45]'}`} style={{ width: 72, height: 72 }}>
                    <Image src={img} alt={`Thumb ${i}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-[#2563EB] tracking-[0.25em] uppercase">{product.brand.name}</span>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                product.stock > 0
                  ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                  : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}>
                {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-5">{product.name}</h1>

            <div className="mb-6">
              <span className="text-4xl font-black text-white tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-sm text-[#64748B] leading-relaxed mb-8">{product.description}</p>

            {/* Quick Specs */}
            {Object.keys(attributes).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-4">Quick Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(attributes).map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-[#080C14] border border-[#1E2D45] p-3">
                      <span className="text-[10px] text-[#475569] uppercase tracking-wider block mb-1">{key}</span>
                      <span className="text-sm font-bold text-[#94A3B8]">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Row */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              {[
                { icon: ShieldCheck, label: 'Brand Warranty', color: '#22C55E' },
                { icon: Truck,       label: 'Fast Delivery',  color: '#F59E0B' },
                { icon: RotateCcw,   label: 'Easy Returns',   color: '#A78BFA' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-[#475569]">
                  <Icon className="h-4 w-4" style={{ color }} />
                  {label}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3 pt-6 border-t border-[#1E2D45]">
              <WhatsAppBuyButton
                productName={product.name}
                price={product.price}
                size="lg"
                className="flex-1 bg-[#25D366] hover:bg-[#1EB35B] text-white rounded-xl h-14 text-base font-bold shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all"
              />
              <CompareButton product={compareProduct} />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-[#1E2D45]" />
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#00D4FF] px-4">You Might Also Like</h2>
              <div className="h-px flex-1 bg-[#1E2D45]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map(rec => {
                const recImages = JSON.parse(rec.images || '[]');
                const compareRec = {
                  id: rec.id,
                  name: rec.name,
                  slug: rec.slug,
                  price: rec.price,
                  image: recImages[0] || '/images/placeholder.png',
                  category: { name: rec.category.name, slug: rec.category.slug },
                  brand: { name: rec.brand?.name || 'Unknown' },
                  attributes: rec.attributes || '{}',
                };
                return (
                  <ProductGridCard 
                    key={rec.id} 
                    product={rec} 
                    compareProduct={compareRec} 
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
