import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Camera, ExternalLink, Zap, ChevronRight } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'All Products', href: '/products' },
  { label: 'Build Your PC', href: '/build-pc' },
  { label: 'Compare Products', href: '/compare' },
  { label: 'Support & Services', href: '/support' },
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
    <footer className="w-full bg-[#040812] relative overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#2563EB] opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Column */}
          <div className="space-y-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white uppercase tracking-widest leading-tight">Charmila</span>
                <span className="text-[10px] text-[#00D4FF] font-semibold tracking-[0.2em] uppercase">Computers</span>
              </div>
            </Link>
            <p className="text-sm text-[#475569] leading-relaxed max-w-xs">
              Premium computer hardware, custom PC builds, and expert technology services — trusted in Tirupati since 2010.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/919010177427"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0F1624] border border-[#1E2D45] text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200 hover:shadow-[0_0_12px_rgba(37,211,102,0.4)]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0F1624] border border-[#1E2D45] text-[#E1306C] hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white hover:border-transparent transition-all duration-200 hover:shadow-[0_0_12px_rgba(225,48,108,0.4)]"
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="https://www.google.com/maps/place/Charmilas+Computer+Store"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0F1624] border border-[#1E2D45] text-[#4285F4] hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] transition-all duration-200 hover:shadow-[0_0_12px_rgba(66,133,244,0.4)]"
                aria-label="Google Maps"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#475569] hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 text-[#1E2D45] group-hover:text-[#2563EB] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-5">Categories</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="group flex items-center gap-1.5 text-sm text-[#475569] hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 text-[#1E2D45] group-hover:text-[#2563EB] transition-colors" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.google.com/maps/place/Charmilas+Computer+Store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 text-sm text-[#475569] hover:text-white transition-colors group"
                >
                  <MapPin className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>Sri Venkateswara Complex, Beside RTC Bus Stand, Tirupati</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919010177427"
                  className="flex items-center gap-2.5 text-sm text-[#475569] hover:text-white transition-colors group"
                >
                  <Phone className="h-4 w-4 text-[#2563EB] flex-shrink-0" />
                  <span>+91 9010177427</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@charmilacomputers.com"
                  className="flex items-center gap-2.5 text-sm text-[#475569] hover:text-white transition-colors group"
                >
                  <Mail className="h-4 w-4 text-[#2563EB] flex-shrink-0" />
                  <span>support@charmilacomputers.com</span>
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919010177427?text=Hello%20Charmila%20Computers!%20I%20need%20help."
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EB35B] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#0F1624] flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#334155]">
          <p>© {new Date().getFullYear()} Charmila Computers. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#00D4FF] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#00D4FF] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
