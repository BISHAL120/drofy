"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/admin/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, DollarSign, TrendingUp, Percent } from "lucide-react"

const commissions = [
    {
        id: "COM-001",
        reseller: "Alex Thompson",
        orderId: "ORD-001",
        product: "iPhone 15 Pro",
        orderAmount: "$999.00",
        commissionRate: "15%",
        commissionAmount: "$149.85",
        status: "paid",
        date: "2024-01-15",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "COM-002",
        reseller: "Maria Garcia",
        orderId: "ORD-002",
        product: "Samsung Galaxy S24",
        orderAmount: "$849.00",
        commissionRate: "12%",
        commissionAmount: "$101.88",
        status: "pending",
        date: "2024-01-14",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "COM-003",
        reseller: "David Chen",
        orderId: "ORD-003",
        product: "MacBook Air M3",
        orderAmount: "$1,299.00",
        commissionRate: "8%",
        commissionAmount: "$103.92",
        status: "paid",
        date: "2024-01-13",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "COM-004",
        reseller: "Lisa Anderson",
        orderId: "ORD-004",
        product: "AirPods Pro",
        orderAmount: "$249.00",
        commissionRate: "8%",
        commissionAmount: "$19.92",
        status: "pending",
        date: "2024-01-12",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "COM-005",
        reseller: "Michael Brown",
        orderId: "ORD-005",
        product: "iPad Pro 12.9",
        orderAmount: "$1,099.00",
        commissionRate: "5%",
        commissionAmount: "$54.95",
        status: "cancelled",
        date: "2024-01-11",
        avatar: "/placeholder.svg?height=32&width=32",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-800"
        case "pending":
            return "bg-yellow-100 text-yellow-800"
        case "cancelled":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function CommissionsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredCommissions = useMemo(() => {
        return commissions.filter((commission) => {
            const matchesSearch =
                commission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                commission.reseller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                commission.orderId.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || commission.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [searchTerm, statusFilter])

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Commissions</h2>
                        <p className="text-muted-foreground">Track and manage reseller commissions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,450</div>
                            <p className="text-xs text-green-600">+8.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                            <Percent className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$2,340</div>
                            <p className="text-xs text-yellow-600">23 pending</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Commission Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12.5%</div>
                            <p className="text-xs text-blue-600">Across all levels</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Month</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$8,920</div>
                            <p className="text-xs text-green-600">156 transactions</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Commission Tracking</CardTitle>
                        <CardDescription>View and manage all reseller commissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search commissions..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Commission ID</TableHead>
                                        <TableHead>Reseller</TableHead>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Order Amount</TableHead>
                                        <TableHead>Rate</TableHead>
                                        <TableHead>Commission</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCommissions.map((commission) => (
                                        <TableRow key={commission.id}>
                                            <TableCell className="font-medium">{commission.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={commission.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {commission.reseller
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{commission.reseller}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{commission.orderId}</TableCell>
                                            <TableCell>{commission.product}</TableCell>
                                            <TableCell>{commission.orderAmount}</TableCell>
                                            <TableCell>{commission.commissionRate}</TableCell>
                                            <TableCell className="font-medium">{commission.commissionAmount}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(commission.status)}>{commission.status}</Badge>
                                            </TableCell>
                                            <TableCell>{commission.date}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {filteredCommissions.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No commissions found matching your search criteria.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
