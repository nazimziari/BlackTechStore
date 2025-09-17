'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/stores/cartStore';
import { createOrder, FormState } from '@/lib/actions';
import Image from 'next/image';

// Helper component for the submit button
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
    >
      {pending ? 'Placing Order...' : 'Place an order'}
    </button>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();
  const router = useRouter();
  
  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(createOrder, initialState);

  // This effect will run after the form submission is successful
  useEffect(() => {
    if (state.success) {
      clearCart();
      // The redirect is now handled by the server action, but this is a fallback
      // router.push('/thank-you'); 
    }
  }, [state, clearCart, router]);
  
  // If the cart is empty and the page loads, redirect to the shop
  useEffect(() => {
    if (totalItems === 0) {
      router.push('/shop');
    }
  }, [totalItems, router]);


  return (
    <div className="bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Delivery Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <form action={formAction} className="space-y-4">
              {/* We pass the cart items as a hidden input */}
              <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name and surname</label>
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
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

          {/* Right Column: Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                  <p className="font-medium">{item.price * item.quantity} DZD</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{totalPrice.toLocaleString('fr-FR')} DZD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}