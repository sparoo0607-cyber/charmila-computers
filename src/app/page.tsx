import { ShieldCheck, Truck, Headphones, RefreshCcw, ArrowRight, Star, Zap, Cpu, MessageCircle, Flame, Tag, Wrench } from 'lucide-react';
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

      {/* ── 2. MARQUEE STATS BAR ────────────────────────── */}
      <div className="w-full bg-[#2563EB] py-3 overflow-hidden relative">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white text-xs font-bold uppercase tracking-wider">
          {['15+ Years Experience', '10,000+ Happy Customers', "Tirupati's #1 PC Store", 'Official Brand Partner'].map((s) => (
            <span key={s} className="flex items-center gap-2 opacity-90">
              <Star className="h-3 w-3 fill-white" /> {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. CATEGORY PEDESTALS ────────────────────────── */}
      <CategoryPedestals />

      {/* ── 4. DUAL MINI BANNERS ─────────────────────────── */}
      <section className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Banner A — CPU Upgrade */}
            <Link href="/products?category=processors" className="group relative rounded-2xl overflow-hidden flex items-center gap-6 p-6 md:p-8 min-h-[160px] border border-[#1E2D45] hover:border-[#2563EB]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0F1E38] to-[#0A1628]" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#2563EB]/10 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/80 to-transparent" />
              {/* Animated glow dot */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.8)] animate-pulse" />

              <div className="relative z-10 flex-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-[#2563EB] mb-1">Hot Category</span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-tight mb-2">Upgrade Your<br/>CPU Today</h3>
                <p className="text-xs text-[#475569] mb-4">Intel & AMD latest gen processors. Build faster, render faster.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D4FF] group-hover:gap-3 transition-all">
                  Shop Processors <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="relative z-10 w-28 h-28 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Image src="/images/products/intel_cpu_isolated_1785504512463.png" alt="CPU" fill className="object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
              </div>
            </Link>

            {/* Banner B — GPU Deals */}
            <Link href="/products?category=graphics-cards" className="group relative rounded-2xl overflow-hidden flex items-center gap-6 p-6 md:p-8 min-h-[160px] border border-[#1E2D45] hover:border-[#A78BFA]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#130A28] via-[#1A0F35] to-[#130A28]" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#A78BFA]/10 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A78BFA]/80 to-transparent" />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.8)] animate-pulse" />

              <div className="relative z-10 flex-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-[#A78BFA] mb-1">Best Seller</span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-tight mb-2">RTX 4000 Series<br/>GPUs In Stock</h3>
                <p className="text-xs text-[#475569] mb-4">NVIDIA RTX 4070, 4080, 4090 — all variants available.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] group-hover:gap-3 transition-all">
                  View GPUs <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="relative z-10 w-28 h-28 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Image src="/images/products/rtx_4090_isolated_1785504487639.png" alt="GPU" fill className="object-contain drop-shadow-[0_0_20px_rgba(167,139,250,0.5)]" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED BEAST SECTION ────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle label="Hot Deals" title="Future Ready Beast" />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Big Featured Card */}
            <div className="w-full lg:w-[340px] flex-shrink-0 rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-6 flex flex-col relative group hover:border-[#2563EB]/60 hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-60" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#2563EB] opacity-5 blur-3xl rounded-full" />
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10">-12%</div>
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-[#F59E0B] font-bold bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2 py-1 rounded-md">
                <Zap className="h-3 w-3" /> HOT
              </div>
              <h3 className="text-base font-black text-white mt-8 mb-1 leading-tight">MSI GeForce RTX 4090 SUPRIM X 24G</h3>
              <p className="text-xs text-[#475569] mb-4 leading-relaxed">The ultimate GeForce GPU. Enormous leap in performance, efficiency, and AI-powered graphics.</p>
              <div className="relative h-60 w-full my-2 flex-1 bg-[#080C14] rounded-xl overflow-hidden">
                <Image src="/images/products/rtx_4090_isolated_1785504487639.png" alt="RTX 4090" fill sizes="(max-width: 1024px) 100vw, 340px" priority={true} className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_8px_24px_rgba(37,99,235,0.4)]" />
              </div>
              <div className="mt-5 pt-4 border-t border-[#1E2D45] flex flex-col gap-1">
                <span className="text-xs text-[#475569] line-through">₹1,95,000</span>
                <span className="text-3xl font-black text-white tracking-tight">₹1,71,600</span>
                <a href="https://wa.me/919010177427?text=Hello,%20I'd%20like%20to%20buy%20the%20RTX%204090%20SUPRIM%20X" target="_blank" rel="noreferrer" className="mt-3 w-full text-center bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-sm font-bold py-3 rounded-xl transition-all uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:scale-[1.02] active:scale-[0.98]">
                  Buy Now on WhatsApp
                </a>
              </div>
            </div>
            {/* Product Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.map((product) => (<ProductCard key={product.id} {...product} />))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROMO BANNER — COOLING ────────────────────── */}
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

      {/* ── 7. FLASH DEAL BANNER ─────────────────────────── */}
      <section className="py-6 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border border-[#F59E0B]/30 bg-[#0F1624]">
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1200] via-[#0F1624] to-[#1A1200]" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />
            {/* Glow blob */}
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#F59E0B] opacity-5 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-10 py-7">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex-shrink-0">
                  <Flame className="h-6 w-6 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-[#F59E0B] mb-0.5">Limited Time Offer</span>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase leading-tight">Flash Deals — Up to 25% Off</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">On select RAM, SSDs, and cooling components. While stocks last!</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-black text-sm font-black px-7 py-3 rounded-xl transition-all uppercase tracking-wider hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 group"
                >
                  Shop Deals
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="https://wa.me/919010177427?text=Hi!%20I%20want%20to%20know%20about%20the%20current%20flash%20deals."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EB35B] text-white text-sm font-bold px-5 py-3 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. GAMING ZONE ────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle label="Peripherals" title="Gaming Zone" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PERIPHERALS.map((product) => (<ProductCard key={product.id} {...product} />))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#00D4FF] transition-colors group">
              View All Products <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. BUILD-PC CTA BANNER ───────────────────────── */}
      <section className="py-6 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center border border-[#1E2D45]">
            {/* Dark mesh background */}
            <div className="absolute inset-0 bg-[#080C14] grid-bg" />
            {/* Blue radial glow left */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#2563EB]/20 to-transparent" />
            {/* Cyan radial glow right */}
            <div className="absolute right-0 top-0 bottom-0 w-96 bg-[#00D4FF] opacity-5 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#00D4FF] to-[#A78BFA]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-10 w-full">
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#00D4FF] shadow-[0_0_25px_rgba(37,99,235,0.5)] flex-shrink-0">
                  <Cpu className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-[#00D4FF] mb-2">Expert PC Building</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mb-2">Dream PC. Built For You.</h3>
                  <p className="text-sm text-[#475569] max-w-md leading-relaxed">
                    Tell us your budget and use-case. Our expert team assembles a custom powerhouse — gaming, editing, or workstation.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {['Gaming PCs', 'Video Editing', 'Workstations', 'Budget Builds'].map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-bold text-[#64748B] border border-[#1E2D45] rounded-full px-3 py-1">
                        <Tag className="h-2.5 w-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/build-pc"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#00D4FF] text-white text-sm font-black px-10 py-4 rounded-xl uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] hover:scale-105 active:scale-95 transition-all group"
                >
                  <Cpu className="h-4 w-4" /> Start Building
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="https://wa.me/919010177427?text=Hi!%20I%20want%20to%20build%20a%20custom%20PC.%20Can%20you%20help%3F"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 hover:border-[#25D366]/60 text-sm font-bold px-10 py-4 rounded-xl uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.2)]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. SERVICE STRIPS ───────────────────────────── */}
      <section className="py-6 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border border-[#1E2D45] bg-[#0F1624]">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#22C55E]/70 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-10 py-7">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex-shrink-0">
                  <Wrench className="h-6 w-6 text-[#22C55E]" />
                </div>
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-[#22C55E] mb-0.5">Service Centre</span>
                  <h3 className="text-base md:text-lg font-black text-white uppercase leading-tight">PC Repair, CCTV & Networking</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Visit our store — Sri Venkateswara Complex, Beside RTC Bus Stand, Tirupati</p>
                </div>
              </div>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 bg-[#22C55E]/15 hover:bg-[#22C55E]/25 text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E]/60 text-sm font-bold px-7 py-3 rounded-xl transition-all uppercase tracking-wider flex-shrink-0 group hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
              >
                View Services <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. TRUST BADGES ──────────────────────────────── */}
      <section className="py-12 border-t border-[#1E2D45] relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-[#1E2D45] bg-[#0F1624] hover:border-[#1E2D45]/80 transition-all hover:bg-[#111827] group">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: `${color}15`, boxShadow: `0 0 16px ${color}25` }}>
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
