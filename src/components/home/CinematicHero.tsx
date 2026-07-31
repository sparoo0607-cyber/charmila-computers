'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=100&w=1200", // Blue RGB
  "https://images.unsplash.com/photo-1623910279612-4eb1522f98f6?auto=format&fit=crop&q=100&w=1200", // Pink/Purple RGB interior
  "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=100&w=1200", // Full setup
  "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?auto=format&fit=crop&q=100&w=1200", // Water cooled
];

export function CinematicHero() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#020617] w-full overflow-hidden flex items-center">
      {/* Background Ambient Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </motion.div>

      <div className="w-full relative flex items-center h-full">
        {/* Text and UI Content (Left Side) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex flex-col items-start justify-center h-full pointer-events-none py-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">India's</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8 pointer-events-auto">
            <motion.span 
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.7, type: 'spring' }}
              className="block"
            >
              Premium PC
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.9, type: 'spring' }}
              className="block text-blue-500"
            >
              Destination.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed"
          >
            Experience uncompromising power with masterfully crafted, custom-built PCs for gamers, creators, and professionals.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3, type: 'spring' }}
            className="flex flex-wrap items-center gap-6 pointer-events-auto"
          >
            <Link href="/build-pc">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full font-bold px-8 py-7 text-base transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Build Your Dream PC <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-full font-bold px-8 py-7 text-base backdrop-blur-md">
                Explore Components
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-16 flex items-center gap-8 text-gray-400 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>15+ Years</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>30K+ Customers</span>
            </div>
          </motion.div>
        </div>

        {/* Image Container (Right Side) */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none md:w-1/2 md:left-auto md:right-10 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.2, type: 'spring' }}
            className="relative w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)] border border-white/5 bg-gray-900"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_IMAGES[currentImage]}
                  alt="Premium Custom Gaming PC"
                  fill
                  className="object-cover"
                  priority={currentImage === 0}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Subtle overlay gradient to blend with the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/80 via-transparent to-transparent mix-blend-overlay z-10" />

            {/* Slideshow Progress Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {HERO_IMAGES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImage ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
