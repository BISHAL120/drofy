"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedSubCategoryProps {
  featuredSubCategory: {
    id: string;
    name: string;
    imageUrl: string | null;
  }[];
}

const CategoryGrid = ({ featuredSubCategory }: FeaturedSubCategoryProps) => {
  if (featuredSubCategory.length === 0) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-float">
              <svg
                className="w-48 h-48 mx-auto text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M3.3 7l8.7 5 8.7-5M12 22V12" />
              </svg>
            </div>

            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              No Featured Categories Available
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We&apos;re currently working on bringing you exciting featured
              categories. In the meantime, explore our wide range of products
              below or check back soon for curated collections and special
              offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 
                          transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
              >
                <span>Browse All Categories</span>
                <svg
                  className="w-5 h-5 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              <button
                className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg
                          hover:bg-orange-50 transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.reload()}
              >
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Refresh Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            সকল প্রোডাক্ট ক্যাটাগরি
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            আমাদের সকল ক্যাটাগরির বিভাগগুলি ঘুরে দেখুন এবং আপনার পছন্দের পণ্যটি
            খুঁজে বের করুন।
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {featuredSubCategory.map((subCategory, index) => (
            <Card
              key={index}
              className="p-0 overflow-hidden hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300 group bg-white border-none"
            >
              <Link
                href={`/store/sub-category/${subCategory.id}`}
                className="block p-1"
              >
                <div className="aspect-square relative overflow-hidden rounded-md mb-2">
                  <Image
                    src={subCategory.imageUrl || "/placeholder.svg"}
                    alt={subCategory.name}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="font-medium text-sm md:text-base line-clamp-1">
                    {subCategory.name}
                  </h3>
                  <div className="mt-1 text-orange-500 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Shop Now</span>
                    <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
