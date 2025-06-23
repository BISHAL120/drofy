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
import { Search, Eye, MessageSquare, Trash2, Star } from "lucide-react"

const reviews = [
    {
        id: "REV-001",
        customer: "John Doe",
        product: "iPhone 15 Pro",
        rating: 5,
        comment: "Excellent product! Fast delivery and great quality.",
        status: "approved",
        date: "2024-01-15",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "REV-002",
        customer: "Jane Smith",
        product: "Samsung Galaxy S24",
        rating: 4,
        comment: "Good phone but battery could be better.",
        status: "pending",
        date: "2024-01-14",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "REV-003",
        customer: "Mike Johnson",
        product: "MacBook Air M3",
        rating: 5,
        comment: "Amazing laptop! Perfect for work and gaming.",
        status: "approved",
        date: "2024-01-13",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "REV-004",
        customer: "Sarah Wilson",
        product: "AirPods Pro",
        rating: 2,
        comment: "Not worth the price. Sound quality is average.",
        status: "rejected",
        date: "2024-01-12",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "REV-005",
        customer: "Robert Brown",
        product: "iPad Pro 12.9",
        rating: 4,
        comment: "Great tablet for productivity tasks.",
        status: "approved",
        date: "2024-01-11",
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

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
}

export default function ReviewsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [ratingFilter, setRatingFilter] = useState("all")

    const filteredReviews = useMemo(() => {
        return reviews.filter((review) => {
            const matchesSearch =
                review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.id.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || review.status === statusFilter
            const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

            return matchesSearch && matchesStatus && matchesRating
        })
    }, [searchTerm, statusFilter, ratingFilter])

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
                        <p className="text-muted-foreground">Manage customer product reviews and ratings</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-green-600">+12% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.2</div>
                            <p className="text-xs text-blue-600">Out of 5 stars</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">23</div>
                            <p className="text-xs text-yellow-600">Awaiting moderation</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">67%</div>
                            <p className="text-xs text-green-600">Of all reviews</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Review Management</CardTitle>
                        <CardDescription>View and moderate customer product reviews</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search reviews..."
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
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={ratingFilter} onValueChange={setRatingFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Ratings</SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                    <SelectItem value="4">4 Stars</SelectItem>
                                    <SelectItem value="3">3 Stars</SelectItem>
                                    <SelectItem value="2">2 Stars</SelectItem>
                                    <SelectItem value="1">1 Star</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Review ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredReviews.map((review) => (
                                        <TableRow key={review.id}>
                                            <TableCell className="font-medium">{review.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {review.customer
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{review.customer}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{review.product}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                                            </TableCell>
                                            <TableCell>{review.date}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <MessageSquare className="h-4 w-4" />
                                                    </Button>
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
                        {filteredReviews.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No reviews found matching your search criteria.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
