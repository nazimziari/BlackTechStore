import dbConnect from "@/lib/dbConnect";
import Product, { ProductType } from "@/lib/models/Product";
import ProductCard from "@/components/store/ProductCard";
import Link from 'next/link';

const plainify = (obj: unknown) => JSON.parse(JSON.stringify(obj));

async function searchProducts(query: string): Promise<ProductType[]> {
  await dbConnect();

  const products = await Product.aggregate([
    {
      $search: {
        index: 'blacktech', // Using your correct index name
        autocomplete: {
          query: query,
          path: 'name',
          fuzzy: { maxEdits: 1 },
        },
      },
    },
    { $limit: 20 }
  ]);
  
  return products as ProductType[];
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  const products = query ? plainify(await searchProducts(query)) : [];

  return (
    <div className="bg-white py-12">
      <div className="container max-w-[1440px] mx-auto px-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        {query ? (
          <p className="text-gray-600 mb-8">
            Showing results for: <span className="font-semibold">&quot;{query}&quot;</span>
          </p>
        ) : (
          <p className="text-gray-600 mb-8">Please enter a search term to begin.</p>
        )}

        {query && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: ProductType) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
        ) : null}

        {query && products.length === 0 && (
          <div className="text-center py-20 border-t">
            <h2 className="text-2xl font-semibold">No products found</h2>
            <p className="text-gray-500 mt-2">Try a different term.</p>
            <Link href="/shop" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-md">
              Go to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}