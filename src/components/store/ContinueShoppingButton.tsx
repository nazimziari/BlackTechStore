'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

export default function ContinueShoppingButton() {
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClick = () => {
    // This logic is perfect, it clears the cart on click.
    clearCart();
  };

  return (
    <Link 
      href="/shop" 
      onClick={handleClick}
      // --- RESPONSIVE TWEAKS ---
      // Adjusted padding and font size for a better mobile experience.
      className="bg-black text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base rounded-md hover:bg-gray-800 transition-colors"
    >
      Continue Shopping
    </Link>
  );
}