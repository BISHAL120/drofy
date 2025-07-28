import SubCategoryCard from "./categoryCard";

interface ProductCategoriesProps {
  categories: {
    id: string;
    name: string;
    subCategory: {
      id: string;
      name: string;
      imageUrl: string | null;
      productCount: number;
    }[];
    productCount: number;
  }[];
}

export default function ProductCategories({
  categories,
}: ProductCategoriesProps) {
  return (
    <div className="w-full px-2 py-4 md:py-6 bg-gray-50">
      {categories.map((cat) => (
        <div key={cat.id}>
          <div className="mb-6">
            <h2 className="text-center text-pink-500 font-medium text-lg mb-4">
              {cat.name} ({cat.productCount})
            </h2>
            {
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-4 md:gap-6 lg:gap-x-6">
                {cat.subCategory.map((subCat) => (
                  <SubCategoryCard key={subCat.id} subCategory={subCat} />
                ))}
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
