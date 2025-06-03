"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Building2, Wallet, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

const paymentMethods = [
    {
        id: "bkash",
        name: "bKash",
        icon: Smartphone,
        color: "bg-pink-500",
        minAmount: 50,
        maxAmount: 25000,
        fee: "1.85%",
        processingTime: "Instant",
    },
    {
        id: "nagad",
        name: "Nagad",
        icon: Wallet,
        color: "bg-orange-500",
        minAmount: 50,
        maxAmount: 25000,
        fee: "1.99%",
        processingTime: "Instant",
    },
    {
        id: "bank",
        name: "Bank Transfer",
        icon: Building2,
        color: "bg-emerald-500",
        minAmount: 500,
        maxAmount: 100000,
        fee: "Free",
        processingTime: "1-3 business days",
    },
]

export default function WithdrawPage() {
    const [selectedMethod, setSelectedMethod] = useState("")
    const [amount, setAmount] = useState("")
    const [accountNumber, setAccountNumber] = useState("")

    const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedMethod)
    const numericAmount = Number.parseFloat(amount) || 0

    const isValidAmount =
        selectedPaymentMethod &&
        numericAmount >= selectedPaymentMethod.minAmount &&
        numericAmount <= selectedPaymentMethod.maxAmount

    const calculateFee = () => {
        if (!selectedPaymentMethod || !numericAmount) return 0
        if (selectedPaymentMethod.fee === "Free") return 0
        return numericAmount * (Number.parseFloat(selectedPaymentMethod.fee) / 100)
    }

    const totalReceived = numericAmount - calculateFee()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
            <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center space-y-2 pb-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        Withdraw Funds
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-600">
                        Choose your preferred payment method and enter the amount
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold text-slate-800">Select Payment Method</Label>
                        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                            <div className="grid gap-4">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon
                                    return (
                                        <div key={method.id} className="relative">
                                            <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                                            <Label
                                                htmlFor={method.id}
                                                className="flex items-center justify-between p-6 rounded-xl border-2 border-slate-200 bg-white cursor-pointer transition-all hover:border-violet-300 hover:shadow-md peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-50 peer-data-[state=checked]:shadow-lg"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center`}>
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800">{method.name}</div>
                                                        <div className="text-sm text-slate-500">
                                                            ৳{method.minAmount.toLocaleString()} - ৳{method.maxAmount.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <Badge variant="secondary" className="bg-slate-100">
                                                        Fee: {method.fee}
                                                    </Badge>
                                                    <div className="text-xs text-slate-500">{method.processingTime}</div>
                                                </div>
                                                {selectedMethod === method.id && (
                                                    <CheckCircle className="absolute top-1 right-1 w-6 h-6 text-violet-500" />
                                                )}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Amount Input */}
                    {selectedMethod && (
                        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                            <Label htmlFor="amount" className="text-lg font-semibold text-slate-800">
                                Withdrawal Amount
                            </Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">৳</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-8 h-14 text-lg border-2 focus:border-violet-500 rounded-xl"
                                />
                            </div>
                            {selectedPaymentMethod && amount && (
                                <div className="text-sm text-slate-600">
                                    {!isValidAmount ? (
                                        <span className="text-red-500">
                                            Amount must be between ৳{selectedPaymentMethod.minAmount.toLocaleString()} and ৳
                                            {selectedPaymentMethod.maxAmount.toLocaleString()}
                                        </span>
                                    ) : (
                                        <span className="text-emerald-600">✓ Valid amount</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Account Number Input */}
                    {selectedMethod && selectedMethod !== "bank" && (
                        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                            <Label htmlFor="account" className="text-lg font-semibold text-slate-800">
                                {selectedPaymentMethod?.name} Number
                            </Label>
                            <Input
                                id="account"
                                type="tel"
                                placeholder="Enter your mobile number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="h-14 text-lg border-2 focus:border-violet-500 rounded-xl"
                            />
                        </div>
                    )}

                    {/* Bank Details */}
                    {selectedMethod === "bank" && (
                        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                            <Label className="text-lg font-semibold text-slate-800">Bank Details</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input placeholder="Account Number" className="h-12 border-2 focus:border-violet-500 rounded-xl" />
                                <Input placeholder="Bank Name" className="h-12 border-2 focus:border-violet-500 rounded-xl" />
                                <Input
                                    placeholder="Account Holder Name"
                                    className="h-12 border-2 focus:border-violet-500 rounded-xl md:col-span-2"
                                />
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    {selectedMethod && amount && isValidAmount && (
                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 space-y-3 animate-in slide-in-from-bottom-4 duration-300">
                            <h3 className="font-semibold text-slate-800 mb-4">Transaction Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Withdrawal Amount:</span>
                                    <span className="font-medium">৳{numericAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Processing Fee:</span>
                                    <span className="font-medium">৳{calculateFee().toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                                    <span>You&apos;ll Receive:</span>
                                    <span className="text-emerald-600">৳{totalReceived.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedMethod || !amount || !isValidAmount || (selectedMethod !== "bank" && !accountNumber)}
                    >
                        Process Withdrawal
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    {/* Security Notice */}
                    <div className="text-center text-sm text-slate-500 bg-slate-50 rounded-lg p-4">
                        🔒 Your transaction is secured with bank-level encryption. Processing times may vary based on your selected
                        payment method.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
