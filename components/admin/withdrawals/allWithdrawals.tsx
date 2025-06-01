"use client"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Check, X, Eye, DollarSign, Clock, AlertCircle } from "lucide-react"

const withdrawals = [
    {
        id: "WTH-001",
        reseller: "Alex Thompson",
        amount: "$1,250.00",
        status: "pending",
        requestDate: "2024-01-15",
        processedDate: null,
        method: "Bank Transfer",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "WTH-002",
        reseller: "Maria Garcia",
        amount: "$890.00",
        status: "approved",
        requestDate: "2024-01-14",
        processedDate: "2024-01-15",
        method: "PayPal",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "WTH-003",
        reseller: "David Chen",
        amount: "$650.00",
        status: "rejected",
        requestDate: "2024-01-13",
        processedDate: "2024-01-14",
        method: "Bank Transfer",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "WTH-004",
        reseller: "Lisa Anderson",
        amount: "$420.00",
        status: "pending",
        requestDate: "2024-01-12",
        processedDate: null,
        method: "Mobile Money",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "WTH-005",
        reseller: "Michael Brown",
        amount: "$180.00",
        status: "approved",
        requestDate: "2024-01-11",
        processedDate: "2024-01-12",
        method: "Bank Transfer",
        avatar: "/placeholder.svg?height=32&width=32",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-800"
        case "pending":
            return "bg-yellow-100 text-yellow-800"
        case "rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function AllWithdrawalsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [methodFilter, setMethodFilter] = useState("all")

    const filteredWithdrawals = useMemo(() => {
        return withdrawals.filter((withdrawal) => {
            const matchesSearch =
                withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                withdrawal.reseller.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter
            const matchesMethod =
                methodFilter === "all" ||
                (methodFilter === "bank" && withdrawal.method === "Bank Transfer") ||
                (methodFilter === "paypal" && withdrawal.method === "PayPal") ||
                (methodFilter === "mobile" && withdrawal.method === "Mobile Money")

            return matchesSearch && matchesStatus && matchesMethod
        })
    }, [searchTerm, statusFilter, methodFilter])

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Withdrawals</h2>
                        <p className="text-muted-foreground">Manage reseller withdrawal requests and payouts</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-yellow-600">$3,420 total</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                            <Check className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-green-600">$2,180 processed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total This Month</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,230</div>
                            <p className="text-xs text-blue-600">156 requests</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-red-600">$1,250 declined</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Withdrawal Requests</CardTitle>
                        <CardDescription>Review and process reseller withdrawal requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search by ID or reseller..."
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
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={methodFilter} onValueChange={setMethodFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Methods</SelectItem>
                                    <SelectItem value="bank">Bank Transfer</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="mobile">Mobile Money</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Request ID</TableHead>
                                        <TableHead>Reseller</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Request Date</TableHead>
                                        <TableHead>Processed Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredWithdrawals.map((withdrawal) => (
                                        <TableRow key={withdrawal.id}>
                                            <TableCell className="font-medium">{withdrawal.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={withdrawal.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {withdrawal.reseller
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{withdrawal.reseller}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{withdrawal.amount}</TableCell>
                                            <TableCell>{withdrawal.method}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(withdrawal.status)}>{withdrawal.status}</Badge>
                                            </TableCell>
                                            <TableCell>{withdrawal.requestDate}</TableCell>
                                            <TableCell>{withdrawal.processedDate || "-"}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    {withdrawal.status === "pending" && (
                                                        <>
                                                            <Button variant="ghost" size="sm" className="text-green-600">
                                                                <Check className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-red-600">
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {filteredWithdrawals.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No withdrawal requests found matching your search criteria.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
