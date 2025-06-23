import AddProductPage from '@/components/admin/products/addProduct/addProductForm'
import { getAllCategories, getProduct } from '@/lib/data layer/admin/admin-DL'
import { Product } from '@prisma/client'

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const result = await searchParams

  let initialData;

  if (result.id) {
    initialData = await getProduct(result.id as string)
  }

  const categories = await getAllCategories()



  return (
    <div>
      <AddProductPage initialData={initialData as Product} categories={categories} />
    </div>
  )
}

export default Page