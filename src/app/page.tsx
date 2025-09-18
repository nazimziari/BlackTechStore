import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import Product, { ProductType } from '@/lib/models/Product';
import CollectionCard from '@/components/store/CollectionCard';
import ProductCard from '@/components/store/ProductCard'; 

const plainify = (obj: unknown) => JSON.parse(JSON.stringify(obj));


export default async function HomePage() {
  await dbConnect();
  const [popularProducts, pcCount, accessoryCount] = await Promise.all([
    Product.find({}).sort({ createdAt: -1 }).limit(4).lean<ProductType[]>(),
    Product.countDocuments({ category: 'PCs' }),
    Product.countDocuments({ category: 'Accessories' })
  ]);



  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#050505] h-[650px] md:h-[720px] flex items-center overflow-hidden">
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
        <div className="container max-w-[1440px] mx-auto px-4 md:px-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col text-center md:text-left">
              <h1 className="font-bold text-5xl md:text-6xl leading-tight md:leading-[60px] max-w-[538px] mx-auto md:mx-0">
                <span className="text-white">Refurbished Tech.</span><br />
                <span className="text-white/80">Trusted Quality.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/70 leading-[32.5px] max-w-[440px] mx-auto md:mx-0">
                Discover our premium selection of refurbished laptops, parts, and tech accessories in the United Arab Emirates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link href="/shop" className="bg-[#D4D3CF] text-black h-11 px-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80 w-full sm:w-auto">
                  <span className="font-semibold text-base leading-6 tracking-[0.4px] uppercase">SHOP NOW</span>
                </Link>
                <Link href="/contact" className="border border-white text-white h-11 px-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white hover:text-black w-full sm:w-auto">
                   <span className="font-medium text-sm leading-5">Contact Us</span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Image src="/logos/pc-hero.svg" alt="Refurbished Laptop" width={694} height={463} priority />
            </div>
          </div>
        </div>
      </section>
      
      {/* "Our Collections" Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container max-w-[1207px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-[665px] mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl text-[#0D0D0D]">Our Collections</h2>
            <p className="mt-4 text-lg text-[#737373]">
              Explore our full range of new and refurbished tech products, carefully selected to guarantee quality and performance.
            </p>
          </div>
          {/* --- USING THE NEW COLLECTION CARD --- */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
            <CollectionCard 
              imageSrc="/logos/pc.jpeg" 
              title="Laptops"
              description="High-performance laptops for gaming, business, and multimedia."
              productCount={pcCount}
              shopLink="/shop?category=PCs"
            />
            <CollectionCard 
              imageSrc="/logos/acces.jpeg" 
              title="Accessories"
              description="Keyboards, mouse, headsets, and all the peripherals you need."
              productCount={accessoryCount}
              shopLink="/shop?category=Accessories"
            />
            {/* You can add another category here and fetch its count if needed */}
            <CollectionCard 
              imageSrc="/logos/other.jpeg" 
              title="Other Tech"
              description="A variety of other tech gear, including tablets and monitors."
              productCount={0} // Placeholder, as we don't have this category yet
              shopLink="/shop?category=Other"
            />
          </div>
        </div>
      </section>
      
      {/* "Popular Products" Section */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="container max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col text-center sm:text-left sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="font-bold text-3xl md:text-4xl leading-10 text-[#0D0D0D]">Popular Products</h2>
              <p className="mt-2 text-lg text-gray-600">
                Our most popular, carefully refurbished laptops.
              </p>
            </div>
            <Link href="/shop" className="mt-4 sm:mt-0 bg-gray-100 text-gray-900 text-sm font-medium py-2 px-4 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
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