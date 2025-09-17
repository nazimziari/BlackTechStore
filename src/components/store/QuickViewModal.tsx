'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuickViewStore } from '@/stores/quickViewStore';
import { useCartStore } from '@/stores/cartStore'; // --- 1. IMPORT THE CART STORE ---
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductType } from '@/lib/models/Product'; // Import ProductType for safety

export default function QuickViewModal() {
  const { isOpen, product, closeModal } = useQuickViewStore();
  const addItemToCart = useCartStore((state) => state.addItem); // --- 2. GET THE 'addItem' ACTION ---
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // This effect resets the image index whenever a NEW product is opened in the modal
  useEffect(() => {
    if (product) {
      setCurrentIndex(0);
      setQuantity(1);
    }
  }, [product]);

  // We add a type guard to ensure product is not null
  if (!product) {
    return null;
  }

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));

  const handleClose = () => {
    closeModal();
  };
  
  // This function now handles adding the item to the cart
  const handleAddToCart = () => {
    // We pass the full product object and the current quantity
    addItemToCart(product, quantity);
    // You could add a success notification here
    handleClose(); // Close the modal after adding the item
  };

  const hasValidImages = Array.isArray(product.images) && product.images.length > 0;
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                
                <button 
                  onClick={handleClose} 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div className="relative">
                    {hasValidImages && (
                      <Image
                        key={currentIndex} // Add key to help React with transitions
                        src={product.images[currentIndex]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                    {hasValidImages && product.images.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white"><ChevronLeft/></button>
                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white"><ChevronRight/></button>
                      </>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <div className="inline-block bg-[#F5F5F5] text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                        {product.condition}
                      </div>
                    </div>
                    <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                      {product.name}
                    </Dialog.Title>
                    <div className="mt-4 max-h-48 overflow-y-auto pr-2">
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                    <div className="mt-auto pt-4">
                      <p className="text-3xl font-bold text-black">{product.price.toLocaleString('fr-FR')} DZD</p>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
                          <span className="px-4 py-2">{quantity}</span>
                          <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2">+</button>
                        </div>
                        {/* --- 3. THE BUTTON IS NOW CONNECTED --- */}
                        <button 
                          onClick={handleAddToCart}
                          className="flex-1 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}