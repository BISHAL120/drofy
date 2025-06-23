import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"

// Skeleton component for reusable loading states
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className || ""}`} />
)

export default function ProductsTableSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">Manage your product catalog and inventory</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>View and manage all products in your catalog</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filter Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  disabled
                />
              </div>
              <Select disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
              </Select>
            </div>

            {/* Table Section */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Cost Price</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Generate 8 skeleton rows */}
                  {Array.from({ length: 8 }).map((_, index) => (
                    <TableRow key={index}>
                      {/* Product Column */}
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-[75px] w-[75px] rounded-md" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      </TableCell>

                      {/* Category Column */}
                      <TableCell>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </TableCell>

                      {/* Cost Price Column */}
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>

                      {/* Selling Price Column */}
                      <TableCell>
                        <div className="flex flex-col pl-2 gap-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </TableCell>

                      {/* Stock Column */}
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>

                      {/* Total Sales Column */}
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>

                      {/* Status Column */}
                      <TableCell>
                        <div className="flex flex-col justify-center gap-2">
                          <Skeleton className="h-6 w-16 rounded-full" />
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                      </TableCell>

                      {/* Actions Column */}
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}