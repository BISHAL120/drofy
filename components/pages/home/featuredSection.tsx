import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: 'men' | 'women' | 'shoes' | 'accessories';
    isNew: boolean;
}

interface ProductCardProps {
    product: Product;
}

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
];

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-none">
            <div className="relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                />
                {product.isNew && (
                    <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">New</Badge>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
                    <div className="text-white text-sm font-medium">{product.category}</div>
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-600 font-bold">${product.price}</span>
                    <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                    <span className="text-green-600 text-sm">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Add to Cart</Button>
            </CardContent>
        </Card>
    );
};

const FeaturedSection = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                    <Button variant="link" className="text-orange-500">
                        View All
                    </Button>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="men" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featuredProducts
                                .filter((p) => p.category === "men")
                                .map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="women" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featuredProducts
                                .filter((p) => p.category === "women")
                                .map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="shoes" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featuredProducts
                                .filter((p) => p.category === "shoes")
                                .map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="accessories" className="mt-0">
                        <p className="text-center py-10 text-gray-500">No accessories products to display</p>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default FeaturedSection;