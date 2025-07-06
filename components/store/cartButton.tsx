"use client";

import useCart from "@/lib/zustand/store";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartButton = () => {
  const cart = useCart();

  return (
    <Link href="/store/cart" className="ml-auto">
      <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
        <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
        {cart.items.length > 0 && (
          <div className="absolute -top-2 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {cart.items.length}
          </div>
        )}
      </button>
    </Link>
  );
};

export default CartButton;
