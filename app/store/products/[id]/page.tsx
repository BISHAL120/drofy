import ProductDetails from "@/components/store/products/productDetails";
import { getProductDetails } from "@/lib/data layer/store/store-DL";
import React from "react";

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) => {
  const slug = await params;
  console.log(slug.id);

  const productDetails = await getProductDetails(slug.id as string);

  console.log(productDetails);

  return (
    <div>
      <ProductDetails />
    </div>
  );
};

export default Page;
