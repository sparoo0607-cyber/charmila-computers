import Link from 'next/link';
import { LayoutDashboard, Package, MessageSquare, LogOut, ShieldAlert } from 'lucide-react';
import { LogoutButton } from '@/components/admin/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#040812] overflow-hidden selection:bg-[#2563EB]/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-64 w-[500px] h-[300px] bg-[#2563EB] opacity-5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Sidebar */}
      <aside className="w-72 bg-[#0A0F1A]/80 backdrop-blur-xl border-r border-[#1E2D45] flex flex-col hidden md:flex relative z-10 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-[#1E2D45]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <ShieldAlert className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-white uppercase">Charmila</h1>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#00D4FF] uppercase">Admin Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          <Link href="/admin" className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#94A3B8] hover:bg-[#1A2236] hover:text-white border border-transparent hover:border-[#2563EB]/30 transition-all">
            <LayoutDashboard className="h-5 w-5 group-hover:text-[#00D4FF] transition-colors" />
            <span className="font-bold text-sm tracking-wider">Overview</span>
          </Link>
          <Link href="/admin/products" className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#94A3B8] hover:bg-[#1A2236] hover:text-white border border-transparent hover:border-[#2563EB]/30 transition-all">
            <Package className="h-5 w-5 group-hover:text-[#00D4FF] transition-colors" />
            <span className="font-bold text-sm tracking-wider">Products DB</span>
          </Link>
          <Link href="/admin/inquiries" className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#94A3B8] hover:bg-[#1A2236] hover:text-white border border-transparent hover:border-[#2563EB]/30 transition-all">
            <MessageSquare className="h-5 w-5 group-hover:text-[#00D4FF] transition-colors" />
            <span className="font-bold text-sm tracking-wider">Inquiries</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-[#1E2D45] space-y-3">
          <Link href="/" className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#64748B] hover:bg-[#1A2236] hover:text-white border border-transparent transition-all">
            <LogOut className="h-5 w-5" />
            <span className="font-bold text-sm tracking-wider">Storefront</span>
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
