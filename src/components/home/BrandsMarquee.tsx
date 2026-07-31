'use client';

import { motion } from 'framer-motion';

const BRANDS = [
  "NVIDIA", "AMD", "INTEL", "ASUS ROG", "MSI", "GIGABYTE", "CORSAIR", "NZXT", "LIAN LI", "G.SKILL", "KINGSTON", "WESTERN DIGITAL"
];

export function BrandsMarquee() {
  return (
    <section className="py-12 w-full bg-[#080C14] border-t border-b border-[#1E2D45] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080C14] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080C14] to-transparent z-10 pointer-events-none" />

      <div className="flex w-[200%]">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {/* Duplicate the array twice to ensure seamless infinite scrolling */}
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="px-12 flex items-center justify-center group"
            >
              <span className="text-2xl md:text-4xl font-black uppercase tracking-[0.2em] text-[#1E2D45] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-default">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
