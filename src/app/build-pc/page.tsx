'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePCBuilderStore, PCComponent } from '@/store/usePCBuilderStore';
import { Search, Plus, Trash2, Printer, Share2, Download, MessageCircle, Link as LinkIcon, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductsForPCBuilder } from '@/lib/actions/product.actions';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const COMPONENT_CATEGORIES = [
  { id: 'CPU', name: 'Processor (CPU)', icon: '/images/products/intel_cpu_isolated_1785504512463.png' },
  { id: 'Cooler', name: 'Cooling System (CPU Cooler)', icon: '/images/products/aio_cooler_isolated_1785504617114.png' },
  { id: 'Motherboard', name: 'Motherboard', icon: '/images/products/gaming_motherboard_isolated_1785504525296.png' },
  { id: 'RAM', name: 'Memory (RAM)', icon: '/images/products/ddr5_ram_isolated_1785504561946.png' },
  { id: 'SSD', name: 'Solid State Drive (M.2/SATA)', icon: '/images/products/ssd_isolated_1785553958638.png' },
  { id: 'HDD', name: 'Hard Disk Drive (Internal HDD)', icon: '/images/products/ssd_isolated_1785553958638.png' },
  { id: 'GPU', name: 'Graphics Card (GPU/VGA)', icon: '/images/products/rtx_4090_isolated_1785504487639.png' },
  { id: 'PSU', name: 'Power Supply Unit (SMPS/PSU)', icon: '/images/products/psu_isolated_1785553976383.png' },
  { id: 'Cabinet', name: 'Cabinet (Case)', icon: '/images/products/pc_cabinet_isolated_1785504605408.png' },
  { id: 'Fans', name: 'Case Fans', icon: '/images/products/fans_isolated_1785553995392.png' },
  { id: 'Monitor', name: 'Monitor (Display)', icon: '/images/products/monitor_isolated_1785554012281.png' },
  { id: 'Keyboard', name: 'Keyboard', icon: '/images/icons/gamepad_icon_1785528938740.png' },
  { id: 'Mouse', name: 'Mouse (Mice)', icon: '/images/icons/gamepad_icon_1785528938740.png' },
  { id: 'Mousepad', name: 'Mouse Pad (Mat)', icon: '/images/icons/gamepad_icon_1785528938740.png' },
  { id: 'Headset', name: 'Headset (Headphones)', icon: '/images/icons/chat_icon_1785528796689.png' },
];

