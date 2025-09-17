'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'Select...', value: '' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Prix: low to high', value: 'price-asc' },
  { label: 'Prix: high to low', value: 'price-desc' },
  { label: 'Latest', value: 'latest' },
  { label: 'On Promotion', value: 'promotion' },
];

// --- THIS IS THE CRITICAL LINE ---
// It must say "export default function CustomSortDropdown"
export default function CustomSortDropdown() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSortValue = searchParams.get('sort') || 'popular';
  const currentSortLabel = sortOptions.find(opt => opt.value === currentSortValue)?.label || 'Most Popular';

  function handleSortChange(newValue: string) {
    const params = new URLSearchParams(searchParams);
    if (newValue && newValue !== 'popular') {
      params.set('sort', newValue);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative text-left w-[180px]">
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex w-full justify-between items-center h-[44px] rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#475156] hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          {currentSortLabel}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="px-1 py-1 ">
              {sortOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSortChange(option.value)}
                      className={`${
                        active || currentSortValue === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm ${
                        option.value === '' ? 'font-bold' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}