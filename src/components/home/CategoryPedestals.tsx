import Image from 'next/image';
import Link from 'next/link';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Processors', link: '/products?category=processors', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Motherboards', link: '/products?category=motherboards', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Graphics Cards', link: '/products?category=graphics-cards', image: 'https://images.unsplash.com/photo-1675789182315-bd3511eb9fba?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Memory', link: '/products?category=memory', image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84cb5?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Coolers', link: '/products?category=coolers', image: 'https://images.unsplash.com/photo-1623910279612-4eb1522f98f6?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Cabinets', link: '/products?category=cabinets', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400' },
];

export function CategoryPedestals() {
  return (
    <section className="py-12 bg-white w-full border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-l-4 border-blue-600 pl-3">Shop By Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((category) => (
            <Link href={category.link} key={category.id} className="group flex flex-col items-center">
              
              <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 flex items-end justify-center">
                {/* 3D Pedestal Base */}
                <div className="absolute bottom-0 w-3/4 h-1/4 bg-gray-200 rounded-[100%] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.05)] border-b-4 border-gray-300 group-hover:border-blue-300 transition-colors" />
                <div className="absolute bottom-2 w-[70%] h-1/5 bg-gray-100 rounded-[100%] border border-white/50" />
                
                {/* Product Image Floating on Pedestal */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 group-hover:-translate-y-4 transition-transform duration-500 z-10">
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    fill 
                    className="object-contain mix-blend-multiply filter drop-shadow-xl" 
                  />
                </div>
              </div>

              <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
