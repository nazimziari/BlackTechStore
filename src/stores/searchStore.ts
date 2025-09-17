import { create } from 'zustand';

// This interface defines the shape of our store's state and actions
interface SearchState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

// --- THE FIX IS HERE ---
// The "export const" is the critical part that makes the store available to other files.
export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));