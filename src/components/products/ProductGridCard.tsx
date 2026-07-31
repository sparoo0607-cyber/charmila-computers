'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import { ProductCardActions } from '@/components/products/ProductCardActions';

interface ProductGridCardProps {
  product: any;
  compareProduct: any;
}

export function ProductGridCard({ product, compareProduct }: ProductGridCardProps) {
  const images = JSON.parse(product.images || '[]');
  const mainImage = images[0] || '/images/placeholder.png';

  // 3D Hover Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 30 } }}
      className="group relative rounded-[24px] border border-[#1E2D45] bg-[#0A0F1A]/80 backdrop-blur-md p-3 sm:p-5 flex flex-col h-full overflow-hidden shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] hover:border-[#2563EB]/50 z-10"
    >
      {/* Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Top Glow Border */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/0 to-transparent group-hover:via-[#00D4FF]/80 transition-all duration-700" />

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="relative h-28 sm:h-48 w-full mb-3 sm:mb-5 flex items-center justify-center overflow-hidden rounded-2xl bg-[#040812] group-hover:bg-[#080C14] transition-colors border border-transparent group-hover:border-[#1E2D45]/50">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-[#2563EB] opacity-0 blur-2xl sm:blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-700" />
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-2 sm:p-4 group-hover:scale-110 group-hover:-rotate-3 group-hover:drop-shadow-[0_15px_25px_rgba(37,99,235,0.4)] transition-all duration-700 ease-out z-10"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 relative z-10">
        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-[#2563EB] mb-1.5 sm:mb-2 group-hover:text-[#00D4FF] transition-colors line-clamp-1">
          {product.brand?.name || 'Hardware'}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-bold text-[#94A3B8] leading-snug mb-2 sm:mb-4 line-clamp-2 group-hover:text-white transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto mb-3 sm:mb-5">
          <span className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] tracking-tight">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Actions (Compare & Details) */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#1E2D45]/50 gap-2 sm:gap-3">
          <ProductCardActions product={compareProduct} />
          <Link href={`/products/${product.slug}`} className="flex-1">
            <button className="w-full relative overflow-hidden rounded-lg sm:rounded-xl p-[1px] group/btn">
              <span className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#00D4FF] to-[#2563EB] opacity-70 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <div className="relative w-full bg-[#040812] group-hover/btn:bg-transparent transition-colors duration-300 rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center">
                <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest group-hover/btn:text-black transition-colors duration-300">
                  Details
                </span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
