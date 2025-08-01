"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Printer,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderDataProps {
  totalPrice: string;
  createdAt: Date;
  orderNumber: number;
  cartItems: {
    productName: string;
    productQuantity: string;
    sellingPrice: string;
    productImage: string;
  }[];
}

export default function OrderSuccessPage({
  data,
}: {
  data: OrderDataProps | null;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [checkmarkVisible, setCheckmarkVisible] = useState(false);

  console.log(data);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setCheckmarkVisible(true), 300);
  }, []);

  const handleViewInvoice = () => {
    // Handle invoice download/view logic here
    console.log("Viewing invoice...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl transition-all duration-1000 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            {/* Animated background circle */}
            <div
              className={`absolute inset-0 bg-green-100 rounded-full transition-all duration-700 ease-out ${
                checkmarkVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />

            {/* Checkmark Icon with animation */}
            <div
              className={`relative z-10 transition-all duration-500 ease-out delay-300 ${
                checkmarkVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <CheckCircle
                className="w-20 h-20 text-green-600 animate-float"
                aria-label="Order successful checkmark"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Order Successful!
          </h1>

          <p className="text-lg md:text-xl text-gray-600 animate-fade-in-up animation-delay-200">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 animate-fade-in-up animation-delay-400">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Order #{data?.orderNumber.toString().padStart(4, "0")}
                </h2>
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Placed on {data?.createdAt.toDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Status: Pending admin review & approval.</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-green-600">
                  ৳{data?.totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Order Items
            </h3>
            {data?.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <Image
                    width={64}
                    height={64}
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.productQuantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">
                  ৳{item.sellingPrice}
                </p>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-4">
            <Truck className="w-5 h-5 mr-3" />
            <span>ক্যাশ অন ডেলিভারিতে প্রোডাক্টটি পাঠিয়ে দেওয়া হবে|</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
          <Link href="/store/categories">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-200"
              aria-label="Continue shopping for more items"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>

          <Button
            onClick={handleViewInvoice}
            variant="outline"
            className="flex-1 sm:flex-initial border-2 border-green-300 hover:border-green-400 text-green-700 hover:text-green-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-green-200 bg-transparent"
            aria-label="View and download invoice"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Invoice PDF
          </Button>
          <Button
            onClick={handleViewInvoice}
            variant="outline"
            className="flex-1 sm:flex-initial border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-purple-200 bg-transparent"
            aria-label="Print invoice"
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Invoice
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 animate-fade-in-up animation-delay-800">
          <p className="text-gray-600">
            You will receive an email confirmation shortly with your order
            details and tracking information.
          </p>
        </div>
      </div>
    </div>
  );
}
