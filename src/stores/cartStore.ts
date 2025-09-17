import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductType } from '@/lib/models/Product';

// Define the shape of an item in the cart
export interface CartItem extends ProductType {
  quantity: number;
}

// Define the shape of the store's state and actions
interface CartState {
  items: CartItem[];
  addItem: (product: ProductType, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>()(
  // The 'persist' middleware wraps our store definition
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Action to add an item to the cart
      addItem: (product, quantity) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item._id === product._id);

        let updatedItems = [...currentItems];

        if (existingItemIndex > -1) {
          // If item already exists, update its quantity
          const existingItem = updatedItems[existingItemIndex];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          };
        } else {
          // If item is new, add it to the cart
          updatedItems.push({ ...product, quantity });
        }
        
        // Recalculate totals
        const { newTotalItems, newTotalPrice } = updatedItems.reduce(
          (acc, item) => ({
            newTotalItems: acc.newTotalItems + item.quantity,
            newTotalPrice: acc.newTotalPrice + item.price * item.quantity,
          }),
          { newTotalItems: 0, newTotalPrice: 0 }
        );

        set({ items: updatedItems, totalItems: newTotalItems, totalPrice: newTotalPrice });
      },

      // Action to remove an item from the cart
      removeItem: (productId) => {
        const updatedItems = get().items.filter((item) => item._id !== productId);
        
        const { newTotalItems, newTotalPrice } = updatedItems.reduce(
          (acc, item) => ({
            newTotalItems: acc.newTotalItems + item.quantity,
            newTotalPrice: acc.newTotalPrice + item.price * item.quantity,
          }),
          { newTotalItems: 0, newTotalPrice: 0 }
        );

        set({ items: updatedItems, totalItems: newTotalItems, totalPrice: newTotalPrice });
      },

      // Action to update the quantity of a specific item
      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) {
          get().removeItem(productId);
          return;
        }

        const updatedItems = get().items.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        );

        const { newTotalItems, newTotalPrice } = updatedItems.reduce(
          (acc, item) => ({
            newTotalItems: acc.newTotalItems + item.quantity,
            newTotalPrice: acc.newTotalPrice + item.price * item.quantity,
          }),
          { newTotalItems: 0, newTotalPrice: 0 }
        );
        
        set({ items: updatedItems, totalItems: newTotalItems, totalPrice: newTotalPrice });
      },
      
      // Action to completely clear the cart
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'blacktech-cart-storage', // Name for the item in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);