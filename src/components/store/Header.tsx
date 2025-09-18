'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X } from 'lucide-react'; // Import Menu and X icons
import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // For the mobile menu overlay

import { useCartStore } from '@/stores/cartStore';
import { useCartSidebarStore } from '@/stores/cartSidebarStore';
import { useSearchStore } from '@/stores/searchStore';

// Translated navigation links
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems);
  const openCartSidebar = useCartSidebarStore((state) => state.open);
  const openSearch = useSearchStore((state) => state.open);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // This effect closes the mobile menu when the user navigates to a new page
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <header className="bg-black h-[73px] flex items-center sticky top-0 z-50">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-8 flex justify-between items-center w-full">
          
          {/* Logo */}
          <Link href="/">
            <Image src="/logos/blacktech-logo.png" alt="BlackTech Logo" width={143} height={49} priority />
          </Link>

          {/* Desktop Navigation */}
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
          
          {/* Right-side Icons */}
          <div className="flex items-center gap-2">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center" style={{ gap: '22px' }}>
              <button onClick={openSearch} className="text-white hover:text-[#773E25] transition-colors w-10 h-10 flex items-center justify-center">
                <Search size={24} />
              </button>
              <button onClick={openCartSidebar} className="relative text-white hover:text-[#773E25] transition-colors w-10 h-10 flex items-center justify-center">
                <ShoppingCart size={24} />
                {isMounted && totalItems > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile Hamburger Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white w-10 h-10 flex items-center justify-center">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel (Overlay) */}
      <Transition show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100] md:hidden" onClose={setIsMobileMenuOpen}>
          {/* Backdrop */}
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>
          {/* Panel */}
          <div className="fixed inset-0">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-xs bg-black p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-white font-bold text-lg">Navigation</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                    <X size={28} />
                  </button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link key={link.href} href={link.href} className={`text-xl p-2 rounded-md ${isActive ? 'text-[#773E25] bg-gray-800' : 'text-white'}`}>
                        {link.label}
                      </Link>
                    );
                  })}
                  {/* We can add Search and Cart to the mobile menu too */}
                   <button onClick={() => { setIsMobileMenuOpen(false); openSearch(); }} className="text-xl p-2 rounded-md text-white text-left flex items-center gap-4">
                    <Search size={20} /> Search
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); openCartSidebar(); }} className="text-xl p-2 rounded-md text-white text-left flex items-center gap-4">
                    <ShoppingCart size={20} /> Cart ({isMounted ? totalItems : 0})
                  </button>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}