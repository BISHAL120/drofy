"use client"

import { DashboardHeader } from "@/components/admin/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, MessageSquare, Clock } from "lucide-react"

const tickets = [
    {
        id: "TIC-001",
        subject: "Order delivery issue",
        user: "Alex Thompson",
        userType: "Reseller",
        status: "open",
        priority: "high",
        lastUpdate: "2 hours ago",
        messages: 3,
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "TIC-002",
        subject: "Payment not received",
        user: "Maria Garcia",
        userType: "Reseller",
        status: "in_progress",
        priority: "medium",
        lastUpdate: "5 hours ago",
        messages: 7,
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "TIC-003",
        subject: "Product quality concern",
        user: "John Doe",
        userType: "Customer",
        status: "closed",
        priority: "low",
        lastUpdate: "1 day ago",
        messages: 12,
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "TIC-004",
        subject: "Account verification help",
        user: "David Chen",
        userType: "Reseller",
        status: "open",
        priority: "medium",
        lastUpdate: "3 hours ago",
        messages: 2,
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "TIC-005",
        subject: "Commission calculation error",
        user: "Lisa Anderson",
        userType: "Reseller",
        status: "in_progress",
        priority: "high",
        lastUpdate: "1 hour ago",
        messages: 5,
        avatar: "/placeholder.svg?height=32&width=32",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "open":
            return "bg-red-100 text-red-800"
        case "in_progress":
            return "bg-blue-100 text-blue-800"
        case "closed":
            return "bg-green-100 text-green-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-800"
        case "medium":
            return "bg-yellow-100 text-yellow-800"
        case "low":
            return "bg-green-100 text-green-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getUserTypeColor = (userType: string) => {
    switch (userType) {
        case "Reseller":
            return "bg-purple-100 text-purple-800"
        case "Customer":
            return "bg-blue-100 text-blue-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function AllTicketsPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
                        <p className="text-muted-foreground">Manage customer and reseller support requests</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Ticket
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-red-600">+3 from yesterday</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18</div>
                            <p className="text-xs text-blue-600">+2 from yesterday</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-green-600">+5 from yesterday</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.4h</div>
                            <p className="text-xs text-green-600">-0.3h from yesterday</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Support Tickets</CardTitle>
                        <CardDescription>Manage all customer and reseller support requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search tickets..." className="pl-10" />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priority</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ticket ID</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Messages</TableHead>
                                        <TableHead>Last Update</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="font-medium">{ticket.id}</TableCell>
                                            <TableCell>{ticket.subject}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={ticket.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {ticket.user
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{ticket.user}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getUserTypeColor(ticket.userType)}>{ticket.userType}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("_", " ")}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                                            </TableCell>
                                            <TableCell>{ticket.messages}</TableCell>
                                            <TableCell>{ticket.lastUpdate}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <MessageSquare className="h-4 w-4" />
                                                    </Button>
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
