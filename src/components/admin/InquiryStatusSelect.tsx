'use client';

import { useState } from 'react';
import { updateInquiryStatus } from '@/lib/actions/admin.actions';
import { useRouter } from 'next/navigation';

export function InquiryStatusSelect({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    const res = await updateInquiryStatus(id, newStatus);
    if (res.success) {
      router.refresh();
    } else {
      alert('Failed to update status');
    }
    setIsUpdating(false);
  };

  return (
    <select 
      value={currentStatus} 
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`text-xs font-bold rounded-full px-3 py-1 border ${
        currentStatus === 'PENDING' ? 'bg-orange-100 text-orange-700 border-orange-200' :
        currentStatus === 'CONTACTED' ? 'bg-blue-100 text-blue-700 border-blue-200' :
        currentStatus === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200' :
        'bg-gray-100 text-gray-700 border-gray-200'
      } outline-none cursor-pointer disabled:opacity-50 transition-colors`}
    >
      <option value="PENDING">PENDING</option>
      <option value="CONTACTED">CONTACTED</option>
      <option value="COMPLETED">COMPLETED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  );
}
