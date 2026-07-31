'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const FRAME_COUNT = 232;
const preloadedImages: HTMLImageElement[] = [];

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/images/hero-sequence/ezgif-frame-${paddedIndex}.jpg`;
};

// Each slide: headline, sub, accent color
const SLIDES = [
  {
    eyebrow: 'Charmila Computers',
    headline: ['UNLEASH', 'THE BEAST'],
    sub: 'RTX 4090 · Intel 14th Gen · In Stock Now',
    accent: '#2563EB',
  },
  {
    eyebrow: 'Performance',
    headline: ['ZERO', 'LIMITS'],
    sub: 'DDR5 RAM · NVMe SSD · Liquid Cooling',
    accent: '#00D4FF',
  },
  {
    eyebrow: 'Expert Assembly',
    headline: ['YOUR BUILD,', 'OUR CRAFT'],
    sub: 'Custom Gaming PCs built by professionals',
    accent: '#A78BFA',
  },
  {
    eyebrow: 'Tirupati's #1 PC Store',
    headline: ['GET YOURS', 'TODAY'],
    sub: 'Walk in or order via WhatsApp — same day advice',
    accent: '#22C55E',
    cta: true,
  },
];

export const ScrollytellingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Preload frames in batches ──────────────────────────
  useEffect(() => {
    let loadedCount = 0;

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (index === 1 && canvasRef.current) renderFrame(1);
          resolve();
        };
        img.onerror = () => resolve();
        preloadedImages[index] = img;
      });

    const run = async () => {
      await loadImage(1);
      const BATCH = 8;
      for (let i = 2; i <= FRAME_COUNT; i += BATCH) {
        const batch: Promise<void>[] = [];
        for (let j = 0; j < BATCH && i + j <= FRAME_COUNT; j++) {
          batch.push(loadImage(i + j));
        }
        await Promise.all(batch);
      }
    };
    run();
  }, []);

  // ── Render canvas frame ────────────────────────────────
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = preloadedImages[index];
    if (!img) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  };

  // ── Drive canvas from scroll ───────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(latest * (FRAME_COUNT - 1)) + 1));
    requestAnimationFrame(() => renderFrame(frameIndex));

    // Determine active slide from scroll position
    const slideIndex = Math.min(SLIDES.length - 1, Math.floor(latest * SLIDES.length));
    setActiveSlide(slideIndex);
  });

  // ── Resize handler ─────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      const latest = scrollYProgress.get();
      const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.floor(latest * (FRAME_COUNT - 1)) + 1));
      renderFrame(frameIndex);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollYProgress]);

  // ── Per-slide scroll transforms ────────────────────────
  // Slide 0: 0–0.25
  const op0 = useTransform(scrollYProgress, [0, 0.04, 0.2, 0.25], [0, 1, 1, 0]);
  const x0  = useTransform(scrollYProgress, [0, 0.04, 0.2, 0.25], [-60, 0, 0, 60]);

  // Slide 1: 0.25–0.5
  const op1 = useTransform(scrollYProgress, [0.25, 0.29, 0.45, 0.5], [0, 1, 1, 0]);
  const x1  = useTransform(scrollYProgress, [0.25, 0.29, 0.45, 0.5], [-60, 0, 0, 60]);

  // Slide 2: 0.5–0.75
  const op2 = useTransform(scrollYProgress, [0.5, 0.54, 0.7, 0.75], [0, 1, 1, 0]);
  const x2  = useTransform(scrollYProgress, [0.5, 0.54, 0.7, 0.75], [-60, 0, 0, 60]);

  // Slide 3: 0.75–1.0
  const op3 = useTransform(scrollYProgress, [0.75, 0.8, 1, 1], [0, 1, 1, 1]);
  const x3  = useTransform(scrollYProgress, [0.75, 0.8, 1, 1], [-60, 0, 0, 0]);

  const slides = [
    { opacity: op0, x: x0 },
    { opacity: op1, x: x1 },
    { opacity: op2, x: x2 },
    { opacity: op3, x: x3 },
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Dark vignette overlay — stronger on left for text legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Loading bar */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-[#1E2D45]">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
            />
          </div>
        )}

        {/* Scroll progress indicator dots (right side) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full transition-all duration-500"
              style={{
                height: activeSlide === i ? 28 : 8,
                background: activeSlide === i ? SLIDES[i].accent : 'rgba(255,255,255,0.2)',
                boxShadow: activeSlide === i ? `0 0 8px ${SLIDES[i].accent}` : 'none',
              }}
            />
          ))}
        </div>

        {/* Text Overlays */}
        <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            {SLIDES.map((slide, i) => (
              <motion.div
                key={i}
                style={{ opacity: slides[i].opacity, x: slides[i].x }}
                className="absolute"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="h-px w-10 rounded-full"
                    style={{ background: slide.accent }}
                  />
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.4em]"
                    style={{ color: slide.accent }}
                  >
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Headline */}
                <div className="mb-5">
                  {slide.headline.map((line, li) => (
                    <h1
                      key={li}
                      className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white"
                      style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}
                    >
                      {line}
                    </h1>
                  ))}
                </div>

                {/* Sub line */}
                <p className="text-sm md:text-base text-white/60 font-medium tracking-wide mb-8 max-w-md">
                  {slide.sub}
                </p>

                {/* CTA on last slide */}
                {slide.cta && (
                  <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
                    <a
                      href="https://wa.me/919010177427?text=Hello%20Charmila%20Computers!%20I%20want%20to%20order."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EB35B] text-white text-sm font-black px-8 py-4 rounded-xl uppercase tracking-wider transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 group"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Order on WhatsApp
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="/products"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white text-sm font-bold px-8 py-4 rounded-xl uppercase tracking-wider transition-all"
                    >
                      Browse Products
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint — only at very top */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
};
