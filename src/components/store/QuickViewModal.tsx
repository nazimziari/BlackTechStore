'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useQuickViewStore } from '@/stores/quickViewStore';
import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductType } from '@/lib/models/Product';

// Helper to translate condition values from French (in DB) to English for display
const translateCondition = (condition: ProductType['condition']) => {
  const translations = {
    'Neuf': 'New',
    'Comme neuf': 'Like New',
    'Execellent': 'Excellent',
    'Bon': 'Good',
    'fonctionelle avec default': 'Functional with Defects',
  };
  return translations[condition] || condition;
};

export default function QuickViewModal() {
  const { isOpen, product, closeModal } = useQuickViewStore();
  const addItemToCart = useCartStore((state) => state.addItem);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setCurrentIndex(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));

  const handleClose = () => {
    closeModal();
  };
  
  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    handleClose();
  };

  const hasValidImages = Array.isArray(product.images) && product.images.length > 0;
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              {/* Responsive padding */}
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-4 md:p-6 text-left align-middle shadow-xl transition-all">
                
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10">
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Image Gallery */}
                  <div className="relative aspect-square">
                    {hasValidImages ? (
                      <Image
                        key={currentIndex}
                        src={product.images[currentIndex]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-md"></div>
                    )}
                    
                    {hasValidImages && product.images.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white transition"><ChevronLeft/></button>
                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white transition"><ChevronRight/></button>
                      </>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <div className="inline-block bg-[#F5F5F5] text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                        {translateCondition(product.condition)}
                      </div>
                    </div>

                    {/* Responsive Typography */}
                    <Dialog.Title as="h3" className="text-xl md:text-2xl font-bold leading-6 text-gray-900">
                      {product.name}
                    </Dialog.Title>

                    <div className="mt-4 max-h-48 overflow-y-auto pr-2">
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>

                    <div className="mt-auto pt-4">
                      {/* Responsive Typography */}
                      <p className="text-2xl md:text-3xl font-bold text-black">{product.price.toLocaleString()} AED</p>
                      {/* Responsive Buttons: stack on mobile */}
                      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
                          <span className="px-4 py-2">{quantity}</span>
                          <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2">+</button>
                        </div>
                        <button 
                          onClick={handleAddToCart}
                          className="flex-1 w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800"
                        >
                          Add to Cart
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