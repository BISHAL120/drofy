"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Clock, Download, Eye, Package, TrendingUp, ChevronDown, Calendar, Hash } from "lucide-react"

interface Order {
    id: string
    date: string
    orderNumber: string
    productCode: string
    productName: string
    variant: string
    status: "processing" | "shipped" | "delivered" | "cancelled"
    cod: number
    paid: number
    profit: number
    image: string
    timestamp: string
    note: string
}

const mockOrders: Order[] = [
    {
        id: "1",
        date: "2025-05-17",
        orderNumber: "20250517463171",
        productCode: "017046679915",
        productName: "Premium Baseball Cap",
        variant: "D-4 R-0",
        status: "processing",
        cod: 5777,
        paid: 0,
        profit: 5537,
        image: "/placeholder.svg?height=80&width=80",
        timestamp: "2025-05-17 10:17 PM",
        note: "Customer requested express delivery",
    },
]

export default function ActiveOrders() {
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [orders] = useState<Order[]>(mockOrders)

    const totalOrders = orders.length
    const totalValue = orders.reduce((sum, order) => sum + order.profit, 0)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "processing":
                return "bg-orange-100 text-orange-800 border-orange-200"
            case "shipped":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "delivered":
                return "bg-green-100 text-green-800 border-green-200"
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "processing":
                return <Clock className="w-3 h-3" />
            case "shipped":
                return <Package className="w-3 h-3" />
            case "delivered":
                return <Package className="w-3 h-3" />
            default:
                return <Clock className="w-3 h-3" />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Orders</h1>
                            <p className="text-gray-600">Manage and track your ongoing orders</p>
                        </div>

                        {/* Summary Cards */}
                        <div className="flex gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Orders</p>
                                        <p className="text-xl font-bold text-gray-900">{totalOrders}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Value</p>
                                        <p className="text-xl font-bold text-gray-900">৳{totalValue.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Filter Orders</label>
                                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                                    <SelectTrigger className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                        <SelectValue placeholder="All Item Orders" />
                                        <ChevronDown className="w-4 h-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Item Orders</SelectItem>
                                        <SelectItem value="processing">Processing Orders</SelectItem>
                                        <SelectItem value="shipped">Shipped Orders</SelectItem>
                                        <SelectItem value="delivered">Delivered Orders</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            className="overflow-hidden border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-200"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Hash className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-3 h-3" />
                                                <span>{order.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Badge variant="outline" className={`${getStatusColor(order.status)} capitalize font-medium`}>
                                        {getStatusIcon(order.status)}
                                        <span className="ml-1">{order.status}</span>
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Product Image */}
                                    <div className="lg:col-span-2">
                                        <div className="relative w-20 h-20 mx-auto lg:mx-0">
                                            <Image
                                                src={order.image || "/placeholder.svg"}
                                                alt={order.productName}
                                                fill
                                                className="object-cover rounded-lg border border-orange-100"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="lg:col-span-6">
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-gray-900">{order.productName}</h4>
                                            <p className="text-sm text-gray-600">
                                                Product Code: <span className="font-mono">{order.productCode}</span>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Variant: <span className="font-medium">{order.variant}</span>
                                            </p>
                                            {order.note && (
                                                <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">{order.note}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Financial Details */}
                                    <div className="lg:col-span-4">
                                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">COD Amount:</span>
                                                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                                        ৳{order.cod.toLocaleString()}
                                                    </Badge>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Paid:</span>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        ৳{order.paid.toLocaleString()}
                                                    </Badge>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Profit:</span>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                        ৳{order.profit.toLocaleString()}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Actions and Timestamp */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        <span>Last updated: {order.timestamp}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View Details
                                        </Button>

                                        <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {orders.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Orders</h3>
                            <p className="text-gray-600">You don&apos;t have any active orders at the moment.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
