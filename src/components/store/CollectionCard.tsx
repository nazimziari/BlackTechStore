import Image from 'next/image';
import Link from 'next/link';

// Define the types for the props this component will accept
type CollectionCardProps = {
  imageSrc: string;
  title: string;
  links: string[];
  modelCount: string;
  shopLink: string;
};

// --- THE FIX IS HERE ---
// Ensure this line is exactly "export default function CollectionCard"
export default function CollectionCard({
  imageSrc,
  title,
  links,
  modelCount,
  shopLink,
}: CollectionCardProps) {
  return (
    // Card Container: 385px width and background color #EDEDED
    <div className="w-[385px] bg-[#EDEDED] border border-gray-200">
      {/* Image Container */}
      <div className="w-[385px] h-[428px] bg-gray-300">
        <Image
          src={imageSrc}
          alt={`Collection: ${title}`}
          width={385}
          height={428}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content Container */}
      <div className="p-6">
        {/* Title: Inter SemiBold, 18px */}
        <h3 className="font-semibold text-lg leading-7 text-black">{title}</h3>

        {/* Links List */}
        <ul className="mt-4 space-y-2">
          {links.map((linkText) => (
            <li key={linkText}>
              <Link
                href="#" // These links can be updated later
                // Typography: Inter Regular, 14px
                className="text-sm leading-[22.75px] text-gray-600 hover:text-black transition-colors"
              >
                {linkText}
              </Link>
            </li>
          ))}
        </ul>

        {/* Model Count */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <Link
            href={shopLink}
            // Typography: Inter Medium, 12px
            className="font-medium text-xs leading-4 text-gray-800 hover:text-black transition-colors"
          >
            {modelCount}
          </Link>
        </div>
      </div>
    </div>
  );
}