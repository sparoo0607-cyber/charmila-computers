import { getAdminProducts } from '@/lib/actions/admin.actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';
import Image from 'next/image';

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Products</h1>
          <p className="text-gray-500">Manage your entire inventory ({products.length} total).</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
            <Plus className="h-5 w-5 mr-2" /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Brand</th>
                <th className="p-4 font-semibold text-right">Price (₹)</th>
                <th className="p-4 font-semibold text-right">Stock</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No products found. Add your first product!</td>
                </tr>
              ) : (
                products.map((product) => {
                  let image = '';
                  try {
                    const parsed = JSON.parse(product.images);
                    image = parsed[0] || '';
                  } catch (e) {}

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 bg-white border border-gray-100 rounded-lg p-1">
                            {image && <Image src={image} alt={product.name} fill className="object-contain p-1" />}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{product.category?.name || '-'}</td>
                      <td className="p-4 text-sm text-gray-600">{product.brand?.name || '-'}</td>
                      <td className="p-4 text-sm font-bold text-gray-900 text-right">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                          product.stock > 10 ? 'bg-green-100 text-green-700' :
                          product.stock > 0 ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Product">
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
