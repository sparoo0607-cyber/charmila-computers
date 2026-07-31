'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';

export function StoreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <main className="admin-theme flex-1 flex flex-col h-full bg-[#F8FAFC]">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      {/* pt offsets the fixed navbar height: ~48px header + 44px category bar = 92px desktop, 56px mobile */}
      <main className="flex-1 flex flex-col pb-16 md:pb-0 pt-[92px] md:pt-[92px]">
        {children}
      </main>
      <BottomNav />
      <Footer />
    </>
  );
}
