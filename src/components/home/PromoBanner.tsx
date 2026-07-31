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
  align?: 'left' | 'right';
  accentColor?: string;
}

export function PromoBanner({
  title,
  subtitle,
  description,
  imageSrc,
  linkText = 'Shop Now',
  linkHref,
  align = 'left',
  accentColor = '#2563EB',
}: PromoBannerProps) {
  const isLeft = align === 'left';

  return (
    <section className="w-full relative overflow-hidden my-4 border-y border-[#1E2D45]">
      {/* Dark mesh background */}
      <div className="absolute inset-0 bg-[#080C14] grid-bg" />
      {/* Gradient radial blob */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-0 translate-x-1/4' : 'left-0 -translate-x-1/4'} w-[600px] h-[600px] rounded-full opacity-10 blur-3xl`}
        style={{ background: accentColor }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row items-center py-12 md:py-16 gap-10 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
          
          {/* Text Content */}
          <div className={`flex-1 flex flex-col gap-5 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
            {subtitle && (
              <span className="text-xs font-black uppercase tracking-[0.4em] text-[#00D4FF]">
                {subtitle}
              </span>
            )}
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1.05] tracking-tight text-white">
              {title}
            </h2>
            {description && (
              <p className="text-sm md:text-base text-[#64748B] max-w-md leading-relaxed">
                {description}
              </p>
            )}
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 self-start bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-all duration-200 uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:scale-105 active:scale-95 group"
            >
              {linkText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1 relative w-full h-[280px] md:h-[420px] flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 drop-shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
