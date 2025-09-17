import CustomSortDropdown from './CustomSortDropdown'; // Import our new custom component

type ShopToolbarProps = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
};

export default function ShopToolbar({
  itemCount,
  totalItems,
}: ShopToolbarProps) {
  const startItem = totalItems > 0 ? 1 : 0;
  const endItem = itemCount;

  return (
    <div className="flex justify-between items-center mb-8">
      <p className="text-lg text-[#2C3E50]">
        Showing {startItem}–{endItem} of {totalItems} results
      </p>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#191C1F]">Sort by:</span>
        {/* Replace the old dropdown with our new custom component */}
        <CustomSortDropdown />
      </div>
    </div>
  );
}