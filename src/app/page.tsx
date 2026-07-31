import { ShieldCheck, Truck, Headphones, RefreshCcw, ArrowRight, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { ScrollytellingHero } from '@/components/home/ScrollytellingHero';
import { CategoryPedestals } from '@/components/home/CategoryPedestals';
import { ProductCard } from '@/components/ui/ProductCard';
import { PromoBanner } from '@/components/home/PromoBanner';

const PRODUCTS = [
  { id: '1', name: 'MSI GeForce RTX 4070 Super 12G Gaming X Slim', price: 59990, oldPrice: 63999, image: '/images/products/rtx_4090_isolated_1785504487639.png', category: 'graphics-cards' },
  { id: '2', name: 'Intel Core i5-14600K 14th Gen Processor', price: 22999, oldPrice: 28600, image: '/images/products/intel_cpu_isolated_1785504512463.png', category: 'processors' },
  { id: '3', name: 'ASUS TUF Gaming B760-PLUS WiFi Motherboard', price: 18499, oldPrice: 21999, image: '/images/products/gaming_motherboard_isolated_1785504525296.png', category: 'motherboards' },
  { id: '4', name: 'Corsair Vengeance 16GB DDR5 5200MHz RAM', price: 4799, oldPrice: 6200, image: '/images/products/ddr5_ram_isolated_1785504561946.png', category: 'memory' },
  { id: '5', name: 'AMD Ryzen 7 7800X3D Desktop Processor', price: 34500, oldPrice: 41000, image: '/images/products/intel_cpu_isolated_1785504512463.png', category: 'processors' },
  { id: '6', name: 'Zotac Gaming GeForce RTX 4090 Trinity OC', price: 168900, oldPrice: 180000, image: '/images/products/rtx_4090_isolated_1785504487639.png', category: 'graphics-cards' },
];

const PERIPHERALS = [
  { id: 'p1', name: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse', price: 12499, oldPrice: 14999, image: '/images/products/gaming_mouse_isolated_1785504574761.png', category: 'peripherals' },
  { id: 'p2', name: 'HyperX Cloud III Wireless Gaming Headset', price: 13990, oldPrice: 16000, image: '/images/products/gaming_headset_isolated_1785504585000.png', category: 'peripherals' },
  { id: 'p3', name: 'Logitech G915 TKL Lightspeed Wireless Keyboard', price: 18995, oldPrice: 21995, image: '/images/products/gaming_mouse_isolated_1785504574761.png', category: 'peripherals' },
  { id: 'p4', name: 'Sony INZONE M9 27" 4K HDR 144Hz Gaming Monitor', price: 74990, oldPrice: 89990, image: '/images/products/pc_cabinet_isolated_1785504605408.png', category: 'monitors' },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'Genuine Products', desc: '100% Brand Warranty', color: '#22C55E' },
  { icon: Headphones,  title: 'Premium Support',  desc: 'Expert Tech Assistance', color: '#2563EB' },
  { icon: Truck,       title: 'Fast Shipping',    desc: 'Secure & Insured', color: '#F59E0B' },
  { icon: RefreshCcw,  title: 'Easy Returns',     desc: 'Hassle-free Process', color: '#A78BFA' },
];

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00D4FF]">{label}</span>
      <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">{title}</h2>
      <div className="h-0.5 w-16 bg-gradient-to-r from-[#2563EB] to-[#00D4FF] rounded-full mt-1" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#080C14]">

      {/* ── 1. SCROLLYTELLING HERO ───────────────────────── */}
      <ScrollytellingHero />

      {/* ── 2. STATS BAR ───────────────────────────────── */}
      <div className="w-full bg-[#2563EB] py-3 overflow-hidden relative">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white text-xs font-bold uppercase tracking-wider">
          {['15+ Years Experience', '10,000+ Happy Customers', 'Tirupati\'s #1 PC Store', 'Official Brand Partner'].map((s) => (
            <span key={s} className="flex items-center gap-2 opacity-90">
              <Star className="h-3 w-3 fill-white" /> {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. CATEGORY PEDESTALS ────────────────────────── */}
      <CategoryPedestals />

      {/* ── 4. FEATURED BEAST SECTION ────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle label="Hot Deals" title="Future Ready Beast" />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Big Featured Card */}
            <div className="w-full lg:w-[340px] flex-shrink-0 rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-6 flex flex-col relative group hover:border-[#2563EB]/60 hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] transition-all duration-300 overflow-hidden">
              {/* Glow effects */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-60" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#2563EB] opacity-5 blur-3xl rounded-full" />

              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10">
                -12%
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-[#F59E0B] font-bold bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2 py-1 rounded-md">
                <Zap className="h-3 w-3" /> HOT
              </div>

              <h3 className="text-base font-black text-white mt-8 mb-1 leading-tight">MSI GeForce RTX 4090 SUPRIM X 24G</h3>
              <p className="text-xs text-[#475569] mb-4 leading-relaxed">The ultimate GeForce GPU. Enormous leap in performance, efficiency, and AI-powered graphics.</p>

              <div className="relative h-60 w-full my-2 flex-1 bg-[#080C14] rounded-xl overflow-hidden">
                <Image
                  src="/images/products/rtx_4090_isolated_1785504487639.png"
                  alt="RTX 4090"
                  fill
                  sizes="(max-width: 1024px) 100vw, 340px"
                  priority={true}
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_8px_24px_rgba(37,99,235,0.4)]"
                />
              </div>

              <div className="mt-5 pt-4 border-t border-[#1E2D45] flex flex-col gap-1">
                <span className="text-xs text-[#475569] line-through">₹1,95,000</span>
                <span className="text-3xl font-black text-white tracking-tight">₹1,71,600</span>
                <a
                  href="https://wa.me/919010177427?text=Hello,%20I'd%20like%20to%20buy%20the%20RTX%204090%20SUPRIM%20X"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 w-full text-center bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-sm font-bold py-3 rounded-xl transition-all uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Buy Now on WhatsApp
                </a>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROMO BANNER ───────────────────────────────── */}
      <PromoBanner
        imageSrc="https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?auto=format&fit=crop&q=80&w=1200"
        title="Maximum Cooling. Zero Noise."
        subtitle="Liquid Cooling Systems"
        description="Experience the ultimate in thermal performance. Our AIO and custom loop coolers keep your beast running ice cold."
        linkText="Shop Cooling"
        linkHref="/products?category=coolers"
        align="left"
        accentColor="#00D4FF"
      />

      {/* ── 6. GAMING ZONE ────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle label="Peripherals" title="Gaming Zone" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PERIPHERALS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#00D4FF] transition-colors group"
            >
              View All Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. TRUST BADGES ───────────────────────────────── */}
      <section className="py-12 border-t border-[#1E2D45] relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-[#1E2D45] bg-[#0F1624] hover:border-[#1E2D45]/80 transition-all hover:bg-[#111827] group"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ background: `${color}15`, boxShadow: `0 0 16px ${color}25` }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wide">{title}</h4>
                  <p className="text-xs text-[#475569] mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
