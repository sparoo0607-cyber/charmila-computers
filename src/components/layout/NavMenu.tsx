'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { name: 'All Products', href: '/products', matchFn: (p: string, s: URLSearchParams) => p === '/products' && !s.get('category') },
  { name: 'Processors', href: '/products?category=processors', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'processors' },
  { name: 'Motherboards', href: '/products?category=motherboards', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'motherboards' },
  { name: 'Graphics Cards', href: '/products?category=graphics-cards', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'graphics-cards' },
  { name: 'Memory', href: '/products?category=memory', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'memory' },
  { name: 'Storage', href: '/products?category=storage', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'storage' },
  { name: 'Power Supplies', href: '/products?category=power-supplies', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'power-supplies' },
  { name: 'Gears', href: '/products?category=peripherals', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'peripherals' },
  { name: 'Laptops', href: '/products?category=laptops', matchFn: (p: string, s: URLSearchParams) => s.get('category') === 'laptops' },
];

export function NavMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    // Find the active index
    const activeIndex = NAV_LINKS.findIndex(link => link.matchFn(pathname, searchParams));
    
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      const activeLink = linkRefs.current[activeIndex];
      if (activeLink) {
        setBubbleStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setBubbleStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [pathname, searchParams]);

  return (
    <nav ref={navRef} className="flex-1 flex items-center gap-1 text-sm font-semibold relative">
      {/* The Magic Bubble */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 h-8 bg-blue-50 rounded-full transition-all duration-300 ease-out z-0"
        style={{
          left: `${bubbleStyle.left}px`,
          width: `${bubbleStyle.width}px`,
          opacity: bubbleStyle.opacity,
        }}
      />

      {NAV_LINKS.map((link, idx) => {
        const isActive = link.matchFn(pathname, searchParams);
        return (
          <Link 
            key={link.name} 
            href={link.href}
            ref={(el) => { linkRefs.current[idx] = el }}
            className={`relative z-10 px-3 py-1.5 transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
