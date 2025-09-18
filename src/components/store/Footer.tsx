import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const FooterTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-semibold text-white mb-4">{children}</h3>
);

export default function Footer() {
  return (
    <footer className="bg-black">
      {/* Responsive padding */}
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-8 py-12">
        {/* Responsive grid: stacks on mobile, 2 columns on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          
          {/* Column 1: Logo and Info */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <Link href="/">
              <Image
                src="/logos/blacktech-logo.png"
                alt="BlackTech Logo"
                width={183}
                height={63}
              />
            </Link>
            <p className="text-sm text-white/80 leading-[22.75px] max-w-[300px]">
              Your trusted partner for purchasing refurbished technology products in the United Arab Emirates.
            </p>
            <div className="text-xs text-white/60 leading-4">
              <p>Black Tech FZC LLC</p>
              <p>United Arab Emirates</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <FooterTitle>Navigation</FooterTitle>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/shop" className="text-white/80 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/categories" className="text-white/80 hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/support" className="text-white/80 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <FooterTitle>Customer Support</FooterTitle>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-white/80 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/warranties" className="text-white/80 hover:text-white transition-colors">Warranties</Link></li>
              <li><Link href="/returns" className="text-white/80 hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/shipping" className="text-white/80 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <FooterTitle>Contact</FooterTitle>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail size={16} className="text-white/80" />
                <a href="mailto:contact@blacktech.ae" className="text-sm text-white/80 hover:text-white transition-colors">contact@blacktech.ae</a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone size={16} className="text-white/80" />
                <span className="text-sm text-white/80">Phone Number</span>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <MapPin size={16} className="text-white/80" />
                <span className="text-sm text-white/80">United Arab Emirates</span>
              </li>
            </ul>
            <h4 className="font-semibold text-white mt-6 mb-3">Follow Us</h4>
            <a href="https://tiktok.com/@black.tech.fzc.ll" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors justify-center sm:justify-start">
              <ExternalLink size={16} />
              <span>TikTok Shop</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-xs text-white/60 mb-4 md:mb-0">
            © 2025 Black Tech FZC LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}