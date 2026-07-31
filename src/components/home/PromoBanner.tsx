import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PromoBannerProps {
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function PromoBanner({ 
  image, 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  align = 'center',
  className = ''
}: PromoBannerProps) {
  
  const alignClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right'
  }[align];

  return (
    <section className={`relative w-full h-[300px] md:h-[400px] overflow-hidden my-8 ${className}`}>
      <Image 
        src={image}
        alt={title || "Promotional Banner"}
        fill
        className="object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {title && (
        <div className={`relative z-10 w-full h-full container mx-auto px-8 flex flex-col justify-center ${alignClass}`}>
          {subtitle && (
            <span className="text-blue-400 font-bold tracking-widest uppercase mb-2">
              {subtitle}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight max-w-2xl shadow-sm">
            {title}
          </h2>
          {buttonText && buttonLink && (
            <Link href={buttonLink}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 font-bold px-8 py-6 rounded text-sm uppercase tracking-wide">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
