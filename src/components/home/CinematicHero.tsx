'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Calendar, Users, Mouse } from 'lucide-react';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBooted, setIsBooted] = useState(false);

  // Trigger the PC boot animation at 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooted(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll tracking for the cinematic scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fade out text when scrolling down
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-[#020617]">
      {/* Sticky container that holds everything in the viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Ambient Glows */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"
          />
        </div>

        {/* Text and UI Content (Left Side) */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 flex flex-col items-start justify-center h-full pointer-events-none"
        >
          <div className="pointer-events-auto max-w-2xl">
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">India's</span>
            </motion.div>
            
            {/* Heading Lines */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 font-heading leading-tight">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                Premium PC
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
              >
                Destination.
              </motion.div>
            </h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
              className="text-lg md:text-xl text-gray-400 mb-10 font-sans font-light max-w-xl"
            >
              Experience uncompromising power with masterfully crafted, custom-built PCs for gamers, creators, and professionals.
            </motion.p>
            
            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2, type: 'spring', bounce: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <Link href="/build-pc" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500" />
                <Button className="relative w-full bg-white hover:bg-gray-50 text-gray-900 rounded-full px-10 h-16 text-lg font-bold transition-all hover:scale-105 hover:-translate-y-1 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                  Build Your Dream PC <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </Link>
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-full px-10 h-16 text-lg font-bold border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1">
                  Explore Components
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-16 flex items-center gap-8 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500 text-sm">★★★★★</div>
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">15+ Years</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">30K+ Customers</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Canvas Container (Right Side) */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto md:w-3/5 md:left-auto md:right-0">
          <Hero3D scrollProgress={scrollYProgress} isBooted={isBooted} />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-20 pointer-events-none"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Mouse className="h-6 w-6" />
          </motion.div>
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to Explore</span>
        </motion.div>

      </div>
    </section>
  );
}
