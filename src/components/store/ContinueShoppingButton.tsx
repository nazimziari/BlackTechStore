'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

export default function ContinueShoppingButton() {
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClick = () => {
    // We clear the cart when the user clicks the link.
    // The redirect happens via the <Link> component itself.
    clearCart();
  };

  return (
    <Link 
      href="/shop" 
      onClick={handleClick}
      className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-800"
    >
      Continue Shopping
    </Link>
  );
}