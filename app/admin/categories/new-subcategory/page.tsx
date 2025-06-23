import AddSubcategoryPage from '@/components/admin/subCategory/subCategory'
import { getSubCategoryById, getAllCategories } from '@/lib/data layer/admin/admin-DL'

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  const params = await searchParams


  const categories = await getAllCategories()

  let initialData;

  if (params.type === "edit") {
    if (params.subCatId) {
      initialData = await getSubCategoryById(params.subCatId as string)
    }
  }

  return (
    <div>
      <AddSubcategoryPage initialData={initialData} initialCategoryId={params.catId} categories={categories} />
    </div>
  )
}

export default Page