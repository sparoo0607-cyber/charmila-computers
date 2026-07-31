import { getAdminInquiries } from '@/lib/actions/admin.actions';
import { InquiryStatusSelect } from '@/components/admin/InquiryStatusSelect';
import { MessageSquare, MailWarning } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-3">
            <MessageSquare className="w-3 h-3 text-[#FCD34D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FCD34D]">Comms Center</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">Customer Inquiries</h1>
          <p className="text-[#64748B] text-sm">Manage PC build quotes and product inquiries from WhatsApp.</p>
        </div>
      </div>

      <div className="bg-[#0A0F1A]/80 backdrop-blur-md border border-[#1E2D45] rounded-3xl shadow-[0_0_0_rgba(0,0,0,0)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F1624] text-[#94A3B8] border-b border-[#1E2D45] text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="p-5">Date</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Contact Info</th>
                <th className="p-5">Type</th>
                <th className="p-5 text-right">Est. Total</th>
                <th className="p-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D45]/50">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#1A2236] flex items-center justify-center mb-4 border border-[#1E2D45]">
                        <MailWarning className="w-6 h-6 text-[#475569]" />
                      </div>
                      <p className="text-[#94A3B8] font-bold">No inquiries yet.</p>
                      <p className="text-[#64748B] text-sm mt-1">When customers submit build requests, they will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-[#1A2236]/30 transition-colors group">
                    <td className="p-5 text-xs text-[#94A3B8] font-mono whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white text-sm">{inquiry.customerName}</div>
                      {inquiry.city && <div className="text-[10px] text-[#00D4FF] uppercase tracking-widest mt-1">{inquiry.city}</div>}
                    </td>
                    <td className="p-5">
                      <div className="text-sm font-bold text-[#E2E8F0]">{inquiry.phone}</div>
                      {inquiry.email && <div className="text-xs text-[#2563EB] mt-1">{inquiry.email}</div>}
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#2563EB]/10 text-[10px] font-black tracking-widest text-[#2563EB] uppercase border border-[#2563EB]/20">
                        {inquiry.type.replace('_', ' ')}
                      </span>
                      {inquiry.items && inquiry.items.length > 0 && (
                        <div className="mt-2 text-[10px] text-[#64748B] uppercase tracking-widest">
                          {inquiry.items.length} item(s)
                        </div>
                      )}
                    </td>
                    <td className="p-5 text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8] text-right">
                      {inquiry.totalEstimated ? `₹${inquiry.totalEstimated.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="p-5 text-right">
                      <InquiryStatusSelect id={inquiry.id} currentStatus={inquiry.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
