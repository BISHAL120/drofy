import AddCategoryPage from "@/components/admin/category/addCategories";
import { getCategory } from "@/lib/data layer/admin/admin-DL";
import { Category } from "@prisma/client";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const result = await searchParams;

  let initialData;

  if (result.type === "edit") {
    initialData = await getCategory(result.id as string);
  }

  return (
    <div>
      <AddCategoryPage initialData={initialData as Category} />
    </div>
  );
};

export default Page;
