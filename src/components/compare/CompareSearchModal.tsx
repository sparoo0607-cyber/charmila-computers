'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { getAllProducts } from '@/lib/actions/product.actions';
import Image from 'next/image';
import { useCompareStore } from '@/store/useCompareStore';

export function CompareSearchModal({ isOpen, onClose, categorySlug }: { isOpen: boolean, onClose: () => void, categorySlug: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem, items } = useCompareStore();
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fetch with debounce
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        try {
          // Lock search to the specific category being compared!
          const data = await getAllProducts({ search: query.trim(), category: categorySlug });
          setResults(data);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      } else {
        setResults([]);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, categorySlug]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4">
      <div 
        ref={modalRef} 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="p-4 border-b border-gray-100 flex items-center relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-8" />
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product to add to comparison..." 
            className="w-full h-12 pl-12 pr-12 text-lg focus:outline-none placeholder:text-gray-300"
          />
          <button onClick={onClose} className="absolute right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 font-medium">Searching...</div>
          ) : query.trim().length > 0 && results.length === 0 ? (
            <div className="p-8 text-center text-gray-400 font-medium">No products found matching "{query}"</div>
          ) : query.trim().length === 0 ? (
            <div className="p-8 text-center text-gray-400 font-medium">Start typing to search...</div>
          ) : (
            results.map(product => {
              const images = JSON.parse(product.images);
              const isAlreadyAdded = items.some(i => i.id === product.id);
              
              return (
                <div key={product.id} className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${isAlreadyAdded ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div className="relative h-14 w-14 bg-white border border-gray-100 rounded-xl p-1 flex-shrink-0">
                      <Image src={images[0]} alt={product.name} fill className="object-contain p-2 mix-blend-multiply" />
                    </div>
                    <div className="truncate">
                      <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                      <p className="text-sm font-medium text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  
                  {isAlreadyAdded ? (
                    <span className="text-xs font-bold text-gray-400 bg-gray-200 px-3 py-1.5 rounded-full ml-4">Already Added</span>
                  ) : (
                    <button 
                      onClick={() => {
                        addItem({
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: images[0],
                          category: { name: product.category.name, slug: product.category.slug },
                          brand: { name: product.brand?.name || 'Unknown' },
                          attributes: product.attributes || '{}',
                        });
                        onClose();
                      }}
                      className="ml-4 flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl font-bold transition-colors"
                    >
                      <Plus className="h-4 w-4" /> Add
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
