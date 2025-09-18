import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductType } from '@/lib/models/Product';
import { Types } from 'mongoose';

export interface CartItem extends Omit<ProductType, '_id'> {
  _id: string; // The _id in the cart will be a string
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: ProductType, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// --- 1. A HELPER FUNCTION TO DO THE MATH ---
// This function takes an array of items and returns the calculated totals.
const calculateTotals = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
};


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product, quantity) => {
        const currentItems = get().items;
        const productStringId = product._id.toString();
        const existingItemIndex = currentItems.findIndex((item) => item._id === productStringId);

        const updatedItems= [...currentItems];

        if (existingItemIndex > -1) {
          const existingItem = updatedItems[existingItemIndex];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          };
        } else {
          updatedItems.push({ ...product, _id: productStringId, quantity });
        }
        
        // --- 2. USE THE HELPER FUNCTION ---
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      removeItem: (productId) => {
        const updatedItems = get().items.filter((item) => item._id !== productId);
        
        // --- 2. USE THE HELPER FUNCTION ---
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) {
          get().removeItem(productId);
          return;
        }

        const updatedItems = get().items.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        );

        // --- 2. USE THE HELPER FUNCTION ---
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },
      
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'blacktech-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);