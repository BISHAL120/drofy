import CategoryCard from "./categoryCard"

export default function ProductCategories() {
    // Sample category data - you can replace with your actual data
    const categories = {
        name: "ছেলেদের পোশাক",
        categories: [
            { id: 1, name: "T-Shirts", quantity: 289, image: "/placeholder.svg?height=100&width=100" },
            { id: 2, name: "Pants", quantity: 348, image: "/placeholder.svg?height=100&width=100" },
            { id: 3, name: "Shirts", quantity: 190, image: "/placeholder.svg?height=100&width=100" },
            { id: 4, name: "Polo Shirts", quantity: 108, image: "/placeholder.svg?height=100&width=100" },
            { id: 5, name: "Sports Wear", quantity: 320, image: "/placeholder.svg?height=100&width=100" },
            { id: 6, name: "Formal Wear", quantity: 804, image: "/placeholder.svg?height=100&width=100" },
            { id: 7, name: "Casual Shirts", quantity: 217, image: "/placeholder.svg?height=100&width=100" },
            { id: 8, name: "V-Neck T-Shirts", quantity: 97, image: "/placeholder.svg?height=100&width=100" },
            { id: 9, name: "Trousers", quantity: 67, image: "/placeholder.svg?height=100&width=100" },
            { id: 10, name: "Jeans", quantity: 29, image: "/placeholder.svg?height=100&width=100" },
            { id: 11, name: "Shoes", quantity: 38, image: "/placeholder.svg?height=100&width=100" },
            { id: 12, name: "Baby Clothes", quantity: 43, image: "/placeholder.svg?height=100&width=100" },
        ]
    }

    // Women's clothing categories
    const womenCategories = {
        name: "মেয়েদের পোশাক",
        categories: [
            { id: 13, name: "Traditional Dresses", quantity: 1184, image: "/placeholder.svg?height=100&width=100" },
            { id: 14, name: "Western Dresses", quantity: 505, image: "/placeholder.svg?height=100&width=100" },
            { id: 15, name: "Sarees", quantity: 381, image: "/placeholder.svg?height=100&width=100" },
            { id: 16, name: "Lehengas", quantity: 126, image: "/placeholder.svg?height=100&width=100" },
            { id: 17, name: "Casual Wear", quantity: 44, image: "/placeholder.svg?height=100&width=100" },
            { id: 18, name: "Party Wear", quantity: 57, image: "/placeholder.svg?height=100&width=100" },
        ]
    }

    // Accessories categories
    const accessoriesCategories = {
        name: "স্মার্ট পোশাক",
        categories: [
            { id: 19, name: "Watches", quantity: 205, image: "/placeholder.svg?height=100&width=100" },
            { id: 20, name: "Jewelry", quantity: 84, image: "/placeholder.svg?height=100&width=100" },
            { id: 21, name: "Bags", quantity: 67, image: "/placeholder.svg?height=100&width=100" },
            { id: 22, name: "Wallets", quantity: 18, image: "/placeholder.svg?height=100&width=100" },
            { id: 23, name: "Belts", quantity: 28, image: "/placeholder.svg?height=100&width=100" },
            { id: 24, name: "Gifts", quantity: 7, image: "/placeholder.svg?height=100&width=100" },
        ]
    }

    return (
        <div className="w-full px-2 py-4 md:py-6 bg-gray-50">
            {/* Men's Section */}
            <div className="mb-6">
                <h2 className="text-center text-pink-500 font-medium text-lg mb-4">Men&apos;s Fashion (1763)</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
                    {categories.categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>

            {/* Women's Section */}
            <div className="mb-6">
                <h2 className="text-center text-pink-500 font-medium text-lg mb-4">Women&apos;s Fashion (2176)</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {womenCategories.categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>

            {/* Accessories Section */}
            <div>
                <h2 className="text-center text-pink-500 font-medium text-lg mb-4">Accessories (600)</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {accessoriesCategories.categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </div>
    )
}
