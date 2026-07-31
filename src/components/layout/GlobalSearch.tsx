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
      <form onSubmit={handleSearch} className="relative w-full flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:border-gray-300 transition-colors h-12 z-50">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search components, brands or products..." 
          className="w-full bg-transparent pl-6 pr-24 h-full text-sm text-gray-700 focus:outline-none rounded-full"
        />
        <div className="absolute right-1.5 flex items-center gap-2">
          <button type="submit" className="bg-[#2563EB] hover:bg-blue-700 text-white p-2 rounded-full transition-colors flex items-center justify-center h-9 w-9">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Dropdown Menu */}
      {isFocused && (
        <div className="absolute top-14 left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-40 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          
          {query.trim().length <= 1 && (
             <div className="p-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" /> Trending Searches
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
                      className="text-xs font-medium bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
             </div>
          )}

          {query.trim().length > 1 && (
            <div className="p-2">
              <div className="px-3 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {isLoading ? 'Searching...' : 'Products'}
              </div>
              
              {!isLoading && recommendations.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">
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
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                  >
                    <div className="h-12 w-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-1 relative flex-shrink-0">
                      <Image src={images[0]} alt={product.name} fill className="object-contain p-1 mix-blend-darken" />
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <span className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{product.name}</span>
                      <span className="text-xs text-gray-500">{product.category.name}</span>
                    </div>
                    <div className="font-black text-sm text-gray-900">
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
                  className="w-full mt-2 p-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl flex items-center justify-center gap-1 transition-colors"
                >
                  View all results <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
