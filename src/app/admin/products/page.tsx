import { getAdminProducts } from '@/lib/actions/admin.actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit, PackageSearch, Zap } from 'lucide-react';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 mb-3">
            <Zap className="w-3 h-3 text-[#00D4FF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D4FF]">Inventory System</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">Products DB</h1>
          <p className="text-[#64748B] text-sm">Manage your entire inventory ({products.length} total entries).</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="relative h-12 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#00D4FF] text-white hover:from-[#1D4ED8] hover:to-[#0284C7] font-black uppercase tracking-widest text-xs transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Plus className="h-4 w-4 mr-2" /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-[#0A0F1A]/80 backdrop-blur-md border border-[#1E2D45] rounded-3xl shadow-[0_0_0_rgba(0,0,0,0)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F1624] text-[#94A3B8] border-b border-[#1E2D45] text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="p-5">Product</th>
                <th className="p-5">Category</th>
                <th className="p-5">Brand</th>
                <th className="p-5 text-right">Price (₹)</th>
                <th className="p-5 text-right">Stock</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D45]/50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#1A2236] flex items-center justify-center mb-4 border border-[#1E2D45]">
                        <PackageSearch className="w-6 h-6 text-[#475569]" />
                      </div>
                      <p className="text-[#94A3B8] font-bold">No products found in DB.</p>
                      <p className="text-[#64748B] text-sm mt-1">Add your first product to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  let image = '';
                  try {
                    const parsed = JSON.parse(product.images);
                    image = parsed[0] || '';
                  } catch (e) {}

                  return (
                    <tr key={product.id} className="hover:bg-[#1A2236]/30 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 bg-[#040812] border border-[#1E2D45] rounded-xl p-1.5 flex-shrink-0 group-hover:border-[#2563EB]/50 transition-colors">
                            {image ? (
                              <Image src={image} alt={product.name} fill className="object-contain p-1" />
                            ) : (
                              <div className="w-full h-full bg-[#1A2236] rounded-lg" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm line-clamp-1">{product.name}</div>
                            <div className="text-[10px] text-[#475569] font-mono mt-1 uppercase">ID: {product.id.split('-')[0]}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-xs font-bold tracking-widest text-[#94A3B8] uppercase">{product.category?.name || '-'}</td>
                      <td className="p-5 text-xs font-bold tracking-widest text-[#00D4FF] uppercase">{product.brand?.name || '-'}</td>
                      <td className="p-5 text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] text-right">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="p-5 text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                          product.stock > 10 ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20' :
                          product.stock > 0 ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' :
                          'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <button className="p-2.5 text-[#64748B] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10 rounded-xl transition-all" title="Edit Product">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <DeleteProductButton id={product.id} />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
