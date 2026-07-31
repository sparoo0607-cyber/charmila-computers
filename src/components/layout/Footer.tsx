'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Camera, ExternalLink, Zap, ChevronRight, Send, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const QUICK_LINKS = [
  { label: 'All Products', href: '/products' },
  { label: 'Build Your PC', href: '/build-pc' },
  { label: 'Compare Products', href: '/compare' },
  { label: 'Support & Services', href: '/support' },
  { label: 'Order Tracking', href: '/track' },
];

const CATEGORIES = [
  { label: 'Processors (CPU)', href: '/products?category=processors' },
  { label: 'Graphics Cards', href: '/products?category=graphics-cards' },
  { label: 'Motherboards', href: '/products?category=motherboards' },
  { label: 'Memory (RAM)', href: '/products?category=memory' },
  { label: 'Coolers', href: '/products?category=coolers' },
  { label: 'PC Cabinets', href: '/products?category=cabinets' },
];

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-[#040812] mt-24">
      {/* Animated Divider */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-50" />
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 top-0 h-[1px] w-1/3 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" 
      />

      {/* Grid bg & Glowing Orbs */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#A78BFA] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] mb-4 text-white"
          >
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#00D4FF]">Elite</span>
          </motion.h3>
          <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto">Subscribe to get exclusive access to drop alerts, massive discounts, and professional build guides.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2563EB] to-[#00D4FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="relative w-full h-14 bg-[#0F1624] border border-[#1E2D45] rounded-xl px-6 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors"
            />
            <Button className="relative h-14 px-8 rounded-xl bg-white text-black hover:bg-[#E8EAF0] font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
              Subscribe <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Social Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#00D4FF] shadow-[0_0_20px_rgba(37,99,235,0.4)] relative">
                <div className="relative w-8 h-8"><Image src="/images/icons/zap_icon_1785528634168.png" alt="Logo" fill className="object-contain" /></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white uppercase tracking-[0.2em] leading-none">Charmila</span>
                <span className="text-xs text-[#00D4FF] font-black tracking-[0.4em] uppercase mt-1">Computers</span>
              </div>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
              Engineered for the elite. We build the most powerful, beautiful, and reliable computer systems in Tirupati.
            </p>

            {/* Premium Social Cards */}
            <div className="flex gap-4 pt-4">
              <a href="https://wa.me/919010177427" className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0F1624] border border-[#1E2D45] hover:border-[#25D366] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(37,211,102,0.2)] relative">
                <div className="relative w-6 h-6"><Image src="/images/icons/chat_icon_1785528796689.png" alt="WhatsApp" fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" /></div>
              </a>
              <a href="#" className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0F1624] border border-[#1E2D45] hover:border-[#5865F2] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(88,101,242,0.2)] relative">
                <div className="relative w-6 h-6"><Image src="/images/icons/gamepad_icon_1785528831391.png" alt="Discord" fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" /></div>
              </a>
              <a href="#" className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0F1624] border border-[#1E2D45] hover:border-[#E1306C] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(225,48,108,0.2)] relative">
                <div className="relative w-6 h-6"><Image src="/images/icons/camera_icon_1785528871316.png" alt="Instagram" fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" /></div>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-[#64748B] hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563EB] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-6">Hardware</h4>
            <ul className="space-y-4">
              {CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm font-medium text-[#64748B] hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-[#2563EB] group-hover:w-3 transition-all duration-300" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-6">Store Location</h4>
            <div className="space-y-6">
              <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#0F1624] border border-[#1E2D45] flex items-center justify-center flex-shrink-0 group-hover:border-[#2563EB] transition-colors">
                  <MapPin className="h-4 w-4 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-1 group-hover:text-[#00D4FF] transition-colors">Headquarters</p>
                  <p className="text-xs text-[#64748B] leading-relaxed">Sri Venkateswara Complex,<br/>Beside RTC Bus Stand,<br/>Tirupati, AP</p>
                </div>
              </a>
              <a href="tel:+919010177427" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#0F1624] border border-[#1E2D45] flex items-center justify-center flex-shrink-0 group-hover:border-[#2563EB] transition-colors">
                  <Phone className="h-4 w-4 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-1 group-hover:text-[#00D4FF] transition-colors">Call Us</p>
                  <p className="text-xs text-[#64748B]">+91 9010177427</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E2D45]/50 flex flex-col md:flex-row justify-between items-center gap-4 pb-24 md:pb-0">
          <p className="text-xs font-medium text-[#475569] uppercase tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} Charmila Computers. Built for gamers.
          </p>
          <div className="flex gap-6 text-xs font-bold text-[#64748B] uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
