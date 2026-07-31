'use client';

import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[800px] flex flex-col items-center justify-center bg-[#FAFBFD]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-sans animate-pulse">Initializing 3D Experience...</p>
    </div>
  ),
});

export function Hero3DWrapper() {
  return <Hero3D />;
}
