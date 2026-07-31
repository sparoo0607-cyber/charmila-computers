import { Headphones, MapPin, Phone, Mail, Clock, ShieldCheck, Wrench, Monitor, Camera, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-[#0F172A] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600/20 rounded-full mb-6 text-blue-400">
            <Headphones className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Charmila's Computer Store</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Expert Sales & Service. We are your trusted partners for all your hardware, gaming, and IT infrastructure needs.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Get in Touch</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Call or WhatsApp</p>
                    <p className="text-gray-600 font-medium">+91 90101 77427</p>
                    <p className="text-gray-600 font-medium">+91 93912 51826</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Visit Our Store</p>
                    <p className="text-gray-600 text-sm">Charmila's Computer Store<br/>Physical storefront for sales and hands-on service.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Business Details</p>
                    <p className="text-gray-600 text-sm font-medium">GSTIN: 37DDUPG5482C1Z7</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <Link href="https://wa.me/919010177427?text=Hello%20Charmila%20Computers,%20I%20need%20support." target="_blank">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 text-lg font-bold shadow-lg shadow-green-600/20">
                    Chat on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 h-full">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                Our Services
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sales & Comprehensive Service</h2>
              <p className="text-gray-500 mb-10">From high-end gaming rigs to office surveillance, we provide end-to-end solutions.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                  <Monitor className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">PCs & Laptops</h3>
                  <p className="text-sm text-gray-600">Sales and service for all major brands of Laptops, Desktops, and Studio PCs.</p>
                </div>
                
                <div className="border border-gray-100 rounded-2xl p-6 hover:border-purple-200 hover:bg-purple-50/50 transition-colors group relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Expert</div>
                  <Wrench className="h-8 w-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Assemble & Gaming PC</h3>
                  <p className="text-sm text-gray-600">We are experts in building custom Gaming PCs and high-performance workstations.</p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 hover:border-green-200 hover:bg-green-50/50 transition-colors group">
                  <Camera className="h-8 w-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">CCTV & Networking</h3>
                  <p className="text-sm text-gray-600">Complete CCTV installation and Cable Hub networking solutions for home and office.</p>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:bg-orange-50/50 transition-colors group">
                  <Printer className="h-8 w-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Printers & Spares</h3>
                  <p className="text-sm text-gray-600">Printers, cartridges, and a wide variety of PC spares and accessories available.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
