import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Star, Eye, ImageIcon, CheckCircle, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import FilterTabs from "./filter-tabs"
import SubcategoryFilter from "./subcategory-filter"

// Mock data - in real app this would come from API/database
const categories = [
    { id: "all", name: "All", nameBn: "সব" },
    { id: "velvet-clothing", name: "Velvet Clothing", nameBn: "ভেলভেট পোশাক" },
    { id: "womens-clothing", name: "Women's Clothing", nameBn: "মেয়েদের পোশাক" },
    { id: "fashion-accessories", name: "Fashion Accessories", nameBn: "ফ্যাশন এক্স ফলা" },
    { id: "new-sarees", name: "New Sarees", nameBn: "নতুন সাড়ী" },
    { id: "baby-clothing", name: "Baby Clothing", nameBn: "বাচ্চা কাপড়চোপড়" },
    { id: "mattress-bedding", name: "Mattress & Bedding", nameBn: "ম্যাট্রেস আইটেম" },
    { id: "jewelry-accessories", name: "Jewelry & Accessories", nameBn: "জুয়েলারি এক্স এক্সেসরিজ" },
    { id: "islamic-clothing", name: "Islamic Clothing", nameBn: "ইসলামিক এর সাইটেম" },
    { id: "educational-toys", name: "Educational Toys", nameBn: "শিক্ষামূলক খেলনা" },
    { id: "mens-clothing", name: "Men's Clothing", nameBn: "পুরুষের কাপড়চোপড়" },
]

const subcategories = [
    { id: "pajama-set", name: "Pajama Set", nameBn: "জোড়া পাজামি", icon: "👔" },
    { id: "shirt-pajama", name: "Shirt Pajama", nameBn: "শার্ট পাজামি", icon: "👕" },
    { id: "night-coat", name: "Night Coat", nameBn: "নাইট কোট", icon: "🧥" },
    { id: "night-dress", name: "Night Dress", nameBn: "নাইট ড্রেস", icon: "👗" },
    { id: "sportswear", name: "Sportswear", nameBn: "স্পোর্টসওয়ার সেট", icon: "🏃" },
    { id: "new-saree", name: "New Saree", nameBn: "নতুন সাড়ী", icon: "🥻" },
    { id: "t-shirt", name: "T-Shirt", nameBn: "টি শার্ট", icon: "👕" },
    { id: "long-dress", name: "Long Dress", nameBn: "লং ড্রেস টিউনিক", icon: "👗" },
    { id: "three-piece", name: "Three Piece", nameBn: "থ্রিপিস", icon: "👔" },
    { id: "pants", name: "Pants", nameBn: "প্যান্ট", icon: "👖" },
    { id: "shoes", name: "Shoes", nameBn: "জুতো", icon: "👠" },
    { id: "bag", name: "Bag", nameBn: "ব্যাগ", icon: "👜" },
    { id: "hijab", name: "Hijab", nameBn: "হিজাব", icon: "🧕" },
    { id: "jewelry", name: "Jewelry", nameBn: "জুয়েলারি", icon: "💍" },
    { id: "watch", name: "Watch", nameBn: "ঘড়ি ও হাতি", icon: "⌚" },
    { id: "perfume", name: "Perfume", nameBn: "পারফিউম এক্স", icon: "🧴" },
    { id: "cosmetics", name: "Cosmetics", nameBn: "কসমেটিক্স", icon: "💄" },
    { id: "electronics", name: "Electronics", nameBn: "ইলেকট্রনিক্স", icon: "📱" },
    { id: "home-decor", name: "Home Decor", nameBn: "হোম ডেকোর", icon: "🏠" },
    { id: "baby-items", name: "Baby Items", nameBn: "বেবি আইটেম", icon: "🍼" },
]

