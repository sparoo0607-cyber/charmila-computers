'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { editProduct } from '@/lib/actions/admin.actions';
import { Save } from 'lucide-react';

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
  
  const [selectedBrandId, setSelectedBrandId] = useState(product.brandId || (brands.length > 0 ? brands[0].id : ''));
  const selectedBrandSlug = brands.find(b => b.id === selectedBrandId)?.slug;
  const showCustomBrandInput = selectedBrandId === 'custom_create_new' || selectedBrandSlug === 'custom';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('id', product.id);
    formData.append('imageMode', imageMode);
    // keep original image if they didn't upload a new one
    formData.append('existingImage', initialImage);

    const res = await editProduct(formData);
    
    if (res.success) {
      router.push('/admin/products');
    } else {
      alert(res.error || 'Failed to edit product');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Product Name</label>
          <input required name="name" defaultValue={product.name} type="text" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g., Intel Core i9-14900K" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Price (₹)</label>
          <input required name="price" defaultValue={product.price} type="number" step="0.01" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="58900" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Description</label>
        <textarea required name="description" defaultValue={product.description} rows={3} className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Detailed product description..."></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Stock Quantity</label>
          <input required name="stock" defaultValue={product.stock} type="number" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Category</label>
          <select required name="categoryId" defaultValue={product.categoryId} className="w-full border-gray-300 rounded-xl p-3 border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Brand</label>
          <select required name="brandId" value={selectedBrandId} onChange={(e) => setSelectedBrandId(e.target.value)} className="w-full border-gray-300 rounded-xl p-3 border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            <option value="custom_create_new">+ Add New Brand...</option>
          </select>
        </div>
      </div>

      {showCustomBrandInput && (
        <div className="space-y-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <label className="text-sm font-bold text-blue-900">New Brand Name</label>
          <input required name="customBrandName" type="text" className="w-full border-blue-200 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Gigabyte" />
        </div>
      )}

      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-700">Product Image</label>
        
        <div className="flex gap-4 mb-4">
          <button 
            type="button" 
            onClick={() => setImageMode('upload')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${imageMode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Upload from Gallery
          </button>
          <button 
            type="button" 
            onClick={() => setImageMode('url')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${imageMode === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Paste Image URL
          </button>
        </div>

        {imageMode === 'upload' ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
            <input 
              name="imageFile" 
              type="file" 
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-gray-500">
              <span className="font-bold text-blue-600">Click to upload new image</span> or drag and drop<br />
              <span className="text-xs">Leave empty to keep existing image</span>
            </div>
          </div>
        ) : (
          <input 
            name="imageUrl" 
            defaultValue={imageMode === 'url' ? initialImage : ''}
            type="url" 
            className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            placeholder="https://images.unsplash.com/..." 
          />
        )}
        {initialImage && (
          <div className="mt-2 flex items-center gap-4">
            <span className="text-sm text-gray-500">Current Image:</span>
            <img src={initialImage} alt="Current" className="h-16 w-16 object-cover rounded-lg border" />
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-gray-200 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">PC Builder Compatibility Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Component Type</label>
            <select name="type" value={componentType} onChange={e => setComponentType(e.target.value)} className="w-full border-gray-300 rounded-xl p-3 border bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
              {['CPU', 'Motherboard', 'RAM', 'GPU', 'SSD', 'HDD', 'PSU', 'Cabinet', 'Cooler', 'Fans', 'Laptop', 'Custom'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          {componentType === 'Custom' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Custom Type Name</label>
                <input name="customType" defaultValue={(initialAttributes as any).type} type="text" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Sound Card, Networking" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Custom Attribute/Description</label>
                <input name="customDescription" defaultValue={(initialAttributes as any).customDescription} type="text" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. PCIe 4.0 x1" />
              </div>
            </>
          )}

          {['CPU', 'Motherboard'].includes(componentType) && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Socket (e.g. LGA1700, AM5)</label>
              <input name="socket" defaultValue={(initialAttributes as any).socket} type="text" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="AM5" />
            </div>
          )}

          {['RAM'].includes(componentType) && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">DDR Generation (e.g. DDR4, DDR5)</label>
              <input name="ddr" defaultValue={(initialAttributes as any).ddr} type="text" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="DDR5" />
            </div>
          )}

          {['PSU'].includes(componentType) && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Wattage (e.g. 1000W)</label>
              <input name="wattage" defaultValue={(initialAttributes as any).wattage} type="text" className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="1000W" />
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 flex flex-col items-end mt-8">
        {isSubmitting && (
          <div className="w-full mb-4 bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '100%', transformOrigin: 'left', animation: 'indeterminate 1.5s infinite linear' }}></div>
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md px-8 relative overflow-hidden">
          <Save className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
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
