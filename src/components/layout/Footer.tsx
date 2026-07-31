import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Charmila Computers</h3>
            <p className="text-sm text-muted-foreground">
              Premium computer hardware, custom PC builds, and expert technology services.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/build-pc" className="hover:text-primary transition-colors">Build Your PC</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Support & Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=processors" className="hover:text-primary transition-colors">Processors (CPU)</Link></li>
              <li><Link href="/products?category=graphics-cards" className="hover:text-primary transition-colors">Graphics Cards</Link></li>
              <li><Link href="/products?category=motherboards" className="hover:text-primary transition-colors">Motherboards</Link></li>
              <li><Link href="/products?category=memory" className="hover:text-primary transition-colors">Memory (RAM)</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://www.google.com/maps/place/Charmilas+Computer+Store/@17.7255938,83.2912158,15z/data=!4m15!1m7!3m6!1s0x3a3943e8166aa395:0xe8705563224e79af!2sCharmilas+Computer+Store!8m2!3d17.7254681!4d83.3014224!16s%2Fg%2F11fsklrv_j!3m6!1s0x3a3943e8166aa395:0xe8705563224e79af!8m2!3d17.7254681!4d83.3014224!15sCktTcmkgVmVua2F0ZXN3YXJhIENvbXBsZXgsIEJlc2lkZSBSVEMgQnVzIFN0YW5kLCBUaXJ1cGF0aSBjaGFybWlsYSBjb21wdXRlcnNaSyJJc3JpIHZlbmthdGVzd2FyYSBjb21wbGV4IGJlc2lkZSBydGMgYnVzIHN0YW5kIHRpcnVwYXRpIGNoYXJtaWxhIGNvbXB1dGVyc5IBDmNvbXB1dGVyX3N0b3Jl4AEA!16s%2Fg%2F11fsklrv_j?entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Sri Venkateswara Complex, Beside RTC Bus Stand, Tirupati</a></li>
              <li><a href="tel:+919010177427" className="hover:text-primary transition-colors">Phone: +91 9010177427</a></li>
              <li><a href="mailto:support@charmilacomputers.com" className="hover:text-primary transition-colors">Email: support@charmilacomputers.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Charmila Computers. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
