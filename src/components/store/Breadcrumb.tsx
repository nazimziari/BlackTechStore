'use client'; // This component now uses hooks, so it must be a Client Component.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export default function Breadcrumb() {
  const pathname = usePathname();
  // Create breadcrumb segments from the URL path
  const segments = pathname.split('/').filter(segment => segment); // filter(Boolean) removes empty strings

  return (
    // Responsive height and padding
    <nav className="bg-[#F2F4F5] h-[60px] md:h-[72px] flex items-center">
      {/* Responsive padding */}
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-2">
          {/* Home Link */}
          <Link href="/" className="flex items-center gap-2 text-[#5F6C72] hover:text-black transition-colors">
            <Home size={16} />
            <span className="font-normal text-sm leading-5">Home</span>
          </Link>

          {/* Dynamically generated segments */}
          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1;
            
            return (
              <Fragment key={href}>
                <ChevronRight size={16} className="text-[#5F6C72]" />
                <Link
                  href={href}
                  // If it's the last segment, it's not a link and has a different color
                  className={`font-normal text-sm leading-5 capitalize ${
                    isLast 
                      ? 'text-black pointer-events-none' 
                      : 'text-[#5F6C72] hover:text-black'
                  }`}
                >
                  {segment.replace('-', ' ')}
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}