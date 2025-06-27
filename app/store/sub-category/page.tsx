"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
//TODO: use this component for all products

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      router.push("/store/categories");
    }
  }, [seconds, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="mb-6 relative">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-white rounded-full p-4 border-2 border-indigo-200">
              <svg
                className="w-full h-full text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Oops! Empty Here
        </h2>
        <p className="text-gray-600 mb-4 text-lg">
          No products found in this subcategory
        </p>
        <div className="space-y-4">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((seconds / 5) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-indigo-600 font-medium">
            Redirecting in {seconds} seconds...
          </p>
          <Button
            asChild
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-semibold rounded-xl focus:ring-4 focus:ring-indigo-200"
          >
            <Link href="/store/categories">Return to Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
