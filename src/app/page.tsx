import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, Truck, Headphones, RefreshCcw
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { CinematicHero } from '@/components/home/CinematicHero';
import { CategoryPedestals } from '@/components/home/CategoryPedestals';
import { ProductCard } from '@/components/ui/ProductCard';
import { PromoBanner } from '@/components/home/PromoBanner';

const PRODUCTS = [
  { 
    id: '1', name: 'MSI GeForce RTX 4070 Super 12G Gaming X Slim Graphics Card', price: 59990, oldPrice: 63999, 
    image: 'https://images.unsplash.com/photo-1675789182315-bd3511eb9fba?auto=format&fit=crop&q=80&w=400', category: 'graphics-cards'
  },
  { 
    id: '2', name: 'Intel Core i5-14600K 14th Gen Processor', price: 22999, oldPrice: 28600, 
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400', category: 'processors'
  },
  { 
    id: '3', name: 'ASUS TUF Gaming B760-PLUS WiFi', price: 18499, oldPrice: 21999, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400', category: 'motherboards'
  },
  { 
    id: '4', name: 'Corsair Vengeance 16GB DDR5 5200MHz', price: 4799, oldPrice: 6200, 
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84cb5?auto=format&fit=crop&q=80&w=400', category: 'memory'
  },
  { 
    id: '5', name: 'AMD Ryzen 7 7800X3D Desktop Processor', price: 34500, oldPrice: 41000, 
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400', category: 'processors'
  },
  { 
    id: '6', name: 'Zotac Gaming GeForce RTX 4090 Trinity OC', price: 168900, oldPrice: 180000, 
    image: 'https://images.unsplash.com/photo-1675789182315-bd3511eb9fba?auto=format&fit=crop&q=80&w=400', category: 'graphics-cards'
  },
];

const PERIPHERALS = [
  { 
    id: 'p1', name: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse', price: 12499, oldPrice: 14999, 
    image: 'https://images.unsplash.com/photo-1527814050087-379d447912f0?auto=format&fit=crop&q=80&w=400', category: 'peripherals'
  },
  { 
    id: 'p2', name: 'HyperX Cloud III Wireless Gaming Headset', price: 13990, oldPrice: 16000, 
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400', category: 'peripherals'
  },
  { 
    id: 'p3', name: 'Logitech G915 TKL Tenkeyless Lightspeed Wireless', price: 18995, oldPrice: 21995, 
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400', category: 'peripherals'
  },
  { 
    id: 'p4', name: 'Sony INZONE M9 27” 4K HDR 144Hz Gaming Monitor', price: 74990, oldPrice: 89990, 
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400', category: 'monitors'
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA] font-sans">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <CinematicHero />

      {/* 2. CATEGORY PEDESTALS */}
      <CategoryPedestals />

      {/* 3. FUTURE READY BEAST (Featured Grid) */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Future Ready Beast</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Huge Featured Product (Left) */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col relative group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">-12%</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 mt-8">MSI GeForce RTX 4090 SUPRIM X 24G</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.</p>
            
            <div className="relative h-64 w-full my-auto flex items-center justify-center">
              <Image 
                src="https://images.unsplash.com/photo-1675789182315-bd3511eb9fba?auto=format&fit=crop&q=80&w=600" 
                alt="RTX 4090" 
                fill 
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
              />
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col items-center">
              <span className="text-sm text-gray-400 line-through">₹1,95,000</span>
              <span className="text-2xl font-black text-blue-600 mb-4">₹1,71,600</span>
              <a 
                href={`https://wa.me/919010177427?text=Hello,%20I'd%20like%20to%20buy%20the%20RTX%204090%20SUPRIM%20X`} 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded text-center transition-colors uppercase tracking-wider"
              >
                Buy Now
              </a>
            </div>
          </div>

          {/* Grid of smaller products (Right) */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WIDE PROMO BANNER */}
      <PromoBanner 
        image="https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?auto=format&fit=crop&q=100&w=1920"
        title="MAXIMUM COOLING. MINIMUM NOISE."
        subtitle="Thermaltake Liquid Cooling"
        buttonText="Shop Cooling"
        buttonLink="/products?category=coolers"
        align="left"
      />

      {/* 5. GAMING ZONE */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Gaming Zone</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PERIPHERALS.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* 6. CLEAN TRUST/STATS FOOTER */}
      <section className="bg-gray-800 text-white py-12 mt-12 border-t-4 border-blue-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center md:items-start gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <ShieldCheck className="h-10 w-10 text-blue-400" />
            <div>
              <h4 className="font-bold text-lg uppercase tracking-wider">Genuine Products</h4>
              <p className="text-sm text-gray-400 mt-1">100% Brand Warranty</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <Headphones className="h-10 w-10 text-blue-400" />
            <div>
              <h4 className="font-bold text-lg uppercase tracking-wider">Premium Support</h4>
              <p className="text-sm text-gray-400 mt-1">Technical assistance</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <Truck className="h-10 w-10 text-blue-400" />
            <div>
              <h4 className="font-bold text-lg uppercase tracking-wider">Fast Shipping</h4>
              <p className="text-sm text-gray-400 mt-1">Secure & Insured delivery</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <RefreshCcw className="h-10 w-10 text-blue-400" />
            <div>
              <h4 className="font-bold text-lg uppercase tracking-wider">Easy Returns</h4>
              <p className="text-sm text-gray-400 mt-1">Hassle-free process</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
