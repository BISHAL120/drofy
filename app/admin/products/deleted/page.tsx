import DeletedProducts from "@/components/admin/products/deletedProducts/deletedProducts";
import { getDeletedProducts } from "@/lib/data layer/admin/admin-DL";
import db from "@/lib/db";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const page = params.page || "0";
  const currentPage = parseInt(page);
  const deletedProducts = await getDeletedProducts(currentPage);
  const deletedProductsCount = await db.product.count({
    where: {
      isDeleted: true,
    },
  });

  return (
    <div>
      <DeletedProducts
        deletedProducts={deletedProducts}
        deletedProductsCount={deletedProductsCount}
      />
    </div>
  );
};

export default Page;
