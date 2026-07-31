'use client';

import Link from 'next/link';
import { Headphones, Scale, Menu, Zap, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalSearch } from './GlobalSearch';
import { CompareBadge } from './CompareBadge';
import { NavMenu } from './NavMenu';
import { MegaMenu } from './MegaMenu';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useScrolled } from '@/lib/hooks/useScrolled';

export function Navbar() {
  const { data: session } = useSession();
  const scrolled = useScrolled(20);

  return (
    <>
      {/* Top Gradient Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#00D4FF] to-[#A78BFA] z-[60]" />

      <header
        className={`w-full fixed top-1 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${
          scrolled
            ? 'bg-[#080C14]/80 backdrop-blur-xl border-b border-[#1E2D45]/80 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
            : 'bg-[#080C14]/50 backdrop-blur-md border-b border-[#1E2D45]/30'
        }`}
      >
        {/* Main Header Row */}
        <div className="container mx-auto px-4 pt-4 pb-2 lg:py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#00D4FF] shadow-[0_0_20px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] transition-all duration-300 group-hover:scale-105">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-white uppercase tracking-[0.15em] leading-tight group-hover:text-[#00D4FF] transition-colors">Charmila</span>
                <span className="text-[9px] text-[#94A3B8] font-bold tracking-[0.3em] uppercase">Computers</span>
              </div>
            </Link>

            {/* Search Bar — Desktop */}
            <div className="flex-1 max-w-2xl hidden lg:flex items-center">
              <GlobalSearch />
            </div>

            {/* Action Icons — Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/support" className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#00D4FF] transition-colors group">
                <div className="p-2 rounded-lg group-hover:bg-[#2563EB]/10 transition-colors">
                  <Headphones className="h-5 w-5" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest">Support</span>
              </Link>
              
              <Link href="/compare" className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#00D4FF] transition-colors group relative">
                <div className="p-2 rounded-lg group-hover:bg-[#2563EB]/10 transition-colors">
                  <Scale className="h-5 w-5" />
                  <CompareBadge />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest">Compare</span>
              </Link>
              
              <div className="w-px h-8 bg-[#1E2D45]" />
              
              {session ? (
                <Link href="/admin" className="flex flex-col items-center gap-1 text-[#2563EB] hover:text-[#00D4FF] transition-colors group">
                  <div className="p-2 rounded-lg bg-[#2563EB]/10 group-hover:bg-[#2563EB]/20 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Admin</span>
                </Link>
              ) : (
                <Link href="/login" className="flex flex-col items-center gap-1 text-[#64748B] hover:text-white transition-colors group">
                  <div className="p-2 rounded-lg group-hover:bg-[#1A2236] transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-4 ml-auto">
              {session ? (
                <Link href="/admin" className="text-[#2563EB]"><User className="h-6 w-6" /></Link>
              ) : (
                <Link href="/login" className="text-[#94A3B8] hover:text-white"><User className="h-6 w-6" /></Link>
              )}
            </div>
          </div>

          {/* Search Bar — Mobile */}
          <div className="lg:hidden w-full pb-2">
            <GlobalSearch />
          </div>
        </div>

        {/* Category Nav Row — Desktop only */}
        <div className="hidden lg:block border-t border-[#1E2D45]/50 bg-[#080C14]/40">
          <div className="container mx-auto px-4 h-12 flex items-center gap-6 relative">
            <MegaMenu />

            <Suspense fallback={<div className="h-4 w-20 bg-[#1A2236] rounded animate-pulse" />}>
              <NavMenu />
            </Suspense>

            <div className="ml-auto">
              <Link href="/build-pc">
                <Button className="bg-gradient-to-r from-[#2563EB] to-[#00D4FF] hover:from-[#1D4ED8] hover:to-[#00BAE6] text-white rounded-full px-6 h-8 font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:scale-105 active:scale-95 transition-all duration-200">
                  <Zap className="mr-1.5 h-3.5 w-3.5" />
                  Custom Build
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
