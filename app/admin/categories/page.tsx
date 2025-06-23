import CategoriesPage from "@/components/admin/category/allCategoryPage";
import { getAllCategories } from "@/lib/data layer/admin/admin-DL";

const Page = async () => {
  const categories = await getAllCategories();

  return (
    <div>
      <CategoriesPage allCategories={categories} />
      {categories.length === 0 && (
        <div className="p-4">
          <div className="flex items-center border justify-center p-4 bg-white rounded-lg shadow">
            <p className="text-gray-500">No categories have been added yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
