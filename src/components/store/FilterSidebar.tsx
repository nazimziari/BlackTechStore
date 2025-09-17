'use client'; // Required for making the collapsible sections interactive in the future

import { Search, ChevronDown } from 'lucide-react';

// Reusable component for each checkbox item in the light theme
const FilterCheckbox = ({ label, id }: { label: string; id: string }) => (
  <li className="flex items-center gap-3">
    <input
      type="checkbox"
      id={id}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={id} className="text-sm text-gray-700 capitalize">
      {label}
    </label>
  </li>
);

// Reusable component for each collapsible filter group in the light theme
const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <details className="py-4 border-b border-gray-200" open>
    <summary className="flex justify-between items-center cursor-pointer list-none">
      <span className="text-base font-semibold text-gray-800">{title}</span>
      <ChevronDown className="text-gray-500" size={20} />
    </summary>
    <div className="pt-4">
      <ul className="space-y-3">
        {children}
      </ul>
    </div>
  </details>
);

export default function FilterSidebar() {
  return (
    // Main aside container - no background color here, it inherits the page's white
    <aside className="w-full">
      
      {/* Search Input - Light theme */}
      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Search"
          className="w-full h-12 pl-12 pr-4 bg-[#F0F0F0] text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="text-gray-500" size={20} />
        </div>
      </div>

      {/* Filter Groups */}
      <FilterGroup title="Pc portable">
        <FilterCheckbox id="bureautique" label="Bureautique" />
        <FilterCheckbox id="convertible" label="Convertible (Pc + Tablet)" />
        <FilterCheckbox id="multimedia" label="Multimedia" />
        <FilterCheckbox id="gamer" label="Gamer" />
      </FilterGroup>

      <FilterGroup title="Marque">
        <FilterCheckbox id="acer" label="Acer" />
        <FilterCheckbox id="apple" label="Apple" />
        <FilterCheckbox id="asus" label="Asus" />
        <FilterCheckbox id="hp" label="HP" />
        <FilterCheckbox id="lenovo" label="Lenovo" />
        <FilterCheckbox id="msi" label="MSI (Micro-Star International)" />
        <FilterCheckbox id="razer" label="Razer" />
        <FilterCheckbox id="samsung" label="Samsung" />
        <FilterCheckbox id="sony" label="Sony" />
        <FilterCheckbox id="toshiba" label="Toshiba" />
      </FilterGroup>

      <FilterGroup title="Accessoires">
        <FilterCheckbox id="clavier" label="Clavier" />
        <FilterCheckbox id="souris" label="Souris" />
        <FilterCheckbox id="casque" label="Casque (Headset)" />
        <FilterCheckbox id="webcam" label="Caméra (Webcam)" />
        {/* ... Add other accessory checkboxes as needed */}
      </FilterGroup>

      <FilterGroup title="État">
        <FilterCheckbox id="neuf" label="Neuf" />
        <FilterCheckbox id="comme-neuf" label="Comme Neuf" />
        <FilterCheckbox id="excellent" label="Excellent" />
        <FilterCheckbox id="bon" label="Bon" />
        <FilterCheckbox id="avec-defauts" label="Fonctionnel Avec Défauts" />
      </FilterGroup>
      
      {/* The design doesn't show a "Filter" button, so it has been removed. */}
      {/* We will make the filters apply instantly when a checkbox is clicked later. */}
    </aside>
  );
}