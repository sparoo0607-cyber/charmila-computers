import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charmila Computers | Premium Gaming PCs & Hardware",
  description: "Build, Upgrade, Dominate. Premium computer hardware, custom PC builds, and expert technology services.",
};

import { AuthProvider } from "@/components/providers/AuthProvider";
import { StoreLayout } from "@/components/layout/StoreLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <StoreLayout>
            {children}
          </StoreLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
