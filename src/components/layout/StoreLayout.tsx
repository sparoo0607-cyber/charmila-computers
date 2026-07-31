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
      <main className="flex-1 flex flex-col h-full bg-gray-50">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pb-16 md:pb-0">
        {children}
      </main>
      <BottomNav />
      <Footer />
    </>
  );
}
