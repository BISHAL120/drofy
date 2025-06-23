"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { categorySchema } from "@/lib/zod/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import axios from "axios"
import { ArrowBigUpDash, LoaderCircle, Plus, TriangleAlert, Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import ImageDeleteConfirmation from "../components/imageDeleteConfirmation"


export default function AddCategoryPage({ initialData }: { initialData: Category }) {
    const [categoryImage, setCategoryImage] = useState<File | null>()
    const [initialImage, setInitialImage] = useState<string>(initialData?.imageUrl || "")
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const loadingText = initialData ? "Updating Category..." : "Creating Category..."
    const buttonText = initialData ? "Update Category" : "Create Category"


    // 1. Define your form.
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData ? {
            ...initialData,
            description: initialData.description || "",
            sortOrder: initialData.sortOrder?.toString() || "",
            metaTitle: initialData.metaTitle || "",
            metaDescription: initialData.metaDescription || "",

        } : {
            name: "",
            slug: "",
            description: "",
            isActive: true,
            isFeatured: false,
            sortOrder: "",
            metaTitle: "",
            metaDescription: "",
        },
    })

    const {
        watch,
        setValue,
    } = form

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof categorySchema>) {

        if (!initialImage && !categoryImage) {
            toast.error("দয়া করে ছবি নির্বাচন করুন", {
                duration: 5000,
                icon: <TriangleAlert className="h-4 w-4" />,
                style: {
                    borderRadius: "6px",
                    background: "red",
                    color: "white",
                    border: "1px solid #ff0000",
                    fontSize: "16px",
                    fontWeight: "bold",

                },
            })
            return
        }
        toast.loading(loadingText)
        setIsLoading(true);

        const formdata = new FormData()
        formdata.append("imageUrl", categoryImage || "")
        if (initialData) {
            formdata.append("Details", JSON.stringify({
                ...initialData,
                ...values,
            }))
        } else {
            formdata.append("Details", JSON.stringify(values))
        }

        if (initialData) {
            axios.patch(`/api/admin/categories/${initialData.id}`, formdata)
                .then((response) => {
                    // Handle success, e.g., show a success message or redirect
                    toast.dismiss();
                    setIsLoading(false);
                    toast.success(response.data.message, {
                        description: "Category Updated Successfully.",
                        duration: 5000,
                    })
                    router.push("/admin/categories") // Redirect to the category list page after
                })
                .catch((error) => {
                    console.log("Error creating category:", error)
                    // Handle error, e.g., show an error message
                    toast.dismiss();
                    setIsLoading(false);
                    toast.error(error.response.data.message, {
                        duration: 5000,
                        icon: <TriangleAlert className="h-4 w-4" />, // Replace with your desired icon component
                        style: {
                            borderRadius: "6px",
                            fontSize: "16px",
                            background: "red",
                            color: "white",
                            border: "1px solid #ff0000",
                        },
                    })
                })
        } else {
            axios.post("/api/admin/categories", formdata)
                .then((response) => {
                    // Handle success, e.g., show a success message or redirect
                    toast.dismiss();
                    setIsLoading(false);
                    toast.success(response.data.message, {
                        description: "category has been added successfully.",
                        duration: 5000,
                    })
                    router.push("/admin/categories") // Redirect to the category list page after
                })
                .catch((error) => {
                    console.log("Error creating category:", error)
                    // Handle error, e.g., show an error message
                    toast.dismiss();
                    setIsLoading(false);
                    toast.error(error.response.data.message, {
                        duration: 5000,
                        icon: <TriangleAlert className="h-4 w-4" />, // Replace with your desired icon component
                        style: {
                            borderRadius: "6px",
                            background: "red",
                            color: "white",
                            border: "1px solid #ff0000",
                        },
                    })
                })
        }
    }

    const watchedName = watch("name")

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Check file size (7MB limit)
            const maxSize = 7 * 1024 * 1024 // 7MB in bytes
            if (file.size > maxSize) {
                toast.error("Image size must be less than 7MB", {
                    duration: 5000,
                    icon: <TriangleAlert className="h-4 w-4" />,
                    style: {
                        borderRadius: "6px",
                        background: "red",
                        color: "white",
                        border: "1px solid #ff0000",
                    },
                })
                return
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file", {
                    duration: 5000,
                    icon: <TriangleAlert className="h-4 w-4" />,
                    style: {
                        borderRadius: "6px",
                        background: "red",
                        color: "white",
                        border: "1px solid #ff0000",
                    },
                })
                return
            }


            setCategoryImage(file)
        }
    }

    const removeImage = () => {
        setCategoryImage(null)
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

    const updateSortOrder = async (data: string) => {

        if (!initialData || !data) return;
        toast.loading("Updating Sort Order...")

        try {
            setIsLoading(true);

            // Make the API call after delay
            const response = await axios.post('/api/admin/sortOrder', {
                id: initialData?.id,
                type: "category",
                existOrder: initialData?.sortOrder,
                sortOrder: data,
            }).then((response) => {
                toast.dismiss();
                toast.success(response.data.message, {
                    description: "Lower numbers will appear first",
                    duration: 5000,
                })
                router.push("/admin/categories")
                setIsLoading(false);
                return response.data;
            }).catch((error) => {
                console.log("Error updating sort order:", error)
                // Handle error, e.g., show an error message
                toast.dismiss();
                toast.error(error.response.data.message, {
                    duration: 5000,
                    icon: <TriangleAlert className="h-4 w-4" />,
                    style: {
                        borderRadius: "6px",
                        background: "red",
                        color: "white",
                        border: "1px solid #ff0000",
                    },
                })
                setIsLoading(false);
            })
            return response.data;
        } catch (error) {
            console.log('Error in delayed API call:', error);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between space-x-4">
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
                    <div>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                            variant={initialData ? "secondary" : "default"}
                            className={initialData ? "bg-green-600 hover:bg-green-500 text-white" : ""}
                        >
                            {isLoading ? (
                                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                            ) : (
                                <div className="relative">
                                    {initialData ? <> <div className="w-4 h-4" /> <ArrowBigUpDash className="absolute -top-1 -left-2 size-5 md:size-6" /> </> : <Plus className="mr-2 h-4 w-4" />}
                                </div>
                            )}
                            {buttonText}
                        </Button>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Main Category Information */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Category Information</CardTitle>
                                        <CardDescription>Basic details about your category</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category Name *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isLoading}
                                                            onChange={handleNameChange}
                                                            placeholder="Enter category name"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="slug"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>URL Slug *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isLoading}
                                                            placeholder="category-url-slug"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-sm text-muted-foreground">
                                                        URL: /categories/{watch("slug") || "category-url-slug"}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            disabled={isLoading}
                                                            placeholder="Category description"
                                                            rows={4}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="sortOrder"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sort Order</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isLoading}
                                                            onFocus={() => field.onChange("")}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                updateSortOrder(e.target.value);
                                                            }}
                                                            type="number"
                                                            placeholder="0"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-sm text-muted-foreground">
                                                        Lower numbers appear first in category listings
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Category Image */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Category Image</CardTitle>
                                        <CardDescription>Upload an image to represent this category</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {initialImage ?
                                            <div className="relative inline-block">
                                                <Image
                                                    src={initialImage}
                                                    alt="Category"
                                                    quality={90}
                                                    width={200}
                                                    height={200}
                                                    className="w-48 h-48 object-cover rounded-lg border"
                                                />
                                                {/* <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={removeImage}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button> */}

                                                <ImageDeleteConfirmation
                                                    trigger={<Button
                                                        type="button"
                                                        variant="destructive"
                                                        disabled={isLoading}
                                                        size="sm"
                                                        className="absolute top-2 right-2"
                                                        onClick={removeImage}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>}
                                                    title="Remove Image"
                                                    description="Are you sure you want to remove this image?"
                                                    setInitialImage={setInitialImage}
                                                />

                                            </div>
                                            :
                                            <div>
                                                {categoryImage ? (
                                                    <div className="relative inline-block">
                                                        <Image
                                                            src={URL.createObjectURL(categoryImage) || "/placeholder.svg"}
                                                            alt="Category"
                                                            quality={90}
                                                            width={200}
                                                            height={200}
                                                            className="w-48 h-48 object-cover rounded-lg border"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            disabled={isLoading}
                                                            className="absolute top-2 right-2"
                                                            onClick={removeImage}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                                        <input
                                                            id="image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            disabled={isLoading}
                                                            className="hidden"
                                                        />
                                                        <label htmlFor="image-upload" className="cursor-pointer">
                                                            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                                            <p className="text-lg font-medium">Upload Category Image</p>
                                                            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 7MB</p>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>}
                                    </CardContent>
                                </Card>

                                {/* SEO Settings */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>SEO Settings</CardTitle>
                                        <CardDescription>Optimize your category for search engines</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">

                                        <FormField
                                            control={form.control}
                                            name="metaTitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meta Title</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isLoading}
                                                            placeholder="SEO title for search engines"
                                                            maxLength={60}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-sm text-muted-foreground">
                                                        {watch("metaTitle")?.length || 0}/60 characters
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="metaDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meta Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            disabled={isLoading}
                                                            placeholder="SEO description for search engines"
                                                            rows={3}
                                                            maxLength={160}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-sm text-muted-foreground">
                                                        {watch("metaDescription")?.length || 0}/160 characters
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

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

                                        <FormField
                                            control={form.control}
                                            name="isActive"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex flex-col gap-4 space-x-2">
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                id="isActive"
                                                                checked={field.value}
                                                                disabled={isLoading}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                            <FormLabel htmlFor="isActive">Active</FormLabel>
                                                        </div>
                                                        <FormDescription>
                                                            Inactive categories won‘t be visible to customers
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>

                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="isFeatured"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex flex-col gap-4 space-x-2">
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                id="isFeatured"
                                                                disabled={isLoading}
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                            <FormLabel htmlFor="isFeatured" >Featured Category</FormLabel>
                                                        </div>
                                                        <FormDescription>
                                                            Featured categories appear prominently on the homepage
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>

                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                    </CardContent>
                                </Card>

                                {/* Category Preview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Preview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex justify-center items-center">
                                        <div className="w-fit border rounded-lg p-4">

                                            <Image
                                                src={initialImage || (categoryImage ? URL.createObjectURL(categoryImage) : `/placeholder.svg?height=400&width=400`)}
                                                alt="Preview"
                                                unoptimized
                                                placeholder="blur"
                                                blurDataURL="/placeholder.svg?height=400&width=400"
                                                // quality={90}
                                                width={200}
                                                height={200}
                                                className="w-[400px] h-[400px] object-cover rounded mb-3"
                                            />

                                            <h3 className="font-semibold text-lg">{watchedName || "Category Name"}</h3>
                                            {(() => {
                                                const description = watch("description") || "Category description will appear here";
                                                const maxLength = 100;
                                                return (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {isExpanded ? description : description.slice(0, maxLength)}
                                                            {description.length > maxLength && !isExpanded && "..."}
                                                        </p>
                                                        {description.length > maxLength && (
                                                            <button
                                                                type="button" // Prevent form submission
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent any bubbling
                                                                    setIsExpanded(!isExpanded);
                                                                }}
                                                                className="text-sm text-blue-500 hover:text-blue-700 mt-1 transition-all duration-200 ease-in-out"
                                                            >
                                                                {isExpanded ? "View Less" : "View More"}
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <Link href="/categories">
                                <Button disabled={isLoading} type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button disabled={isLoading} type="submit">
                                {isLoading ? <LoaderCircle className="animate-spin mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                {buttonText}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
