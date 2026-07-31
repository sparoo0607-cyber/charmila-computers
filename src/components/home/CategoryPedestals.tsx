'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  link: string;
  count: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Processors',     link: '/products?category=processors',    image: '/images/products/intel_cpu_isolated_1785504512463.png', count: '45+ Items' },
  { id: '2', name: 'Motherboards',   link: '/products?category=motherboards',  image: '/images/products/gaming_motherboard_isolated_1785504525296.png', count: '60+ Items' },
  { id: '3', name: 'Graphics Cards', link: '/products?category=graphics-cards', image: '/images/products/rtx_4090_isolated_1785504487639.png', count: '30+ Items' },
  { id: '4', name: 'Memory',         link: '/products?category=memory',        image: '/images/products/ddr5_ram_isolated_1785504561946.png', count: '80+ Items' },
  { id: '5', name: 'Coolers',        link: '/products?category=coolers',       image: '/images/products/aio_cooler_isolated_1785504617114.png', count: '25+ Items' },
  { id: '6', name: 'Cabinets',       link: '/products?category=cabinets',      image: '/images/products/pc_cabinet_isolated_1785504605408.png', count: '40+ Items' },
];

export function CategoryPedestals() {
  return (
    <section className="py-24 w-full relative overflow-hidden bg-[#080C14]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2236] border border-[#1E2D45] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Shop By Components</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-4"
          >
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#00D4FF]">Arsenal</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href={category.link}
                className="group block relative w-full aspect-[4/5] rounded-[24px] bg-[#0F1624] border border-[#1E2D45] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:border-[#2563EB]/50"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Image */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-125 group-hover:rotate-3 group-hover:-translate-y-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col items-center justify-end bg-gradient-to-t from-[#080C14] via-[#080C14]/80 to-transparent pt-12 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1 group-hover:text-[#00D4FF] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.count}
                  </p>
                </div>
                
                {/* Top Border Highlight */}
                <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/0 to-transparent group-hover:via-[#00D4FF]/50 transition-all duration-700" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
