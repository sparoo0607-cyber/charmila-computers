import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  linkText?: string;
  linkHref: string;
  bgColor?: string;
  textColor?: string;
  align?: 'left' | 'right';
}

export function PromoBanner({
  title,
  subtitle,
  description,
  imageSrc,
  linkText = 'Shop Now',
  linkHref,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  align = 'left'
}: PromoBannerProps) {
  const isLeft = align === 'left';

  return (
    <section className={`w-full overflow-hidden ${bgColor} border-y border-gray-200 my-12`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row items-center justify-between py-12 md:py-0 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
          
          {/* Text Content */}
          <div className={`flex-1 flex flex-col justify-center space-y-6 ${textColor} py-8 md:py-24 z-10 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
            {subtitle && (
              <h4 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-red-600">
                {subtitle}
              </h4>
            )}
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-lg opacity-80 max-w-xl text-gray-600">
                {description}
              </p>
            )}
            <div>
              <Link 
                href={linkHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded transition-all hover:scale-105 shadow-lg shadow-blue-600/30 uppercase tracking-wider"
              >
                {linkText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative w-full h-[300px] md:h-[500px] flex items-center justify-center">
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-contain p-4 filter drop-shadow-2xl transition-transform duration-700 hover:scale-105 mix-blend-darken`}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
