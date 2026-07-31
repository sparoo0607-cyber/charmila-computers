import Image from 'next/image';
import Link from 'next/link';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  link: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Processors',     link: '/products?category=processors',    image: '/images/products/intel_cpu_isolated_1785504512463.png' },
  { id: '2', name: 'Motherboards',   link: '/products?category=motherboards',  image: '/images/products/gaming_motherboard_isolated_1785504525296.png' },
  { id: '3', name: 'Graphics Cards', link: '/products?category=graphics-cards', image: '/images/products/rtx_4090_isolated_1785504487639.png' },
  { id: '4', name: 'Memory',         link: '/products?category=memory',        image: '/images/products/ddr5_ram_isolated_1785504561946.png' },
  { id: '5', name: 'Coolers',        link: '/products?category=coolers',       image: '/images/products/aio_cooler_isolated_1785504617114.png' },
  { id: '6', name: 'Cabinets',       link: '/products?category=cabinets',      image: '/images/products/pc_cabinet_isolated_1785504605408.png' },
];

export function CategoryPedestals() {
  return (
    <section className="py-16 w-full grid-bg border-b border-[#1E2D45] relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1E2D45]" />
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#00D4FF] px-4">
            Shop By Category
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1E2D45]" />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => (
            <Link
              href={category.link}
              key={category.id}
              className="group flex flex-col items-center gap-3"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Card */}
              <div className="relative w-full aspect-square rounded-2xl border border-[#1E2D45] bg-[#0F1624] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#2563EB]/70 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] group-hover:bg-[#111827]">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Bottom pedestal reflection */}
                <div className="absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    priority={true}
                    className="object-contain drop-shadow-[0_8px_16px_rgba(37,99,235,0.3)] group-hover:drop-shadow-[0_12px_24px_rgba(0,212,255,0.4)] transition-all duration-500"
                  />
                </div>
              </div>

              {/* Label */}
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest group-hover:text-[#00D4FF] transition-colors text-center leading-tight">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
