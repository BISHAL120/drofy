// Shimmer skeleton component
const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
  );
};

// SubCategory card skeleton
const SubCategoryCardSkeleton = () => {
  return (
    <div className="w-[200px] h-[200px] max-w-full bg-white aspect-square rounded-md p-2 flex flex-col items-center shadow-sm">
      {/* Image skeleton */}
      <div className="relative w-full h-3/4 mb-2">
        <Shimmer className="w-full h-full rounded" />
      </div>
      
      {/* Name skeleton */}
      <div className="w-3/4 mb-1">
        <Shimmer className="h-3 rounded" />
      </div>
      
      {/* Product count skeleton */}
      <div className="w-1/2">
        <Shimmer className="h-2 rounded" />
      </div>
    </div>
  );
};

// Main loading component
export default function ProductCategoriesLoading() {
  // Generate 3-5 category sections
  const categoryCount = 4;
  const subCategoriesPerCategory = [8, 8, 8, 8]; // Varied subcategory counts

  return (
    <div className="w-full px-2 py-4 md:py-6 bg-gray-50">
      {Array.from({ length: categoryCount }).map((_, categoryIndex) => (
        <div key={categoryIndex}>
          <div className="mb-6">
            {/* Category title skeleton */}
            <div className="flex justify-center mb-4">
              <Shimmer className="h-6 w-48 rounded" />
            </div>
            
            {/* Subcategory grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-4 md:gap-6 lg:gap-x-6">
              {Array.from({ 
                length: subCategoriesPerCategory[categoryIndex] || 6 
              }).map((_, subCategoryIndex) => (
                <SubCategoryCardSkeleton key={subCategoryIndex} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}