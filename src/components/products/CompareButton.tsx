'use client';

import { Scale, Check } from 'lucide-react';
import { useCompareStore, CompareProduct } from '@/store/useCompareStore';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CompareButton({ product }: { product: CompareProduct }) {
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
    <button 
      onClick={handleCompareClick}
      title={isCompared ? "Remove from Compare" : "Add to Compare"}
      className={`w-14 h-14 flex items-center justify-center rounded-xl border flex-shrink-0 transition-colors ${
        isCompared 
          ? 'border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-red-500 hover:border-red-200' 
          : 'border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50'
      }`}
    >
      {isCompared ? <Check className="h-6 w-6 pointer-events-none" /> : <Scale className="h-6 w-6 pointer-events-none" />}
    </button>
  );
}
