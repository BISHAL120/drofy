"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBengaliCurrency } from "@/hooks/convertNum";

import { Download, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";


type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: 'men' | 'women' | 'shoes' | 'accessories';
    status: 'normal' | 'sale' | 'hot' | 'comingSoon';
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
        status: "comingSoon",
    },
    {
        id: 2,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        status: "hot",
    },
    {
        id: 3,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        status: "normal",
    },
    {
        id: 4,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        status: "sale",
    },
    {
        id: 5,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        status: "sale",
    },
    {
        id: 6,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        status: "hot",
    },
    {
        id: 7,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        status: "normal",
    },
    {
        id: 8,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        status: "comingSoon",
    },
    {
        id: 9,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        status: "comingSoon",
    },
    {
        id: 10,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        status: "sale",
    },
    {
        id: 11,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        status: "hot",
    },
    {
        id: 12,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        status: "normal",
    },
    {
        id: 13,
        name: "Men's Casual Shirt",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg",
        category: "men",
        status: "hot",
    },
    {
        id: 14,
        name: "Women's Summer Dress",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg",
        category: "women",
        status: "comingSoon",
    },
    {
        id: 15,
        name: "Sports Shoes",
        price: 59.99,
        originalPrice: 89.99,
        image: "/placeholder.svg",
        category: "shoes",
        status: "sale",
    },
    {
        id: 16,
        name: "Denim Jeans",
        price: 45.99,
        originalPrice: 69.99,
        image: "/placeholder.svg",
        category: "men",
        status: "hot",
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

            toast.success('ডাউনলোড সম্পূর্ণ হয়েছে', {
                style: { background: '#dcfce7', border: '1px solid #bbf7d0', fontSize: '16px', fontWeight: "700" },
                icon: '⬇️',
            });
        } catch (error) {
            console.error("Download failed:", error);
            toast.error("ডাউনলোড ব্যর্থ হয়েছে", {
                style: { background: 'red', color: "white", border: '1px solid orange', fontSize: '16px', fontWeight: "700" },
                icon: '❌',
            });
        }
    };

    const toggleWishlist = () => {
        setIsWishlisted(prev => !prev);
        if (isWishlisted) {
            toast.success('উইশলিস্টে যুক্ত হয়েছে', {
                style: { background: '#fee2e2', border: '1px solid #fecaca', fontSize: '16px', fontWeight: "700" },
                icon: '💔',
            });
        } else {
            toast.success('রিমুভ হয়ে গিয়েছে!', {
                style: { background: '#dcfce7', border: '1px solid #bbf7d0', fontSize: '16px', fontWeight: "700" },
                icon: '❤️',
            });
        }
    };

    const handlePreOrder = () => {
        toast.success('প্রি-অর্ডার সম্পূর্ণ হয়েছে', {
            style: { background: '#dcfce7', border: '1px solid #bbf7d0', fontSize: '16px', fontWeight: "700" },
            icon: '⬇️',
        });
    };

    return (
        <div>
            <Card className="overflow-hidden p-0 transition-all duration-300 border-none hover:shadow-xl hover:shadow-orange-300 group">
                <div className="relative">
                    <Link
                        href={"/store/products/product"}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={210}
                            height={210}
                            className="w-full h-[210px] object-cover"
                        />
                    </Link>
                    {/* (product.status !== 'normal') && */ (
                        <Badge
                            className={`absolute top-2 left-2 ${
                                // Assuming new products would have 'new' status and checking against current date
                                product.status === 'normal' ? 'bg-slate-600 hover:bg-black' :
                                    product.status === 'hot' ? 'bg-red-500 hover:bg-red-600' :
                                        product.status === 'sale' ? 'bg-blue-500 hover:bg-blue-600' :
                                            product.status === 'comingSoon' ? 'bg-rose-500 hover:bg-rose-600' :
                                                'bg-gray-500 hover:bg-gray-600'
                                }`}
                        >
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </Badge>
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

                    <h3 className="font-medium text-sm line-clamp-2 mb-1 hover:underline ">
                        <Link
                            href={"/store/products/product"}
                            className="w-fit"
                        >
                            {product.name}
                        </Link>
                    </h3>

                    {user && <div className="flex items-center justify-between">
                        <div className="w-full flex items-center justify-between gap-2">
                            <span className="text-red-500 font-bold">{formatBengaliCurrency(product.price)}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through text-xs">৳{formatBengaliCurrency(product.originalPrice)}</span>
                            )}
                        </div>
                    </div>}
                    <div>

                        {user && product.status !== "comingSoon" && <div className="flex justify-between items-center mt-3 gap-2">
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
                        {user && product.status === "comingSoon" && (
                            <Button
                                variant="outline"
                                onClick={handlePreOrder}
                                className="w-full h-9 mt-3 border-orange-500 text-orange-600 hover:bg-orange-100 transition-colors duration-300"
                            >
                                প্রি-অর্ডার করুন
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card >
        </div >
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

                <Tabs defaultValue="men" className="w-full">
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
