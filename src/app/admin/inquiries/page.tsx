import { getAdminInquiries } from '@/lib/actions/admin.actions';
import { InquiryStatusSelect } from '@/components/admin/InquiryStatusSelect';

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Customer Inquiries</h1>
        <p className="text-gray-500">Manage PC build quotes and product inquiries from WhatsApp.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold text-right">Est. Total</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No inquiries yet.</td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{inquiry.customerName}</div>
                      {inquiry.city && <div className="text-xs text-gray-500">{inquiry.city}</div>}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.phone}</div>
                      {inquiry.email && <div className="text-xs text-blue-600">{inquiry.email}</div>}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-bold text-gray-700">
                        {inquiry.type.replace('_', ' ')}
                      </span>
                      {inquiry.items && inquiry.items.length > 0 && (
                        <div className="mt-1 text-xs text-gray-500">
                          {inquiry.items.length} item(s)
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900 text-right">
                      {inquiry.totalEstimated ? `₹${inquiry.totalEstimated.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="p-4 text-right">
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
