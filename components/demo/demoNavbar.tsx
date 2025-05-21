"use client"

import React, { useState } from "react";
import { Menu, X, User, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const DemoNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-orange-500 text-white ">
            <div className="max-w-[1600px] mx-auto px-4 py-3">
                <div className=" mx-auto xl:px-4 pb-4 xl:pb-0 py-3 flex items-center justify-between">
                    <div className=" w-1/2 flex items-center space-x-4">
                        <h1 className="text-xl md:text-2xl font-bold">
                            <Link href="/" className="flex items-center">
                                <Image src="/assets/logo.png" alt="Logo" width={200} height={50} />
                            </Link>
                        </h1>
                        <div className="w-2/3 h-12 hidden xl:flex relative">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className=" bg-white/90 text-black pr-10 h-full"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-end gap-8">
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/home" className="hover:underline text-xl">হোম
                            </Link>
                            <Link href="/about" className="hover:underline text-xl">আমাদের সম্পর্কে
                            </Link>
                            <Link href="/login" className="hover:underline text-xl">লগইন
                            </Link>
                            <Link href="/register" className="hover:underline text-xl">রেজিস্ট্রেশন
                            </Link>
                            <Link href="/contact" className="hover:underline text-xl">যোগাযোগ</Link>
                        </nav>

                        <div className="hidden xl:flex items-center space-x-4">
                            <Button variant="ghost" size="icon" className="text-white border">
                                <User size={20} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white border">
                                <ShoppingBag size={20} />
                            </Button>
                            <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Bottom Searchbar */}
                <div className="flex xl:hidden items-center justify-between">
                    <div className="w-[85%] flex relative">
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className=" bg-white/90 text-black pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-white">
                            <User size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white">
                            <ShoppingBag size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b shadow-lg">
                    <div className="container mx-auto px-4 py-2">
                        <div className="my-4 relative">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full pr-10"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        </div>
                        <nav className="flex flex-col space-y-3 pb-4">
                            <a href="#" className="px-2 py-1 hover:bg-gray-100 rounded">Home</a>
                            <a href="#" className="px-2 py-1 hover:bg-gray-100 rounded">Categories</a>
                            <a href="#" className="px-2 py-1 hover:bg-gray-100 rounded">New Arrivals</a>
                            <a href="#" className="px-2 py-1 hover:bg-gray-100 rounded">Deals</a>
                            <a href="#" className="px-2 py-1 hover:bg-gray-100 rounded">Contact</a>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default DemoNavbar;