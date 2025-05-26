import React from 'react'
import ProductCard, { Product } from '../products/productCard';

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

const FavoriteProducts = () => {
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">My Favorite Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <div
                            key={index}>
                            <ProductCard
                                product={product}
                                user={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FavoriteProducts