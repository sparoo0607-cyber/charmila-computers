'use client';

import Link from 'next/link';
import { Search, Headphones, Truck, Scale, Menu, Cpu, Monitor, HardDrive, Fan, Mouse, Wifi, Briefcase, Tag, Zap, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalSearch } from './GlobalSearch';
import { CompareBadge } from './CompareBadge';
import { NavMenu } from './NavMenu';
import { useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white border-b border-gray-100 flex flex-col font-sans">
      {/* Tier 2: Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="text-3xl font-extrabold tracking-tight">
            <span className="text-[#2563EB]">C</span>
            <span className="text-[#0F172A]">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#0F172A] leading-tight tracking-wide">CHARMILA COMPUTERS</span>
            <span className="text-[10px] text-gray-500 font-medium leading-tight">Tech. Trusted.</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl hidden lg:flex items-center">
          <GlobalSearch />
        </div>

        {/* Action Icons */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/support" className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2563EB] transition-colors group">
            <Headphones className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] font-medium">Support</span>
          </Link>
          <Link href="/compare" className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2563EB] transition-colors group relative">
            <Scale className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] font-medium">Compare</span>
            <CompareBadge />
          </Link>

          {/* User / Sign In */}
          <div className="w-px h-8 bg-gray-200 mx-2"></div>
          {session ? (
            <Link href="/admin" className="flex flex-col items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors group">
              <User className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[10px] font-bold">Admin</span>
            </Link>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#2563EB] transition-colors group">
              <User className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[10px] font-medium">Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Action Icons (Visible only on small screens) */}
        <div className="flex md:hidden items-center gap-4 ml-auto">
          {session ? (
            <Link href="/admin" className="text-blue-600">
              <User className="h-6 w-6" />
            </Link>
          ) : (
            <Link href="/login" className="text-gray-500 hover:text-blue-600">
              <User className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>

      {/* Tier 3: Category Nav */}
      <div className="border-t border-gray-100 hidden lg:block bg-white">
        <div className="container mx-auto px-4 h-14 flex items-center gap-8">
          {/* All Categories Dropdown */}
          <button className="bg-[#0F172A] hover:bg-slate-800 text-white px-5 h-10 rounded-full flex items-center gap-3 font-semibold text-sm transition-colors">
            <Menu className="h-4 w-4" />
            All Categories
          </button>

          {/* Links */}
          <Suspense fallback={<div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />}>
            <NavMenu />
          </Suspense>

          {/* Build PC Button */}
          <Link href="/build-pc">
            <Button className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-full px-6 font-bold shadow-md hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200">
              <Zap className="mr-2 h-4 w-4 animate-pulse" />
              Build PC
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
