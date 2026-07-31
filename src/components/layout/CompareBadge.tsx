'use client';

import { useState, useEffect } from 'react';
import { useCompareStore } from '@/store/useCompareStore';

export function CompareBadge() {
  const items = useCompareStore(state => state.items);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || items.length === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
      {items.length}
    </div>
  );
}
