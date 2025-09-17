import { create } from 'zustand';
import { ProductType } from '@/lib/models/Product';

interface QuickViewState {
  isOpen: boolean;
  product: ProductType | null;
  openModal: (product: ProductType) => void;
  closeModal: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  isOpen: false,
  product: null,
  openModal: (product) => {
    // --- DEBUGGING STEP ---
    console.log("Zustand Store: openModal action triggered. State is being updated.");
    set({ isOpen: true, product: product });
  },
  closeModal: () => set({ isOpen: false, product: null }),
}));