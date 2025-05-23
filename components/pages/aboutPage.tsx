import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const AboutPage = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            {/* Full Width Banner */}
            <div className="w-full mb-12">
                <Image
                    src="/placeholder.svg"
                    alt="Banner"
                    width={1920}
                    height={400}
                    className="w-full h-[400px] object-cover"
                />
            </div>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-orange-500 mb-4">
                        রিস্টক রিসেলার-প্লেস
                    </h1>
                    <p className="text-lg text-red-500 mb-4">
                        ৬৪ জেলার অনলাইন উদ্যোক্তার স্বপ্ন
                        পূরণের পাশে আছে রিস্টক বিডি
                    </p>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                        JOIN NOW
                    </button>
                    <p className="mt-4 text-gray-600">www.restockbd.com</p>

                    <div className="flex items-center gap-2 mt-6">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-orange-500">
                            কোন রকম পুঁজি বা ইনভেস্ট ছাড়াই
                            <br />বিজনেস করুন রিস্টক বিডি&apos;র মাধ্যমে!
                        </p>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src="/placeholder.svg"
                        alt="Reseller with phone"
                        width={500}
                        height={400}
                        className="rounded-lg w-full h-[400px] object-cover"
                    />
                </div>
            </div>


            {/* What is ReStock BD */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold">রিস্টক বিডি কি ?</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                        &quot;রিস্টক বিডি`&quot; একটি অনন্য অনলাইনভিত্তিক অনলাইন রিসেলিং বিজনেসের এক মাত্রাগামী প্লাটফর্ম।
                    </p>
                    <p className="text-gray-700 mb-4">
                        আপনি অনলাইনে বিজনেস করতে চান, কিন্তু ইনভেস্টমেন্ট, বড় মজুদ, সঠিক এবং বিশ্বাসিতা সামগ্রী প্রাপ্তিতে সমস্যা এক প্রকার গ্যারান্টি না ?
                    </p>
                    <p className="text-gray-700">
                        এই ক্ষেত্রে রিস্টক বিডি আপনাকে নিশ্চিত, আপনার নিজস্ব অনলাইন বিজনেসটি বিনা পুঁজিতে এবং এবং পরিচালনা করার সকল সহায়তা করবে।
                    </p>
                </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold">কি ভাবে বিজনেস টি করবেন ?</h2>
                    </div>

                    <p className="text-gray-700 mb-4">
                        আপনাকে প্রথমেই এই সাইটে বিজনেস টি শুরু করতে, আপনার ফোনে প্রদান টি বা ইনভেস্টমেন্ট এর প্রয়োজন নেই। আমরাই প্রতিষ্ঠানটি অথবা করে বিজনেস প্রদান করবো অনুগ্রহন করে হয়ে উঠুন একজন সফল বিজনেসম্যান।
                    </p>

                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>আপনাকে আমরা আপনি পছন্দ করেন সাইটটুকু সাবস্ক্রাইবিং, সর্বনিম্ন পার্টনার মূল্য সেমাবিলি সম্পন্ন করতে হবেই।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>যেকোনো সময়ে ১০০ হাজার টাকা বিনা প্রতিটি প্রোডাক্টস কোন ব্র্যান্ড পাবেন।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>কমিশনের হার বেশি অর্থিক পাবেনা না, আপনাকে আপনি এক হাজা টাকাটি কামাতে করে দিবেন।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>সর্বনিম্ন অর্ডারের ১০০/২০০ এর মাত্র, আপনাকে সকল চিন্তা করতে, আপনার কাস্টমারকে করতে প্রদানি পাঠিয়ে দেবে ডুয়িংলিয়া দেবে।</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* How it works */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold">কেন আমাদের মাধ্যমে বিজনেস টি করবেন?</h2>
                    </div>

                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>আমরা বাংলাদেশে রিসেলিং বিজনেসের সর্বনিম্ন নির্ধারিতা একটি প্লাটফর্মের ও বিশ্বস্ত প্রতিষ্ঠান।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>আমরা প্রোডাক্ট এর সেমাবিলি এবং প্রাইস লাভে সকল বিষযে সঠিক সংরক্ষণ করা হয়, যার কারণে আপনি পাবেন সর্বনিম্ন প্রাইস এবং। সেমাবিলি সম্পন্ন প্রোডাক্টস বিজনেস।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>আমরা আপনাকে বিনামূল্যে ডেমো এবং বিজনেস অনলাইন বিজনেসের সকল পুঁজি করতে সাহায্য, যে বিষযে সকল পরিবর্তনীয় এবং টিপস পাবেন আপনাকে দেবে সাহায্য।</span>
                        </li>
                    </ul>

                    <div className="mt-6 bg-orange-50 p-4 rounded-lg">
                        <p className="text-orange-600">
                            আমরা যদি অনলাইনে বিজনেস করে আপনি প্রতিটি অর্জন করতে চান, তাহলে রিস্টক বিডি হচ্ছে সেরা আপনার জন্য একটি টি প্লাটফর্ম প্রতিষ্ঠান। আমাদের প্রতিষ্ঠানি প্রতিষ্ঠিতা করে এবং করে দিয়ে আপনার অনলাইন বিজনেস এবং হয়ে উঠুন সফল বিজনেসম্যান।
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AboutPage