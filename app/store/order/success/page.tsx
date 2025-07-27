"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  Eye,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [checkmarkVisible, setCheckmarkVisible] = useState(false);

  // Mock order data - in real app this would come from props or API
  const orderData = {
    orderNumber: "ORD-2024-001234",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    total: 299.97,
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 149.99 },
      { name: "Phone Case", quantity: 2, price: 24.99 },
      { name: "USB Cable", quantity: 1, price: 19.99 },
    ],
    estimatedDelivery: "3-5 business days",
  };

  useEffect(() => {
    // Trigger animations on mount
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setCheckmarkVisible(true), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContinueShopping = () => {
    // Navigate to shop page
    console.log("Continue shopping clicked");
  };

  const handleViewOrder = () => {
    // Navigate to order details
    console.log("View order clicked");
  };

  const handleDownloadInvoice = () => {
    // Download invoice
    console.log("Download invoice clicked");
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
                  Order #{orderData.orderNumber}
                </h2>
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Placed on {orderData.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Package className="w-4 h-4 mr-2" />
                  <span>Estimated delivery: {orderData.estimatedDelivery}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-green-600">
                  ${orderData.total.toFixed(2)}
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
            {orderData.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-4">
            <CreditCard className="w-5 h-5 mr-3" />
            <span>
              Payment processed successfully via your saved payment method
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
          <Button
            onClick={handleContinueShopping}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-200"
            aria-label="Continue shopping for more items"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>

          <Button
            onClick={handleViewOrder}
            variant="outline"
            className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-gray-200 bg-transparent"
            aria-label="View detailed order information"
          >
            <Eye className="w-5 h-5 mr-2" />
            View Order
          </Button>

          <Button
            onClick={handleDownloadInvoice}
            variant="outline"
            className="flex-1 sm:flex-initial border-2 border-green-300 hover:border-green-400 text-green-700 hover:text-green-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-green-200 bg-transparent"
            aria-label="Download invoice as PDF"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Invoice
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
