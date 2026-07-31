'use client';

import { useCompareStore } from '@/store/useCompareStore';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, PlusCircle, Scale } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CompareSearchModal } from '@/components/compare/CompareSearchModal';
import { WhatsAppBuyButton } from '@/components/products/WhatsAppBuyButton';

const ATTRIBUTE_LABELS: Record<string, string> = {
  type: 'Component Type',
  socket: 'Socket Type',
  ddr: 'Memory Generation',
  wattage: 'Power Output',
  customDescription: 'Additional Specs'
};

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white p-6 rounded-full inline-block mb-6 shadow-sm border border-gray-100">
            <Scale className="h-12 w-12 text-gray-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Compare Products</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't selected any products to compare yet. Browse our products and click the compare icon to add them here.</p>
          <Link href="/products">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-bold">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Safely parse attributes
  const parseAttributes = (attrStr: string | undefined | null) => {
    if (!attrStr) return {};
    try {
      return JSON.parse(attrStr);
    } catch (e) {
      return {};
    }
  };

  // Get all unique attribute keys across all compared products
  const allAttributeKeys = Array.from(new Set(
    items.flatMap(item => Object.keys(parseAttributes(item.attributes)))
  ));

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">Compare Products</h1>
           <Button variant="outline" onClick={clearCompare} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
             Clear All
           </Button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr>
                <th className="w-48 p-6 bg-gray-50 border-b border-r border-gray-100 font-bold text-gray-900 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Items</div>
                  {items.length} Products
                </th>
                {items.map(item => (
                  <th key={item.id} className="w-72 p-6 border-b border-r border-gray-100 relative group">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 z-50 bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 p-1.5 rounded-full shadow-sm transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative h-40 w-full mb-4 bg-gray-50 rounded-xl p-4">
                      <Image src={item.image} alt={item.name} fill className="object-contain mix-blend-multiply p-2" />
                    </div>
                    <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">{item.brand?.name || 'Unknown'}</div>
                    <Link href={`/products/${item.slug}`} className="hover:text-blue-600 transition-colors">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{item.name}</h3>
                    </Link>
                    <div className="text-2xl font-black text-gray-900 mb-4">₹{(item.price || 0).toLocaleString('en-IN')}</div>
                    <div className="flex flex-col gap-2">

                      <WhatsAppBuyButton 
                        productName={item.name} 
                        price={item.price}
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                      />
                    </div>
                  </th>
                ))}
                <th className="w-72 p-6 border-b border-gray-100 bg-gray-50/50 min-w-[288px]">
                  <button 
                    onClick={() => setIsSearchModalOpen(true)}
                    className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:bg-blue-50 transition-colors group text-center cursor-pointer min-h-[300px]"
                  >
                    <PlusCircle className="h-8 w-8 text-gray-300 group-hover:text-blue-500 mb-2 transition-colors" />
                    <span className="text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">Add Product</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Category Row */}
              <tr>
                <td className="p-4 bg-gray-50 border-b border-r border-gray-100 font-semibold text-gray-600 text-sm sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Category
                </td>
                {items.map(item => (
                  <td key={item.id} className="p-4 border-b border-r border-gray-100 text-sm font-medium text-gray-900">
                    {item.category?.name || 'Unknown'}
                  </td>
                ))}
                <td className="border-b border-gray-100 bg-gray-50/50"></td>
              </tr>

              {/* Dynamic Attributes Rows */}
              {allAttributeKeys.map((key, index) => (
                <tr key={key}>
                  <td className="p-4 bg-gray-50 border-b border-r border-gray-100 font-semibold text-gray-600 text-sm sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    {ATTRIBUTE_LABELS[key] || (key.charAt(0).toUpperCase() + key.slice(1))}
                  </td>
                  {items.map(item => {
                    const attrs = parseAttributes(item.attributes);
                    return (
                      <td key={item.id} className="p-4 border-b border-r border-gray-100 text-sm text-gray-900">
                        {attrs[key] ? (
                          <span className="font-medium">{attrs[key]}</span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="border-b border-gray-100 bg-gray-50/50"></td>
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
