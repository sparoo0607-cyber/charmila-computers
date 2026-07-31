'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface WhatsAppBuyButtonProps {
  productName: string;
  price: number;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function WhatsAppBuyButton({ productName, price, className, variant = 'default', size = 'default' }: WhatsAppBuyButtonProps) {
  const handleBuy = () => {
    const message = `Hello Charmila Computers,%0a%0aI would like to purchase the following product:%0a%0a*Product:* ${productName}%0a*Price:* ₹${price.toLocaleString('en-IN')}%0a%0aPlease let me know the availability and payment details.`;
    window.open(`https://wa.me/919010177427?text=${message}`, '_blank');
  };

  return (
    <Button 
      onClick={handleBuy} 
      variant={variant} 
      size={size} 
      className={className || "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"}
    >
      <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
    </Button>
  );
}
