"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { convertToBengaliNumber } from "@/hooks/convertNum";
import { VariantType } from "@prisma/client";
import { Check, Copy, Download, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: {
    name: string;
    id: string;
    createdAt: Date;
    inStock: boolean;
    imageUrl: string;
    variant: VariantType[];
    shortDescription: string | null;
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
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(8);
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="p-4 my-20 lg:p-6 max-w-[1400px] mx-auto">
      {product?.note && (
        <div className="py-2 px-4 mb-3 rounded-xl font-semibold text-center bg-indigo-300">
          This is a note
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Left side - Product Image */}
        <div className="flex flex-col items-center p-4">
          <div className="relative w-full max-w-md aspect-[3/4] mb-4">
            <Image
              src={product?.imageUrl || ""}
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
              <Link href={product?.imageUrl || ""}>
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
          <div className="flex justify-between items-start mb-4">
            <div>
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
            {product?.isVerified && (
              <div className="flex items-center bg-green-50 text-green-600 px-3 py-1 rounded-full">
                <Check className="h-4 w-4 mr-1" />
                <span className="text-sm">ভেরিফাইড প্রোডাক্ট</span>
              </div>
            )}
          </div>

          {/* <div className="flex items-center mb-4">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= 3
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div> */}

          <div className="border-t border-b py-2 my-2 ">
            <p className="font-medium mb-4">{product?.sku}</p>
            <div className="mb-6">
              <p className="mb-3 font-medium text-lg">সাইজ:</p>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex gap-4"
              >
                {product?.variant.map((size) => (
                  <div className="flex items-center space-x-1.5" key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="h-5 w-5"
                    />
                    <Label htmlFor={`size-${size}`} className="text-base">
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="mb-2 font-medium">পরিমাণ/পিস</p>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Number.parseInt(e.target.value) || 1)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <p className="mb-2 font-medium">বিক্রয়-মূল্য</p>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(Number.parseInt(e.target.value) || 0)
                  }
                  className="w-full"
                />
              </div>
            </div>

            <p className="text-sm text-red-500 mb-4">
              বিক্রয় মূল্যের জন্যগাহক শুধু প্রোডাক্ট এর প্রাইস দিবেন, কুরিয়ার
              চার্জের অর্ডসন পরবর্তী পেইজে পাবেন।
            </p>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
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
    </div>
  );
}
