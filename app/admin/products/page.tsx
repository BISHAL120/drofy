import AllProductsPage from "@/components/admin/products/allProducts/allProducts";
import {
  getAllCategories_name_id,
  getAllProducts,
} from "@/lib/data layer/admin/admin-DL";
import db from "@/lib/db";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const status = params.status || "";
  const page = params.page || "0";
  const currentPage = parseInt(page);

  const allProducts = await getAllProducts({
    search,
    category,
    status,
    currentPage,
  });
  const allCategories = await getAllCategories_name_id();
  const totalProductCount = await db.product.count();

  return (
    <div>
      <AllProductsPage
        totalProductCount={totalProductCount}
        allProducts={allProducts}
        allCategories={allCategories}
      />
    </div>
  );
};

export default Page;
