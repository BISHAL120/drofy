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
}

const ProductGridWithTittle = ({ title, products }: ProductGridProps) => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridWithTittle;
