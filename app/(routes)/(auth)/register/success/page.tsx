'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FacebookIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RegistrationSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20 p-4">
            <Card className="w-full max-w-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-orange-500">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-pulse" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text ">নিবন্ধন সফল হয়েছে!</CardTitle>
                    <CardDescription className="text-lg mt-2 text-secondary-foreground">
                        আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-secondary/5 to-primary/5 p-6 rounded-lg border border-secondary/20 hover:border-primary/30 transition-colors duration-300">
                            <h3 className="font-semibold text-xl mb-4 text-primary">গুরুত্বপূর্ণ তথ্য</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                আপনার ফেসবুক পেজ ইন্টিগ্রেশন সক্রিয় করতে, অনুগ্রহ করে নিম্নলিখিত যেকোনো মাধ্যমে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন:
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Link
                                    href="https://facebook.com/restockbd"
                                    target="_blank"
                                    className="no-underline transform hover:scale-105 transition-transform duration-200"
                                >
                                    <Button className="w-full flex items-center gap-2 bg-[#1877F2] hover:bg-[#0c5ac7]" variant="default">
                                        <FacebookIcon className="h-5 w-5" />
                                        ফেসবুকে যোগাযোগ করুন
                                    </Button>
                                </Link>
                                <Link
                                    href="https://wa.me/+8801704667915"
                                    target="_blank"
                                    className="no-underline transform hover:scale-105 transition-transform duration-200"
                                >
                                    <Button className="w-full flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb555]" variant="default">
                                        <Image width={20} height={20} src="/WhatsApp.svg" alt="WhatsApp" className="h-5 w-5" />
                                        হোয়াটসঅ্যাপে যোগাযোগ করুন
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground italic">
                                সাহায্য প্রয়োজন? আমাদের সাপোর্ট টিম ২৪/৭ আপনাকে সহায়তা করার জন্য প্রস্তুত রয়েছে।
                            </p>
                            <Link href="/dashboard">
                                <Button variant="outline" className="hover:bg-primary/10 transition-colors duration-200">
                                    ড্যাশবোর্ডে যান
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
