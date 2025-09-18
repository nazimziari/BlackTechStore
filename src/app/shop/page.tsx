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


// import dbConnect from '@/lib/dbConnect';
// import Product, { ProductType } from '@/lib/models/Product';
// import Breadcrumb from "@/components/store/Breadcrumb";
// import FilterSidebar from "@/components/store/FilterSidebar";
// import ShopToolbar from '@/components/store/ShopToolbar';
// import ProductCard from '@/components/store/ProductCard';
// import Pagination from '@/components/store/Pagination';


// const PRODUCTS_PER_PAGE = 12;

// const plainify = (obj: unknown) => JSON.parse(JSON.stringify(obj));

// interface ShopData {
//   products: ProductType[];
//   totalProducts: number;
//   totalPages: number;
//   page: number;
// }

// // This function is now much smarter and builds a dynamic query from URL params
// async function getShopData(searchParams: { [key: string]: string | string[] | undefined }): Promise<ShopData> {
//   const page = Number(searchParams.page) || 1;
//   const sort = (searchParams.sort as string) || 'latest';
//   const skip = (page - 1) * PRODUCTS_PER_PAGE;
  
//   // Dynamically build the filter object based on search parameters
//   const filterQuery: { [key: string]: any } = {};
//   if (searchParams.brand) filterQuery.brand = { $in: (searchParams.brand as string).split(',') };
//   if (searchParams.type) filterQuery.type = { $in: (searchParams.type as string).split(',') };
//   if (searchParams.condition) filterQuery.condition = { $in: (searchParams.condition as string).split(',') };

//   const sortOptions: { [key: string]: any } = {
//     'latest': { createdAt: -1 }, 'price-asc': { price: 1 }, 'price-desc': { price: -1 },
//     'promotion': { isOnPromotion: -1 }, 'popular': { createdAt: 1 },
//   };

//   await dbConnect();
  
//   const productsQuery = Product.find(filterQuery)
//     .sort(sortOptions[sort])
//     .skip(skip)
//     .limit(PRODUCTS_PER_PAGE)
//     .lean<ProductType[]>();

//   const totalProductsQuery = Product.countDocuments(filterQuery);

//   const [products, totalProducts] = await Promise.all([productsQuery.exec(), totalProductsQuery.exec()]);
//   const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

//   return { products, totalProducts, totalPages, page };
// }

// export default async function ShopPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
//   const { products, totalProducts, totalPages, page } = await getShopData(searchParams);

//   return (
//     <div className="bg-white">
//       <Breadcrumb />
//       <div className="container max-w-[1440px] mx-auto px-4 sm:px-8 py-12">
//         <div className="flex flex-col lg:flex-row items-start gap-8">
          
//           {/* On mobile, we might add a button here to open the filters in a modal */}
//           <div className="w-full lg:w-[252px] flex-shrink-0">
//             <FilterSidebar />
//           </div>

//           <main className="flex-1 w-full">
//             <ShopToolbar 
//               itemCount={products.length}
//               itemsPerPage={PRODUCTS_PER_PAGE}
//               totalItems={totalProducts}
//             />
//             {products.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {products.map((product) => (
//                   <ProductCard key={product._id.toString()} product={plainify(product)} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 w-full">
//                 <h2 className="text-2xl font-semibold">No Products Found</h2>
//                 <p className="text-gray-500 mt-2">Please adjust your filters or check back later.</p>
//               </div>
//             )}
//             <Pagination currentPage={page} totalPages={totalPages} baseUrl="/shop" />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }



////////////
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

// --- DEFINE SPECIFIC TYPES TO REMOVE 'any' ---
type SortOption = { [key: string]: 1 | -1 };
type FilterQuery = { [key: string]: { $in: string[] } };


async function getShopData(searchParams: { [key: string]: string | string[] | undefined }): Promise<ShopData> {
  const page = Number(searchParams.page) || 1;
  const sort = (searchParams.sort as string) || 'latest';
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  
  const filterQuery: FilterQuery = {};
  if (searchParams.brand) filterQuery.brand = { $in: (searchParams.brand as string).split(',') };
  if (searchParams.type) filterQuery.type = { $in: (searchParams.type as string).split(',') };
  if (searchParams.condition) filterQuery.condition = { $in: (searchParams.condition as string).split(',') };

  const sortOptions: { [key: string]: SortOption } = {
    'latest': { createdAt: -1 }, 'price-asc': { price: 1 }, 'price-desc': { price: -1 },
    'promotion': { isOnPromotion: -1 }, 'popular': { createdAt: 1 },
  };

  await dbConnect();
  
  const productsQuery = Product.find(filterQuery).sort(sortOptions[sort]).skip(skip).limit(PRODUCTS_PER_PAGE).lean<ProductType[]>();
  const totalProductsQuery = Product.countDocuments(filterQuery);

  const [products, totalProducts] = await Promise.all([productsQuery.exec(), totalProductsQuery.exec()]);
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return { products, totalProducts, totalPages, page };
}

export default async function ShopPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { products, totalProducts, totalPages, page } = await getShopData(searchParams);

  return (
    <div className="bg-white">
      <Breadcrumb />
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full lg:w-[252px] lg:sticky lg:top-24 flex-shrink-0">
            <FilterSidebar />
          </div>
          <main className="flex-1 w-full">
            <ShopToolbar 
              itemCount={products.length}
              itemsPerPage={PRODUCTS_PER_PAGE}
              totalItems={totalProducts}
            />
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id.toString()} product={plainify(product)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 w-full">
                <h2 className="text-2xl font-semibold">No Products Found</h2>
                <p className="text-gray-500 mt-2">Please adjust your filters or check back later.</p>
              </div>
            )}
            {/* The baseUrl prop is now removed */}
            <Pagination currentPage={page} totalPages={totalPages} />
          </main>
        </div>
      </div>
    </div>
  );
}