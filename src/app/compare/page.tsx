'use client';

import { useCompareStore } from '@/store/useCompareStore';
import Link from 'next/link';
import Image from 'next/image';
import { X, PlusCircle, Scale, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CompareSearchModal } from '@/components/compare/CompareSearchModal';
import { WhatsAppBuyButton } from '@/components/products/WhatsAppBuyButton';

const ATTRIBUTE_LABELS: Record<string, string> = {
  type: 'Component Type',
  socket: 'Socket Type',
  ddr: 'Memory Generation',
  wattage: 'Power Output',
  customDescription: 'Additional Specs',
};

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center py-16">
        <div className="text-center">
          <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-[#0F1624] border border-[#1E2D45] mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
            <Scale className="h-12 w-12 text-[#1E2D45]" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase mb-3">Compare Products</h1>
          <p className="text-sm text-[#475569] max-w-sm mx-auto mb-8 leading-relaxed">
            You haven&apos;t selected any products to compare yet. Browse our catalog and click the compare icon.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-sm font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95 uppercase tracking-wider group"
          >
            Browse Products
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const parseAttributes = (attrStr: string | undefined | null) => {
    if (!attrStr) return {};
    try { return JSON.parse(attrStr); } catch { return {}; }
  };

  const allAttributeKeys = Array.from(new Set(
    items.flatMap(item => Object.keys(parseAttributes(item.attributes)))
  ));

  return (
    <div className="min-h-screen bg-[#080C14] py-10">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#00D4FF] mb-1">Side by Side</span>
            <h1 className="text-3xl font-black text-white uppercase">Compare Products</h1>
          </div>
          <button
            onClick={clearCompare}
            className="text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 bg-red-500/10 hover:bg-red-500/15 px-4 py-2 rounded-xl transition-all"
          >
            Clear All
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#1E2D45] bg-[#0F1624] overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr>
                {/* Row label header */}
                <th className="w-44 p-5 bg-[#080C14] border-b border-r border-[#1E2D45] sticky left-0 z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#475569] block mb-1">Comparing</span>
                  <span className="text-sm font-bold text-[#94A3B8]">{items.length} Products</span>
                </th>
                {/* Product columns */}
                {items.map(item => (
                  <th key={item.id} className="w-72 p-5 border-b border-r border-[#1E2D45] relative group min-w-[280px]">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 z-50 bg-[#1A2236] hover:bg-red-500/20 text-[#475569] hover:text-red-400 p-1.5 rounded-full border border-[#1E2D45] hover:border-red-500/30 transition-all"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <div className="relative h-36 w-full mb-4 bg-[#080C14] rounded-xl border border-[#1E2D45] overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-3" />
                    </div>
                    <div className="text-[10px] font-black text-[#2563EB] tracking-[0.2em] uppercase mb-1.5">{item.brand?.name || 'Unknown'}</div>
                    <Link href={`/products/${item.slug}`} className="hover:text-[#00D4FF] transition-colors">
                      <h3 className="font-bold text-white text-sm mb-2 line-clamp-2 leading-snug">{item.name}</h3>
                    </Link>
                    <div className="text-xl font-black text-white mb-4 tracking-tight">₹{(item.price || 0).toLocaleString('en-IN')}</div>
                    <WhatsAppBuyButton
                      productName={item.name}
                      price={item.price}
                      className="w-full bg-[#25D366] hover:bg-[#1EB35B] text-white rounded-xl text-xs shadow-[0_0_12px_rgba(37,211,102,0.2)] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all"
                    />
                  </th>
                ))}
                {/* Add product column */}
                <th className="w-72 p-5 border-b border-[#1E2D45] bg-[#080C14]/50 min-w-[280px]">
                  <button
                    onClick={() => setIsSearchModalOpen(true)}
                    className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-[#1E2D45] rounded-2xl p-8 hover:border-[#2563EB]/60 hover:bg-[#2563EB]/5 transition-all group min-h-[280px] cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0F1624] border border-[#1E2D45] group-hover:border-[#2563EB]/50 flex items-center justify-center mb-3 transition-all">
                      <PlusCircle className="h-6 w-6 text-[#334155] group-hover:text-[#2563EB] transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-[#475569] group-hover:text-[#2563EB] transition-colors uppercase tracking-wider">Add Product</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Category Row */}
              <tr>
                <td className="p-4 bg-[#080C14] border-b border-r border-[#1E2D45] text-[10px] font-black uppercase tracking-[0.2em] text-[#475569] sticky left-0 z-10">Category</td>
                {items.map(item => (
                  <td key={item.id} className="p-4 border-b border-r border-[#1E2D45] text-sm font-semibold text-[#94A3B8]">
                    {item.category?.name || 'Unknown'}
                  </td>
                ))}
                <td className="border-b border-[#1E2D45] bg-[#080C14]/50" />
              </tr>
              {/* Attribute Rows */}
              {allAttributeKeys.map(key => (
                <tr key={key} className="hover:bg-[#2563EB]/5 transition-colors">
                  <td className="p-4 bg-[#080C14] border-b border-r border-[#1E2D45] text-[10px] font-black uppercase tracking-[0.2em] text-[#475569] sticky left-0 z-10">
                    {ATTRIBUTE_LABELS[key] || (key.charAt(0).toUpperCase() + key.slice(1))}
                  </td>
                  {items.map(item => {
                    const attrs = parseAttributes(item.attributes);
                    return (
                      <td key={item.id} className="p-4 border-b border-r border-[#1E2D45] text-sm">
                        {attrs[key] ? (
                          <span className="font-semibold text-[#94A3B8]">{attrs[key]}</span>
                        ) : (
                          <span className="text-[#334155]">—</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="border-b border-[#1E2D45] bg-[#080C14]/50" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CompareSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        categorySlug={items.length > 0 ? items[0].category.slug : ''}
      />
    </div>
  );
}
