'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#080C14]">
      {/* Base Grid Texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Moving Radial Gradients */}
      <motion.div 
        animate={{ 
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#2563EB] blur-[150px] opacity-10"
      />

      <motion.div 
        animate={{ 
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#A78BFA] blur-[180px] opacity-10"
      />

      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, 50, -50, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#00D4FF] blur-[150px] opacity-10"
      />

      {/* Vignette Edge Darkening */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,12,20,0.8)_100%)]" />
    </div>
  );
}
