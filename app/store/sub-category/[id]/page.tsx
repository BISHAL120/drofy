import ProductGridWithTittle from "@/components/shared/productGridWithTittle";
import { Button } from "@/components/ui/button";
import { getStoreProducts } from "@/lib/data layer/store/store-DL";
import Link from "next/link";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string | undefined }>;
}) => {
  const { id } = await params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Invalid Category ID
          </h2>
          <p className="text-gray-500 mb-6">
            The provided category ID is not valid
          </p>
          <Button
            asChild
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link href="/store/categories">Back To Categories</Link>
          </Button>
        </div>
      </div>
    );
  }

  const products = await getStoreProducts(id);

  if (!id || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 14h.01M12 16h.01M12 18h.01M12 20h.01M12 22h.01"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No Products Found
          </h2>
          <p className="text-gray-500 mb-6">
            Please select a Sub Category to view products
          </p>
          <Button
            asChild
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link href="/store/categories">Back To Categories</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <ProductGridWithTittle
          products={products}
          title={products[0]?.SubCategory?.name}
        />
      </div>
    </div>
  );
};

export default Page;
