'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

// --- 1. IMPORT OUR ZUSTAND STORES ---
import { useCartStore } from '@/stores/cartStore';
import { useCartSidebarStore } from '@/stores/cartSidebarStore';

import { useSearchStore } from '@/stores/searchStore';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/shop', label: 'Boutique' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  // --- 2. GET THE DATA AND ACTIONS FROM OUR STORES ---
  const totalItems = useCartStore((state) => state.totalItems);
  const openSidebar = useCartSidebarStore((state) => state.open);

  // --- 3. PREVENT HYDRATION MISMATCH ---
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const openSearch = useSearchStore((state) => state.open);


  return (
    <header className="bg-black h-[73px] flex items-center sticky top-0 z-50">
      <div className="container max-w-[1440px] mx-auto px-[54px] flex justify-between items-center w-full">
        {/* Logo and Nav Links (unchanged) */}
        <Link href="/">
          <Image src="/logos/blacktech-logo.png" alt="BlackTech Logo" width={143} height={49} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`text-base font-medium transition-colors hover:text-[#773E25] ${isActive ? 'text-[#773E25]' : 'text-white'}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        {/* --- 4. THE FIX IS IN THIS SECTION --- */}
        <div className="flex items-center" style={{ gap: '22px' }}>
        <button 
            onClick={openSearch} 
            className="text-white hover:text-[#773E25] transition-colors w-10 h-10 flex items-center justify-center"
          >
            <Search size={24} />
          </button>
          
          {/* This is now the dynamic cart button */}
          <button 
            onClick={openSidebar} // It now opens the sidebar
            className="relative text-white hover:text-[#773E25] transition-colors w-10 h-10 flex items-center justify-center"
          >
            <ShoppingCart size={24} />
            {/* The badge is only rendered on the client AND if there are items */}
            {isMounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}