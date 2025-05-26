"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    AlertCircle,
    Send,
    Paperclip,
    Download,
    User,
    Calendar,
    Hash,
    MessageSquare,
    FileText,
    Phone,
    Mail,
} from "lucide-react"

export default function TicketDetails() {
    const params = useParams()
    const router = useRouter()
    const ticketId = params.id as string

    const [newMessage, setNewMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Mock ticket data - in real app, this would come from API
    const ticketData = {
        id: ticketId,
        orderId: "ORD-12345",
        subject: "পেমেন্ট সমস্যা - অর্ডার প্রসেসিং বিলম্ব",
        status: "প্রক্রিয়াধীন",
        statusType: "pending",
        priority: "উচ্চ",
        priorityType: "high",
        createdAt: "২৪ মে, ২০২৫ - ১০:৩০ AM",
        updatedAt: "২৪ মে, ২০২৫ - ০২:১৫ PM",
        customer: {
            name: "মোহাম্মদ রহিম",
            email: "rahim@example.com",
            phone: "+৮৮০১৭১২৩৪৫৬৭৮",
        },
        assignedTo: {
            name: "সাপোর্ট টিম",
            role: "টেকনিক্যাল সাপোর্ট",
        },
        messages: [
            {
                id: 1,
                sender: "মোহাম্মদ রহিম",
                senderType: "customer",
                message:
                    "আমার অর্ডার ORD-12345 এর পেমেন্ট সম্পন্ন হয়েছে কিন্তু অর্ডার স্ট্যাটাস এখনও 'পেন্ডিং' দেখাচ্ছে। এটি ২ দিন ধরে একই অবস্থায় রয়েছে। দয়া করে এই সমস্যার সমাধান করুন।",
                timestamp: "২৪ মে, ২০২৫ - ১০:৩০ AM",
                attachments: [{ name: "payment-receipt.pdf", size: "245 KB" }],
            },
            {
                id: 2,
                sender: "সাপোর্ট টিম",
                senderType: "support",
                message:
                    "ধন্যবাদ আপনার টিকেটের জন্য। আমরা আপনার অর্ডার চেক করেছি এবং পেমেন্ট ভেরিফিকেশন প্রক্রিয়া চলমান রয়েছে। আমাদের টেকনিক্যাল টিম এই বিষয়ে কাজ করছে।",
                timestamp: "২৪ মে, ২০২৫ - ১১:৪৫ AM",
                attachments: [],
            },
            {
                id: 3,
                sender: "সাপোর্ট টিম",
                senderType: "support",
                message:
                    "আপডেট: আপনার পেমেন্ট সফলভাবে ভেরিফাই হয়েছে। অর্ডার প্রসেসিং শুরু হয়েছে এবং আগামী ২৪ ঘন্টার মধ্যে ডেলিভারি প্রক্রিয়া শুরু হবে।",
                timestamp: "২৪ মে, ২০২৫ - ০২:১৫ PM",
                attachments: [],
            },
        ],
    }

    const getStatusIcon = (statusType: string) => {
        switch (statusType) {
            case "resolved":
                return <CheckCircle className="h-5 w-5 text-green-600" />
            case "pending":
                return <Clock className="h-5 w-5 text-orange-600" />
            case "new":
                return <AlertCircle className="h-5 w-5 text-blue-600" />
            default:
                return <Clock className="h-5 w-5 text-gray-600" />
        }
    }

    const getStatusBadge = (status: string, statusType: string) => {
        const variants = {
            resolved: "bg-green-100 text-green-800 border-green-200",
            pending: "bg-orange-100 text-orange-800 border-orange-200",
            new: "bg-blue-100 text-blue-800 border-blue-200",
        }

        return (
            <Badge variant="outline" className={`${variants[statusType as keyof typeof variants]} text-sm`}>
                {getStatusIcon(statusType)}
                <span className="ml-1">{status}</span>
            </Badge>
        )
    }

    const getPriorityBadge = (priority: string, priorityType: string) => {
        const variants = {
            high: "bg-red-100 text-red-800 border-red-200",
            medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
            low: "bg-gray-100 text-gray-800 border-gray-200",
        }

        return (
            <Badge variant="outline" className={variants[priorityType as keyof typeof variants]}>
                {priority}
            </Badge>
        )
    }

    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setNewMessage("")
        setIsSubmitting(false)

        // Show success message
        alert("উত্তর সফলভাবে পাঠানো হয়েছে!")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="w-full flex items-center justify-between gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            ফিরে যান
                        </Button>
                        <div className="pr-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">টিকেট বিস্তারিত</h1>
                            <p className="text-gray-600">টিকেট #{ticketData.id}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Ticket Info */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg p-5">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-xl">{ticketData.subject}</CardTitle>
                                        <div className="flex items-center gap-2 mt-2 text-orange-100">
                                            <Hash className="h-4 w-4" />
                                            <span>অর্ডার: {ticketData.orderId}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {getStatusBadge(ticketData.status, ticketData.statusType)}
                                        {getPriorityBadge(ticketData.priority, ticketData.priorityType)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>তৈরি: {ticketData.createdAt}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>আপডেট: {ticketData.updatedAt}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Messages */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-orange-600" />
                                    কথোপকথন
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {ticketData.messages.map((message, index) => (
                                    <div key={message.id} className="space-y-4">
                                        <div
                                            className={`flex gap-4 ${message.senderType === "customer" ? "flex-row" : "flex-row-reverse"}`}
                                        >
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback
                                                    className={
                                                        message.senderType === "customer"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-orange-100 text-orange-600"
                                                    }
                                                >
                                                    {message.senderType === "customer" ? <User className="h-5 w-5" /> : "ST"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`flex-1 max-w-[80%] ${message.senderType === "customer" ? "text-left" : "text-right"}`}
                                            >
                                                <div
                                                    className={`rounded-lg p-4 ${message.senderType === "customer"
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold text-sm">{message.sender}</span>
                                                        <span
                                                            className={`text-xs ${message.senderType === "customer" ? "text-gray-500" : "text-orange-100"}`}
                                                        >
                                                            {message.timestamp}
                                                        </span>
                                                    </div>
                                                    <p className="leading-relaxed">{message.message}</p>

                                                    {message.attachments.length > 0 && (
                                                        <div className="mt-3 space-y-2">
                                                            {message.attachments.map((attachment, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`flex items-center gap-2 p-2 rounded ${message.senderType === "customer" ? "bg-white" : "bg-white/20"
                                                                        }`}
                                                                >
                                                                    <FileText className="h-4 w-4" />
                                                                    <span className="text-sm flex-1">{attachment.name}</span>
                                                                    <span className="text-xs opacity-70">{attachment.size}</span>
                                                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                                                        <Download className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {index < ticketData.messages.length - 1 && <Separator className="my-4" />}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Reply Form */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">উত্তর দিন</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmitReply} className="space-y-4">
                                    <div>
                                        <Label htmlFor="reply-message" className="text-base font-medium">
                                            আপনার বার্তা
                                        </Label>
                                        <Textarea
                                            id="reply-message"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="আপনার উত্তর লিখুন..."
                                            className="min-h-[100px] mt-2 border-2 border-gray-200 focus:border-orange-400 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="border-orange-200 text-orange-600 hover:bg-orange-50"
                                        >
                                            <Paperclip className="h-4 w-4 mr-2" />
                                            ফাইল সংযুক্ত করুন
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || !newMessage.trim()}
                                            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    পাঠানো হচ্ছে...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Send className="h-4 w-4" />
                                                    উত্তর পাঠান
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">গ্রাহক তথ্য</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            <User className="h-6 w-6" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-900">{ticketData.customer.name}</p>
                                        <p className="text-sm text-gray-600">গ্রাহক</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">{ticketData.customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-700">{ticketData.customer.phone}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Assigned To */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">দায়িত্বপ্রাপ্ত</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-orange-100 text-orange-600">ST</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-900">{ticketData.assignedTo.name}</p>
                                        <p className="text-sm text-gray-600">{ticketData.assignedTo.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">দ্রুত কার্যক্রম</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    টিকেট সমাধান করুন
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                                >
                                    <Clock className="h-4 w-4 mr-2" />
                                    অগ্রাধিকার পরিবর্তন করুন
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50"
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    টিম সদস্য নিয়োগ করুন
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
