'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { usePCBuilderStore, PCComponent } from '@/store/usePCBuilderStore';
import { Search, Plus, Check, Trash2, AlertTriangle, Zap, Cpu, MessageCircle, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductsForPCBuilder } from '@/lib/actions/product.actions';
import { motion, AnimatePresence } from 'framer-motion';

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

  const searchResults = dbProducts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const compatibilityErrors = useMemo(() => {
    const errors: string[] = [];
    const cpu = selectedComponents['CPU'];
    const mobo = selectedComponents['Motherboard'];
    const ram = selectedComponents['RAM'];
    const psu = selectedComponents['PSU'];
    const gpu = selectedComponents['GPU'];

    if (cpu && mobo) {
      const cpuSocket = cpu.specs.socket;
      const moboSocket = mobo.specs.socket;
      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        errors.push(`Socket Mismatch: ${cpuSocket} CPU with ${moboSocket} Motherboard.`);
      }
    }
    if (cpu && ram) {
      const cpuSocket = cpu.specs.socket;
      const ramDdr = ram.specs.ddr;
      if (cpuSocket === 'AM5' && ramDdr === 'DDR4') {
        errors.push(`Memory Incompatible: AM5 strictly requires DDR5 RAM.`);
      }
    }
    if (psu) {
      let estimatedWattage = 50; 
      if (cpu) estimatedWattage += 150; 
      if (gpu) estimatedWattage += 350; 
      
      const psuWattageMatch = psu.specs.wattage?.match(/(\d+)/);
      if (psuWattageMatch) {
        const psuWattage = parseInt(psuWattageMatch[0]);
        const requiredWattage = estimatedWattage * 1.2;
        if (psuWattage < requiredWattage) {
          errors.push(`Insufficient Power: Need ~${Math.ceil(requiredWattage)}W, selected ${psuWattage}W.`);
        }
      }
    }
    return errors;
  }, [selectedComponents]);

  const handleWhatsAppInquiry = () => {
    let message = "Hello Charmila Computers,%0a%0aI want to build this Custom PC:%0a%0a";
    const allTypes = COMPONENT_GROUPS.flatMap(g => g.items);
    allTypes.forEach(type => {
      if (selectedComponents[type]) {
        message += `*${type}:* ${selectedComponents[type]?.name}%0a`;
      }
    });
    message += `%0a*Estimated Total:* ₹${totalPrice.toLocaleString('en-IN')}%0a%0aPlease send me a quotation and availability.`;
    window.open(`https://wa.me/919010177427?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#040812] relative flex justify-center py-24">
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#00D4FF] opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl h-full flex flex-col relative z-10 px-4 md:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2236] border border-[#1E2D45] mb-6"
          >
            <Hammer className="w-3 h-3 text-[#2563EB]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Configurator</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4"
          >
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#00D4FF]">Ultimate Machine</span>
          </motion.h1>
          <p className="text-sm text-[#64748B] max-w-lg mx-auto">Select components below. Our intelligent system will automatically check for compatibility bottlenecks.</p>
        </div>

        {/* Builder Interface */}
        <div className="rounded-[32px] border border-[#1E2D45] bg-[#0A0F1A]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col min-h-[600px]">
          
          {/* Universal Search Header */}
          <div className="p-6 md:p-8 border-b border-[#1E2D45] bg-[#0F1624] relative" ref={searchContainerRef}>
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2563EB] to-[#00D4FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-[#475569]" />
                <input 
                  type="text" 
                  placeholder="Search components (e.g. 'RTX 4090', 'B650', 'Ryzen 9')"
                  className="w-full h-14 rounded-xl border border-[#1E2D45] bg-[#0A0F1A] pl-12 pr-4 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 mt-4 left-0 right-0 mx-auto w-full max-w-2xl max-h-80 overflow-y-auto bg-[#0A0F1A] border border-[#1E2D45] rounded-xl shadow-2xl p-2 custom-scrollbar"
                >
                  {searchResults.length > 0 ? searchResults.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 hover:bg-[#1A2236] rounded-lg group transition-colors border border-transparent hover:border-[#2563EB]/30">
                      <div>
                        <p className="font-bold text-sm text-white">{item.name}</p>
                        <p className="text-xs font-medium tracking-wide text-[#00D4FF] mt-1 uppercase">{item.type} • ₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={selectedComponents[item.type]?.id === item.id ? "default" : "outline"}
                        className={selectedComponents[item.type]?.id === item.id 
                          ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]" 
                          : "border-[#1E2D45] text-white hover:bg-[#1A2236] hover:border-[#2563EB]"}
                        onClick={() => {
                          selectComponent(item.type, item);
                          setSearchQuery('');
                        }}
                      >
                        {selectedComponents[item.type]?.id === item.id ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </Button>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-[#475569] text-sm">No components found matching your search.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selected Components List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar relative">
            {COMPONENT_GROUPS.map(group => (
              <div key={group.title} className="space-y-4">
                <h2 className="text-xs font-black text-[#00D4FF] uppercase tracking-[0.3em] flex items-center gap-4">
                  {group.title}
                  <div className="h-px flex-1 bg-gradient-to-r from-[#1E2D45] to-transparent" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map(type => {
                    const selected = selectedComponents[type];
                    return (
                      <div key={type} className={`border rounded-2xl p-4 transition-all duration-300 relative overflow-hidden group ${selected ? 'border-[#2563EB]/50 bg-[#1A2236]/30' : 'border-[#1E2D45] bg-[#0F1624] hover:border-[#2563EB]/30'}`}>
                        {selected && <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />}
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors ${selected ? 'bg-gradient-to-br from-[#2563EB] to-[#00D4FF] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-[#1A2236] text-[#475569]'}`}>
                            {type.substring(0,3).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-[10px] uppercase tracking-widest text-[#64748B]">{type}</h3>
                            <p className={`text-sm font-medium truncate mt-0.5 ${selected ? 'text-white' : 'text-[#475569]'}`}>{selected ? selected.name : 'Choose Component'}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#1E2D45]/50 flex items-center justify-between">
                          {selected ? (
                            <>
                              <p className="font-black text-white text-base">₹{selected.price.toLocaleString('en-IN')}</p>
                              <Button variant="ghost" size="icon" onClick={() => removeComponent(type)} className="text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#EF4444] h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => setSearchQuery(type)} className="w-full h-8 text-xs bg-transparent border-[#1E2D45] text-white hover:bg-[#1A2236] hover:border-[#00D4FF] uppercase tracking-widest">
                              Select
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Compatibility Alerts */}
          <AnimatePresence>
            {compatibilityErrors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mx-6 md:mx-8 mb-6 overflow-hidden"
              >
                <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  <div className="flex items-center gap-2 text-[#EF4444] font-black text-sm uppercase tracking-wide mb-2">
                    <AlertTriangle className="h-4 w-4" /> Compatibility Issues
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {compatibilityErrors.map((error, idx) => (
                      <li key={idx} className="text-xs text-[#FCA5A5] font-medium">{error}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer actions */}
          <div className="p-6 md:p-8 border-t border-[#1E2D45] bg-[#0A0F1A] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] mb-1">Estimated Total</p>
              <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8]">₹{totalPrice.toLocaleString('en-IN')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="h-12 px-8 bg-transparent border-[#1E2D45] text-[#94A3B8] hover:text-white hover:bg-[#1A2236] hover:border-[#475569] uppercase font-bold tracking-widest text-xs" 
                onClick={clearBuild}
              >
                Clear
              </Button>
              <Button 
                className="relative h-12 px-8 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white hover:from-[#1DA851] hover:to-[#15803D] font-black uppercase tracking-widest text-xs transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(37,211,102,0.3)] disabled:opacity-50 disabled:grayscale" 
                onClick={handleWhatsAppInquiry}
                disabled={compatibilityErrors.length > 0}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Send Build to WhatsApp
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
