'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, ShieldCheck, Flame, Star, LayoutGrid, Monitor, MonitorPlay, Hammer, HardDrive } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { name: 'Processors', icon: Cpu, href: '/products?category=processors' },
  { name: 'Motherboards', icon: LayoutGrid, href: '/products?category=motherboards' },
  { name: 'Graphics Cards', icon: MonitorPlay, href: '/products?category=graphics-cards' },
  { name: 'Memory', icon: HardDrive, href: '/products?category=memory' },
  { name: 'Storage', icon: HardDrive, href: '/products?category=storage' },
  { name: 'Power Supplies', icon: Zap, href: '/products?category=power-supplies' },
  { name: 'Cooling', icon: Flame, href: '/products?category=coolers' },
  { name: 'Peripherals', icon: Monitor, href: '/products?category=peripherals' },
];

const FEATURED_BRANDS = ['Intel', 'AMD', 'NVIDIA', 'ASUS', 'MSI', 'Gigabyte', 'Corsair'];

// Helper icon component since Zap is not imported above directly
import { Zap } from 'lucide-react';

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="bg-[#1A2236] hover:bg-[#2563EB]/20 border border-[#1E2D45] hover:border-[#2563EB]/50 text-white px-5 h-8 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all duration-300 group">
        <LayoutGrid className="h-3.5 w-3.5 text-[#00D4FF] group-hover:scale-110 transition-transform" />
        Categories
        <ChevronDown className={`h-3.5 w-3.5 text-[#64748B] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute top-full left-0 mt-4 w-[800px] bg-[#0F1624]/95 backdrop-blur-2xl border border-[#1E2D45] rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden flex"
          >
            {/* Left sidebar - Categories list */}
            <div className="w-1/3 border-r border-[#1E2D45] p-4 bg-[#080C14]/50">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#64748B] px-3 mb-4 mt-2">All Categories</div>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#94A3B8] hover:text-[#00D4FF] hover:bg-[#1A2236] transition-all group"
                  >
                    <cat.icon className="h-4 w-4 text-[#475569] group-hover:text-[#00D4FF] transition-colors" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right content area */}
            <div className="w-2/3 p-6 flex flex-col gap-8">
              
              {/* Featured Promo */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#00D4FF] flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5" /> Trending Builds
                  </div>
                  <Link href="/build-pc" className="text-[10px] font-bold text-[#64748B] hover:text-white uppercase tracking-wider transition-colors">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/build-pc?type=gaming" className="group relative h-28 rounded-xl overflow-hidden border border-[#1E2D45] hover:border-[#A78BFA]/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#130A28] to-[#130A28]/20 z-10" />
                    <Image src="/images/banners/long_banner_bg.png" alt="Gaming Build" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 p-4 z-20 flex flex-col justify-end">
                      <span className="text-xs font-black text-white uppercase tracking-wide">Extreme Gaming</span>
                      <span className="text-[10px] text-[#A78BFA] font-bold">RTX 4090 Inside</span>
                    </div>
                  </Link>
                  <Link href="/build-pc?type=workstation" className="group relative h-28 rounded-xl overflow-hidden border border-[#1E2D45] hover:border-[#2563EB]/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] to-[#0A1628]/20 z-10" />
                    <Image src="/images/banners/long_banner_bg.png" alt="Workstation" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 p-4 z-20 flex flex-col justify-end">
                      <span className="text-xs font-black text-white uppercase tracking-wide">Creator Workstation</span>
                      <span className="text-[10px] text-[#00D4FF] font-bold">3D & Rendering</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Brands */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#64748B] mb-4 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-[#F59E0B]" /> Featured Brands
                </div>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_BRANDS.map(brand => (
                    <Link 
                      key={brand} 
                      href={`/products?search=${brand}`}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-[#111827] border border-[#1E2D45] rounded-lg text-[11px] font-bold text-[#94A3B8] hover:text-white hover:border-[#475569] transition-all"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
