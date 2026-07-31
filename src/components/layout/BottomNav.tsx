'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Scale, Headphones, Zap } from 'lucide-react';
import { CompareBadge } from './CompareBadge';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Categories', href: '/products', icon: LayoutGrid },
    { name: 'Compare', href: '/compare', icon: Scale, hasBadge: true },
    { name: 'Contact', href: '/support', icon: Headphones },
    { name: 'Build PC', href: '/build-pc', icon: Zap },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div className="relative">
              <Icon className={`h-5 w-5 ${isActive && item.name === 'Build PC' ? 'animate-pulse' : ''}`} />
              {item.hasBadge && <CompareBadge />}
            </div>
            <span className="text-[10px] font-medium leading-none">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
