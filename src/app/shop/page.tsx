// // Imports for page components
// import Breadcrumb from "@/components/store/Breadcrumb";
// import FilterSidebar from "@/components/store/FilterSidebar";
// import ShopToolbar from "@/components/store/ShopToolbar";
// import ProductCard from "@/components/store/ProductCard";
// import Pagination from "@/components/store/Pagination";

// // Imports needed for mock data generation
// import { ProductType } from '@/lib/models/Product';
// import { Types } from 'mongoose';

// const PRODUCTS_PER_PAGE = 12;

// const plainify = (obj: any): any => JSON.parse(JSON.stringify(obj));

// interface ShopData {
//   products: ProductType[];
//   totalProducts: number;
//   totalPages: number;
//   page: number;
// }

// async function getMockShopData(searchParams: { page?: string }): Promise<ShopData> {
//   const page = Number(searchParams.page) || 1;

//   const mockProducts: ProductType[] = Array.from({ length: 12 }).map((_, i) => ({
//     _id: new Types.ObjectId(),
//     name: `Mock Product - Page ${page}, Item ${i + 1}`,
//     description: "This is a detailed mocked product description for testing. It needs to be long enough to properly test the scrollable area inside the Quick View modal. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     price: 2890 + (i * 100),
//     category: 'PCs',
//     condition: 'Execellent',
//     // --- THE FIX IS HERE ---
//     // We now provide an array with all three of your MacBook images.
//     images: ['/logos/MacBook.png', '/logos/laptop.png', '/logos/pc-hero.svg'],
//     stock: 10,
//     isOnPromotion: i % 3 === 0,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }));

//   const totalProducts = 92;
//   const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
//   await new Promise(resolve => setTimeout(resolve, 100));

//   return { products: mockProducts, totalProducts, totalPages, page };
// }

// export default async function ShopPage({ searchParams }: { searchParams: { page?: string } }) {
//   const { products, totalProducts, totalPages, page } = await getMockShopData(searchParams);

//   return (
//     <div className="bg-white">
//       <Breadcrumb />
//       <div className="container max-w-[1440px] mx-auto px-8 py-12">
//         <div className="flex flex-row items-start gap-8">
//           <aside className="w-[252px] hidden md:block">
//             <FilterSidebar />
//           </aside>
//           <main className="flex-1">
//             <ShopToolbar 
//               itemCount={products.length}
//               itemsPerPage={PRODUCTS_PER_PAGE}
//               totalItems={totalProducts}
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <ProductCard
//                   key={product._id.toString()}
//                   product={plainify(product)} 
//                 />
//               ))}
//             </div>
//             <Pagination 
//               currentPage={page}
//               totalPages={totalPages}
//               baseUrl="/shop"
//             />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }



////////////////////////////////////////////////////////////////////////////


import dbConnect from '@/lib/dbConnect';
import Product, { ProductType } from '@/lib/models/Product';

import Breadcrumb from "@/components/store/Breadcrumb";
import FilterSidebar from "@/components/store/FilterSidebar";
import ShopToolbar from '@/components/store/ShopToolbar';
import ProductCard from '@/components/store/ProductCard';
import Pagination from '@/components/store/Pagination';

const PRODUCTS_PER_PAGE = 12;

const plainify = (obj: unknown) => JSON.parse(JSON.stringify(obj));

interface ShopData {
  products: ProductType[];
  totalProducts: number;
  totalPages: number;
  page: number;
}

// --- 1. DEFINE A SPECIFIC TYPE FOR THE SORT OPTIONS ---
type SortOption = { [key: string]: 1 | -1 };

async function getShopData(searchParams: { page?: string; sort?: string }): Promise<ShopData> {
  const page = Number(searchParams.page) || 1;
  const sort = searchParams.sort || 'latest';
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  
  // --- 2. APPLY THE NEW TYPE TO THE sortOptions OBJECT ---
  const sortOptions: { [key: string]: SortOption } = {
    'latest': { createdAt: -1 },
    'price-asc': { price: 1 },
    'price-desc': { price: -1 },
    'promotion': { isOnPromotion: -1 },
    'popular': { createdAt: 1 },
  };

  await dbConnect();
  
  const productsQuery = Product.find({})
    .sort(sortOptions[sort]) // This is now fully type-safe
    .skip(skip)
    .limit(PRODUCTS_PER_PAGE)
    .lean<ProductType[]>();

  const totalProductsQuery = Product.countDocuments({});

  const [products, totalProducts] = await Promise.all([
    productsQuery.exec(),
    totalProductsQuery.exec()
  ]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return { products, totalProducts, totalPages, page };
}

export default async function ShopPage({ searchParams }: { searchParams: { page?: string; sort?: string } }) {
  const { products, totalProducts, totalPages, page } = await getShopData(searchParams);

  return (
    <div className="bg-white">
      <Breadcrumb />
      <div className="container max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex flex-row items-start gap-8">
          
          <aside className="w-[252px] hidden md:block">
            <FilterSidebar />
          </aside>

          <main className="flex-1">
            <ShopToolbar 
              itemCount={products.length}
              itemsPerPage={PRODUCTS_PER_PAGE}
              totalItems={totalProducts}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id.toString()}
                  product={plainify(product)} 
                />
              ))}
            </div>

            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/shop"
            />
          </main>
        </div>
      </div>
    </div>
  );
}