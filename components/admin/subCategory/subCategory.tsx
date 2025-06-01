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

interface SubcategoryFormData {
    name: string
    slug: string
    parentCategory: string
    description: string
    metaTitle: string
    metaDescription: string
    isActive: boolean
    isFeatured: boolean
    sortOrder: number
}

const parentCategories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "home", name: "Home & Garden" },
    { id: "sports", name: "Sports & Fitness" },
    { id: "books", name: "Books & Media" },
    { id: "beauty", name: "Beauty & Personal Care" },
]

export default function AddSubcategoryPage() {

    const [subcategoryImage, setSubcategoryImage] = useState<string>("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<SubcategoryFormData>({
        defaultValues: {
            isActive: true,
            isFeatured: false,
            sortOrder: 0,
        },
    })

    const watchedName = watch("name")
    const watchedParentCategory = watch("parentCategory")

    const onSubmit = (data: SubcategoryFormData) => {
        console.log("Subcategory data:", { ...data, image: subcategoryImage })
        /* toast({
          title: "Subcategory Created",
          description: "New subcategory has been added successfully.",
        }) */

        toast.success("Subcategory created successfully", {
            description: "New subcategory has been added successfully.",
            duration: 5000,
        })
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setSubcategoryImage(imageUrl)
        }
    }

    const removeImage = () => {
        setSubcategoryImage("")
    }

    // Auto-generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
    }

    // Update slug when name changes
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setValue("name", name)
        setValue("slug", generateSlug(name))
    }

    const selectedParentCategory = parentCategories.find((cat) => cat.id === watchedParentCategory)

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center space-x-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add New Subcategory</h2>
                        <p className="text-muted-foreground">Create a new product subcategory</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Subcategory Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subcategory Information</CardTitle>
                                    <CardDescription>Basic details about your subcategory</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Parent Category *</Label>
                                        <Select onValueChange={(value) => setValue("parentCategory", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select parent category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {parentCategories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.parentCategory && <p className="text-sm text-red-500">{errors.parentCategory.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Subcategory Name *</Label>
                                        <Input
                                            id="name"
                                            {...register("name", { required: "Subcategory name is required" })}
                                            onChange={handleNameChange}
                                            placeholder="Enter subcategory name"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">URL Slug *</Label>
                                        <Input
                                            id="slug"
                                            {...register("slug", { required: "URL slug is required" })}
                                            placeholder="subcategory-url-slug"
                                        />
                                        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                                        <p className="text-sm text-muted-foreground">
                                            URL: /categories/{watchedParentCategory || "parent"}/{watch("slug") || "subcategory-url-slug"}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            {...register("description")}
                                            placeholder="Subcategory description"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sortOrder">Sort Order</Label>
                                        <Input id="sortOrder" type="number" {...register("sortOrder")} placeholder="0" />
                                        <p className="text-sm text-muted-foreground">Lower numbers appear first in subcategory listings</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Subcategory Image */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subcategory Image</CardTitle>
                                    <CardDescription>Upload an image to represent this subcategory</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {subcategoryImage ? (
                                        <div className="relative inline-block">
                                            <Image
                                                src={subcategoryImage || "/placeholder.svg"}
                                                alt="Subcategory"
                                                width={200}
                                                height={200}
                                                className="w-48 h-48 object-cover rounded-lg border"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={removeImage}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                                <p className="text-lg font-medium">Upload Subcategory Image</p>
                                                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </label>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* SEO Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Settings</CardTitle>
                                    <CardDescription>Optimize your subcategory for search engines</CardDescription>
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
                                        <p className="text-sm text-muted-foreground">{watch("metaTitle")?.length || 0}/60 characters</p>
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
                                        <p className="text-sm text-muted-foreground">
                                            {watch("metaDescription")?.length || 0}/160 characters
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Subcategory Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subcategory Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="isActive"
                                            {...register("isActive")}
                                            onCheckedChange={(checked) => setValue("isActive", checked)}
                                            defaultChecked
                                        />
                                        <Label htmlFor="isActive">Active</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Inactive subcategories won&apos;t be visible to customers</p>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="isFeatured"
                                            {...register("isFeatured")}
                                            onCheckedChange={(checked) => setValue("isFeatured", checked)}
                                        />
                                        <Label htmlFor="isFeatured">Featured Subcategory</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Featured subcategories appear prominently in the parent category
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Category Hierarchy */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category Hierarchy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm">
                                            <span className="text-muted-foreground">Parent:</span>
                                            <span className="ml-2 font-medium">
                                                {selectedParentCategory?.name || "Select parent category"}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <span className="text-muted-foreground">Subcategory:</span>
                                            <span className="ml-2 font-medium">{watchedName || "Subcategory name"}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Subcategory Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="border rounded-lg p-4">
                                        {subcategoryImage && (
                                            <Image
                                                src={subcategoryImage || "/placeholder.svg"}
                                                alt="Preview"
                                                width={100}
                                                height={100}
                                                className="w-full h-32 object-cover rounded mb-3"
                                            />
                                        )}
                                        <div className="text-xs text-muted-foreground mb-1">
                                            {selectedParentCategory?.name || "Parent Category"}
                                        </div>
                                        <h3 className="font-semibold text-lg">{watchedName || "Subcategory Name"}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {watch("description") || "Subcategory description will appear here"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Link href="/categories">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Subcategory
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
