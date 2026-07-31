import type { Metadata } from "next";
import { Inter, Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charmila Computers | Premium Gaming PCs & Hardware",
  description: "Build, Upgrade, Dominate. Premium computer hardware, custom PC builds, and expert technology services.",
};

import { AuthProvider } from "@/components/providers/AuthProvider";
import { StoreLayout } from "@/components/layout/StoreLayout";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-[#2563EB] selection:text-white">
        <NextTopLoader
          color="#00D4FF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2563EB,0 0 5px #00D4FF"
        />
        <GlobalBackground />
        <AuthProvider>
          <StoreLayout>
            {children}
          </StoreLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
