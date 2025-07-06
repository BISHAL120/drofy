"use client";

import { Badge } from "@/components/ui/badge";
import { convertToBengaliNumber } from "@/hooks/convertNum";
import useCart from "@/lib/zustand/store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const cart = useCart();

  if (cart.items.length === 0) {
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange-300">
        <div className="text-lg text-gray-700 text-center">
          অর্ডার করার জন্য আগে প্রোডাক্ট পেজে গিয়ে প্রোডাক্ট সিলেক্ট করুন
        </div>
        <div className="mt-4 flex justify-center">
          <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            প্রোডাক্ট পেজে যান
          </button>
        </div>
      </div>
    </div>;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Electronics Category */}
            <div className="mb-8">
              <div className="space-y-6">
                {cart.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-center gap-4 pb-6 ${
                      idx !== cart.items.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      alt="Product"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg flex items-center gap-2 font-medium text-gray-900">
                        {item.name}

                        <Badge className="bg-indigo-400 text-white px-2 rounded-md">
                          {item.size === "S"
                            ? "Small"
                            : item.size === "M"
                            ? "Medium"
                            : item.size === "L"
                            ? "Large"
                            : item.size === "XL"
                            ? "Extra Large"
                            : item.size === "XXL"
                            ? "2X Large"
                            : item.size === "XXXL"
                            ? "3X Large"
                            : item.size}
                        </Badge>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.subCategory}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        পরিমান: {item.quantity} x ৳
                        {convertToBengaliNumber(item.price)}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        সাইজ: {item.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        ৳ {convertToBengaliNumber(item.quantity * item.price)}
                      </p>
                    </div>
                    <div
                      onClick={() => cart.removeItem(item.id, item.size)}
                      className="bg-rose-500 absolute -top-2 -right-2 p-1.5 rounded-md cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
                <p>সর্বমোট পণ্যের দাম: </p>
                <p>
                  ৳{" "}
                  {convertToBengaliNumber(
                    cart.items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )
                  )}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/store/categories">
                <button className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors">
                  আরো সিলেক্ট করুন
                </button>
              </Link>
              <Link href="/store/cart/condition">
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  অর্ডার কনফার্ম করুন
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
