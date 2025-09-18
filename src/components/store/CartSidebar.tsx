'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useCartStore, CartItem } from '@/stores/cartStore';
import { useCartSidebarStore } from '@/stores/cartSidebarStore';

function CartItemCard({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image src={item.images[0]} alt={item.name} width={96} height={96} className="h-full w-full object-cover object-center" />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3><Link href="#">{item.name}</Link></h3>
            <p className="ml-4">{(item.price * item.quantity).toLocaleString()} AED</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 rounded">
            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1">-</button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1">+</button>
          </div>
          <div className="flex">
            <button onClick={() => removeItem(item._id)} type="button" className="font-medium text-red-600 hover:text-red-500">Remove</button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function CartSidebar() {
  const { isOpen, close } = useCartSidebarStore();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping Cart ({totalItems})</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={close}>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        {items.length > 0 ? (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => <CartItemCard key={item._id} item={item} />)}
                          </ul>
                        ) : (
                          <p className="text-center text-gray-500">Your cart is empty.</p>
                        )}
                      </div>
                    </div>
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{totalPrice.toLocaleString()} AED</p>
                        </div>
                        <div className="mt-6">
                          <Link href="/checkout" onClick={close} className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800">
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>or <button type="button" className="font-medium text-black hover:underline" onClick={clearCart}>Clear Cart</button></p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}