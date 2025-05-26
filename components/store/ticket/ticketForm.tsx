"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Clock, Eye, MessageSquare, Send, Ticket } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SupportTicketForm() {
    // const router = useRouter()
    const [orderId, setOrderId] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Reset form
        setOrderId("")
        setMessage("")
        setIsSubmitting(false)

        // Show success message (you can implement toast notification here)
        alert("টিকেট সফলভাবে জমা দেওয়া হয়েছে!")
    }

    /*   const handleViewTicket = (ticketId: string) => {
          router.push(`/store/support/${ticketId}`)
      } */

    const ticketHistory = [
        {
            id: "TK001",
            date: "২৪ মে, ২০২৫",
            orderId: "ORD-12345",
            status: "সমাধান হয়েছে",
            statusType: "resolved",
            subject: "পেমেন্ট সমস্যা সমাধান",
        },
        {
            id: "TK002",
            date: "২৩ মে, ২০২৫",
            orderId: "ORD-12346",
            status: "প্রক্রিয়াধীন",
            statusType: "pending",
            subject: "ডেলিভারি বিলম্ব সংক্রান্ত",
        },
        {
            id: "TK003",
            date: "২২ মে, ২০২৫",
            orderId: "ORD-12347",
            status: "নতুন",
            statusType: "new",
            subject: "প্রোডাক্ট রিটার্ন অনুরোধ",
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "resolved":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "pending":
                return <Clock className="h-4 w-4 text-orange-600" />
            case "new":
                return <AlertCircle className="h-4 w-4 text-blue-600" />
            default:
                return <Clock className="h-4 w-4 text-gray-600" />
        }
    }

    const getStatusBadge = (status: string, statusType: string) => {
        const variants = {
            resolved: "bg-green-100 text-green-800 border-green-200",
            pending: "bg-orange-100 text-orange-800 border-orange-200",
            new: "bg-blue-100 text-blue-800 border-blue-200",
        }

        return (
            <Badge variant="outline" className={variants[statusType as keyof typeof variants]}>
                {getStatusIcon(statusType)}
                <span className="ml-1">{status}</span>
            </Badge>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg">
                        <Ticket className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">সাপোর্ট টিকেট</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            আপনার প্রয়োজন অনুযায়ী আমাদের টেকনিক্যাল টিম সাহায্য করে থাকে। তাই আপনার টেকনিক্যাল এবং একাউন্টের সম্পর্কিত প্রয়োজন অনুযায়ী সাবমিট
                            করুন। অনুগ্রহ করে প্রোডাক্ট সম্পর্কিত সাপোর্ট অনুযায়ী জানু আপনার সেজ এবং রেজিস্ট্রেশন এ মেসেজ করবেন।
                        </p>
                    </div>
                </div>

                {/* Support Ticket Form */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg p-5">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <MessageSquare className="h-6 w-6" />
                            নতুন টিকেট তৈরি করুন
                        </CardTitle>
                        <CardDescription className="text-orange-100">আপনার সমস্যার বিস্তারিত বিবরণ দিন</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="order-id" className="text-base font-medium text-gray-700">
                                    অর্ডার আইডি <span className="text-red-500">*</span>
                                </Label>
                                <Select value={orderId} onValueChange={setOrderId} required>
                                    <SelectTrigger className="w-full h-14 border-2 border-gray-200 focus:border-orange-400 transition-colors">
                                        <SelectValue placeholder="অর্ডার আইডি নির্বাচন করুন" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        <SelectItem value="ORD-12345">ORD-12345</SelectItem>
                                        <SelectItem value="ORD-12346">ORD-12346</SelectItem>
                                        <SelectItem value="ORD-12347">ORD-12347</SelectItem>
                                        <SelectItem value="ORD-12348">ORD-12348</SelectItem>
                                        <SelectItem value="ORD-12349">ORD-12349</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-red-500">গুরুত্বপূর্ণ কমপ্লিট হওয়া অর্ডার সম্পর্কে কোনো প্রয়োজন থাকলে সাবমিট করুন।</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-base font-medium text-gray-700">
                                    মেসেজ লিখুন <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="আপনার সমস্যার বিস্তারিত বিবরণ লিখুন..."
                                    className="min-h-[120px] md:min-h-[150px] border-2 border-gray-200 focus:border-orange-400 transition-colors resize-none"
                                    required
                                />
                                <p className="text-sm text-gray-500">
                                    মেসেজটি সম্পূর্ণ আকারে লিখুন। মেসেজ এর ভেতর কোনটার এর মেইলটার নম্বর অবশ্যই আইডি লিখতে সাপোর্ট টিকেট টি এডিট করা
                                    হবে।
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting || !orderId || !message}
                                className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        জমা দেওয়া হচ্ছে...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Send className="h-5 w-5" />
                                        সাবমিট করুন
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Support Ticket History */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-t-lg p-5">
                        <CardTitle className="text-xl">সাপোর্ট টিকেট হিস্ট্রি</CardTitle>
                        <CardDescription className="text-gray-300">আপনার পূর্ববর্তী টিকেটগুলির তালিকা</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Desktop View */}
                        <div className="hidden md:block">
                            <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50 border-b font-semibold text-gray-700">
                                <div>তারিখ</div>
                                <div>অর্ডার আইডি</div>
                                <div>বিষয়</div>
                                <div>স্ট্যাটাস</div>
                                <div className="text-center">ভিউ</div>
                            </div>
                            {ticketHistory.map((ticket, index) => (
                                <div key={index} className="grid grid-cols-5 gap-4 p-6 border-b hover:bg-gray-50 transition-colors">
                                    <div className="text-gray-700">{ticket.date}</div>
                                    <div className="font-medium text-gray-900">{ticket.orderId}</div>
                                    <div className="text-gray-700 truncate">{ticket.subject}</div>
                                    <div>{getStatusBadge(ticket.status, ticket.statusType)}</div>
                                    <div className="text-center">
                                        <Link
                                            href={`/store/support/${ticket.id}`}
                                            className="inline-flex items-center justify-center h-8 px-3 border border-orange-200 text-orange-600 hover:bg-orange-500 hover:text-white ml-2 rounded-md cursor-pointer transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden space-y-4 p-4">
                            {ticketHistory.map((ticket, index) => (
                                <Card key={index} className="border border-gray-200">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{ticket.orderId}</p>
                                                <p className="text-sm text-gray-600 truncate">{ticket.subject}</p>
                                                <p className="text-sm text-gray-500">{ticket.date}</p>
                                            </div>
                                            <Link
                                                href={`/store/support/${ticket.id}`}
                                                className="inline-flex items-center justify-center h-8 px-3 border border-orange-200 text-orange-600 hover:bg-orange-50 ml-2 rounded-md cursor-pointer transition-colors"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            {getStatusBadge(ticket.status, ticket.statusType)}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {ticketHistory.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <Ticket className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>কোনো টিকেট পাওয়া যায়নি</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
