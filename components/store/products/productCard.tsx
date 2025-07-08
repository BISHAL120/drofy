"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { convertToBengaliNumber } from "@/hooks/convertNum";
import { ImageObj } from "@prisma/client";
import { Download, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    name: string;
    images: ImageObj[];
    id: string;
    sellingPrice: number;
    discountPrice: number | null;
    createdAt: Date;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    if (isWishlisted) {
      toast.success("Coming Soon!", {
        style: {
          background: "#fee2e2",
          border: "1px solid #fecaca",
          fontSize: "16px",
          fontWeight: "700",
        },
        icon: "💔",
      });
    } else {
      toast.success("Coming Soon!", {
        style: {
          background: "#dcfce7",
          border: "1px solid #bbf7d0",
          fontSize: "16px",
          fontWeight: "700",
        },
        icon: "❤️",
      });
    }
  };

  return (
    <div>
      <Card className="overflow-hidden p-0 transition-all duration-300 border-none hover:shadow-xl hover:shadow-indigo-300 group">
        <div className="relative">
          <Link href={`/store/products/${product.id}`}>
            <Image
              src={product.images[0].imageUrl}
              alt={product.name}
              width={210}
              height={210}
              className="w-full h-[210px] object-cover"
            />
          </Link>

          {(() => {
            const daysSinceCreation = Math.floor(
              (new Date().getTime() - new Date(product.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
            );

            if (daysSinceCreation < 10) {
              return (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium">
                  New
                </Badge>
              );
            }
            return null;
          })()}

          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={toggleWishlist}
              className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
            >
              <Heart
                size={18}
                className={
                  isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                }
              />
            </button>

            <div className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors">
              <Link href={product.images[0].imageUrl}>
                <Download size={18} className="text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 hover:underline ">
            <Link href={"/store/products/product"} className="w-fit">
              {product.name}
            </Link>
          </h3>

          {
            <div className="flex items-center justify-between">
              <div className="w-full flex items-center justify-between gap-2">
                <span className="text-red-500 font-bold">
                  {convertToBengaliNumber(
                    product.discountPrice || product.sellingPrice
                  )}
                </span>
                {product.discountPrice &&
                product.sellingPrice > product.discountPrice ? (
                  <span className="text-gray-400 line-through text-xs">
                    ৳{convertToBengaliNumber(product.sellingPrice)}
                  </span>
                ) : null}
              </div>
            </div>
          }
          <div>
            <div className="flex justify-between items-center mt-3 gap-2">
              <Button
                asChild
                variant="outline"
                className="flex-1 h-9 hover:border-orange-500 hover:bg-orange-100 transition-colors duration-300"
              >
                <Link href={product.images[0].imageUrl}>
                  <Download size={16} className="mr-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className={`flex-1 h-9 transition-colors duration-300 ${
                  isWishlisted
                    ? "border-orange-500 text-orange-600 hover:bg-orange-100"
                    : "hover:border-orange-500 hover:bg-orange-100"
                }`}
                onClick={toggleWishlist}
              >
                <Heart
                  size={16}
                  className={`mr-1 ${
                    isWishlisted ? "fill-orange-500 text-orange-500" : ""
                  }`}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
