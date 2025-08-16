"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCategoryProps {
  featuredCategory: {
    id: string;
    name: string;
    imageUrl: string | null;
  }[];
}

const CategoryGrid = ({ featuredCategory }: FeaturedCategoryProps) => {
  if (featuredCategory.length === 0) {
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
            All Product Categories
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Browse through all our category sections and find your favorite products.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {featuredCategory.map((category, index) => (
            <Card
              key={index}
              className="p-0 overflow-hidden hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300 group bg-white border-none"
            >
              <Link href={`/store/categories`} className="block p-1">
                <div className="aspect-square relative overflow-hidden rounded-md mb-2">
                  <Image
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 text-center group">
                  <h3 className="font-medium text-sm md:text-base line-clamp-1">
                    {category.name}
                  </h3>
                  <div className="mt-1 none text-orange-500 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Shop Now</span>
                    <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-slate-600 to-[#64827e]  text-white rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 md:p-10 text-white">
              <div className="max-w-md">
                <h2 className="font-bold text-xl md:text-3xl mb-4">
                  Download Our Mobile App
                </h2>
                <p className="mb-6">
                  Get exclusive deals and faster checkout with our mobile
                  application. Shop anytime, anywhere with ease.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 384 512"
                      fill="currentColor"
                    >
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    App Store
                  </a>
                  <a
                    href="#"
                    className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>
                    Play Store
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-2 flex items-center justify-end">
              <Image
                src="/placeholder.svg"
                alt="Mobile App"
                width={480}
                height={240}
                className="w-2/3 max-h-60 object-cover rounded-md shadow-md overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
