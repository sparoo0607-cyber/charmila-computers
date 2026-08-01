'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export function CoolingShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[85vh] bg-[#020617] overflow-hidden flex flex-col items-center justify-center py-24">
      {/* Dynamic Icy Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-[#00D4FF]/20 via-[#2563EB]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-40 mix-blend-overlay" />
        
        {/* Animated Particles */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00D4FF] rounded-full blur-[2px]"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white rounded-full blur-[3px]"
        />
        <motion.div 
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/3 w-6 h-6 bg-[#2563EB] rounded-full blur-[4px]"
        />
      </div>

      {/* Massive Background Text */}
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden opacity-50"
      >
        <h1 className="text-[18vw] font-black leading-none text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px rgba(0,212,255,0.05)' }}>
          FROZEN
        </h1>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-start text-left z-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            >
              <Snowflake className="w-4 h-4 text-[#00D4FF] animate-spin-slow" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#00D4FF]">Liquid Cooling Systems</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-8 leading-[1.1]"
            >
              Maximum Cooling. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D4FF] to-[#2563EB]">Zero Noise.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg md:text-xl text-[#94A3B8] max-w-xl mb-12 leading-relaxed font-medium"
            >
              Experience the ultimate in thermal performance. Our custom loop and AIO liquid coolers keep your beast running ice cold, even under the most extreme workloads.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/products?category=coolers">
                <Button className="relative h-16 px-10 rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#2563EB] text-white hover:opacity-90 font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95 group shadow-[0_10px_30px_rgba(0,212,255,0.4)] hover:shadow-[0_15px_40px_rgba(0,212,255,0.6)] overflow-hidden border-0">
                  {/* Glass highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Snowflake className="mr-3 h-5 w-5" /> 
                  Shop Cooling Systems
                  <ArrowRight className="ml-3 h-5 w-5 opacity-70 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image Showcase */}
          <div className="flex-1 w-full relative h-[400px] md:h-[600px] flex justify-center items-center">
            {/* Ice Pedestal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-[10%] w-[80%] h-32 bg-[#00D4FF]/10 rounded-[100%] blur-[20px] shadow-[0_0_80px_rgba(0,212,255,0.3)] border-t border-[#00D4FF]/30"
              style={{ transform: 'perspective(500px) rotateX(60deg)' }}
            />

            <motion.div 
              style={{ y: yImage, scale: scaleImage, rotate: rotateImage }}
              className="relative w-full h-full max-w-[500px] z-30"
            >
              <Image 
                src="/images/products/aio_cooler_isolated_1785504617114.png" 
                alt="Premium Liquid Cooler" 
                fill 
                className="object-contain drop-shadow-[0_30px_50px_rgba(0,212,255,0.5)]" 
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
