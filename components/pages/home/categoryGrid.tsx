import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const categoryItems = [
    { name: "Men's Clothing", image: "/placeholder.svg", link: "#" },
    { name: "Women's Fashion", image: "/placeholder.svg", link: "#" },
    { name: "Kid's Fashion", image: "/placeholder.svg", link: "#" },
    { name: "Footwear", image: "/placeholder.svg", link: "#" },
    { name: "Accessories", image: "/placeholder.svg", link: "#" },
    { name: "Electronics", image: "/placeholder.svg", link: "#" },
    { name: "Home Decor", image: "/placeholder.svg", link: "#" },
    { name: "Beauty Products", image: "/placeholder.svg", link: "#" },
    { name: "Sports & Outdoor", image: "/placeholder.svg", link: "#" },
    { name: "Toys & Games", image: "/placeholder.svg", link: "#" },
    { name: "Watches", image: "/placeholder.svg", link: "#" },
    { name: "Jewelry", image: "/placeholder.svg", link: "#" },
];

const CategoryGrid = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Shop by Category</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our wide range of product categories and find exactly what you&apos;re looking for.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {categoryItems.map((category, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white border-none"
                        >
                            <a href={category.link} className="block p-1">
                                <div className="aspect-square relative overflow-hidden rounded-md mb-2">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-2 text-center">
                                    <h3 className="font-medium text-sm md:text-base line-clamp-1">{category.name}</h3>
                                    <div className="mt-1 text-orange-500 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Shop Now</span>
                                        <ArrowRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </a>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-6 md:p-10 text-white">
                            <div className="max-w-md">
                                <h2 className="font-bold text-xl md:text-3xl mb-4">Download Our Mobile App</h2>
                                <p className="mb-6">
                                    Get exclusive deals and faster checkout with our mobile application.
                                    Shop anytime, anywhere with ease.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <a href="#" className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" viewBox="0 0 384 512" fill="currentColor">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                        </svg>
                                        App Store
                                    </a>
                                    <a href="#" className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                                        </svg>
                                        Play Store
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-4 flex items-center justify-center">
                            <Image
                                src="/placeholder.svg"
                                alt="Mobile App"
                                width={240}
                                height={240}
                                className="max-w-xs max-h-60 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;