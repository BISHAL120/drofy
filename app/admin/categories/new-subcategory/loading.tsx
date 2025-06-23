import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload } from "lucide-react"

const SkeletonBox = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
)

const SkeletonLine = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded h-4 ${className}`}></div>
)

export default function SubcategoryFormLoadingSkeleton() {
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between space-x-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add New Subcategory</h2>
                        <p className="text-muted-foreground">Create a new product subcategory</p>
                    </div>
                    <div>
                        <Button disabled>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Subcategory
                        </Button>
                    </div>
                </div>

                {/* Form skeleton */}
                <div className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Subcategory Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subcategory Information</CardTitle>
                                    <CardDescription>Basic details about your subcategory</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Parent Category Select */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-32 h-4" />
                                        <Select disabled>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Loading categories..." />
                                            </SelectTrigger>
                                        </Select>
                                    </div>

                                    {/* Subcategory Name */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-40 h-4" />
                                        <Input disabled placeholder="Loading..." />
                                    </div>

                                    {/* URL Slug */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-24 h-4" />
                                        <Input disabled placeholder="Loading..." />
                                        <SkeletonLine className="w-80 h-3" />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-28 h-4" />
                                        <Textarea disabled rows={4} placeholder="Loading..." />
                                    </div>

                                    {/* Sort Order */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-24 h-4" />
                                        <Input disabled type="number" placeholder="Loading..." />
                                        <SkeletonLine className="w-64 h-3" />
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
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                        <p className="text-lg font-medium text-gray-400">Loading image upload...</p>
                                        <p className="text-sm text-gray-400">PNG, JPG, GIF up to 7MB</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* SEO Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Settings</CardTitle>
                                    <CardDescription>Optimize your subcategory for search engines</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Meta Title */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-24 h-4" />
                                        <Input disabled placeholder="Loading..." />
                                        <SkeletonLine className="w-20 h-3" />
                                    </div>

                                    {/* Meta Description */}
                                    <div className="space-y-2">
                                        <SkeletonLine className="w-36 h-4" />
                                        <Textarea disabled rows={3} placeholder="Loading..." />
                                        <SkeletonLine className="w-24 h-3" />
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
                                    {/* Active Switch */}
                                    <div className="flex flex-col gap-4 space-x-2">
                                        <div className="flex items-center gap-2">
                                            <Switch disabled />
                                            <SkeletonLine className="w-16 h-4" />
                                        </div>
                                        <SkeletonLine className="w-72 h-3" />
                                    </div>

                                    {/* Featured Switch */}
                                    <div className="flex flex-col gap-4 space-x-2">
                                        <div className="flex items-center gap-2">
                                            <Switch disabled />
                                            <SkeletonLine className="w-32 h-4" />
                                        </div>
                                        <SkeletonLine className="w-80 h-3" />
                                    </div>
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
                                            <SkeletonLine className="ml-2 w-32 h-4" />
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <span className="text-muted-foreground">Subcategory:</span>
                                            <SkeletonLine className="ml-2 w-24 h-4" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Subcategory Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Preview</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-center items-center">
                                    <div className="w-fit border rounded-lg p-4">
                                        {/* Preview Image */}
                                        <SkeletonBox className="w-[400px] h-[400px] rounded mb-3" />

                                        {/* Preview Content */}
                                        <div className="space-y-2">
                                            <SkeletonLine className="w-24 h-3" />
                                            <SkeletonLine className="w-40 h-6" />
                                            <SkeletonLine className="w-full h-4" />
                                            <SkeletonLine className="w-3/4 h-4" />
                                            <SkeletonLine className="w-1/2 h-4" />
                                        </div>
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
                        <Button disabled>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Subcategory
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}