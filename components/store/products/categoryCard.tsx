import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  id: string;
  name: string;
  imageUrl: string | null;
  productCount: number;
};

const SubCategoryCard = ({
  subCategory,
}: {
  subCategory: CategoryCardProps;
}) => {
  return (
    <div>
      <Link
        href={`/store/sub-category/${subCategory.id}`}
        prefetch={true}
        key={subCategory.id}
        className="max-w-[200px] max-h-[200px] xl:max-w-[300px] xl:max-h-[300px] bg-white aspect-square rounded-md p-2 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="relative w-full h-3/4 mb-2">
          <Image
            src={subCategory.imageUrl || "/placeholder.svg"}
            alt={subCategory.name}
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xs text-center font-medium">
          {subCategory.name.slice(0, 15)}
          {subCategory.name.length > 15 ? "..." : ""}
        </span>
        <span className="text-xs text-gray-500">
          {subCategory.productCount}
        </span>
      </Link>
    </div>
  );
};

export default SubCategoryCard;
