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
import { Search, UserPlus, Eye, MessageSquare, Ban } from "lucide-react"

const resellers = [
    {
        id: "RES-001",
        name: "Alex Thompson",
        email: "alex@example.com",
        phone: "+1234567890",
        level: "GOLD",
        totalOrders: 234,
        totalSales: "$45,230",
        wallet: "$1,250",
        status: "active",
        joinDate: "2023-06-15",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "RES-002",
        name: "Maria Garcia",
        email: "maria@example.com",
        phone: "+1234567891",
        level: "SILVER",
        totalOrders: 189,
        totalSales: "$38,920",
        wallet: "$890",
        status: "active",
        joinDate: "2023-07-22",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "RES-003",
        name: "David Chen",
        email: "david@example.com",
        phone: "+1234567892",
        level: "BRONZE",
        totalOrders: 156,
        totalSales: "$29,450",
        wallet: "$650",
        status: "active",
        joinDate: "2023-08-10",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "RES-004",
        name: "Lisa Anderson",
        email: "lisa@example.com",
        phone: "+1234567893",
        level: "BRONZE",
        totalOrders: 98,
        totalSales: "$25,680",
        wallet: "$420",
        status: "pending",
        joinDate: "2023-09-05",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "RES-005",
        name: "Michael Brown",
        email: "michael@example.com",
        phone: "+1234567894",
        level: "BEGINNER",
        totalOrders: 45,
        totalSales: "$12,340",
        wallet: "$180",
        status: "inactive",
        joinDate: "2023-10-12",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

const getLevelColor = (level: string) => {
    switch (level) {
        case "LEGENDARY":
            return "bg-purple-100 text-purple-800"
        case "ELITE":
            return "bg-indigo-100 text-indigo-800"
        case "GOLD":
            return "bg-yellow-100 text-yellow-800"
        case "SILVER":
            return "bg-gray-100 text-gray-800"
        case "BRONZE":
            return "bg-orange-100 text-orange-800"
        case "BEGINNER":
            return "bg-blue-100 text-blue-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800"
        case "pending":
            return "bg-yellow-100 text-yellow-800"
        case "inactive":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function ResellersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [levelFilter, setLevelFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredResellers = useMemo(() => {
        return resellers.filter((reseller) => {
            const matchesSearch =
                reseller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reseller.phone.includes(searchTerm) ||
                reseller.email.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesLevel = levelFilter === "all" || reseller.level.toLowerCase() === levelFilter
            const matchesStatus = statusFilter === "all" || reseller.status === statusFilter

            return matchesSearch && matchesLevel && matchesStatus
        })
    }, [searchTerm, levelFilter, statusFilter])

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Resellers</h2>
                        <p className="text-muted-foreground">Manage your reseller network and partnerships</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Reseller
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Reseller Management</CardTitle>
                        <CardDescription>View and manage all resellers in your network</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name or phone..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={levelFilter} onValueChange={setLevelFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Levels</SelectItem>
                                    <SelectItem value="legendary">Legendary</SelectItem>
                                    <SelectItem value="elite">Elite</SelectItem>
                                    <SelectItem value="gold">Gold</SelectItem>
                                    <SelectItem value="silver">Silver</SelectItem>
                                    <SelectItem value="bronze">Bronze</SelectItem>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Reseller</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Orders</TableHead>
                                        <TableHead>Total Sales</TableHead>
                                        <TableHead>Wallet</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Join Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredResellers.map((reseller) => (
                                        <TableRow key={reseller.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarImage src={reseller.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {reseller.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{reseller.name}</div>
                                                        <div className="text-sm text-muted-foreground">{reseller.id}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="text-sm">{reseller.email}</div>
                                                    <div className="text-sm text-muted-foreground">{reseller.phone}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getLevelColor(reseller.level)}>{reseller.level}</Badge>
                                            </TableCell>
                                            <TableCell>{reseller.totalOrders}</TableCell>
                                            <TableCell>{reseller.totalSales}</TableCell>
                                            <TableCell>{reseller.wallet}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(reseller.status)}>{reseller.status}</Badge>
                                            </TableCell>
                                            <TableCell>{reseller.joinDate}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <MessageSquare className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Ban className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        {filteredResellers.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No resellers found matching your search criteria.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
