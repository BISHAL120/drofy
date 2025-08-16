"use client";

import useCart from "@/lib/zustand/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartButton = () => {
  const cart = useCart();
  const itemCount = cart.items.length;

  return (
    <Link 
      href="/store/cart" 
      className="relative group ml-auto"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <div className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-gray-800 group-hover:text-indigo-600 transition-colors" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
          Cart
        </span>
        {itemCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            {itemCount}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartButton;