const posts = [
    {
        id: 1,
        user: {
            name: "শপবেইজ রিসেলার-ঢেশ",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
        },
        timestamp: "20 hrs ago",
        price: "২৯৯",
        title: "Combo T-Shirt & Pant",
        description: "High quality cotton blend combo set perfect for casual wear",
        images: [
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
        ],
        rating: 3,
        category: "mens-clothing",
        subcategory: "t-shirt",
        likes: 24,
        views: 156,
    },
    {
        id: 2,
        user: {
            name: "শপবেইজ রিসেলার-ঢেশ",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
        },
        timestamp: "20 hrs ago",
        price: "৩৯৯",
        title: "Sportswear Casual O-neck T-shirts + Pants Tracksuit Set",
        description: "Comfortable sportswear set ideal for workouts and casual activities",
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        rating: 4,
        category: "mens-clothing",
        subcategory: "sportswear",
        likes: 18,
        views: 89,
    },
    {
        id: 3,
        user: {
            name: "ফ্যাশন হাব",
            avatar: "/placeholder.svg?height=40&width=40",
            verified: true,
        },
        timestamp: "1 day ago",
        price: "৮৯৯",
        title: "Premium Cotton Saree Collection",
        description: "Beautiful traditional saree with modern design elements",
        images: [
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
            "/placeholder.svg?height=300&width=300",
        ],
        rating: 5,
        category: "womens-clothing",
        subcategory: "new-saree",
        likes: 45,
        views: 234,
    },
]

function getFilteredPosts(category?: string, subcategory?: string) {
    let filtered = posts

    if (category && category !== "all") {
        filtered = filtered.filter((post) => post.category === category)
    }

    if (subcategory) {
        filtered = filtered.filter((post) => post.subcategory === subcategory)
    }

    return filtered
}

export default function PostsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const selectedCategory = (searchParams.category as string) || "all"
    const selectedSubcategory = (searchParams.subcategory as string) || ""

    const filteredPosts = getFilteredPosts(selectedCategory, selectedSubcategory)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 py-6 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-slate-800">Post&apos;s & Updates</h1>
                    <p className="text-slate-600">Discover amazing products from verified sellers</p>
                </div>

                {/* Category Filter */}
                <FilterTabs categories={categories} selectedCategory={selectedCategory} />

                {/* Subcategory Filter */}
                <SubcategoryFilter subcategories={subcategories} selectedSubcategory={selectedSubcategory} />

                {/* Results Count */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                        Showing {filteredPosts.length} results
                        {selectedCategory !== "all" && (
                            <span className="ml-1">in {categories.find((c) => c.id === selectedCategory)?.name}</span>
                        )}
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid gap-6">
                    {filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12 ring-2 ring-orange-100">
                                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                                            <AvatarFallback className="bg-orange-500 text-white">{post.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold text-slate-800">{post.user.name}</h3>
                                                {post.user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm text-slate-500">
                                                <Clock className="h-3 w-3" />
                                                <span>{post.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500">
                                            <Heart className="h-4 w-4" />
                                            <span className="ml-1 text-xs">{post.likes}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-slate-500">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Price */}
                                <div className="text-center">
                                    <Badge variant="secondary" className="text-lg font-bold bg-orange-100 text-orange-700 px-4 py-1">
                                        প্রাইস: {post.price}
                                    </Badge>
                                </div>

                                {/* Title and Rating */}
                                <div className="text-center space-y-2">
                                    <h2 className="text-xl font-semibold text-slate-800">{post.title}</h2>
                                    <div className="flex items-center justify-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < post.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-slate-600 max-w-md mx-auto">{post.description}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center space-x-4">
                                    <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                                        READ MORE
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                        <ImageIcon className="h-4 w-4 mr-1" />
                                        IMAGE
                                    </Button>
                                </div>

                                {/* Images Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {post.images.map((image, index) => (
                                        <div key={index} className="relative aspect-square group cursor-pointer">
                                            <Image
                                                src={image || "/placeholder.svg"}
                                                alt={`Product image ${index + 1}`}
                                                fill
                                                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg" />
                                        </div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 pt-2 border-t border-slate-100">
                                    <div className="flex items-center space-x-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{post.views} views</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Heart className="h-4 w-4" />
                                        <span>{post.likes} likes</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-slate-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-slate-600 mb-2">No posts found</h3>
                        <p className="text-slate-500">Try adjusting your filters to see more results</p>
                    </div>
                )}
            </div>
        </div>
    )
}
