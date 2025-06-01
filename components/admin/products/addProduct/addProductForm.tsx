"use client"

import type React from "react"

import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface ProductFormData {
    name: string
    description: string
    shortDescription: string
    category: string
    subCategory: string
    brand: string
    sku: string
    costPrice: number
    sellingPrice: number
    discountPrice?: number
    stock: number
    minStock: number
    deliveryCharge: number
    weight: number
    dimensions: string
    tags: string
    metaTitle: string
    metaDescription: string
    status: string
    featured: boolean
    trackInventory: boolean
}

const categories = [
    { id: "electronics", name: "Electronics", subCategories: ["Smartphones", "Laptops", "Audio", "Tablets"] },
    { id: "clothing", name: "Clothing", subCategories: ["Men's Clothing", "Women's Clothing", "Accessories"] },
    { id: "home", name: "Home & Garden", subCategories: ["Furniture", "Kitchen", "Garden Tools"] },
    { id: "sports", name: "Sports & Fitness", subCategories: ["Gym Equipment", "Outdoor Sports", "Fitness Accessories"] },
]

export default function AddProductPage() {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [productImages, setProductImages] = useState<string[]>([])
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ProductFormData>({
        defaultValues: {
            status: "active",
            featured: false,
            trackInventory: true,
        },
    })

    const watchedCategory = watch("category")
    const watchedCostPrice = watch("costPrice")
    const watchedSellingPrice = watch("sellingPrice")

    const onSubmit = (data: ProductFormData) => {
        console.log("Product data:", { ...data, images: productImages, categories: selectedCategory })

        toast.success("Product Created Successfully", {
            description: "New product has been added successfully.",
            descriptionClassName: "text-sm",
            duration: 5000,
        })
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
            setProductImages((prev) => [...prev, ...newImages])
        }
    }

    const removeImage = (index: number) => {
        setProductImages((prev) => prev.filter((_, i) => i !== index))
    }

    const selectedCategoryData = categories.find((cat) => cat.id === watchedCategory)
    const profitMargin =
        watchedSellingPrice && watchedCostPrice
            ? (((watchedSellingPrice - watchedCostPrice) / watchedSellingPrice) * 100).toFixed(2)
            : "0"

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex flex-col space-y-2 space-x-4">
                    {/* <Link href="/admin/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link> */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
                        <p className="text-muted-foreground">Create a new product for your catalog</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Product Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Information</CardTitle>
                                    <CardDescription>Basic details about your product</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Product Name *</Label>
                                        <Input
                                            id="name"
                                            {...register("name", { required: "Product name is required" })}
                                            placeholder="Enter product name"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="shortDescription">Short Description *</Label>
                                        <Textarea
                                            id="shortDescription"
                                            {...register("shortDescription", { required: "Short description is required" })}
                                            placeholder="Brief product description (max 160 characters)"
                                            rows={2}
                                            maxLength={160}
                                        />
                                        {errors.shortDescription && (
                                            <p className="text-sm text-red-500">{errors.shortDescription.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Full Description *</Label>
                                        <Textarea
                                            id="description"
                                            {...register("description", { required: "Description is required" })}
                                            placeholder="Detailed product description"
                                            rows={6}
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="brand">Brand</Label>
                                            <Input id="brand" {...register("brand")} placeholder="Product brand" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="sku">SKU *</Label>
                                            <Input id="sku" {...register("sku", { required: "SKU is required" })} placeholder="Product SKU" />
                                            {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Product Images */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                    <CardDescription>Upload product images (first image will be the main image)</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {productImages.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <Image
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Product ${index + 1}`}
                                                    width={150}
                                                    height={150}
                                                    className="w-full h-32 object-cover rounded-lg border"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                {index === 0 && (
                                                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                                        Main
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500">Upload Images</p>
                                            </label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* SEO Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Settings</CardTitle>
                                    <CardDescription>Optimize your product for search engines</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="metaTitle">Meta Title</Label>
                                        <Input
                                            id="metaTitle"
                                            {...register("metaTitle")}
                                            placeholder="SEO title for search engines"
                                            maxLength={60}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="metaDescription">Meta Description</Label>
                                        <Textarea
                                            id="metaDescription"
                                            {...register("metaDescription")}
                                            placeholder="SEO description for search engines"
                                            rows={3}
                                            maxLength={160}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input
                                            id="tags"
                                            {...register("tags")}
                                            placeholder="Comma-separated tags (e.g., smartphone, electronics, mobile)"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Category & Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category & Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Category *</Label>
                                        <Select
                                            value={watchedCategory}
                                            onValueChange={(value) => {
                                                setValue("category", value)
                                                setValue("subCategory", "")
                                                setSelectedCategory(value)
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                                    </div>

                                    {selectedCategoryData && (
                                        <div className="space-y-2">
                                            <Label>Subcategory *</Label>
                                            <Select onValueChange={(value) => setValue("subCategory", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select subcategory" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {selectedCategoryData.subCategories.map((subCat) => (
                                                        <SelectItem key={subCat} value={subCat}>
                                                            {subCat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.subCategory && <p className="text-sm text-red-500">{errors.subCategory.message}</p>}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select onValueChange={(value) => setValue("status", value)} defaultValue="active">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="featured"
                                            {...register("featured")}
                                            onCheckedChange={(checked) => setValue("featured", checked)}
                                        />
                                        <Label htmlFor="featured">Featured Product</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pricing */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="costPrice">Cost Price *</Label>
                                        <Input
                                            id="costPrice"
                                            type="number"
                                            step="0.01"
                                            {...register("costPrice", {
                                                required: "Cost price is required",
                                                min: { value: 0, message: "Cost price must be positive" },
                                            })}
                                            placeholder="0.00"
                                        />
                                        {errors.costPrice && <p className="text-sm text-red-500">{errors.costPrice.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sellingPrice">Selling Price *</Label>
                                        <Input
                                            id="sellingPrice"
                                            type="number"
                                            step="0.01"
                                            {...register("sellingPrice", {
                                                required: "Selling price is required",
                                                min: { value: 0, message: "Selling price must be positive" },
                                            })}
                                            placeholder="0.00"
                                        />
                                        {errors.sellingPrice && <p className="text-sm text-red-500">{errors.sellingPrice.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="discountPrice">Discount Price</Label>
                                        <Input
                                            id="discountPrice"
                                            type="number"
                                            step="0.01"
                                            {...register("discountPrice")}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    {watchedCostPrice && watchedSellingPrice && (
                                        <div className="p-3 bg-muted rounded-lg">
                                            <p className="text-sm font-medium">Profit Margin: {profitMargin}%</p>
                                            <p className="text-sm text-muted-foreground">
                                                Profit: ${(watchedSellingPrice - watchedCostPrice).toFixed(2)}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Inventory */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Inventory</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="trackInventory"
                                            {...register("trackInventory")}
                                            onCheckedChange={(checked) => setValue("trackInventory", checked)}
                                            defaultChecked
                                        />
                                        <Label htmlFor="trackInventory">Track Inventory</Label>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock Quantity *</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            {...register("stock", {
                                                required: "Stock quantity is required",
                                                min: { value: 0, message: "Stock must be non-negative" },
                                            })}
                                            placeholder="0"
                                        />
                                        {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="minStock">Minimum Stock Alert</Label>
                                        <Input id="minStock" type="number" {...register("minStock")} placeholder="5" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Delivery Charge</Label>
                                        <Input id="Charge.." type="number" step="0.01" {...register("deliveryCharge")} placeholder="0.00" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <Input id="weight" type="number" step="0.01" {...register("weight")} placeholder="0.00" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
                                        <Input id="dimensions" {...register("dimensions")} placeholder="20 x 15 x 5" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Link href="/products">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="button" variant="outline">
                            Save as Draft
                        </Button>
                        <Button type="submit">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
