'use client';

import Link from 'next/link';
import { Search, Headphones, Scale, Menu, Zap, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalSearch } from './GlobalSearch';
import { CompareBadge } from './CompareBadge';
import { NavMenu } from './NavMenu';
import { useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useScrolled } from '@/lib/hooks/useScrolled';

export function Navbar() {
  const { data: session } = useSession();
  const scrolled = useScrolled(20);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${
        scrolled
          ? 'bg-[#080C14]/90 backdrop-blur-xl border-b border-[#1E2D45] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Main Header Row */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:shadow-[0_0_25px_rgba(37,99,235,0.9)] transition-shadow">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-white uppercase tracking-widest leading-tight">Charmila</span>
            <span className="text-[10px] text-[#00D4FF] font-semibold tracking-[0.2em] uppercase">Computers</span>
          </div>
        </Link>

        {/* Search Bar — Desktop */}
        <div className="flex-1 max-w-2xl hidden lg:flex items-center">
          <GlobalSearch />
        </div>

        {/* Action Icons — Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/support" className="flex flex-col items-center gap-0.5 text-[#94A3B8] hover:text-[#00D4FF] transition-colors group">
            <Headphones className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">Support</span>
          </Link>
          <Link href="/compare" className="flex flex-col items-center gap-0.5 text-[#94A3B8] hover:text-[#00D4FF] transition-colors group relative">
            <Scale className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">Compare</span>
            <CompareBadge />
          </Link>
          <div className="w-px h-6 bg-[#1E2D45]" />
          {session ? (
            <Link href="/admin" className="flex flex-col items-center gap-0.5 text-[#2563EB] hover:text-[#60A5FA] transition-colors group">
              <User className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Admin</span>
            </Link>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-0.5 text-[#94A3B8] hover:text-[#00D4FF] transition-colors group">
              <User className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[9px] font-semibold uppercase tracking-wider">Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-3 ml-auto">
          {session ? (
            <Link href="/admin" className="text-[#2563EB]"><User className="h-6 w-6" /></Link>
          ) : (
            <Link href="/login" className="text-[#94A3B8] hover:text-white"><User className="h-6 w-6" /></Link>
          )}
        </div>
      </div>

      {/* Category Nav Row — Desktop only */}
      <div className="hidden lg:block border-t border-[#1E2D45]/60">
        <div className="container mx-auto px-4 h-11 flex items-center gap-6">
          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 h-8 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Menu className="h-3.5 w-3.5" />
            All Categories
          </button>

          <Suspense fallback={<div className="h-4 w-20 bg-[#1A2236] rounded animate-pulse" />}>
            <NavMenu />
          </Suspense>

          <div className="ml-auto">
            <Link href="/build-pc">
              <Button className="bg-gradient-to-r from-[#2563EB] to-[#00D4FF] hover:from-[#1D4ED8] hover:to-[#00BAE6] text-white rounded-full px-6 h-8 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.35)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-200">
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                Build PC
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
