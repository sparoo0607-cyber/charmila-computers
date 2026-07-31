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
    <div className="group relative rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-4 flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2563EB]/60 hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)]">
      {/* Glow accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Discount Badge */}
      <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-[0_0_8px_rgba(239,68,68,0.5)]">
        -{discount}%
      </div>

      {/* Product Image */}
      <Link href={`/products/${id}`} className="relative h-44 w-full mb-3 flex items-center justify-center overflow-hidden rounded-xl bg-[#080C14]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <Link href={`/products/${id}`}>
          <h3 className="text-xs font-medium text-[#94A3B8] leading-snug mb-3 line-clamp-2 hover:text-white transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col gap-0.5 mb-3">
          <span className="text-[11px] text-[#475569] line-through">₹{oldPrice.toLocaleString('en-IN')}</span>
          <span className="text-xl font-black text-white tracking-tight">₹{price.toLocaleString('en-IN')}</span>
        </div>

        {/* WhatsApp Buy Button */}
        <a
          href={`https://wa.me/919010177427?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="w-full text-center bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white text-[11px] font-bold py-2.5 rounded-xl transition-all duration-200 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] active:scale-95"
        >
          Buy on WhatsApp
        </a>
      </div>
    </div>
  );
}
