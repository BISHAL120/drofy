import ProductDetails from "@/components/store/products/productDetails";
import { Button } from "@/components/ui/button";
import { getProductDetails } from "@/lib/data layer/store/store-DL";
import Link from "next/link";
import React from "react";

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
            Invalid Product ID
          </h2>
          <p className="text-gray-500 mb-6">
            The provided Product ID is not valid
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

  const productDetails = await getProductDetails(id as string);

  return (
    <div>
      <ProductDetails product={productDetails} />
    </div>
  );
};

export default Page;
