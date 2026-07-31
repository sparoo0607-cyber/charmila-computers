'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Timer, Zap } from 'lucide-react';

export function FlashDealsBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [stockPercentage, setStockPercentage] = useState(78); // 78% sold

  // Simple countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[24px] overflow-hidden border border-[#F59E0B]/30 bg-[#0F1624] shadow-[0_20px_50px_rgba(245,158,11,0.15)]">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1200] via-[#0F1624] to-[#1A1200]" />
          <motion.div 
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -left-[10%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-[#F59E0B]/10 to-transparent rotate-12 blur-3xl pointer-events-none" 
          />
          
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 md:px-12 py-10 w-full">
            
            {/* Left Content */}
            <div className="flex items-start gap-5">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/40 flex-shrink-0">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-[#F59E0B] blur-xl opacity-30"
                />
                <Flame className="h-8 w-8 text-[#F59E0B]" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-[#F59E0B] mb-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                  <Zap className="h-3 w-3" /> Flash Deal
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight tracking-tight mb-2">
                  Up To 25% Off Premium Components
                </h3>
                <p className="text-sm text-[#94A3B8] max-w-xl">
                  Limited time discounts on top-tier RAM, ultra-fast NVMe SSDs, and AIO cooling systems. Prices drop, performance rises.
                </p>
              </div>
            </div>

            {/* Right Content - Timer & CTA */}
            <div className="flex flex-col gap-5 flex-shrink-0 w-full lg:w-auto">
              
              {/* Countdown Timer */}
              <div className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-[#F59E0B]" />
                <div className="flex gap-2">
                  {[
                    { value: timeLeft.hours, label: 'HRS' },
                    { value: timeLeft.minutes, label: 'MIN' },
                    { value: timeLeft.seconds, label: 'SEC' }
                  ].map((unit, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="bg-[#1A1200] border border-[#F59E0B]/30 rounded-lg px-3 py-2 min-w-[50px] text-center">
                        <span className="text-xl font-black text-white">{unit.value.toString().padStart(2, '0')}</span>
                      </div>
                      <span className="text-[9px] text-[#F59E0B] font-bold mt-1 tracking-widest">{unit.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar (Stock) */}
              <div className="w-full">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <span className="text-[#F59E0B]">Stock Remaining</span>
                  <span className="text-white">{100 - stockPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A2236] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stockPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-500 to-[#F59E0B] rounded-full"
                  />
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/products"
                className="w-full flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-black text-sm font-black px-8 py-4 rounded-xl uppercase tracking-wider hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all group mt-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                Claim Deal Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
