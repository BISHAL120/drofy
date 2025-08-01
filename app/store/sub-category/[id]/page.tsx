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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-md mx-auto p-6 space-y-8">
          <div className="relative">
            <div className="animate-bounce">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="relative">
                <div className="animate-ping absolute h-8 w-8 rounded-full bg-red-400 opacity-75"></div>
                <div className="relative h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Out of Stock!</h2>
            <p className="text-gray-600 text-lg">
              Looks like this category is currently empty. Check back later or
              explore other categories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                asChild
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Link href="/store/categories">Browse Categories</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Link href="/store">Back to Store</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Want to be notified when products are back in stock?
            </p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm mt-2">
              Set Alert →
            </button>
          </div>
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
