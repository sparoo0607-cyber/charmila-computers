'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 232;

const preloadedImages: HTMLImageElement[] = [];

// Helper to format frame number
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/images/hero-sequence/ezgif-frame-${paddedIndex}.jpg`;
};

export const ScrollytellingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images sequentially in batches to prevent network bottleneck
  useEffect(() => {
    let loadedCount = 0;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          // Draw first frame as soon as it's loaded
          if (index === 1 && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) renderFrame(1);
          }
          resolve();
        };
        img.onerror = () => resolve(); // Resolve anyway on error
        preloadedImages[index] = img;
      });
    };

    const preloadSequentially = async () => {
      // Load frame 1 first for immediate display
      await loadImage(1);
      
      // Load remaining frames in small batches
      const BATCH_SIZE = 8;
      for (let i = 2; i <= FRAME_COUNT; i += BATCH_SIZE) {
        const batch = [];
        for (let j = 0; j < BATCH_SIZE && (i + j) <= FRAME_COUNT; j++) {
          batch.push(loadImage(i + j));
        }
        await Promise.all(batch);
      }
    };

    preloadSequentially();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = preloadedImages[index];
    if (!img) return;

    // Set canvas dimensions to window inner sizes
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw image to cover or contain (we will use 'cover' for a better hero experience)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio); // Use Math.max for cover, Math.min for contain
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw black background just in case
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate the frame index based on scroll progress (1 to 240)
    const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(latest * (FRAME_COUNT - 1)) + 1));
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Resize handler to redraw current frame
  useEffect(() => {
    const handleResize = () => {
      const latest = scrollYProgress.get();
      const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(latest * (FRAME_COUNT - 1)) + 1));
      renderFrame(frameIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollYProgress]);


  // Text Overlay Opacities and Y transforms based on scroll progress
  // Section 1
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.45], [50, -50]);

  // Section 3
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.7], [50, -50]);

  // Section 4
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 1, 1], [0, 1, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas for Image Sequence */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* Loading Indicator */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute top-4 right-4 z-50 text-white text-xs bg-black/50 px-2 py-1 rounded">
            Loading... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        )}

        {/* Text Overlays Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center text-white px-6 text-center">

          {/* Scene 1 — Power */}
          <motion.div initial={{ opacity: 1 }} style={{ opacity: opacity1, y: y1 }} className="absolute flex flex-col items-center gap-4 w-full">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.8)]">Charmila Computers · Tirupati</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.1] md:leading-none tracking-tighter text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
              Build the<br/>
              <span style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #00D4FF 50%, #A78BFA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ultimate</span><br/>
              Machine.
            </h1>
          </motion.div>

          {/* Scene 2 — GPU */}
          <motion.div initial={{ opacity: 0 }} style={{ opacity: opacity2, y: y2 }} className="absolute flex flex-col items-center gap-4 w-full">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#F59E0B] drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">Graphics · RTX 4090</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.1] md:leading-none tracking-tighter text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
              Raw Power.<br/>
              <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Zero Limits.</span>
            </h2>
          </motion.div>

          {/* Scene 3 — Performance */}
          <motion.div initial={{ opacity: 0 }} style={{ opacity: opacity3, y: y3 }} className="absolute flex flex-col items-center gap-4 w-full">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#22C55E] drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]">Expert Assembly · 15+ Years</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.1] md:leading-none tracking-tighter text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
              Precision<br/>
              <span style={{ background: 'linear-gradient(135deg, #22C55E 0%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Engineered.</span>
            </h2>
          </motion.div>

          {/* Scene 4 — CTA */}
          <motion.div initial={{ opacity: 0 }} style={{ opacity: opacity4, y: y4 }} className="absolute flex flex-col items-center gap-6 w-full">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.8)]">Custom PC · Gaming · Workstation</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.1] md:leading-[0.95] tracking-tighter text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
              Your Dream PC.<br/>
              <span style={{ background: 'linear-gradient(135deg, #2563EB 0%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We Build It.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto mt-2">
              <a
                href="/build-pc"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#00D4FF] text-white font-black py-4 px-8 md:px-10 rounded-2xl text-sm md:text-base uppercase tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:shadow-[0_0_50px_rgba(37,99,235,0.9)] hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Build My PC
              </a>
              <a
                href="https://wa.me/919010177427?text=Hi!%20I%20want%20to%20build%20a%20custom%20PC."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl text-sm md:text-base border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
