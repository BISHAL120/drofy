"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Smartphone, CreditCard, Wallet } from "lucide-react"
import { toast } from "sonner"


interface PayoutAccount {
    id: string
    method: string
    accountNumber: string
    accountName?: string
}

const paymentMethods = [
    {
        id: "bkash",
        name: "bKash",
        icon: "📱",
        color: "bg-pink-500",
        description: "মোবাইল ব্যাংকিং",
    },
    {
        id: "nagad",
        name: "Nagad",
        icon: "💳",
        color: "bg-orange-500",
        description: "ডিজিটাল পেমেন্ট",
    },
    {
        id: "rocket",
        name: "Rocket",
        icon: "🚀",
        color: "bg-purple-500",
        description: "মোবাইল ফিন্যান্সিয়াল সার্ভিস",
    },
    {
        id: "upay",
        name: "Upay",
        icon: "💰",
        color: "bg-blue-500",
        description: "মোবাইল ওয়ালেট",
    },
    /* {
        id: "mcash",
        name: "mCash",
        icon: "📲",
        color: "bg-green-500",
        description: "মোবাইল ব্যাংকিং",
    },
    {
        id: "surecash",
        name: "SureCash",
        icon: "💎",
        color: "bg-teal-500",
        description: "ডিজিটাল ওয়ালেট",
    }, */
]

export default function PaymentMethod() {
    const [selectedMethod, setSelectedMethod] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [accountName, setAccountName] = useState("")
    const [accounts, setAccounts] = useState<PayoutAccount[]>([
        {
            id: "1",
            method: "bKash",
            accountNumber: "01917398800",
            accountName: "জন ডো",
        },
    ])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedMethod || !accountNumber) {

            toast.error("ত্রুটি: অনুগ্রহ করে সকল তথ্য পূরণ করুন", {
                duration: 5000,
            })
            return
        }

        const newAccount: PayoutAccount = {
            id: Date.now().toString(),
            method: paymentMethods.find((m) => m.id === selectedMethod)?.name || selectedMethod,
            accountNumber,
            accountName,
        }

        setAccounts([...accounts, newAccount])
        setSelectedMethod("")
        setAccountNumber("")
        setAccountName("")

        toast.success("সফল: পেআউট অ্যাকাউন্ট যোগ করা হয়েছে", {
            duration: 5000,
        })
    }

    const removeAccount = (id: string) => {
        setAccounts(accounts.filter((acc) => acc.id !== id))

        toast.success("মুছে ফেলা হয়েছে", {
            description: "অ্যাকাউন্ট সফলভাবে মুছে ফেলা হয়েছে",
            duration: 5000,
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">কমিশন পেআউট সেটআপ</h1>
                    <p className="text-gray-600">আপনার কমিশন গ্রহণের জন্য পেমেন্ট মেথড যোগ করুন</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Add New Account Form */}
                    <Card className="shadow-lg border-0 p-0">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-5">
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                নতুন পেআউট অ্যাকাউন্ট যোগ করুন
                            </CardTitle>
                            <CardDescription className="text-blue-100">আপনার পছন্দের মোবাইল ব্যাংকিং মেথড নির্বাচন করুন</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Payment Method Selection */}
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold text-gray-700">পেমেন্ট মেথড নির্বাচন করুন *</Label>
                                    <RadioGroup
                                        value={selectedMethod}
                                        onValueChange={setSelectedMethod}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        {paymentMethods.map((method) => (
                                            <div key={method.id}>
                                                <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                                                <Label
                                                    htmlFor={method.id}
                                                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all duration-200 hover:shadow-md"
                                                >
                                                    <div
                                                        className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center text-white text-lg mb-2`}
                                                    >
                                                        {method.icon}
                                                    </div>
                                                    <span className="font-semibold text-sm">{method.name}</span>
                                                    <span className="text-xs text-muted-foreground text-center">{method.description}</span>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {/* Account Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="accountNumber" className="text-base font-semibold text-gray-700">
                                        অ্যাকাউন্ট নম্বর *
                                    </Label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="accountNumber"
                                            type="tel"
                                            placeholder="01XXXXXXXXX"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            className="pl-10 h-12 text-base"
                                            maxLength={11}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">১১ সংখ্যার মোবাইল নম্বর লিখুন</p>
                                </div>

                                {/* Account Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="accountName" className="text-base font-semibold text-gray-700">
                                        অ্যাকাউন্ট হোল্ডারের নাম
                                    </Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="accountName"
                                            type="text"
                                            placeholder="আপনার নাম লিখুন"
                                            value={accountName}
                                            onChange={(e) => setAccountName(e.target.value)}
                                            className="pl-10 h-12 text-base"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    অ্যাকাউন্ট যোগ করুন
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Existing Accounts */}
                    <Card className="shadow-lg border-0 p-0">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg p-5">
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                সংরক্ষিত পেআউট অ্যাকাউন্ট
                            </CardTitle>
                            <CardDescription className="text-green-100">আপনার যোগ করা পেমেন্ট মেথডসমূহ</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {accounts.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg font-medium">কোনো অ্যাকাউন্ট যোগ করা হয়নি</p>
                                    <p className="text-sm">প্রথমে একটি পেআউট অ্যাকাউন্ট যোগ করুন</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="font-semibold">#</TableHead>
                                            <TableHead className="font-semibold">পেমেন্ট মেথড</TableHead>
                                            <TableHead className="font-semibold">অ্যাকাউন্ট নম্বর</TableHead>
                                            <TableHead className="font-semibold">নাম</TableHead>
                                            <TableHead className="font-semibold text-center">অ্যাকশন</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {accounts.map((account, index) => (
                                            <TableRow key={account.id} className="hover:bg-gray-50">
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`${paymentMethods.find((m) => m.name === account.method)?.color || "bg-gray-500"} text-white`}
                                                    >
                                                        {account.method}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-mono">{account.accountNumber}</TableCell>
                                                <TableCell>{account.accountName || "N/A"}</TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeAccount(account.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Smartphone className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">গুরুত্বপূর্ণ তথ্য</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• অ্যাকাউন্ট নম্বর সঠিক এবং সক্রিয় হতে হবে</li>
                                    <li>• কমিশন পেমেন্ট ২-৩ কার্যদিবসের মধ্যে প্রক্রিয়া করা হবে</li>
                                    <li>• যেকোনো সমস্যার জন্য সাপোর্ট টিমের সাথে যোগাযোগ করুন</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
