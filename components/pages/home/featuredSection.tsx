"use client"

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { toast } from "sonner";
import { Download, Heart } from "lucide-react";


type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: 'men' | 'women' | 'shoes' | 'accessories';
    isNew: boolean;
}

/* interface ProductCardProps {
    product: Product;
} */

const featuredProducts: Product[] = [
    {
        id: 1,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: true,
    },
    {
        id: 2,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        isNew: true,
    },
    {
        id: 3,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        isNew: false,
    },
    {
        id: 4,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: false,
    },
    {
        id: 5,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: true,
    },
    {
        id: 6,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        isNew: true,
    },
    {
        id: 7,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        isNew: false,
    },
    {
        id: 8,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: false,
    },
    {
        id: 9,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: true,
    },
    {
        id: 10,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        isNew: true,
    },
    {
        id: 11,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        isNew: false,
    },
    {
        id: 12,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: false,
    },
    {
        id: 13,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: true,
    },
    {
        id: 14,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        isNew: true,
    },
    {
        id: 15,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        isNew: false,
    },
    {
        id: 16,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        isNew: false,
    },
];


const ProductCard = ({ product, user }: { product: Product, user: boolean }) => {
    // const [isLoggedIn, setisLoggedIn] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleDownload = async (/* imageUrl = imageLink */) => {

        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png";
        try {
            // Fetch the image as a blob
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();

            // Create object URL from blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            toast.success("Image download started");
        } catch (error) {
            console.error("Download failed:", error);
            toast.error("Failed to download image");
        }
    };

    const toggleWishlist = () => {
        setIsWishlisted(prev => !prev);
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    };

    return (
        <div>
            <Card className="overflow-hidden p-0 transition-all duration-300 border-none hover:shadow-xl hover:shadow-orange-300 group">
                <div className="relative">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={210}
                        height={210}
                        className="w-full h-[210px] object-cover"
                    />
                    {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">New</Badge>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                        {user && (
                            <button
                                onClick={toggleWishlist}
                                className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <Heart size={18} className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"} />
                            </button>
                        )}
                        {user && <button
                            onClick={handleDownload}
                            className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                        >
                            <Download size={18} className="text-gray-600" />
                        </button>}
                    </div>
                </div>
                <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
                    {user && <div className="flex items-center justify-between">
                        <div className="w-full flex items-center justify-between gap-2">
                            <span className="text-red-500 font-bold">৳{product.price}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through text-xs">৳{product.originalPrice}</span>
                            )}
                        </div>
                    </div>}
                    <div>

                        {user && <div className="flex justify-between items-center mt-3 gap-2">
                            <Button
                                variant="outline"
                                className="flex-1 h-9 hover:border-orange-500 hover:bg-orange-100 transition-colors duration-300"
                                onClick={handleDownload}
                            >
                                <Download size={16} className="mr-1" />

                            </Button>

                            <Button
                                variant="outline"
                                className={`flex-1 h-9 transition-colors duration-300 ${isWishlisted
                                    ? 'border-orange-500 text-orange-600 hover:bg-orange-100'
                                    : 'hover:border-orange-500 hover:bg-orange-100'}`}
                                onClick={toggleWishlist}
                            >
                                <Heart size={16} className={`mr-1 ${isWishlisted ? 'fill-orange-500 text-orange-500' : ''}`} />

                            </Button>
                        </div>}

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};



const FeaturedSection = ({ user }: { user: boolean }) => {

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                    <div className="flex items-center gap-2">
                        <Button variant="link" className="text-orange-500">
                            View All
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-8 bg-gray-100 p-1 rounded-lg w-full flex flex-wrap overflow-x-auto">
                        <TabsTrigger value="all" className="flex-grow">All</TabsTrigger>
                        <TabsTrigger value="men" className="flex-grow">Men</TabsTrigger>
                        <TabsTrigger value="women" className="flex-grow">Women</TabsTrigger>
                        <TabsTrigger value="shoes" className="flex-grow">Shoes</TabsTrigger>
                        <TabsTrigger value="accessories" className="flex-grow">Accessories</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {featuredProducts.map((product) => (
                                <ProductCard user={user} key={product.id} product={product} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="men" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {featuredProducts
                                .filter((p) => p.category === "men")
                                .map((product) => (
                                    <ProductCard user={user} key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="women" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {featuredProducts
                                .filter((p) => p.category === "women")
                                .map((product) => (
                                    <ProductCard user={user} key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="shoes" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {featuredProducts
                                .filter((p) => p.category === "shoes")
                                .map((product) => (
                                    <ProductCard user={user} key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="accessories" className="mt-0">
                        <p className="text-center py-10 text-gray-500">কোন প্রোডাক্ট পাওয়া যায়নি</p>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default FeaturedSection;
