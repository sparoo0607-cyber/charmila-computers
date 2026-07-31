'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');

  useEffect(() => {
    setSelectedCategories(searchParams.getAll('category'));
    setSelectedBrands(searchParams.getAll('brand'));
    setInStock(searchParams.get('inStock') === 'true');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const toggleBrand = (slug: string) => {
    setSelectedBrands(prev =>
      prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    selectedCategories.forEach(c => params.append('category', c));
    params.delete('brand');
    selectedBrands.forEach(b => params.append('brand', b));
    if (inStock) { params.set('inStock', 'true'); } else { params.delete('inStock'); }
    if (minPrice && !isNaN(Number(minPrice))) { params.set('minPrice', minPrice); } else { params.delete('minPrice'); }
    if (maxPrice && !isNaN(Number(maxPrice))) { params.set('maxPrice', maxPrice); } else { params.delete('maxPrice'); }
    router.push(`/products?${params.toString()}`);
    setIsMobileOpen(false);
  };

  const categories = [
    { name: 'Processors', slug: 'processors' },
    { name: 'Graphics Cards', slug: 'graphics-cards' },
    { name: 'Motherboards', slug: 'motherboards' },
    { name: 'Memory', slug: 'memory' },
    { name: 'Storage', slug: 'storage' },
    { name: 'Power Supplies', slug: 'power-supplies' },
    { name: 'Cabinets & Cases', slug: 'cases' },
    { name: 'Coolers', slug: 'coolers' },
    { name: 'Monitors', slug: 'monitors' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  const allBrands = [
    { name: 'Intel', slug: 'intel' }, { name: 'AMD', slug: 'amd' }, { name: 'NVIDIA', slug: 'nvidia' },
    { name: 'ASUS', slug: 'asus' }, { name: 'MSI', slug: 'msi' }, { name: 'Gigabyte', slug: 'gigabyte' },
    { name: 'Corsair', slug: 'corsair' }, { name: 'Samsung', slug: 'samsung' }, { name: 'G.Skill', slug: 'gskill' },
    { name: 'WD (Western Digital)', slug: 'wd' }, { name: 'Cooler Master', slug: 'cooler-master' },
    { name: 'NZXT', slug: 'nzxt' }, { name: 'Zotac', slug: 'zotac' }, { name: 'EVGA', slug: 'evga' },
    { name: 'Lian Li', slug: 'lian-li' }, { name: 'Deepcool', slug: 'deepcool' },
    { name: 'Kingston', slug: 'kingston' }, { name: 'Crucial', slug: 'crucial' },
    { name: 'Seagate', slug: 'seagate' }, { name: 'Thermaltake', slug: 'thermaltake' },
    { name: 'Noctua', slug: 'noctua' }, { name: 'ASRock', slug: 'asrock' },
    { name: 'Seasonic', slug: 'seasonic' }, { name: 'Be Quiet!', slug: 'be-quiet' },
  ];

  const filteredBrands = allBrands.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()));

  const totalActive = selectedCategories.length + selectedBrands.length + (inStock ? 1 : 0) + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);

  const panelClasses = isMobileOpen
    ? 'fixed inset-0 z-[60] bg-[#080C14] p-5 overflow-y-auto w-full h-full'
    : 'hidden md:block';

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden w-full mb-4 flex items-center justify-center gap-2 rounded-xl border border-[#1E2D45] bg-[#0F1624] text-[#94A3B8] hover:text-white py-2.5 text-sm font-bold transition-colors"
        onClick={() => setIsMobileOpen(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {totalActive > 0 && (
          <span className="ml-1 bg-[#2563EB] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
            {totalActive}
          </span>
        )}
      </button>

      <div className={panelClasses}>
        {/* Mobile Header */}
        {isMobileOpen && (
          <div className="flex items-center justify-between mb-6">
            <span className="font-black text-white text-lg">Filters</span>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-full bg-[#1A2236] text-[#94A3B8] hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Filter Panel */}
        <div className={`rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-5 sticky top-24 ${isMobileOpen ? 'rounded-none border-0' : ''}`}>
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#1E2D45]">
            <SlidersHorizontal className="h-4 w-4 text-[#2563EB]" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#94A3B8]">Filters</span>
            {totalActive > 0 && (
              <span className="ml-auto bg-[#2563EB]/20 text-[#2563EB] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#2563EB]/30">
                {totalActive} active
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="mb-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#475569] mb-3">Availability</h3>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${inStock ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#334155] bg-[#080C14]'}`}>
                {inStock && <span className="text-white text-[9px] font-black">✓</span>}
              </div>
              <input type="checkbox" className="sr-only" checked={inStock} onChange={e => setInStock(e.target.checked)} />
              <span className="text-sm text-[#64748B] group-hover:text-[#94A3B8] transition-colors">In Stock Only</span>
            </label>
          </div>

          {/* Price Range */}
          <div className="mb-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#475569] mb-3">Price Range (₹)</h3>
            <div className="flex items-center gap-2">
              <input
                type="number" placeholder="Min" value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-1/2 bg-[#080C14] border border-[#1E2D45] text-[#94A3B8] text-xs rounded-lg px-3 py-2 outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#334155]"
              />
              <span className="text-[#334155] text-xs">–</span>
              <input
                type="number" placeholder="Max" value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-1/2 bg-[#080C14] border border-[#1E2D45] text-[#94A3B8] text-xs rounded-lg px-3 py-2 outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#334155]"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#475569] mb-3">Categories</h3>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {categories.map(c => (
                <label key={c.slug} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedCategories.includes(c.slug) ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#334155] bg-[#080C14]'}`}>
                    {selectedCategories.includes(c.slug) && <span className="text-white text-[9px] font-black">✓</span>}
                  </div>
                  <input type="checkbox" className="sr-only" checked={selectedCategories.includes(c.slug)} onChange={() => toggleCategory(c.slug)} />
                  <span className="text-xs text-[#64748B] group-hover:text-[#94A3B8] transition-colors">{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#475569] mb-3">Brands</h3>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#334155]" />
              <input
                type="text" placeholder="Search brands..."
                value={brandSearch} onChange={e => setBrandSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-[#080C14] border border-[#1E2D45] text-[#94A3B8] rounded-lg outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#334155]"
              />
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {filteredBrands.length > 0 ? filteredBrands.map(b => (
                <label key={b.slug} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedBrands.includes(b.slug) ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#334155] bg-[#080C14]'}`}>
                    {selectedBrands.includes(b.slug) && <span className="text-white text-[9px] font-black">✓</span>}
                  </div>
                  <input type="checkbox" className="sr-only" checked={selectedBrands.includes(b.slug)} onChange={() => toggleBrand(b.slug)} />
                  <span className="text-xs text-[#64748B] group-hover:text-[#94A3B8] transition-colors">{b.name}</span>
                </label>
              )) : (
                <p className="text-xs text-[#334155] italic py-2">No brands found.</p>
              )}
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-[0.98]"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
