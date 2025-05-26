"use client"

import ProductCard, { Product } from "@/components/store/products/productCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";





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
