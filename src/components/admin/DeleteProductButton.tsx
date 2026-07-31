'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/lib/actions/admin.actions';
import { useRouter } from 'next/navigation';

export function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setIsDeleting(true);
    const res = await deleteProduct(id);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || 'Failed to delete');
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Product"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
