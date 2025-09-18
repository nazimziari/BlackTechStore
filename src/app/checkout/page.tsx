'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/stores/cartStore';
import { createOrder, FormState } from '@/lib/actions';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
    >
      {pending ? 'Placing Order...' : 'Place Order'}
    </button>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();
  const router = useRouter();
  
  // This state prevents the redirect from happening on the initial server render
  const [isMounted, setIsMounted] = useState(false);
  
  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(createOrder, initialState);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (state.success) {
      clearCart();
      // The redirect is handled by the server action, but clearing the cart happens here.
    }
  }, [state.success, clearCart]);
  
  // This effect now waits for the component to mount before checking the cart
  useEffect(() => {
    if (isMounted && totalItems === 0) {
      router.push('/shop');
    }
  }, [isMounted, totalItems, router]);
  
  // Render nothing or a loading spinner until the component is mounted
  if (!isMounted) {
    return null; 
  }

  return (
    <div className="bg-gray-50">
      {/* Responsive padding */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        {/* Responsive grid: stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" id="phone" name="phone" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea id="address" name="address" rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
              </div>
              
              <div className="pt-4">
                <SubmitButton />
              </div>
              {state.message && (
                <p className={`mt-2 text-sm text-center ${state.success ? 'text-green-500' : 'text-red-500'}`}>
                  {state.message}
                </p>
              )}
            </form>
          </div>

          {/* Order Summary: Use row-start-1 to make it appear on top on mobile screens */}
          <div className="bg-white p-6 rounded-lg shadow-sm md:row-start-auto row-start-1">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Image src={item.images[0]} alt={item.name} width={48} height={48} className="rounded-md" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">{(item.price * item.quantity).toLocaleString()} AED</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{totalPrice.toLocaleString()} AED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}