import { Headphones, MapPin, Phone, ShieldCheck, Wrench, Monitor, Camera, Printer, MessageCircle, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  {
    icon: Monitor,
    title: 'PCs & Laptops',
    desc: 'Sales and service for all major brands of Laptops, Desktops, and Studio PCs.',
    color: '#2563EB',
  },
  {
    icon: Wrench,
    title: 'Assemble & Gaming PC',
    desc: 'Custom Gaming PCs and high-performance workstations built by experts.',
    color: '#A78BFA',
    badge: 'Expert',
  },
  {
    icon: Camera,
    title: 'CCTV & Networking',
    desc: 'Complete CCTV installation and Cable Hub networking for home and office.',
    color: '#22C55E',
  },
  {
    icon: Printer,
    title: 'Printers & Spares',
    desc: 'Printers, cartridges, and a wide variety of PC spares and accessories.',
    color: '#F59E0B',
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#080C14]">

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#1E2D45] py-20">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2563EB] opacity-8 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/30 mb-6 shadow-[0_0_24px_rgba(37,99,235,0.3)]">
            <Headphones className="h-8 w-8 text-[#2563EB]" />
          </div>
          <span className="block text-xs font-black uppercase tracking-[0.4em] text-[#00D4FF] mb-4">Sales & Support</span>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Charmila Computers
          </h1>
          <p className="text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for gaming PCs, hardware sales, CCTV installation, and expert IT support in Tirupati.
          </p>
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
            <span className="ml-2 text-xs text-[#475569] font-semibold">Trusted by 10,000+ customers</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-8 sticky top-24 overflow-hidden relative">
              {/* Glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent" />

              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#00D4FF] mb-6">Get In Touch</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/30 flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-1">Call or WhatsApp</p>
                    <a href="tel:+919010177427" className="block text-sm font-bold text-white hover:text-[#00D4FF] transition-colors">+91 90101 77427</a>
                    <a href="tel:+919391251826" className="block text-sm font-bold text-white hover:text-[#00D4FF] transition-colors">+91 93912 51826</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-1">Visit Our Store</p>
                    <a
                      href="https://www.google.com/maps/place/Charmilas+Computer+Store"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#475569] hover:text-white transition-colors leading-relaxed flex items-start gap-1"
                    >
                      Sri Venkateswara Complex,<br />Beside RTC Bus Stand, Tirupati
                      <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-[#A78BFA]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-1">Business Details</p>
                    <p className="text-sm text-[#475569] font-mono">GSTIN: 37DDUPG5482C1Z7</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1E2D45]">
                <Link
                  href="https://wa.me/919010177427?text=Hello%20Charmila%20Computers,%20I%20need%20support."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EB35B] text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#1E2D45] bg-[#0F1624] p-8 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent" />

              <span className="block text-xs font-black uppercase tracking-[0.4em] text-[#00D4FF] mb-2">What We Offer</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">Sales & Comprehensive Service</h2>
              <p className="text-sm text-[#475569] mb-8">From high-end gaming rigs to office surveillance, we provide end-to-end solutions.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map(({ icon: Icon, title, desc, color, badge }) => (
                  <div
                    key={title}
                    className="relative group rounded-2xl border border-[#1E2D45] bg-[#080C14] p-6 hover:border-[#1E2D45]/80 transition-all duration-300 hover:bg-[#0A0E1A] overflow-hidden"
                    style={{ '--svc-color': color } as React.CSSProperties}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at top left, ${color}0D, transparent 60%)` }} />

                    {badge && (
                      <div
                        className="absolute top-4 right-4 text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider"
                        style={{ color, borderColor: `${color}40`, background: `${color}15` }}
                      >
                        {badge}
                      </div>
                    )}

                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon className="h-6 w-6" style={{ color }} />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wide mb-2">{title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
