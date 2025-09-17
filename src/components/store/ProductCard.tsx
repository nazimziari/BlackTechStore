'use client';

import Image from 'next/image';
import { ProductType } from '@/lib/models/Product';
import { useQuickViewStore } from '@/stores/quickViewStore';
import { useCartStore } from '@/stores/cartStore'; // --- 1. IMPORT THE CART STORE ---
import { ImageIcon } from 'lucide-react';

type ProductCardProps = {
  product: ProductType; 
};

export default function ProductCard({ product }: ProductCardProps) {
  const openModal = useQuickViewStore((state) => state.openModal);
  const addItemToCart = useCartStore((state) => state.addItem); // --- 2. GET THE 'addItem' ACTION ---

  if (!product) return null;

  const hasValidImage = Array.isArray(product.images) && product.images.length > 0 && typeof product.images[0] === 'string';
  const imageUrl = hasValidImage ? product.images[0] : null;

  // This function handles adding the item to the cart
  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement>) => {
    // We call stopPropagation() to prevent the click from also triggering the modal opening
    e.stopPropagation(); 
    addItemToCart(product, 1);
    // You can add a "toast" notification here to confirm the item was added
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    // The main button now opens the Quick View modal on click
    <button
      onClick={() => openModal(product)}
      className="w-[324px] bg-white border border-gray-200 group overflow-hidden transition-shadow hover:shadow-xl text-left flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full h-[322px] bg-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            width={322}
            height={322}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="text-gray-300" size={64} />
          </div>
        )}
      </div>
      
      {/* Text Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <div className="inline-block bg-[#F5F5F5] text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
            {product.condition}
          </div>
        </div>
        <h3 className="font-semibold text-lg leading-7 text-gray-900 truncate">{product.name}</h3>
        <p className="mt-1 text-sm leading-[22.75px] text-gray-500 truncate">{product.description}</p>
        {/* This div pushes the content below it to the bottom */}
        <div className="flex-grow" /> 
        <div className="mt-4 flex items-baseline gap-2">
          <p className="font-bold text-xl leading-7 text-[#0D0D0D]">
            DZD {product.price.toLocaleString('fr-FR')}
          </p>
        </div>
        
        {/* --- 3. THE "BUTTON" IS NOW A DIV WITH ITS OWN onClick HANDLER --- */}
        <div 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-black text-white font-semibold py-3 rounded-md text-center transition-colors group-hover:bg-gray-800"
        >
          Ajouter au panier
        </div>
      </div>
    </button>
  );
}