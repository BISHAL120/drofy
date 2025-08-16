import InvalidIdError from "@/components/store/components/invalidIdError";
import ProductDetails from "@/components/store/products/productDetails";
import { getProductDetails } from "@/lib/data layer/store/store-DL";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string | undefined }>;
}) => {
  const { id } = await params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return (
      <InvalidIdError name="Product" link="/store/categories" />
    );
  }

  const productDetails = await getProductDetails(id as string);

  return (
    <div>
      <ProductDetails product={productDetails} />
    </div>
  );
};

export default Page;
