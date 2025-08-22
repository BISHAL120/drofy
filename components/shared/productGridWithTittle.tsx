import { ImageObj } from "@prisma/client";
import ProductCard from "../store/products/productCard";

interface ProductGridProps {
  title: string;
  products: {
    id: string;
    name: string;
    sellingPrice: number;
    discountPrice: number | null;
    createdAt: Date;
    images: ImageObj[];
    SubCategory: {
      name: string;
    };
  }[];
  isActive?: boolean | undefined;
}

const ProductGridWithTittle = ({ title, products, isActive }: ProductGridProps) => {
  return (
    <div>
      <div className="container mx-auto px-1.5 md:px-2 lg:px-4 py-2 md:py-8">
        <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800">{title}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-3 lg:gap-6">
          {products.map((product, index) => (
            <div key={index}>
              <ProductCard isActive={isActive} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridWithTittle;
