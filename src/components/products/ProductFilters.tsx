'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Filter, Search, X } from 'lucide-react';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Local search for brands
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
    
    if (inStock) {
      params.set('inStock', 'true');
    } else {
      params.delete('inStock');
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }

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
    { name: 'Intel', slug: 'intel' },
    { name: 'AMD', slug: 'amd' },
    { name: 'NVIDIA', slug: 'nvidia' },
    { name: 'ASUS', slug: 'asus' },
    { name: 'MSI', slug: 'msi' },
    { name: 'Gigabyte', slug: 'gigabyte' },
    { name: 'Corsair', slug: 'corsair' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'G.Skill', slug: 'gskill' },
    { name: 'WD (Western Digital)', slug: 'wd' },
    { name: 'Cooler Master', slug: 'cooler-master' },
    { name: 'NZXT', slug: 'nzxt' },
    { name: 'Zotac', slug: 'zotac' },
    { name: 'EVGA', slug: 'evga' },
    { name: 'Lian Li', slug: 'lian-li' },
    { name: 'Deepcool', slug: 'deepcool' },
    { name: 'Kingston', slug: 'kingston' },
    { name: 'Crucial', slug: 'crucial' },
    { name: 'Seagate', slug: 'seagate' },
    { name: 'Phanteks', slug: 'phanteks' },
    { name: 'Fractal Design', slug: 'fractal-design' },
    { name: 'Thermaltake', slug: 'thermaltake' },
    { name: 'Be Quiet!', slug: 'be-quiet' },
    { name: 'Noctua', slug: 'noctua' },
    { name: 'ASRock', slug: 'asrock' },
    { name: 'PNY', slug: 'pny' },
    { name: 'Sapphire', slug: 'sapphire' },
    { name: 'PowerColor', slug: 'powercolor' },
    { name: 'XFX', slug: 'xfx' },
    { name: 'Inno3D', slug: 'inno3d' },
    { name: 'Palit', slug: 'palit' },
    { name: 'Galax', slug: 'galax' },
    { name: 'Colorful', slug: 'colorful' },
    { name: 'TEAMGROUP', slug: 'teamgroup' },
    { name: 'Patriot', slug: 'patriot' },
    { name: 'ADATA', slug: 'adata' },
    { name: 'XPG', slug: 'xpg' },
    { name: 'Lexar', slug: 'lexar' },
    { name: 'Sabrent', slug: 'sabrent' },
    { name: 'SK Hynix', slug: 'sk-hynix' },
    { name: 'Silicon Power', slug: 'silicon-power' },
    { name: 'Arctic', slug: 'arctic' },
    { name: 'Scythe', slug: 'scythe' },
    { name: 'Thermalright', slug: 'thermalright' },
    { name: 'SilverStone', slug: 'silverstone' },
    { name: 'Cougar', slug: 'cougar' },
    { name: 'Antec', slug: 'antec' },
    { name: 'FSP', slug: 'fsp' },
    { name: 'Seasonic', slug: 'seasonic' },
    { name: 'Super Flower', slug: 'super-flower' },
  ];

  const filteredBrands = allBrands.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()));

  return (
    <>
      <Button 
        variant="outline" 
        className="md:hidden w-full mb-4 flex items-center gap-2 justify-center border-gray-200"
        onClick={() => setIsMobileOpen(true)}
      >
        <Filter className="h-4 w-4" /> Show Filters
      </Button>

      <div className={`
        ${isMobileOpen ? 'fixed inset-0 z-[60] bg-white p-6 overflow-y-auto w-full h-full' : 'hidden md:block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24'}
      `}>
        {isMobileOpen && (
          <button 
            onClick={() => setIsMobileOpen(false)} 
            className="md:hidden absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2 font-bold text-lg mb-6 border-b border-gray-100 pb-4">
          <Filter className="h-5 w-5 text-blue-600" /> Filters
        </div>

      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Availability</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <input 
              type="checkbox" 
              className="rounded" 
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            /> 
            In Stock Only
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Price Range (₹)</h3>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 p-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
          />
          <span className="text-gray-400">-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 p-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Categories</h3>
        <div className="space-y-2 text-sm text-gray-600 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {categories.map(c => (
            <label key={c.slug} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={selectedCategories.includes(c.slug)}
                onChange={() => toggleCategory(c.slug)}
              /> 
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Brands</h3>
        </div>
        
        {/* Local Search for Brands */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-md outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2 text-sm text-gray-600 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {filteredBrands.length > 0 ? filteredBrands.map(b => (
            <label key={b.slug} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={selectedBrands.includes(b.slug)}
                onChange={() => toggleBrand(b.slug)}
              /> 
              {b.name}
            </label>
          )) : (
            <div className="text-xs text-gray-400 italic py-2">No brands found.</div>
          )}
        </div>
      </div>
      
      <Button 
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
    </>
  );
}
