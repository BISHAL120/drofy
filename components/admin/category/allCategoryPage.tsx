"use client"

import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, FolderTree } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
    {
        id: "CAT-001",
        name: "Electronics",
        description: "Electronic devices and gadgets",
        productCount: 456,
        image: "/placeholder.svg?height=50&width=50",
        subCategories: [
            { name: "Smartphones", count: 123 },
            { name: "Laptops", count: 89 },
            { name: "Audio", count: 67 },
            { name: "Tablets", count: 45 },
        ],
    },
    {
        id: "CAT-002",
        name: "Clothing",
        description: "Fashion and apparel",
        productCount: 234,
        image: "/placeholder.svg?height=50&width=50",
        subCategories: [
            { name: "Men's Clothing", count: 98 },
            { name: "Women's Clothing", count: 87 },
            { name: "Accessories", count: 49 },
        ],
    },
    {
        id: "CAT-003",
        name: "Home & Garden",
        description: "Home improvement and garden supplies",
        productCount: 189,
        image: "/placeholder.svg?height=50&width=50",
        subCategories: [
            { name: "Furniture", count: 67 },
            { name: "Kitchen", count: 54 },
            { name: "Garden Tools", count: 68 },
        ],
    },
    {
        id: "CAT-004",
        name: "Sports & Fitness",
        description: "Sports equipment and fitness gear",
        productCount: 156,
        image: "/placeholder.svg?height=50&width=50",
        subCategories: [
            { name: "Gym Equipment", count: 45 },
            { name: "Outdoor Sports", count: 67 },
            { name: "Fitness Accessories", count: 44 },
        ],
    },
]

export default function CategoriesPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                        <p className="text-muted-foreground">Manage product categories and subcategories</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href="/admin/categories/new-subcategory">
                            <Button variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Subcategory
                            </Button>
                        </Link>
                        <Link href="/admin/categories/new">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Management</CardTitle>
                        <CardDescription>Organize your products with categories and subcategories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search categories..." className="pl-10" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {categories.map((category) => (
                                <Card key={category.id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                <Image
                                                    src={category.image || "/placeholder.svg"}
                                                    alt={category.name}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold">{category.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{category.description}</p>
                                                    <p className="text-sm text-muted-foreground mt-1">{category.productCount} products</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-sm font-medium flex items-center">
                                                    <FolderTree className="mr-2 h-4 w-4" />
                                                    Subcategories
                                                </h4>
                                                <Button variant="outline" size="sm">
                                                    <Plus className="mr-2 h-3 w-3" />
                                                    Add Subcategory
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {category.subCategories.map((subCategory, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                                        <span className="text-sm font-medium">{subCategory.name}</span>
                                                        <span className="text-sm text-muted-foreground">{subCategory.count} products</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
