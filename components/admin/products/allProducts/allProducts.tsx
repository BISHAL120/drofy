"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
    {
        id: "PROD-001",
        name: "iPhone 15 Pro",
        category: "Electronics",
        subCategory: "Smartphones",
        price: "$999.00",
        sellingPrice: "$1,149.00",
        stock: "45",
        totalSales: "234",
        status: "active",
        image: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "PROD-002",
        name: "Samsung Galaxy S24",
        category: "Electronics",
        subCategory: "Smartphones",
        price: "$849.00",
        sellingPrice: "$969.00",
        stock: "67",
        totalSales: "189",
        status: "active",
        image: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "PROD-003",
        name: "MacBook Air M3",
        category: "Electronics",
        subCategory: "Laptops",
        price: "$1,299.00",
        sellingPrice: "$1,499.00",
        stock: "23",
        totalSales: "156",
        status: "active",
        image: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "PROD-004",
        name: "AirPods Pro",
        category: "Electronics",
        subCategory: "Audio",
        price: "$249.00",
        sellingPrice: "$289.00",
        stock: "0",
        totalSales: "445",
        status: "out_of_stock",
        image: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "PROD-005",
        name: "iPad Pro 12.9",
        category: "Electronics",
        subCategory: "Tablets",
        price: "$1,099.00",
        sellingPrice: "$1,249.00",
        stock: "34",
        totalSales: "98",
        status: "active",
        image: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "PROD-006",
        name: "Nike Air Max",
        category: "Sports",
        subCategory: "Footwear",
        price: "$120.00",
        sellingPrice: "$149.00",
        stock: "89",
        totalSales: "67",
        status: "active",
        image: "/placeholder.svg?height=50&width=50",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800"
        case "out_of_stock":
            return "bg-red-100 text-red-800"
        case "inactive":
            return "bg-gray-100 text-gray-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function AllProductsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter
            const matchesStatus = statusFilter === "all" || product.status === statusFilter

            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [searchTerm, categoryFilter, statusFilter])

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                        <p className="text-muted-foreground">Manage your product catalog and inventory</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href="/admin/products/new">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Management</CardTitle>
                        <CardDescription>View and manage all products in your catalog</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="clothing">Clothing</SelectItem>
                                    <SelectItem value="home">Home & Garden</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

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
                                    {filteredProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Image
                                                        src={product.image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-md"
                                                    />
                                                    <div>
                                                        <div className="font-medium">{product.name}</div>
                                                        <div className="text-sm text-muted-foreground">{product.id}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{product.category}</div>
                                                    <div className="text-sm text-muted-foreground">{product.subCategory}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.sellingPrice}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>{product.totalSales}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Link href={`/products/edit/${product.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No products found matching your search criteria.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
