'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

// Helper component for a single page link or an ellipsis.
const PageLink = ({
  href,
  children,
  isActive,
  isDisabled = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  isDisabled?: boolean;
}) => {
  const commonClasses = "w-10 h-10 flex items-center justify-center rounded-md transition-colors text-sm font-medium";

  if (isDisabled) {
    return <span className={`${commonClasses} text-gray-300 cursor-not-allowed`}>{children}</span>;
  }
  
  if (!href) {
    return <span className={`${commonClasses} text-gray-500`}>{children}</span>
  }
  
  const activeClasses = "bg-black text-white";
  const inactiveClasses = "text-gray-500 hover:bg-gray-100";

  return (
    <Link href={href} className={`${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </Link>
  );
};

// Helper function to generate the list of page numbers to display.
const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};


export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  // --- THE FIX IS HERE: All hooks are called at the top of the component ---
  const searchParams = useSearchParams();

  // The early return now happens AFTER the hooks have been called.
  if (totalPages <= 1) return null; 

  const allPages = generatePagination(currentPage, totalPages);
  
  // This helper function builds the full URL query string.
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Page Button */}
      <PageLink
        href={createPageURL(currentPage - 1)}
        isActive={false}
        isDisabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </PageLink>

      {/* Page Number Links */}
      {allPages.map((page, index) => (
        <PageLink
          key={`${page}-${index}`}
          href={typeof page === 'number' ? createPageURL(page) : ''}
          isActive={currentPage === page}
        >
          {page}
        </PageLink>
      ))}
      
      {/* Next Page Button */}
      <PageLink
        href={createPageURL(currentPage + 1)}
        isActive={false}
        isDisabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </PageLink>
    </nav>
  );
}