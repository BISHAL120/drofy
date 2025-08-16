import ProductGridWithTittle from "@/components/shared/productGridWithTittle";
import { ImageObj } from "@prisma/client";


interface StockOutProductProps {
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


const StockOutProducts = ({ products }: StockOutProductProps) => {
  return (
    <div>
      <ProductGridWithTittle products={products} title="স্টক আউট প্রোডাক্ট" />
    </div>
  );
};

export default StockOutProducts;
