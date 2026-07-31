import { getDashboardStats } from '@/lib/actions/admin.actions';
import { Package, AlertCircle, MessageSquare, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 mb-3">
          <Zap className="w-3 h-3 text-[#00D4FF]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00D4FF]">Command Center</span>
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">Dashboard Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Products */}
        <div className="bg-[#0A0F1A]/80 backdrop-blur-md p-6 rounded-3xl border border-[#1E2D45] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)] hover:border-[#2563EB]/30 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB] opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="bg-[#2563EB]/20 p-3.5 rounded-2xl text-[#00D4FF] border border-[#2563EB]/30">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-1 tracking-tighter relative z-10">{stats.totalProducts}</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] relative z-10">Total Products</p>
        </div>

        {/* Out of Stock */}
        <div className="bg-[#0A0F1A]/80 backdrop-blur-md p-6 rounded-3xl border border-[#1E2D45] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)] hover:border-[#EF4444]/30 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444] opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="bg-[#EF4444]/20 p-3.5 rounded-2xl text-[#EF4444] border border-[#EF4444]/30">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-1 tracking-tighter relative z-10">{stats.outOfStock}</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] relative z-10">Out of Stock</p>
        </div>

        {/* Pending Inquiries */}
        <div className="bg-[#0A0F1A]/80 backdrop-blur-md p-6 rounded-3xl border border-[#1E2D45] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] hover:border-[#F59E0B]/30 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B] opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="bg-[#F59E0B]/20 p-3.5 rounded-2xl text-[#F59E0B] border border-[#F59E0B]/30">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-1 tracking-tighter relative z-10">{stats.pendingInquiries}</h2>
          <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] relative z-10">Pending Quotes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="bg-[#0A0F1A]/80 backdrop-blur-md p-8 rounded-3xl border border-[#1E2D45] hover:border-[#2563EB]/50 hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)] transition-all group flex flex-col justify-between min-h-[200px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide group-hover:text-[#00D4FF] transition-colors flex items-center gap-2">
              Manage Inventory <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed">Add new components, update pricing, and manage stock levels for your PC builder.</p>
          </div>
          <div className="relative z-10 mt-6 flex justify-end">
             <div className="w-10 h-10 rounded-full bg-[#1A2236] flex items-center justify-center group-hover:bg-[#2563EB] transition-colors">
               <Package className="w-4 h-4 text-[#94A3B8] group-hover:text-white" />
             </div>
          </div>
        </Link>
        <Link href="/admin/inquiries" className="bg-[#0A0F1A]/80 backdrop-blur-md p-8 rounded-3xl border border-[#1E2D45] hover:border-[#F59E0B]/50 hover:shadow-[0_15px_40px_rgba(245,158,11,0.1)] transition-all group flex flex-col justify-between min-h-[200px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide group-hover:text-[#F59E0B] transition-colors flex items-center gap-2">
              View Inquiries <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed">Review WhatsApp PC build requests and custom PC quotes from your customers.</p>
          </div>
          <div className="relative z-10 mt-6 flex justify-end">
             <div className="w-10 h-10 rounded-full bg-[#1A2236] flex items-center justify-center group-hover:bg-[#F59E0B] transition-colors">
               <MessageSquare className="w-4 h-4 text-[#94A3B8] group-hover:text-white" />
             </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
