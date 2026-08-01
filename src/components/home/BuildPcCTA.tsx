'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export function BuildPcCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-[#030712] overflow-hidden flex flex-col items-center justify-center py-32">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-r from-[#2563EB]/10 via-[#7C3AED]/10 to-[#00D4FF]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Massive Background Text */}
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
      >
        <h1 className="text-[15vw] font-black leading-none text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}>
          CRAFTED
        </h1>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <div className="relative w-4 h-4"><Image src="/images/icons/zap_icon_1785528634168.png" alt="Zap" fill className="object-contain" /></div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#E2E8F0]">Expert PC Building</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-8 leading-[1.1]"
          >
            Dream PC. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#2563EB] to-[#7C3AED]">Built For You.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mb-16 leading-relaxed font-medium"
          >
            Whether you need maximum FPS for competitive gaming, uncompromised power for 3D rendering, or a silent productivity workstation. Our experts craft the perfect machine to match your exact workflow and budget.
          </motion.p>

          {/* Interactive Hardware Showcase Grid */}
          <motion.div 
            style={{ y: yImage }}
            className="w-full relative h-[300px] md:h-[450px] mb-20 flex justify-center items-center"
          >
            {/* Center Cabinet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative w-64 h-64 md:w-96 md:h-96 z-30"
            >
              <Image src="/images/products/pc_cabinet_isolated_1785504605408.png" alt="PC Case" fill className="object-contain drop-shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:scale-110 transition-transform duration-500 cursor-pointer" />
            </motion.div>

            {/* Left orbiting component (GPU) */}
            <motion.div 
              initial={{ opacity: 0, x: 100, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute left-[5%] md:left-[15%] top-[10%] w-32 h-32 md:w-48 md:h-48 z-20"
            >
              <motion.div 
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image src="/images/products/rtx_4090_isolated_1785504487639.png" alt="GPU" fill className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-125 transition-transform duration-500 cursor-pointer" />
              </motion.div>
            </motion.div>

            {/* Right orbiting component (Motherboard) */}
            <motion.div 
              initial={{ opacity: 0, x: -100, y: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute right-[5%] md:right-[15%] bottom-[10%] w-32 h-32 md:w-48 md:h-48 z-20"
            >
              <motion.div 
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image src="/images/products/gaming_motherboard_isolated_1785504525296.png" alt="Motherboard" fill className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-125 transition-transform duration-500 cursor-pointer" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center"
          >
            <Link href="/build-pc" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto relative h-16 px-10 rounded-2xl bg-white text-black hover:bg-[#E8EAF0] font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95 group shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <div className="relative w-6 h-6 mr-3"><Image src="/images/icons/hammer_icon_1785528723496.png" alt="Build" fill className="object-contain" /></div> 
                Start Your Build
                <ArrowRight className="ml-3 h-5 w-5 opacity-50 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <a href="https://wa.me/919010177427" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto relative h-16 px-10 rounded-2xl bg-[#0F1624] border border-[#1E2D45] text-white hover:bg-[#1A2236] hover:border-[#00D4FF]/50 font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="relative w-6 h-6 mr-3"><Image src="/images/icons/chat_icon_1785528796689.png" alt="Chat" fill className="object-contain" /></div> 
                Consult an Expert
              </Button>
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
