'use client';

import Image from 'next/image';
import { ProductType } from '@/lib/models/Product';
import { useQuickViewStore } from '@/stores/quickViewStore';
import { useCartStore } from '@/stores/cartStore';
import { ImageIcon, BadgePercent } from 'lucide-react'; // Added BadgePercent for promotion

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

// Reusable component for the gray info tags
const InfoTag = ({ text }: { text: string }) => (
  <div className="inline-block bg-[#F5F5F5] text-gray-700 px-2 py-1 rounded text-xs font-medium">
    {text}
  </div>
);


export default function ProductCard({ product }: { product: ProductType }) {
  const openModal = useQuickViewStore((state) => state.openModal);
  const addItemToCart = useCartStore((state) => state.addItem);

  if (!product) return null;

  const hasValidImage = Array.isArray(product.images) && product.images.length > 0 && typeof product.images[0] === 'string';
  const imageUrl = hasValidImage ? product.images[0] : null;

  const handleAddToCart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
    addItemToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={() => openModal(product)}
      className="w-full max-w-[324px] bg-white border border-gray-200 group overflow-hidden transition-shadow hover:shadow-xl text-left flex flex-col"
    >
      <div className="relative w-full aspect-square bg-gray-50">
        {imageUrl ? (
          <Image src={imageUrl} alt={product.name} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="text-gray-300" size={64} />
          </div>
        )}
        {/* The Promotion tag is now a red badge with an icon */}
        {product.isOnPromotion && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            <BadgePercent size={14}/>
            <span>SALE</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* --- TAGS ARE NOW ALL GRAY --- */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <InfoTag text={translateCondition(product.condition)} />
          <InfoTag text={product.category} />
          {product.type && <InfoTag text={product.type} />}
        </div>
        
        <h3 className="font-semibold text-lg leading-7 text-gray-900 truncate">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 truncate">{product.description}</p>
        <div className="flex-grow" /> 
        
        {/* --- NEW PRICE DISPLAY LOGIC --- */}
        <div className="mt-4 flex items-baseline gap-2">
          {product.isOnPromotion && product.promotionalPrice ? (
            <>
              <p className="font-bold text-xl text-red-600">
                {product.promotionalPrice.toLocaleString()} AED
              </p>
              <p className="text-sm text-gray-500 line-through">
                {product.price.toLocaleString()} AED
              </p>
            </>
          ) : (
            <p className="font-bold text-xl text-[#0D0D0D]">
              {product.price.toLocaleString()} AED
            </p>
          )}
        </div>
        
        <div onClick={handleAddToCart} className="mt-4 w-full bg-black text-white font-semibold py-3 rounded-md text-center transition-colors group-hover:bg-gray-800">
          Add to Cart
        </div>
      </div>
    </button>
  );
}