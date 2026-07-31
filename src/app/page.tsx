import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Cpu, Monitor, HardDrive, Fan, Mouse, Briefcase, 
  ShieldCheck, Truck, Headphones, RefreshCcw, ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ICONS = [
  { icon: Cpu, label: 'Processors' },
  { icon: HardDrive, label: 'Graphics Cards' },
  { icon: Monitor, label: 'Motherboards' },
  { icon: Fan, label: 'Cooling' },
  { icon: Briefcase, label: 'Cabinets' },
  { icon: Mouse, label: 'Peripherals' },
];

const PRODUCTS = [
  { 
    id: '1', name: 'Intel Core i5-14600K 14th Gen Processor', price: 22999, oldPrice: 28600, 
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400', 
    rating: 4.8, reviews: 212 
  },
  { 
    id: '2', name: 'MSI GeForce RTX 4070 Super 12G Gaming X Slim', price: 59990, oldPrice: 63999, 
    image: 'https://images.unsplash.com/photo-1675789182315-bd3511eb9fba?auto=format&fit=crop&q=80&w=400', 
    rating: 4.9, reviews: 168 
  },
  { 
    id: '3', name: 'ASUS TUF Gaming B760-PLUS WiFi', price: 18499, oldPrice: 21999, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400', 
    rating: 4.7, reviews: 94 
  },
  { 
    id: '4', name: 'Corsair Vengeance 16GB DDR5 5200MHz', price: 4799, oldPrice: 6200, 
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84cb5?auto=format&fit=crop&q=80&w=400', 
  },
];

import { CinematicHero } from '@/components/home/CinematicHero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFD] font-sans">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <CinematicHero />

      {/* 2. CLEAN CATEGORY ICONS */}
      <section className="border-y border-gray-100 py-12 overflow-hidden w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto pb-4 custom-scrollbar snap-x">
            {ICONS.map((item, i) => (
              <Link href={`/products?category=${item.label.toLowerCase()}`} key={i} className="flex flex-col items-center gap-3 text-gray-400 hover:text-gray-900 transition-colors group snap-start shrink-0">
                <item.icon className="h-8 w-8 stroke-[1.5]" />
                <span className="text-xs font-medium tracking-wide uppercase">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ELEGANT PRODUCT GRID */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Excellence</h2>
          <p className="text-gray-500">Handpicked components for uncompromising performance.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map(product => (
            <div key={product.id} className="group flex flex-col">
              <div className="h-64 w-full relative mb-6 bg-gray-50 rounded-2xl p-6 transition-colors group-hover:bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="flex flex-col flex-1 px-2">
                <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{product.name}</h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <a href={`https://wa.me/919010177427?text=Hello Charmila Computers,%0a%0aI would like to purchase:%0a*Product Name:* ${product.name}%0a*Price:* ₹${product.price}%0a%0aPlease contact me.`} target="_blank" rel="noreferrer">
                    <button className="w-10 h-10 rounded-full bg-gray-900 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-105">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link href="/products" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center transition-colors">
            View the full catalog <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 4. MINIMALIST BANNER */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-gray-900 text-white rounded-[2rem] p-16 md:p-24 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Design Your Setup.</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">
            Use our intelligent builder to configure the perfect setup tailored for gaming, creation, or productivity.
          </p>
          <Link href="/build-pc">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full font-bold px-10 py-6 text-sm transition-transform hover:scale-105">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. CLEAN TRUST/STATS FOOTER */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center sm:items-start gap-12 sm:gap-16 md:gap-24 text-center">
          <div className="flex flex-col items-center gap-4 w-full sm:w-1/3">
            <ShieldCheck className="h-8 w-8 text-gray-400" />
            <div>
              <h4 className="font-bold text-gray-900">Genuine Products</h4>
              <p className="text-xs text-gray-500 mt-1">100% Brand Warranty</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 w-full sm:w-1/3">
            <Headphones className="h-8 w-8 text-gray-400" />
            <div>
              <h4 className="font-bold text-gray-900">Expert Support</h4>
              <p className="text-xs text-gray-500 mt-1">Always here to help</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 w-full sm:w-1/3">
            <RefreshCcw className="h-8 w-8 text-gray-400" />
            <div>
              <h4 className="font-bold text-gray-900">Easy Returns</h4>
              <p className="text-xs text-gray-500 mt-1">Hassle-free process</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
