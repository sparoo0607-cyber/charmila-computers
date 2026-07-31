'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Scale, Headphones, Zap } from 'lucide-react';
import { CompareBadge } from './CompareBadge';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home',       href: '/',         icon: Home },
    { name: 'Shop',       href: '/products', icon: LayoutGrid },
    { name: 'Compare',    href: '/compare',  icon: Scale,      hasBadge: true },
    { name: 'Contact',    href: '/support',  icon: Headphones },
    { name: 'Build PC',   href: '/build-pc', icon: Zap },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#080C14]/95 backdrop-blur-xl border-t border-[#1E2D45] flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full gap-0.5 relative transition-colors ${
              isActive ? 'text-[#2563EB]' : 'text-[#475569] hover:text-[#94A3B8]'
            }`}
          >
            {/* Active indicator dot */}
            {isActive && (
              <div className="absolute top-1 w-1 h-1 rounded-full bg-[#2563EB] shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
            )}
            <div className="relative">
              <Icon className={`h-5 w-5 ${isActive && item.name === 'Build PC' ? 'animate-pulse' : ''}`} />
              {item.hasBadge && <CompareBadge />}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-[#2563EB]' : ''}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
