import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload } from "lucide-react"

// Skeleton component for reusable loading states
const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className || ""}`} />
)

export default function ProductFormSkeleton() {
    return (
        <div className="flex flex-col relative">
            <div className="flex-1 space-y-6 p-6">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-x-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
                        <p className="text-muted-foreground">Create a new product for your catalog</p>
                    </div>
                    <div>
                        <div className="flex justify-end space-x-4 pt-6">
                            <Button disabled type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button disabled type="button" variant="outline">
                                Save as Draft
                            </Button>
                            <Button disabled type="submit" variant="default">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Product
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Product Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Product Information Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Information</CardTitle>
                                    <CardDescription>Basic details about your product</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Product Name */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Short Description */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-16 w-full" />
                                    </div>

                                    {/* Full Description */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-32 w-full" />
                                    </div>

                                    {/* Brand and SKU */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-12" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Product Media Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Media</CardTitle>
                                    <CardDescription>Upload product images and video</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Product Image Section */}
                                    <div>
                                        <Skeleton className="h-4 w-24 mb-2" />
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                            <Skeleton className="h-5 w-48 mx-auto mb-2" />
                                            <Skeleton className="h-4 w-64 mx-auto" />
                                        </div>
                                    </div>

                                    {/* Product Video Section */}
                                    <div>
                                        <Skeleton className="h-4 w-24 mb-2" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-10 flex-1" />
                                            <Skeleton className="h-10 w-10" />
                                        </div>
                                        <Skeleton className="h-3 w-56 mt-2" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* SEO Settings Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Settings</CardTitle>
                                    <CardDescription>Optimize your product for search engines</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Meta Title */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>

                                    {/* Meta Description */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-20 w-full" />
                                        <Skeleton className="h-3 w-36" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Category & Status Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category & Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Subcategory */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-12" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Featured Product Toggle */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-5 w-9 rounded-full" />
                                            <Skeleton className="h-4 w-28" />
                                        </div>
                                        <Skeleton className="h-3 w-48" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pricing Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Cost Price */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Selling Price */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Discount Price */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Profit Margin Display */}
                                    <div className="p-3 bg-muted rounded-lg space-y-1">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Inventory Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Inventory</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Track Inventory Toggle */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-5 w-9 rounded-full" />
                                            <Skeleton className="h-4 w-28" />
                                        </div>
                                        <Skeleton className="h-3 w-56" />
                                    </div>

                                    {/* In Stock Toggle */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-5 w-9 rounded-full" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                        <Skeleton className="h-3 w-48" />
                                    </div>

                                    {/* Stock Quantity */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Stock Alert */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Shipping Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Delivery Charge */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Weight */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>

                                    {/* Dimensions */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Button disabled type="button" variant="outline">
                            Cancel
                        </Button>
                        <Button disabled type="button" variant="outline">
                            Save as Draft
                        </Button>
                        <Button disabled type="submit">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Product
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}