import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'; // Import necessary icons

// Reusable component for the footer section titles
const FooterTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-semibold text-white mb-4">{children}</h3>
);

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="container max-w-[1440px] mx-auto px-4 md:px-[54px] py-12">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Logo and Info */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logos/blacktech-logo.png" // Using the same logo as the header
                alt="BlackTech Logo"
                width={183}
                height={63}
              />
            </Link>
            <p className="text-sm text-white/80 leading-[22.75px] max-w-[300px]">
              Votre partenaire de confiance pour l&apos;achat de produits technologiques reconditionnés aux Émirats Arabes Unis.
            </p>
            <div className="text-xs text-white/60 leading-4">
              <p>Black Tech FZC LLC</p>
              <p>Émirats Arabes Unis</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <FooterTitle>Navigation</FooterTitle>
            <ul className="space-y-2">
              <li><Link href="/accueil" className="text-sm text-white/80 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/shop" className="text-sm text-white/80 hover:text-white transition-colors">Boutique</Link></li>
              <li><Link href="/categories" className="text-sm text-white/80 hover:text-white transition-colors">Catégories</Link></li>
              <li><Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/support" className="text-sm text-white/80 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Support Client */}
          <div>
            <FooterTitle>Support Client</FooterTitle>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-sm text-white/80 hover:text-white transition-colors">Centre d&apos;aide</Link></li>
              <li><Link href="/garanties" className="text-sm text-white/80 hover:text-white transition-colors">Garanties</Link></li>
              <li><Link href="/returns" className="text-sm text-white/80 hover:text-white transition-colors">Retours</Link></li>
              <li><Link href="/shipping" className="text-sm text-white/80 hover:text-white transition-colors">Livraison</Link></li>
              <li><Link href="/faq" className="text-sm text-white/80 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <FooterTitle>Contact</FooterTitle>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-white/80" />
                <a href="mailto:contact@blacktech.ae" className="text-sm text-white/80 hover:text-white transition-colors">contact@blacktech.ae</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-white/80" />
                <span className="text-sm text-white/80">numero</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-white/80" />
                <span className="text-sm text-white/80">Émirats Arabes Unis</span>
              </li>
            </ul>
            <h4 className="font-semibold text-white mt-6 mb-3">Suivez-nous</h4>
            <a href="https://tiktok.com/shop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
              <ExternalLink size={16} />
              <span>TikTok Shop</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-white/60 mb-4 md:mb-0">
            © 2025 Black Tech FZC LLC. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <Link href="/terms" className="hover:text-white transition-colors">Conditions générales</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}