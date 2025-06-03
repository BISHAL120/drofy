"use client"

import ProductCard from "@/components/store/products/productCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoData } from "@/constants/demoData";


/* interface ProductCardProps {
    product: Product;
} */


const FeaturedSection = () => {

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
                            {DemoData.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </TabsContent>

                    {/*  <TabsContent value="men" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {DemoData
                                .filter((p) => p.category === "men")
                                .map((product) => (
                                    <ProductCard user={user} key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent> */}

                    {/*  <TabsContent value="women" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {DemoData
                                .filter((p) => p.category === "women")
                                .map((product) => (
                                    <ProductCard user={user} key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent> */}

                    {/* <TabsContent value="shoes" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {DemoData
                                .filter((p) => p.category === "shoes")
                                .map((product) => (
                                    <ProductCard user={user} key={product.id} product={product} />
                                ))}
                        </div>
                    </TabsContent> */}

                    <TabsContent value="accessories" className="mt-0">
                        <p className="text-center py-10 text-gray-500">কোন প্রোডাক্ট পাওয়া যায়নি</p>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default FeaturedSection;
