import ProductCategories from "@/components/store/products/productCategories";
import { getCategoriesForStore } from "@/lib/data layer/store/store-DL";
import React from "react";

const Page = async () => {
  const categories = await getCategoriesForStore();

  return (
    <div>
      <ProductCategories categories={categories} />
    </div>
  );
};

export default Page;
