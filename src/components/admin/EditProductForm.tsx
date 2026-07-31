'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { editProduct } from '@/lib/actions/admin.actions';
import { Save, UploadCloud, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

export function EditProductForm({ product, categories, brands }: { product: any, categories: any[], brands: any[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  let initialType = 'CPU';
  let initialAttributes = {};
  let initialImage = '';
  
  try {
    initialAttributes = JSON.parse(product.attributes || '{}');
    initialType = (initialAttributes as any).type || 'CPU';
  } catch (e) {}

  try {
    const images = JSON.parse(product.images || '[]');
    initialImage = images[0] || '';
  } catch (e) {}

  const [componentType, setComponentType] = useState(initialType);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>(initialImage.startsWith('http') ? 'url' : 'upload');
  const [imageUrl, setImageUrl] = useState(initialImage.startsWith('http') ? initialImage : '');
  const [selectedBrandId, setSelectedBrandId] = useState(product.brandId || (brands.length > 0 ? brands[0].id : ''));
  const selectedBrandSlug = brands.find(b => b.id === selectedBrandId)?.slug;
  const showCustomBrandInput = selectedBrandId === 'custom_create_new' || selectedBrandSlug === 'custom';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('id', product.id);
    formData.append('imageMode', imageMode);
    formData.append('existingImage', initialImage);

    const res = await editProduct(formData);
    
    if (res.success) {
      router.push('/admin/products');
    } else {
      alert(res.error || 'Failed to edit product');
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-[#040812] border border-[#1E2D45] rounded-xl p-4 text-white focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] focus:outline-none transition-all placeholder:text-[#475569]";
  const labelClass = "text-xs font-black tracking-widest text-[#94A3B8] uppercase mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Product Name</label>
          <input required name="name" defaultValue={product.name} type="text" className={inputClass} placeholder="e.g., RTX 4090 SUPRIM X" />
        </div>
        <div>
          <label className={labelClass}>Price (₹)</label>
          <input required name="price" defaultValue={product.price} type="number" step="0.01" className={inputClass} placeholder="e.g., 185000" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea required name="description" defaultValue={product.description} rows={4} className={inputClass} placeholder="Detailed specs and marketing copy..."></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <label className={labelClass}>Stock Quantity</label>
          <input required name="stock" defaultValue={product.stock} type="number" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select required name="categoryId" defaultValue={product.categoryId} className={`${inputClass} appearance-none`}>
            {categories.map(c => <option key={c.id} value={c.id} className="bg-[#040812]">{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Brand</label>
          <select required name="brandId" value={selectedBrandId} onChange={(e) => setSelectedBrandId(e.target.value)} className={`${inputClass} appearance-none`}>
            {brands.map(b => <option key={b.id} value={b.id} className="bg-[#040812]">{b.name}</option>)}
            <option value="custom_create_new" className="bg-[#040812] text-[#F59E0B] font-bold">+ Add New Brand...</option>
          </select>
        </div>
      </div>

      {showCustomBrandInput && (
        <div className="bg-[#F59E0B]/10 p-6 rounded-2xl border border-[#F59E0B]/20">
          <label className="text-[10px] font-black tracking-widest text-[#F59E0B] uppercase mb-2 block">New Brand Name</label>
          <input required name="customBrandName" type="text" className="w-full bg-[#040812] border border-[#F59E0B]/40 rounded-xl p-4 text-white focus:ring-2 focus:ring-[#F59E0B] focus:outline-none transition-all placeholder:text-[#475569]" placeholder="e.g. Gigabyte AORUS" />
        </div>
      )}

      <div>
        <label className={labelClass}>Product Image</label>
        
        <div className="flex gap-4 mb-6">
          <button 
            type="button" 
            onClick={() => setImageMode('upload')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${imageMode === 'upload' ? 'bg-[#F59E0B] text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-[#1A2236] text-[#64748B] hover:bg-[#1E2D45] hover:text-white border border-[#1E2D45]'}`}
          >
            <UploadCloud className="w-4 h-4" /> Upload File
          </button>
          <button 
            type="button" 
            onClick={() => setImageMode('url')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${imageMode === 'url' ? 'bg-[#F59E0B] text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-[#1A2236] text-[#64748B] hover:bg-[#1E2D45] hover:text-white border border-[#1E2D45]'}`}
          >
            <LinkIcon className="w-4 h-4" /> Paste URL
          </button>
        </div>

        {imageMode === 'upload' ? (
          <div className="border-2 border-dashed border-[#1E2D45] rounded-2xl p-12 text-center bg-[#040812] hover:border-[#F59E0B] hover:bg-[#0A0F1A] transition-all cursor-pointer relative group">
            <input 
              name="imageFile" 
              type="file" 
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="text-[#64748B] flex flex-col items-center">
              <UploadCloud className="w-10 h-10 mb-4 text-[#475569] group-hover:text-[#F59E0B] transition-colors" />
              <p className="text-sm"><span className="font-bold text-[#F59E0B]">Click to upload</span> or drag and drop</p>
              <p className="text-xs mt-2 uppercase tracking-widest">Leave empty to keep existing</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <input 
              name="imageUrl" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="url" 
              className={inputClass} 
              placeholder="https://example.com/image.png" 
            />
            {imageUrl && (
              <div className="p-6 bg-[#040812] border border-[#1E2D45] rounded-2xl flex items-center gap-6">
                <span className={labelClass + " !mb-0"}>Preview:</span>
                <div className="relative w-32 h-32 rounded-xl border border-[#1E2D45] bg-[#0A0F1A] p-2 flex items-center justify-center">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {initialImage && imageMode === 'upload' && (
          <div className="mt-6 flex items-center gap-6 p-6 bg-[#040812] border border-[#1E2D45] rounded-2xl">
            <span className={labelClass + " !mb-0"}>Current:</span>
            <div className="relative w-24 h-24 rounded-xl border border-[#1E2D45] bg-[#0A0F1A] p-2 flex items-center justify-center">
              <img src={initialImage} alt="Current" className="w-full h-full object-contain" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-8 mt-10 border-t border-[#1E2D45]">
        <h3 className="text-sm font-black text-[#F59E0B] uppercase tracking-[0.2em] mb-6">Compatibility Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#040812] p-8 rounded-3xl border border-[#1E2D45]">
          <div>
            <label className={labelClass}>Component Type</label>
            <select name="type" value={componentType} onChange={e => setComponentType(e.target.value)} className={`${inputClass} appearance-none`}>
              {['CPU', 'Motherboard', 'RAM', 'GPU', 'SSD', 'HDD', 'PSU', 'Cabinet', 'Cooler', 'Fans', 'Custom'].map(t => <option key={t} value={t} className="bg-[#040812]">{t}</option>)}
            </select>
          </div>
          
          {componentType === 'Custom' && (
            <>
              <div>
                <label className={labelClass}>Custom Type Name</label>
                <input name="customType" defaultValue={(initialAttributes as any).type} type="text" className={inputClass} placeholder="e.g. Capture Card" />
              </div>
              <div>
                <label className={labelClass}>Attribute Specs</label>
                <input name="customDescription" defaultValue={(initialAttributes as any).customDescription} type="text" className={inputClass} placeholder="e.g. PCIe Gen 4" />
              </div>
            </>
          )}

          {['CPU', 'Motherboard'].includes(componentType) && (
            <div>
              <label className={labelClass}>Socket Type</label>
              <input name="socket" defaultValue={(initialAttributes as any).socket} type="text" className={inputClass} placeholder="e.g. LGA1700, AM5" />
            </div>
          )}

          {['RAM'].includes(componentType) && (
            <div>
              <label className={labelClass}>Memory Standard</label>
              <input name="ddr" defaultValue={(initialAttributes as any).ddr} type="text" className={inputClass} placeholder="e.g. DDR5" />
            </div>
          )}

          {['PSU'].includes(componentType) && (
            <div>
              <label className={labelClass}>Wattage Output</label>
              <input name="wattage" defaultValue={(initialAttributes as any).wattage} type="text" className={inputClass} placeholder="e.g. 1000W" />
            </div>
          )}
        </div>
      </div>

      <div className="pt-10 flex flex-col items-end">
        {isSubmitting && (
          <div className="w-full mb-6 bg-[#1E2D45] rounded-full h-1 overflow-hidden">
            <div className="bg-[#F59E0B] h-1 rounded-full animate-[progress_1s_ease-in-out_infinite]" style={{ width: '100%', transformOrigin: 'left', animation: 'indeterminate 1.5s infinite linear' }}></div>
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} className="relative h-14 px-10 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:from-[#D97706] hover:to-[#FBBF24] font-black uppercase tracking-widest text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.4)] disabled:opacity-50">
          <Save className="h-5 w-5 mr-3" />
          {isSubmitting ? 'Syncing DB...' : 'Save Changes'}
        </Button>
        <style jsx>{`
          @keyframes indeterminate {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </form>
  );
}
