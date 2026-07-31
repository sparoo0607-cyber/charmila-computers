import { getDashboardStats } from '@/lib/actions/admin.actions';
import { Package, AlertCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-1">{stats.totalProducts}</h2>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Products</p>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-1">{stats.outOfStock}</h2>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Out of Stock</p>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-1">{stats.pendingInquiries}</h2>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Quotes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 hover:shadow-lg transition-all group">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">Manage Inventory &rarr;</h3>
          <p className="text-gray-500">Add new components, update pricing, and manage stock levels for your PC builder.</p>
        </Link>
        <Link href="/admin/inquiries" className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 hover:shadow-lg transition-all group">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">View Inquiries &rarr;</h3>
          <p className="text-gray-500">Review WhatsApp PC build requests and custom PC quotes from your customers.</p>
        </Link>
      </div>
    </div>
  );
}
