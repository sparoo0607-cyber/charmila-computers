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
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center text-white px-4 text-center">
          
          {/* Text 1 */}
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Future Ready Beast
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300">
              Unleash the RTX 4090.
            </p>
          </motion.div>

          {/* Text 2 */}
          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-lg">
              Maximum Cooling
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-200">
              Zero Bottlenecks. 100% Performance.
            </p>
          </motion.div>

          {/* Text 3 */}
          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-lg">
              Precision Engineered
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-200">
              Crafted for the elite gamer.
            </p>
          </motion.div>

          {/* Text 4 */}
          <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Your Dream Build, Delivered
            </h2>
            <a 
              href="https://wa.me/919010177427?text=Hello,%20I'd%20like%20to%20buy%20the%20RTX%204090%20SUPRIM%20X" 
              target="_blank" 
              rel="noreferrer"
              className="pointer-events-auto bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105"
            >
              Order Now
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
