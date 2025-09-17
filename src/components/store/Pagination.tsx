import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

// This helper component contains all the new styling logic
const PageLink = ({
  page,
  isActive,
  isDisabled = false,
  children,
  baseUrl,
}: {
  page: number | string;
  isActive: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  baseUrl: string;
}) => {
  // Common classes for all buttons: square, centered, with rounded corners
  const commonClasses = "w-10 h-10 flex items-center justify-center rounded-md transition-colors";

  // If the button is disabled (e.g., "Previous" on page 1)
  if (isDisabled) {
    return <span className={`${commonClasses} text-gray-300 cursor-not-allowed`}>{children}</span>;
  }
  
  // Classes for the active page button (black background, white text)
  const activeClasses = "bg-black text-white";
  // Classes for inactive page buttons (grey text, hover effect)
  const inactiveClasses = "text-gray-500 hover:bg-gray-100";

  return (
    <Link
      href={`${baseUrl}?page=${page}`}
      className={`${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </Link>
  );
};

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Page Button */}
      <PageLink
        page={currentPage - 1}
        isActive={false}
        isDisabled={currentPage === 1}
        baseUrl={baseUrl}
      >
        <ChevronLeft size={20} />
      </PageLink>

      {/* Page Number Links */}
      {pageNumbers.map((page) => (
        <PageLink
          key={page}
          page={page}
          isActive={currentPage === page}
          baseUrl={baseUrl}
        >
          {page}
        </PageLink>
      ))}
      
      {/* Next Page Button */}
      <PageLink
        page={currentPage + 1}
        isActive={false}
        isDisabled={currentPage === totalPages}
        baseUrl={baseUrl}
      >
        <ChevronRight size={20} />
      </PageLink>
    </nav>
  );
}