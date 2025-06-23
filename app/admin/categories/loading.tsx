import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, FolderTree } from "lucide-react"

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
)

const SkeletonLine = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded h-4 ${className}`}></div>
)

export default function CategoriesLoadingSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
            <p className="text-muted-foreground">
              Manage product categories and subcategories
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" disabled>
              <Plus className="mr-2 h-4 w-4" />
              Add Subcategory
            </Button>
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>
              Organize your products with categories and subcategories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search categories..." className="pl-10" disabled />
              </div>
            </div>

            <div className="space-y-6">
              {/* Skeleton Category Cards */}
              {[1, 2, 3].map((index) => (
                <Card key={index}>
                  <CardContent className="px-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {/* Image skeleton */}
                        <SkeletonBox className="w-[120px] h-[120px] rounded-lg" />

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {/* Category name skeleton */}
                            <SkeletonLine className="w-32 h-6" />

                            {/* Active badge skeleton */}
                            <div className="animate-pulse">
                              <Badge variant="secondary" className="bg-gray-200 text-gray-200">
                                Active
                              </Badge>
                            </div>

                            {/* Featured badge skeleton (randomly show/hide) */}
                            {index % 2 === 0 && (
                              <div className="animate-pulse">
                                <Badge variant="secondary" className="bg-gray-200 text-gray-200">
                                  Featured
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Description skeleton */}
                          <SkeletonLine className="w-64 h-4" />

                          {/* Product count skeleton */}
                          <SkeletonLine className="w-20 h-4" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" disabled>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      {/* Subcategories section */}
                      {index === 1 ? (
                        // Empty subcategories state skeleton
                        <div className="flex flex-col items-center justify-center p-6 text-center bg-slate-200 rounded-xl border border-dashed border-slate-200">
                          <div className="rounded-full bg-slate-100 p-3 mb-3">
                            <FolderTree className="h-6 w-6 text-slate-400" />
                          </div>
                          <div className="animate-pulse space-y-2">
                            <SkeletonLine className="w-48 h-6 mx-auto" />
                            <SkeletonLine className="w-64 h-4 mx-auto" />
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" disabled>
                              <Plus className="mr-2 h-4 w-4" />
                              Add First Subcategory
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Subcategories with items skeleton
                        <>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium flex items-center">
                              <FolderTree className="mr-2 h-4 w-4" />
                              Subcategories
                            </h4>
                            <Button variant="outline" size="sm" disabled>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Subcategory
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[1, 2, 3, 4].map((subIndex) => (
                              <div
                                key={subIndex}
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div className="flex items-center space-x-2">
                                  <SkeletonLine className="w-24 h-4" />
                                  <SkeletonLine className="w-16 h-4" />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm" disabled>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" disabled>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
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