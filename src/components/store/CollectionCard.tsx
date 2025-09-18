import Image from 'next/image';
import Link from 'next/link';

type CollectionCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  productCount: number;
  shopLink: string;
};

export default function CollectionCard({
  imageSrc,
  title,
  description,
  productCount,
  shopLink,
}: CollectionCardProps) {
  return (
    // --- THE FIX IS HERE ---
    // 1. We set a fixed height of 678px, but only on large (lg) screens and up.
    //    On mobile, the height will be automatic, which is much better for small devices.
    // 2. We keep it as a flex column to control the content inside.
    <Link 
      href={shopLink} 
      className="w-full max-w-[385px] bg-[#EDEDED] border border-gray-200 group transition-shadow hover:shadow-lg flex flex-col lg:h-[678px]"
    >
      {/* Image Container */}
      {/* 3. On large screens, we give the image a fixed height of 428px. On smaller screens, it uses an aspect ratio. */}
      <div className="relative w-full aspect-[385/428] lg:h-[428px] lg:aspect-auto flex-shrink-0">
        <Image
          src={imageSrc}
          alt={`Collection: ${title}`}
          fill // Use fill to cover the container
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Text Content Container */}
      {/* 4. This container is also a flex column and will grow to fill the remaining space. */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg leading-7 text-black">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">
          {description}
        </p>
        
        {/* 5. This invisible spacer div pushes the product count to the bottom. */}
        <div className="flex-grow" />
        
        <div className="mt-6 border-t border-gray-300 pt-4">
          <p className="font-medium text-xs leading-4 text-gray-800">
            {productCount}+ Products
          </p>
        </div>
      </div>
    </Link>
  );
}