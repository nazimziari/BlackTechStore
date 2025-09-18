'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Fragment } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

// Reusable components for the form elements
const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <details className="py-4 border-b border-gray-200" open>
    <summary className="flex justify-between items-center cursor-pointer list-none">
      <span className="text-base font-semibold text-gray-800">{title}</span>
      <ChevronDown className="text-gray-500" size={20} />
    </summary>
    <div className="pt-4 space-y-3">{children}</div>
  </details>
);

const FilterCheckbox = ({ label, id, isChecked, onChange }: { label: string; id: string; isChecked: boolean; onChange: () => void; }) => (
  <div className="flex items-center gap-3">
    <input type="checkbox" id={id} checked={isChecked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
  </div>
);

// This is the actual content of the sidebar, used in both mobile and desktop views
function SidebarContent({ onApply }: { onApply: () => void; }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filters: { [key: string]: string[] } = {};
    for (const [key] of params.entries()) {
      if (key !== 'sort' && key !== 'page') {
        filters[key] = params.get(key)?.split(',') || [];
      }
    }
    setSelectedFilters(filters);
  }, [searchParams]);

  const handleCheckboxChange = (type: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[type] || [];
      if (currentValues.includes(value)) {
        return { ...prev, [type]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [type]: [...currentValues, value] };
      }
    });
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(selectedFilters).forEach(key => {
      const values = selectedFilters[key];
      if (values.length > 0) {
        params.set(key, values.join(','));
      } else {
        params.delete(key);
      }
    });
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
    onApply(); // This calls the function to close the mobile modal
  };

  const isChecked = (type: string, value: string) => selectedFilters[type]?.includes(value) || false;
  
  const brands = ["Acer", "Apple", "Asus", "HP", "Lenovo", "MSI", "Razer", "Samsung", "Sony", "Toshiba"];
  const pcTypes = ["Gamer", "Office", "Multimedia", "Convertible"];
  const accessoryTypes = ["Keyboard", "Mouse", "Headset", "Webcam"];
  const conditions = [
    { value: "Neuf", label: "New" },
    { value: "Comme neuf", label: "Like New" },
    { value: "Execellent", label: "Excellent" },
    { value: "Bon", label: "Good" },
    { value: "fonctionelle avec default", label: "Functional with Defects" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <FilterGroup title="PC Type">{pcTypes.map(type => <FilterCheckbox key={type} id={type} label={type} isChecked={isChecked('type', type)} onChange={() => handleCheckboxChange('type', type)} />)}</FilterGroup>
        <FilterGroup title="Accessory Type">{accessoryTypes.map(type => <FilterCheckbox key={type} id={type} label={type} isChecked={isChecked('type', type)} onChange={() => handleCheckboxChange('type', type)} />)}</FilterGroup>
        <FilterGroup title="Brand">{brands.map(brand => <FilterCheckbox key={brand} id={brand} label={brand} isChecked={isChecked('brand', brand)} onChange={() => handleCheckboxChange('brand', brand)} />)}</FilterGroup>
        <FilterGroup title="Condition">{conditions.map(c => <FilterCheckbox key={c.value} id={c.value} label={c.label} isChecked={isChecked('condition', c.value)} onChange={() => handleCheckboxChange('condition', c.value)} />)}</FilterGroup>
      </div>
      <button onClick={handleApplyFilters} className="w-full bg-black text-white py-3 rounded-md mt-6 sticky bottom-4 lg:bottom-0">
        Apply Filters
      </button>
    </div>
  );
}

// The main component that renders the correct UI for mobile vs. desktop
export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile modal state is now internal

  return (
    <>
      {/* Mobile "Show Filters" Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 w-full justify-center py-2 px-4 border rounded-md">
          <Filter size={16} />
          <span>Show Filters</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-full hidden lg:block">
        <SidebarContent onApply={() => {}} />
      </aside>
      
      {/* Mobile Modal Filter */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4">
                  <SidebarContent onApply={() => setIsOpen(false)} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}