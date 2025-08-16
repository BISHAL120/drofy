"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { convertToBengaliNumber } from "@/hooks/convertNum";
import useCart from "@/lib/zustand/store";
import { ImageObj, VarientObj } from "@prisma/client";
import {
  Check,
  Copy,
  Download,
  Heart,
  ShoppingCart,
  Star,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: {
    name: string;
    id: string;
    createdAt: Date;
    inStock: boolean;
    images: ImageObj[];
    videoUrl: {
      videoUrl: string;
    }[];
    variant: VarientObj[];
    shortDescription: string | null;
    ratings: string | null;
    note: string | null;
    fullDescription: string;
    sku: string;
    sellingPrice: number;
    discountPrice: number | null;
    isVerified: boolean;
    SubCategory: {
      name: string;
      id: string;
      Category: {
        name: string;
        id: string;
      };
    };
  } | null;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [copied, setCopied] = useState(false);
  const cart = useCart();
  const router = useRouter();

  if (!product) return null;
  const productDescription = `${product?.fullDescription}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productDescription);
    setCopied(true);
    toast.success("Product description copied to clipboard");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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

  const handleCart = () => {
    const actualPrice = product.discountPrice || product.sellingPrice;

    if (!selectedSize) {
      return toast.error("সাইজ সিলেক্ট করুন", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
    }

    if (price === 0) {
      return toast.error("মূল্য সিলেক্ট করুন", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
    }

    if (actualPrice >= price) {
      return toast.error(
        `সর্বনিম্ন মূল্য ${convertToBengaliNumber(actualPrice * quantity)}`,
        {
          duration: 5000,
          icon: <TriangleAlert className="h-4 w-4" />,
          style: {
            borderRadius: "6px",
            background: "red",
            color: "white",
            border: "1px solid #ff0000",
            fontSize: "16px",
            fontWeight: "bold",
          },
        }
      );
    }

    if (quantity < 1) {
      return toast.error("Please select a quantity", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
    }

    cart.addToCart({
      id: product.id,
      name: product.name,
      subCategory: product.SubCategory.name,
      image: product.images[0].imageUrl,
      quantity,
      size: selectedSize,
      price: actualPrice,
      sellPrice: price,
    });

    router.push("/store/cart");
  };

  return (
    <div className="p-4 mb-20 lg:p-6 max-w-[1400px] mx-auto">
      {product?.note && (
        <div className="py-2 px-4 mb-3 rounded-sm font-semibold text-center bg-emerald-300">
          {product?.note}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Left side - Product Image */}
        <div className="flex flex-col items-center p-4">
          <div className="relative w-full max-w-md aspect-[3/4] mb-4">
            <Image
              src={product?.images[0].imageUrl || ""}
              alt={`${product?.name}`}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link href={product?.images[0].imageUrl || ""}>
                <Download className="h-4 w-4" /> ছবি ডাউনলোড
              </Link>
            </Button>
            <Button
              onClick={() => toggleWishlist()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Heart
                size={18}
                className={
                  isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                }
              />{" "}
              ফেভারিট
            </Button>
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="p-4 lg:p-6">
          <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
          <p className="text-gray-600 mb-6">{product?.shortDescription}</p>
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">
              প্রাইস:{" "}
              {product?.discountPrice
                ? convertToBengaliNumber(product.discountPrice)
                : convertToBengaliNumber(product?.sellingPrice || 0)}{" "}
              <span className="line-through text-gray-400 text-sm">
                {product?.discountPrice
                  ? convertToBengaliNumber(product?.sellingPrice || 0)
                  : null}
              </span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm">স্টক:</span>
              <span className="text-green-600 font-medium">
                {product?.inStock ? "আছে" : "নেই"}
              </span>
            </div>
          </div>
          {/* Verification & Ratings */}
          {product?.isVerified && (
            <div className="flex justify-between items-center gap-1">
              <div className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1.5 rounded-sm">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">ভেরিফাইড প্রোডাক্ট</span>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Number(product?.ratings)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-b py-2 my-2 ">
            <p className="font-medium mb-4">{product?.sku}</p>
            <div className="mb-6">
              <p className="mb-3 font-medium text-lg">সাইজ:</p>
              <RadioGroup
                value={selectedSize}
                onValueChange={(value) => {
                  setSelectedSize(value);
                  // Reset quantity when size changes
                  setQuantity(1);
                }}
                className="flex gap-4"
              >
                {product?.variant.map((size, idx) => (
                  <div className="flex items-center space-x-1.5" key={idx}>
                    <RadioGroupItem
                      value={size.variantType}
                      id={`size-${size.variantType}`}
                      className={`h-5 w-5 ${
                        size.stock <= 0 ? "cursor-not-allowed" : ""
                      }`}
                      disabled={size.stock <= 0}
                    />
                    <Label
                      htmlFor={`size-${size.variantType}`}
                      onClick={() =>
                        size.stock === 0 &&
                        toast.error("সাইজের স্টক শেষ!", {
                          duration: 5000,
                          icon: <TriangleAlert className="h-4 w-4" />,
                          style: {
                            borderRadius: "6px",
                            background: "red",
                            color: "white",
                            border: "1px solid #ff0000",
                            fontSize: "16px",
                            fontWeight: "bold",
                          },
                        })
                      }
                      className={`text-base ${
                        size.stock <= 0
                          ? "cursor-not-allowed text-gray-400"
                          : ""
                      }`}
                    >
                      {size.variantType}{" "}
                      <span
                        className={`text-sm ${size.stock <= 0 ? "text-gray-500" : "text-black"}`}
                      >
                        (
                        {convertToBengaliNumber(
                          size.stock <= 0 ? 0 : size.stock
                        )}{" "}
                        পিস)
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="mb-2 font-medium">পরিমাণ/পিস</p>
                <Input
                  min={0}
                  value={quantity || ""}
                  disabled={!selectedSize}
                  onChange={(e) => {
                    const selectedVariant = product?.variant.find(
                      (v) => v.variantType === selectedSize
                    );
                    const inputValue = Number.parseInt(e.target.value);

                    if (!e.target.value) {
                      setQuantity(0);
                      return;
                    }

                    if (selectedVariant && inputValue > selectedVariant.stock) {
                      toast.error(
                        `সর্বোচ্চ ${convertToBengaliNumber(selectedVariant.stock)} পিস অর্ডার করা যাবে`,
                        {
                          duration: 5000,
                          icon: <TriangleAlert className="h-4 w-4" />,
                          style: {
                            borderRadius: "6px",
                            background: "red",
                            color: "white",
                            border: "1px solid #ff0000",
                            fontSize: "16px",
                            fontWeight: "bold",
                          },
                        }
                      );
                      setQuantity(selectedVariant.stock);
                    } else {
                      setQuantity(inputValue);
                    }
                  }}
                  className="w-full"
                  placeholder={
                    selectedSize ? "Enter quantity" : "First select size"
                  }
                />
              </div>
              <div>
                <p className="mb-2 font-medium">বিক্রয়-মূল্য</p>
                <Input
                  value={price || ""}
                  disabled={!selectedSize}
                  onChange={(e) => {
                    const inputValue = Number.parseInt(e.target.value);
                    setPrice(e.target.value ? inputValue : 0);
                  }}
                  className="w-full"
                  placeholder={
                    selectedSize ? "Enter price" : "First select size"
                  }
                />
              </div>
            </div>

            <p className="text-sm text-red-500 mb-4">
              বিক্রয় মূল্যের জন্যগাহক শুধু প্রোডাক্ট এর প্রাইস দিবেন, কুরিয়ার
              চার্জের অপশন পরবর্তী পেইজে পাবেন।
            </p>
          </div>
          <Button
            onClick={() => handleCart()}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            অর্ডার তালিকায় অ্যাড করুন
          </Button>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">পণ্যের বিবরণ</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "কপি করুন"}
          </Button>
        </div>
        <div className="relative">
          <div
            className={`whitespace-pre-line mb-10 ${
              productDescription.length > 500 && !showMore
                ? "max-h-[200px] overflow-hidden"
                : ""
            }`}
          >
            {productDescription}
          </div>
          {productDescription.length > 500 && (
            <div
              className={`${
                !showMore
                  ? "absolute -bottom-15 right-0 w-full h-12 bg-gradient-to-t from-white to-transparent"
                  : ""
              }`}
            >
              <Button
                variant="ghost"
                onClick={() => setShowMore(!showMore)}
                className="mt-2 w-full bg-slate-800 text-white"
              >
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Product Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {product.videoUrl?.map(
          (video: { videoUrl: string }, index: number) =>
            video.videoUrl && (
              <div key={index} className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    video.videoUrl.split("v=")[1]
                  }`}
                  title={`Product video ${index + 1}`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
