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
        className="w-[200px] h-[200px] bg-white aspect-square rounded-md p-2 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
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
          {subCategory.name}
        </span>
        <span className="text-xs text-gray-500">
          {subCategory.productCount}
        </span>
      </Link>
    </div>
  );
};

export default SubCategoryCard;
