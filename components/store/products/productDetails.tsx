"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ShoppingCart, Download, Copy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"


export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState("XL")
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(8)
    const [copied, setCopied] = useState(false)


    const productDescription = `Embroidery Punjabi Fabrics: saton cortonSnap Button.AVAILABLE SIZE:M=40.L=42.XL= 44.XXL=46.`

    const handleDownload = async () => {
        try {
            const imageUrl =
                "https://firebasestorage.googleapis.com/v0/b/restock-bd.firebasestorage.app/o/products%2F6fe52e8f-c6a9-414f-9489-9f29a4ddd142.webp?alt=media&token=80962dff-cc46-4783-8d3d-63c067c79988"
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "telegram-logo.png"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            toast.success("Image downloaded successfully")

        } catch (error) {
            console.log(error)
            toast.error("Failed to download image")

        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(productDescription)
        setCopied(true)
        toast.success("Product description copied to clipboard")

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Left side - Product Image */}
                <div className="flex flex-col items-center p-4">
                    <div className="relative w-full max-w-md aspect-[3/4] mb-4">
                        <Image
                            src="/placeholder.svg?height=600&width=450"
                            alt="Embroidered Punjabi"
                            fill
                            className="object-cover rounded-md"
                            priority
                        />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Button asChild variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
                            <Link href="https://firebasestorage.googleapis.com/v0/b/restock-bd.firebasestorage.app/o/products%2Ff546192c-50a2-40b4-abcb-d402133a878b.webp?alt=media&token=b736051d-a55f-4465-b199-e767fb162547">
                                <Download className="h-4 w-4" /> ছবি ডাউনলোড
                            </Link>
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Check className="h-4 w-4" /> শেয়ারিং
                        </Button>
                    </div>
                </div>

                {/* Right side - Product Details */}
                <div className="p-4 lg:p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-medium">প্রাইস: ৳১,০৩০</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm">স্টক:</span>
                                <span className="text-green-600 font-medium">আছে</span>
                            </div>
                        </div>
                        <div className="flex items-center bg-green-50 text-green-600 px-3 py-1 rounded-full">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="text-sm">ভেরিফাইড প্রোডাক্ট</span>
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4].map((star) => (
                            <Star
                                key={star}
                                className={`h-5 w-5 ${star <= 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                    </div>

                    <div className="border-t border-b py-4 my-4">
                        <p className="text-sm text-gray-600 mb-2">হোলসেইল সাপোর্টেড বিক্রয় মূল্য সর্বনিম্ন ৭,০০০ টাকা।</p>
                        <p className="font-medium mb-4">SKU: 20019</p>

                        <div className="mb-4">
                            <p className="mb-2 font-medium">সাইজ:</p>
                            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex gap-3">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="M" id="size-m" />
                                    <Label htmlFor="size-m">M</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="L" id="size-l" />
                                    <Label htmlFor="size-l">L</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="XL" id="size-xl" />
                                    <Label htmlFor="size-xl">XL</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="XXL" id="size-xxl" />
                                    <Label htmlFor="size-xxl">XXL</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="mb-2 font-medium">পরিমাণ/পিস</p>
                                <Input
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <p className="mb-2 font-medium">বিক্রয়-মূল্য</p>
                                <Input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number.parseInt(e.target.value) || 0)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <p className="text-sm text-red-500 mb-4">
                            বিক্রয় মূল্যের জন্যগাহক শুধু প্রোডাক্ট এর প্রাইস দিবেন, কুরিয়ার চার্জের অর্ডসন পরবর্তী পেইজে পাবেন।
                        </p>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        অর্ডার তালিকায় অ্যাড করুন
                    </Button>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium">পণ্যের বিবরণ</h3>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "কপি করুন"}
                    </Button>
                </div>
                <div className="whitespace-pre-line">{productDescription}</div>
            </div>
        </div>
    )
}
