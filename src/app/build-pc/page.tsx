'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { usePCBuilderStore, ComponentType, PCComponent } from '@/store/usePCBuilderStore';
import { Search, Info, Plus, Check, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductsForPCBuilder } from '@/lib/actions/product.actions';

const COMPONENT_GROUPS = [
  {
    title: 'Core Components',
    items: ['CPU', 'Motherboard', 'RAM', 'GPU', 'SSD', 'HDD', 'PSU', 'Cabinet', 'Cooler', 'Fans']
  },
  {
    title: 'Optional Components',
    items: ['Thermal Paste', 'Wi-Fi Adapter', 'RGB Accessories', 'Cable Extensions', 'Optical Drive']
  },
  {
    title: 'Peripherals',
    items: ['Monitor', 'Keyboard', 'Mouse', 'Headset', 'Webcam']
  }
];

export default function BuildPCPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dbProducts, setDbProducts] = useState<PCComponent[]>([]);
  const { selectedComponents, totalPrice, selectComponent, removeComponent, clearBuild } = usePCBuilderStore();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProducts() {
      const products = await getProductsForPCBuilder();
      setDbProducts(products);
    }
    loadProducts();
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Universal fuzzy search mock
  const searchResults = dbProducts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const compatibilityErrors = useMemo(() => {
    const errors: string[] = [];
    const cpu = selectedComponents['CPU'];
    const mobo = selectedComponents['Motherboard'];
    const ram = selectedComponents['RAM'];
    const gpu = selectedComponents['GPU'];
    const psu = selectedComponents['PSU'];

    // 1. Socket Matching
    if (cpu && mobo) {
      const cpuSocket = cpu.specs.socket;
      const moboSocket = mobo.specs.socket;
      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        errors.push(`Socket Mismatch: Your CPU requires an ${cpuSocket} motherboard, but you selected an ${moboSocket} motherboard.`);
      }
    }

    // 2. RAM DDR Version
    if (cpu && ram) {
      const cpuSocket = cpu.specs.socket;
      const ramDdr = ram.specs.ddr;
      if (cpuSocket === 'AM5' && ramDdr === 'DDR4') {
        errors.push(`Memory Incompatible: AM5 processors strictly require DDR5 RAM. You selected DDR4.`);
      }
    }

    // 3. PSU Wattage Estimation
    if (psu) {
      let estimatedWattage = 50; // base system overhead
      if (cpu) estimatedWattage += 150; // high-end cpu estimate
      if (gpu) estimatedWattage += 350; // high-end gpu estimate
      
      const psuWattageMatch = psu.specs.wattage?.match(/(\d+)/);
      if (psuWattageMatch) {
        const psuWattage = parseInt(psuWattageMatch[0]);
        // Require 20% overhead
        const requiredWattage = estimatedWattage * 1.2;
        if (psuWattage < requiredWattage) {
          errors.push(`Insufficient Power: Your build requires at least ${Math.ceil(requiredWattage)}W, but you selected a ${psuWattage}W power supply.`);
        }
      }
    }

    return errors;
  }, [selectedComponents]);

  const handleWhatsAppInquiry = () => {
    let message = "Hello Charmila Computers,%0a%0aI have configured the following PC:%0a%0a";
    const allTypes = COMPONENT_GROUPS.flatMap(g => g.items);
    allTypes.forEach(type => {
      if (selectedComponents[type]) {
        message += `*${type}:* ${selectedComponents[type]?.name}%0a`;
      }
    });
    message += `%0a*Estimated Price:* ₹${totalPrice.toLocaleString('en-IN')}%0a%0aPlease send me a quotation.`;
    
    window.open(`https://wa.me/919010177427?text=${message}`, '_blank');
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-background flex justify-center">
      {/* Builder Interface */}
      <div className="w-full max-w-5xl h-full flex flex-col bg-card border-x border-border shadow-2xl">
        {/* Universal Search */}
        <div className="p-6 border-b border-border bg-background relative" ref={searchContainerRef}>
          <h1 className="text-2xl font-bold mb-4">Build Your Custom PC</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search across all components (e.g., '4090', 'Ryzen 9', 'White B650')"
              className="w-full h-12 rounded-xl border-2 border-primary/20 bg-card pl-11 pr-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div className="absolute z-50 mt-2 w-full max-w-lg max-h-80 overflow-y-auto bg-popover border border-border rounded-xl shadow-2xl p-2">
              {searchResults.length > 0 ? searchResults.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-accent/10 rounded-lg group transition-colors">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type} • ₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant={selectedComponents[item.type]?.id === item.id ? "secondary" : "default"}
                    onClick={() => {
                      selectComponent(item.type, item);
                      setSearchQuery('');
                    }}
                  >
                    {selectedComponents[item.type]?.id === item.id ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>
              )) : (
                <div className="p-4 text-center text-muted-foreground">No components found.</div>
              )}
            </div>
          )}
        </div>

        {/* Selected Components List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {COMPONENT_GROUPS.map(group => (
            <div key={group.title} className="space-y-4">
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">{group.title}</h2>
              <div className="space-y-3">
                {group.items.map(type => {
                  const selected = selectedComponents[type];
                  return (
                    <div key={type} className={`border rounded-xl p-4 transition-all ${selected ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0 ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {type.substring(0,2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm text-muted-foreground">{type}</h3>
                            <p className="font-medium truncate">{selected ? selected.name : 'Not Selected'}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                          {selected && <p className="font-bold text-lg">₹{selected.price.toLocaleString('en-IN')}</p>}
                          {selected ? (
                            <Button variant="ghost" size="icon" onClick={() => removeComponent(type)} className="text-destructive hover:bg-destructive/10 hover:text-destructive flex-shrink-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => setSearchQuery(type)} className="w-full sm:w-auto">Choose</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Compatibility Alerts */}
        {compatibilityErrors.length > 0 && (
          <div className="p-4 mx-6 mb-6 rounded-xl bg-red-50 border border-red-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
              <AlertTriangle className="h-5 w-5" /> Compatibility Issues Detected
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {compatibilityErrors.map((error, idx) => (
                <li key={idx} className="text-sm text-red-700 font-medium">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer actions */}
        <div className="p-6 border-t border-border bg-background flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Estimated Total</p>
            <p className="text-3xl font-bold text-primary">₹{totalPrice.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" size="lg" className="flex-1 sm:flex-none text-red-500 hover:text-red-600 hover:bg-red-50" onClick={clearBuild}>Clear Build</Button>
            <Button 
              size="lg" 
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handleWhatsAppInquiry}
              disabled={compatibilityErrors.length > 0}
            >
              Request Quote on WhatsApp
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