export default function BuildPCPage() {
  const [dbProducts, setDbProducts] = useState<PCComponent[]>([]);
  const { selectedComponents, totalPrice, selectComponent, removeComponent, clearBuild } = usePCBuilderStore();
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const products = await getProductsForPCBuilder();
      setDbProducts(products);
    }
    loadProducts();
  }, []);

  const estimatedWattage = useMemo(() => {
    let wattage = 50; 
    if (selectedComponents['CPU']) wattage += 150; 
    if (selectedComponents['GPU']) wattage += 350; 
    return wattage;
  }, [selectedComponents]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setSearchQuery('');
    }
  };

  const handleWhatsAppInquiry = () => {
    let message = "Hello Charmila Computers,%0a%0aI want to build this Custom PC:%0a%0a";
    COMPONENT_CATEGORIES.forEach(cat => {
      if (selectedComponents[cat.id]) {
        message += `*${cat.name}:* ${selectedComponents[cat.id]?.name}%0a`;
      }
    });
    message += `%0a*Estimated Total:* ₹${totalPrice.toLocaleString('en-IN')}%0a%0aPlease send me a quotation and availability.`;
    window.open(`https://wa.me/919010177427?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#040812] relative flex justify-center py-24 pb-32">
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] h-full flex flex-col relative z-10 px-4 md:px-8">
        
        {/* Header Title */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white mb-3">
            Custom PC Configurator - <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#00D4FF]">Choose Your PC Parts!</span>
          </h1>
          <p className="text-sm text-[#94A3B8] max-w-4xl leading-relaxed">
            The PC configurator is the perfect tool for you to choose one by one the parts of your computer and try different configurations and budgets. Assemble a computer by parts completely to your liking. Get your basic, gaming or professional desktop pc at the best price.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left Column: Accordion Table */}
          <div className="flex-1 w-full bg-[#0A0F1A] border border-[#1E2D45] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Table Header */}
            <div className="flex items-center justify-between p-4 bg-[#0F1624] border-b border-[#1E2D45] text-xs font-black uppercase tracking-widest text-[#94A3B8]">
              <div className="w-1/3 pl-4">Component</div>
              <div className="w-2/3 pl-4">Selection</div>
            </div>

            {/* Category Rows */}
            <div className="divide-y divide-[#1E2D45]">
              {COMPONENT_CATEGORIES.map(category => {
                const selected = selectedComponents[category.id];
                const isExpanded = expandedCategory === category.id;
                
                // Get products for this category
                const categoryProducts = dbProducts.filter(p => p.type === category.id);
                const filteredProducts = categoryProducts.filter(p => 
                  p.name.toLowerCase().includes(searchQuery.toLowerCase())
                );

                return (
                  <div key={category.id} className="flex flex-col bg-[#0A0F1A]">
                    {/* Main Row */}
                    <div 
                      className={`flex flex-col md:flex-row md:items-center p-4 transition-colors ${selected ? 'bg-[#1A2236]/20' : 'hover:bg-[#1A2236]/50'} ${isExpanded ? 'bg-[#1A2236]' : ''}`}
                    >
                      {/* Component Name Column */}
                      <div className="w-full md:w-1/3 flex items-center pl-4 mb-3 md:mb-0 gap-3">
                        <div className="w-8 h-8 relative opacity-60">
                          <Image src={category.icon} alt={category.name} fill className="object-contain" />
                        </div>
                        <span className="text-sm font-semibold text-white/90">{category.name}</span>
                      </div>

                      {/* Selection Column */}
                      <div className="w-full md:w-2/3 flex items-center justify-between pl-4">
                        {selected ? (
                          // Selected State
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1">
                                {selected.image ? (
                                  <Image src={selected.image} alt={selected.name} fill className="object-contain drop-shadow-lg" />
                                ) : (
                                  <div className="w-full h-full bg-[#1A2236] rounded" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#00D4FF]">{selected.name}</span>
                                <span className="text-xs font-medium text-white/50">₹{selected.price.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white h-8 rounded text-xs px-4"
                                onClick={() => toggleCategory(category.id)}
                              >
                                Change
                              </Button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); removeComponent(category.id); }}
                                className="w-8 h-8 flex items-center justify-center rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Unselected State
                          <div 
                            className="flex items-center justify-between w-full pr-4 cursor-pointer"
                            onClick={() => toggleCategory(category.id)}
                          >
                            <span className="text-sm text-[#94A3B8] font-medium">Choose {category.name}</span>
                            <div className="w-8 h-8 rounded-full border border-[#1E2D45] flex items-center justify-center text-[#94A3B8] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-colors">
                              <Plus className="w-4 h-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Content (Sub-table) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[#050810] border-t border-[#1E2D45]"
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#475569]" />
                                <input 
                                  type="text" 
                                  placeholder={`Search ${category.name}...`}
                                  className="w-full h-10 rounded-lg border border-[#1E2D45] bg-[#0A0F1A] pl-10 pr-4 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2563EB]"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                />
                              </div>
                              <button onClick={() => setExpandedCategory(null)} className="p-2 text-[#475569] hover:text-white">
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Sub-table */}
                            <div className="w-full overflow-x-auto rounded-xl border border-[#1E2D45]">
                              <table className="w-full text-left text-sm text-white/80">
                                <thead className="bg-[#0F1624] text-xs uppercase text-[#94A3B8]">
                                  <tr>
                                    <th className="px-4 py-3 font-semibold text-center w-20">Image</th>
                                    <th className="px-4 py-3 font-semibold">Product Name</th>
                                    <th className="px-4 py-3 font-semibold text-center">Unit Price</th>
                                    <th className="px-4 py-3 font-semibold text-center">Availability</th>
                                    <th className="px-4 py-3 font-semibold text-center w-32">Action</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1E2D45]">
                                  {filteredProducts.length > 0 ? filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-[#1A2236]/30 transition-colors">
                                      <td className="px-4 py-3">
                                        <div className="relative w-12 h-12 mx-auto bg-white/5 rounded p-1">
                                          {product.image && <Image src={product.image} alt={product.name} fill className="object-contain" />}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 font-medium text-white">{product.name}</td>
                                      <td className="px-4 py-3 text-center text-[#00D4FF] font-medium">₹{product.price.toLocaleString('en-IN')}</td>
                                      <td className="px-4 py-3 text-center text-green-400 text-xs font-bold">In Stock</td>
                                      <td className="px-4 py-3 text-center">
                                        <Button 
                                          size="sm" 
                                          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs px-4 rounded h-8"
                                          onClick={() => {
                                            selectComponent(category.id, product);
                                            setExpandedCategory(null);
                                          }}
                                        >
                                          Select
                                        </Button>
                                      </td>
                                    </tr>
                                  )) : (
                                    <tr>
                                      <td colSpan={5} className="px-4 py-8 text-center text-[#475569]">
                                        No components found for this category.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="w-full xl:w-80 shrink-0 sticky top-24 space-y-4">
            
            <div className="bg-[#0A0F1A] border border-[#1E2D45] rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 space-y-6">
                
                {/* Wattage Estimator */}
                <div className="text-center pb-6 border-b border-[#1E2D45]">
                  <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Estimated Wattage</p>
                  <p className="text-3xl font-black text-white">{estimatedWattage}W</p>
                </div>

                {/* Total Price */}
                <div className="text-center pb-6 border-b border-[#1E2D45]">
                  <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Total Price</p>
                  <p className="text-4xl font-black text-[#00D4FF]">₹{totalPrice.toLocaleString('en-IN')}/-</p>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button 
                    className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105"
                    onClick={handleWhatsAppInquiry}
                  >
                    Get WhatsApp Quotation
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-14 border-[#1E2D45] text-white hover:bg-[#1A2236] hover:border-[#2563EB]/50 font-bold uppercase tracking-wider rounded-xl transition-all"
                    onClick={() => window.print()}
                  >
                    Print Config
                  </Button>
                </div>

              </div>

              {/* Utility Grid */}
              <div className="grid grid-cols-3 border-t border-[#1E2D45] divide-x divide-[#1E2D45]">
                <button className="flex flex-col items-center justify-center p-4 text-[#94A3B8] hover:text-white hover:bg-[#1A2236] transition-colors group">
                  <LinkIcon className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase">Share Link</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 text-[#94A3B8] hover:text-white hover:bg-[#1A2236] transition-colors group">
                  <Download className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase">Save PDF</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 text-[#94A3B8] hover:text-white hover:bg-[#1A2236] transition-colors group" onClick={handleWhatsAppInquiry}>
                  <Share2 className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase">WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-xs text-orange-400 font-medium leading-relaxed flex gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Important: If in doubt regarding compatibility, please contact us at the support center.</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
