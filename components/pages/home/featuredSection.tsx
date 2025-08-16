"use client";

import ProductCard from "@/components/store/products/productCard";
// import ProductCard from "@/components/store/products/productCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageObj } from "@prisma/client";

export interface FeaturedContentProps {
  featuredContent: {
    name: string;
    id: string;
    products: {
      name: string;
      images: ImageObj[];
      id: string;
      sellingPrice: number;
      discountPrice: number | null;
      createdAt: Date;
    }[];
  }[];
}

const FeaturedSection = ({ featuredContent }: FeaturedContentProps) => {
  if (featuredContent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gray-50 rounded-full p-6 mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          দুঃখিত, এই ফিচার্ড সেকশনে কোন প্রোডাক্ট এখনো যোগ করা হয়নি। অনুগ্রহ
          করে অন্য ক্যাটাগরি চেক করুন।
        </p>
        <Button
          variant="outline"
          className="mt-6 hover:bg-orange-50 text-orange-500 border-orange-200"
        >
          Browse Other Categories
        </Button>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
        </div>

        <Tabs defaultValue={featuredContent[0]?.id || ""} className="w-full">
          <TabsList className="mb-8 bg-gray-100 p-1 rounded-lg w-full flex flex-wrap overflow-x-auto">
            {featuredContent.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex-grow"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {featuredContent.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {category.products.length > 0 ? (
                  category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p className="text-center py-10 text-gray-500 col-span-full">
                    দুঃখিত, এই ফিচার্ড সেকশনে কোন প্রোডাক্ট এখনো যোগ করা হয়নি।
                  </p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedSection;
