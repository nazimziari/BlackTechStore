import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  return (
    // Main container: #F2F4F5 background and 72px height
    <nav className="bg-[#F2F4F5] h-[72px] flex items-center">
      <div className="container max-w-[1440px] mx-auto px-8">
        <div className="flex items-center gap-2">
          {/* Home Link */}
          <Link href="/" className="flex items-center gap-2 text-[#5F6C72] hover:text-black transition-colors">
            <Home size={16} />
            <span className="font-normal text-sm leading-5">Home</span>
          </Link>

          {/* Separator */}
          <ChevronRight size={16} className="text-[#5F6C72]" />

          {/* Current Page (Not a link) */}
          <span className="font-normal text-sm leading-5 text-[#5F6C72]">Shop</span>
        </div>
      </div>
    </nav>
  );
}