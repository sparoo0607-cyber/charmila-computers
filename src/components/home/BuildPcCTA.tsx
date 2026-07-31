'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, MessageCircle, Scale, Hammer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BuildPcCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#080C14]">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 -left-1/4 w-1/2 h-[500px] bg-[#2563EB] opacity-10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-[400px] bg-[#00D4FF] opacity-10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="flex-1 w-full flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F1624] border border-[#1E2D45] mb-6"
            >
              <div className="relative w-4 h-4"><Image src="/images/icons/zap_icon_1785528634168.png" alt="Zap" fill className="object-contain" /></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Expert PC Building</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white mb-6 leading-tight"
            >
              Dream PC. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#00D4FF]">Built For You.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-[#64748B] max-w-lg mb-10 leading-relaxed"
            >
              Whether you need maximum FPS for competitive gaming, uncompromised power for 3D rendering, or a silent productivity workstation. Our experts craft the perfect machine to match your exact workflow and budget.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/build-pc" className="flex-1 sm:flex-none">
                <Button className="w-full relative h-14 px-8 rounded-xl bg-white text-black hover:bg-[#E8EAF0] font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 group">
                  <div className="relative w-5 h-5 mr-2"><Image src="/images/icons/hammer_icon_1785528723496.png" alt="Build" fill className="object-contain" /></div> Start Build
                  <ArrowRight className="ml-2 h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/919010177427" target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full relative h-14 px-8 rounded-xl bg-transparent border-[#1E2D45] text-white hover:bg-[#1A2236] hover:border-[#2563EB]/50 font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
                  <div className="relative w-5 h-5 mr-2"><Image src="/images/icons/chat_icon_1785528796689.png" alt="Chat" fill className="object-contain" /></div> Expert Help
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Interactive Illustration */}
          <div className="flex-1 w-full relative h-[400px] lg:h-[600px] rounded-3xl border border-[#1E2D45] bg-[#0F1624]/50 backdrop-blur-xl flex items-center justify-center group overflow-hidden">
            {/* Center Cabinet Base */}
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Image src="/images/products/pc_cabinet_isolated_1785504605408.png" alt="PC Case" fill className="object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]" />
            </motion.div>

            {/* Floating Components orbiting the case */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[10%] w-24 h-24 md:w-32 md:h-32 z-20 group-hover:scale-110 transition-transform"
            >
              <Image src="/images/products/rtx_4090_isolated_1785504487639.png" alt="GPU" fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[20%] right-[10%] w-20 h-20 md:w-28 md:h-28 z-20 group-hover:scale-110 transition-transform"
            >
              <Image src="/images/products/intel_cpu_isolated_1785504512463.png" alt="CPU" fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
            </motion.div>

            <motion.div 
              animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[15%] left-[20%] w-16 h-16 md:w-24 md:h-24 z-20 group-hover:scale-110 transition-transform"
            >
              <Image src="/images/products/ddr5_ram_isolated_1785504561946.png" alt="RAM" fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
            </motion.div>

            <motion.div 
              animate={{ y: [15, -15, 15] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[20%] right-[20%] w-20 h-20 md:w-28 md:h-28 z-20 group-hover:scale-110 transition-transform"
            >
              <Image src="/images/products/aio_cooler_isolated_1785504617114.png" alt="Cooler" fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
            </motion.div>

            {/* Connecting blueprint lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#00D4FF]/30 stroke-[1] stroke-dasharray-4 animate-[dash_20s_linear_infinite]" fill="none">
              <style>{`@keyframes dash { to { stroke-dashoffset: -1000; } } .stroke-dasharray-4 { stroke-dasharray: 4 4; }`}</style>
              <path d="M 50% 50% L 15% 15%" />
              <path d="M 50% 50% L 85% 25%" />
              <path d="M 50% 50% L 25% 85%" />
              <path d="M 50% 50% L 80% 80%" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
