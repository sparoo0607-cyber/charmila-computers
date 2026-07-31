'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Flame, ArrowRight } from 'lucide-react';
import { getAllProducts } from '@/lib/actions/product.actions';
import Image from 'next/image';
import Link from 'next/link';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch recommendations with debounce
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        try {
          const results = await getAllProducts({ search: query.trim() });
          setRecommendations(results.slice(0, 4));
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      } else {
        setRecommendations([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchRecommendations();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative w-full flex items-center bg-[#0F1624] border border-[#1E2D45] rounded-full shadow-inner hover:border-[#2563EB]/50 transition-all duration-300 h-11 z-50 group">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search components, brands or products..." 
          className="w-full bg-transparent pl-5 pr-14 h-full text-sm text-white placeholder-[#475569] focus:outline-none rounded-full"
        />
        <div className="absolute right-1.5 flex items-center gap-2">
          <button type="submit" className="bg-[#1A2236] group-hover:bg-[#2563EB] text-[#64748B] group-hover:text-white p-2 rounded-full transition-all duration-300 flex items-center justify-center h-8 w-8 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Dropdown Menu */}
      {isFocused && (
        <div className="absolute top-14 left-0 w-full bg-[#0B1120]/95 backdrop-blur-2xl border border-[#1E2D45] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-40 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          
          {query.trim().length <= 1 && (
             <div className="p-5">
                <div className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-[#F59E0B]" /> Trending Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Intel Core i9', 'AMD Ryzen', 'NVIDIA', 'ASUS Motherboard'].map(term => (
                    <button 
                      key={term}
                      onClick={(e) => {
                        e.preventDefault();
                        setQuery(term);
                        router.push(`/products?search=${encodeURIComponent(term)}`);
                        setIsFocused(false);
                      }}
                      className="text-xs font-bold bg-[#1A2236] hover:bg-[#2563EB]/20 border border-transparent hover:border-[#2563EB]/40 text-[#94A3B8] hover:text-[#00D4FF] px-4 py-2 rounded-full transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
             </div>
          )}

          {query.trim().length > 1 && (
            <div className="p-3">
              <div className="px-3 pt-2 pb-2 text-[10px] font-black text-[#64748B] uppercase tracking-widest">
                {isLoading ? 'Searching Database...' : 'Matching Products'}
              </div>
              
              {!isLoading && recommendations.length === 0 && (
                <div className="p-6 text-center text-sm font-semibold text-[#64748B]">
                  No products found matching "{query}"
                </div>
              )}

              {recommendations.map(product => {
                const images = JSON.parse(product.images);
                return (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center gap-4 p-3 hover:bg-[#1A2236] rounded-xl transition-all group"
                  >
                    <div className="h-12 w-12 bg-[#080C14] rounded-lg border border-[#1E2D45] flex items-center justify-center p-1 relative flex-shrink-0 group-hover:border-[#2563EB]/50 transition-colors">
                      <Image src={images[0]} alt={product.name} fill className="object-contain p-1 drop-shadow-md" />
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <span className="text-sm font-bold text-white truncate group-hover:text-[#00D4FF] transition-colors">{product.name}</span>
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">{product.category.name}</span>
                    </div>
                    <div className="font-black text-sm text-[#00D4FF]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </Link>
                );
              })}

              {!isLoading && recommendations.length > 0 && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
                    setIsFocused(false);
                  }}
                  className="w-full mt-2 p-3 text-xs font-bold text-[#2563EB] hover:text-[#00D4FF] hover:bg-[#1A2236] rounded-xl flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider"
                >
                  View all results <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
