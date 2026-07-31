'use client';

import { Scale, Check } from 'lucide-react';
import { useCompareStore, CompareProduct } from '@/store/useCompareStore';
import { useState, useEffect } from 'react';

export function ProductCardActions({ product }: { product: CompareProduct }) {
  const { items, addItem, removeItem } = useCompareStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isCompared = mounted ? items.some(item => item.id === product.id) : false;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={handleCompareClick}
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
          isCompared 
            ? 'border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-red-500 hover:border-red-200' 
            : 'border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50'
        }`}
        title={isCompared ? "Remove from Compare" : "Add to Compare"}
      >
        {isCompared ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
      </button>
    </div>
  );
}
