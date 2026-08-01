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

const COMPONENTS: CategoryItem[] = [
  { id: '1', name: 'Processors',     link: '/products?category=processors',    image: '/images/products/intel_cpu_isolated_1785504512463.png', count: '45+ Items' },
  { id: '2', name: 'Motherboards',   link: '/products?category=motherboards',  image: '/images/products/gaming_motherboard_isolated_1785504525296.png', count: '60+ Items' },
  { id: '3', name: 'Coolers',        link: '/products?category=coolers',       image: '/images/products/aio_cooler_isolated_1785504617114.png', count: '25+ Items' },
  { id: '4', name: 'Case Fans',      link: '/products?category=fans',          image: '/images/products/fans_isolated_1785553995392.png', count: '70+ Items' },
  { id: '5', name: 'Graphics Cards', link: '/products?category=graphics-cards', image: '/images/products/rtx_4090_isolated_1785504487639.png', count: '30+ Items' },
  { id: '6', name: 'Memory',         link: '/products?category=memory',        image: '/images/products/ddr5_ram_isolated_1785504561946.png', count: '80+ Items' },
  { id: '7', name: 'Storage (SSD)',  link: '/products?category=storage',       image: '/images/products/ssd_isolated_1785553958638.png', count: '55+ Items' },
  { id: '8', name: 'Monitors',       link: '/products?category=monitors',      image: '/images/products/monitor_isolated_1785554012281.png', count: '20+ Items' },
  { id: '9', name: 'Power Supplies', link: '/products?category=psu',           image: '/images/products/psu_isolated_1785553976383.png', count: '35+ Items' },
  { id: '10', name: 'PC Cabinets',   link: '/products?category=cabinets',      image: '/images/products/pc_cabinet_isolated_1785504605408.png', count: '40+ Items' },
];

const PERIPHERALS: CategoryItem[] = [
  { id: '11', name: 'Keyboards',     link: '/products?category=keyboards',     image: '/images/products/keyboard_isolated_1785553611959.png', count: '30+ Items' },
  { id: '12', name: 'Gaming Mice',   link: '/products?category=mice',          image: '/images/products/gaming_mouse_isolated_1785504574761.png', count: '45+ Items' },
  { id: '13', name: 'Headsets',      link: '/products?category=headsets',      image: '/images/products/gaming_headset_isolated_1785504585000.png', count: '25+ Items' },
  { id: '14', name: 'Mousepads',     link: '/products?category=mousepads',     image: '/images/products/mousepad_isolated_1785553629254.png', count: '50+ Items' },
  { id: '15', name: 'Controllers',   link: '/products?category=controllers',   image: '/images/icons/gamepad_icon_1785528831391.png', count: '12+ Items' },
  { id: '16', name: 'Webcams',       link: '/products?category=webcams',       image: '/images/products/webcam_isolated_1785553682808.png', count: '10+ Items' },
  { id: '17', name: 'UPS & Power',   link: '/products?category=ups',           image: '/images/products/ups_isolated_1785553646565.png', count: '15+ Items' },
  { id: '18', name: 'Networking',    link: '/products?category=networking',    image: '/images/products/router_isolated_1785553665196.png', count: '20+ Items' },
];

function GridSection({ title, items, subtitle }: { title: string, items: CategoryItem[], subtitle: string }) {
  return (
    <div className="mb-24 last:mb-0">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2236] border border-[#1E2D45] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">{subtitle}</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-4"
        >
          {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#00D4FF]">{title.split(' ').slice(1).join(' ')}</span>
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        {items.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={category.link}
              className="group block relative w-full aspect-[4/5] rounded-[24px] bg-[#0F1624] border border-[#1E2D45] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] hover:border-[#2563EB]/50"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating Image */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col items-center justify-end bg-gradient-to-t from-[#080C14] via-[#080C14]/90 to-transparent pt-12 transform transition-transform duration-500">
                <h3 className="text-[11px] md:text-sm font-black text-white uppercase tracking-wider mb-1 group-hover:text-[#00D4FF] transition-colors text-center">
                  {category.name}
                </h3>
                <p className="text-[9px] md:text-[10px] font-bold text-[#64748B] uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                  {category.count}
                </p>
              </div>
              
              {/* Top Border Highlight */}
              <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/0 to-transparent group-hover:via-[#00D4FF]/30 transition-all duration-700" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CategoryPedestals() {
  return (
    <section className="py-24 w-full relative overflow-hidden bg-[#080C14]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00D4FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <GridSection title="Core Components" items={COMPONENTS} subtitle="Build Your Arsenal" />
        <GridSection title="Pro Peripherals" items={PERIPHERALS} subtitle="Complete Your Setup" />
      </div>
    </section>
  );
}
