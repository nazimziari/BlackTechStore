import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import Product, { ProductType } from '@/lib/models/Product';
import CollectionCard from '@/components/store/CollectionCard';
import ProductCard from '@/components/store/ProductCard'; 

// --- THE FIX IS HERE ---
// We must define the 'plainify' helper function before we use it.
const plainify = (obj: unknown) => JSON.parse(JSON.stringify(obj));

export default async function HomePage() {
  await dbConnect();
  const popularProducts = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean<ProductType[]>();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#050505] h-[720px] flex items-center overflow-hidden">
        <div
          className="absolute z-10"
          style={{
            width: '1581px',
            height: '893px',
            left: '-71px',
            top: '-135px',
            opacity: 0.7,
            transform: 'rotate(-180deg)',
          }}
        >
          <Image
            src="/logos/Background-hero.svg"
            alt="Background grid pattern"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="container max-w-[1440px] mx-auto px-8 relative z-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-6xl leading-[60px] max-w-[538px]">
                <span className="text-white">Refurbished Tech.</span><br />
                <span className="text-white/80">Trusted Quality.</span>
              </h1>
              <p className="mt-6 text-xl text-white/70 leading-[32.5px] max-w-[440px]">
                Découvrez notre sélection premium d&apos;ordinateurs portables reconditionnés, pièces détachées et accessoires technologiques aux Émirats Arabes Unis.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/shop" className="bg-[#D4D3CF] text-black h-11 px-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80">
                  <span className="font-semibold text-base leading-6 tracking-[0.4px] uppercase">ACHETER MAINTENANT</span>
                </Link>
                <Link href="/contact" className="border border-white text-white h-11 px-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white hover:text-black">
                   <span className="font-medium text-sm leading-5">Contactez nous</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image src="/logos/pc-hero.svg" alt="Refurbished Laptop" width={694} height={463} priority />
            </div>
          </div>
        </div>
      </section>
      
      {/* "Nos Collections" Section */}
      <section className="bg-white py-20">
        <div className="container max-w-[1207px] mx-auto px-8">
          <div className="text-center max-w-[665px] mx-auto">
            <h2 className="font-bold text-4xl leading-10 text-[#0D0D0D]">Nos Collections</h2>
            <p className="mt-4 text-lg leading-7 text-[#737373]">
              Explorez notre gamme complète de produits technologiques reconditionnés et neufs, sélectionnés avec soin pour garantir qualité et performance.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
            <CollectionCard imageSrc="/logos/laptop.png" title="PC Portables" links={["Pc portable multimedia", "Pc portable bureautique", "Pc portable pro", "Toute les pc portable"]} modelCount="25+ modèles" shopLink="/shop?category=laptops"/>
            <CollectionCard imageSrc="/logos/accessories.png" title="Accessoires" links={["Souris", "Clavier", "Batterie", "Toute les autre peripherique"]} modelCount="50+ modèles" shopLink="/shop?category=accessories"/>
            <CollectionCard imageSrc="/logos/tech-product.png" title="Produit tech" links={["Tablettes", "Écrans", "Équipements technologiques varies", "Toute les autre peripherique"]} modelCount="30+ articles" shopLink="/shop?category=tech"/>
          </div>
        </div>
      </section>
      
      {/* "Nos produits" Section */}
      <section className="bg-white py-20">
        <div className="container max-w-[1440px] mx-auto px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-bold text-4xl leading-10 text-[#0D0D0D]">Nos produits populaires</h2>
              <p className="mt-2 text-lg leading-7 text-gray-600">
                Nos ordinateurs portables les plus populaires, reconditionnés avec soin
              </p>
            </div>
            <Link href="/shop" className="bg-gray-100 text-gray-900 text-sm font-medium py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <span>Voir tout</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {popularProducts.map((product) => (
              <ProductCard
                key={product._id.toString()}
                product={plainify(product)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}