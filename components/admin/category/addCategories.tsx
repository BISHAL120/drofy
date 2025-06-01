"use client"

import type React from "react"

import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface CategoryFormData {
    name: string
    slug: string
    description: string
    metaTitle: string
    metaDescription: string
    isActive: boolean
    isFeatured: boolean
    sortOrder: number
}

export default function AddCategoryPage() {
    const [categoryImage, setCategoryImage] = useState<string>("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<CategoryFormData>({
        defaultValues: {
            isActive: true,
            isFeatured: false,
            sortOrder: 0,
        },
    })

    const watchedName = watch("name")

    const onSubmit = (data: CategoryFormData) => {
        console.log("Category data:", { ...data, image: categoryImage })
        toast.success("Category Created", {
            description: "New category has been added successfully.",
            duration: 5000,

        })
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setCategoryImage(imageUrl)
        }
    }

    const removeImage = () => {
        setCategoryImage("")
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

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center space-x-4">
                    {/* <Link href="/categories">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link> */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add New Category</h2>
                        <p className="text-muted-foreground">Create a new product category</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Category Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category Information</CardTitle>
                                    <CardDescription>Basic details about your category</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Category Name *</Label>
                                        <Input
                                            id="name"
                                            {...register("name", { required: "Category name is required" })}
                                            onChange={handleNameChange}
                                            placeholder="Enter category name"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">URL Slug *</Label>
                                        <Input
                                            id="slug"
                                            {...register("slug", { required: "URL slug is required" })}
                                            placeholder="category-url-slug"
                                        />
                                        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
                                        <p className="text-sm text-muted-foreground">
                                            URL: /categories/{watch("slug") || "category-url-slug"}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            {...register("description")}
                                            placeholder="Category description"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sortOrder">Sort Order</Label>
                                        <Input id="sortOrder" type="number" {...register("sortOrder")} placeholder="0" />
                                        <p className="text-sm text-muted-foreground">Lower numbers appear first in category listings</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Category Image */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category Image</CardTitle>
                                    <CardDescription>Upload an image to represent this category</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {categoryImage ? (
                                        <div className="relative inline-block">
                                            <Image
                                                src={categoryImage || "/placeholder.svg"}
                                                alt="Category"
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
                                                <p className="text-lg font-medium">Upload Category Image</p>
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
                                    <CardDescription>Optimize your category for search engines</CardDescription>
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
                            {/* Category Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category Settings</CardTitle>
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
                                    <p className="text-sm text-muted-foreground">Inactive categories won&lsquo;t be visible to customers</p>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="isFeatured"
                                            {...register("isFeatured")}
                                            onCheckedChange={(checked) => setValue("isFeatured", checked)}
                                        />
                                        <Label htmlFor="isFeatured">Featured Category</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Featured categories appear prominently on the homepage
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Category Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="border rounded-lg p-4">
                                        {categoryImage && (
                                            <Image
                                                src={categoryImage || "/placeholder.svg"}
                                                alt="Preview"
                                                width={100}
                                                height={100}
                                                className="w-full h-32 object-cover rounded mb-3"
                                            />
                                        )}
                                        <h3 className="font-semibold text-lg">{watchedName || "Category Name"}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {watch("description") || "Category description will appear here"}
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
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
