import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  category: string;
}

export function ProductCard({ id, name, price, oldPrice, image, category }: ProductCardProps) {
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  const whatsappMessage = `Hello Charmila Computers,%0a%0aI would like to purchase:%0a*Product Name:* ${name}%0a*Price:* ₹${price.toLocaleString('en-IN')}%0a%0aPlease contact me.`;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
        -{discount}%
      </div>

      {/* Product Image */}
      <Link href={`/products/${id}`} className="relative h-48 w-full mb-4 flex items-center justify-center">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 text-center">
        <Link href={`/products/${id}`}>
          <h3 className="text-sm font-medium text-gray-700 leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2 flex flex-col items-center justify-center gap-1 mb-4">
          <span className="text-xs text-red-500 line-through">₹{oldPrice.toLocaleString('en-IN')}</span>
          <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString('en-IN')}</span>
        </div>

        {/* WhatsApp Buy Button */}
        <a 
          href={`https://wa.me/919010177427?text=${whatsappMessage}`} 
          target="_blank" 
          rel="noreferrer"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded transition-colors uppercase tracking-wider"
        >
          Add to Cart
        </a>
      </div>
    </div>
  );
}
