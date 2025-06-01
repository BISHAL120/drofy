import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const HeroSection
    = () => {
        return (
            <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                <div className="container mx-auto md:px-4 py-10 md:py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="mb-8 lg:w-2/5">
                            <h2 className="text-2xl text-center md:text-start md:text-3xl font-bold mb-4">
                                ড্রপশিপিং ও রিসেলিং সেবা, ব্যবসার সহজ সমাধান
                            </h2>
                            <p className="text-white/90 text-justify md:text-start mb-6 px-1 md:text-lg">
                                রিস্টক বিডি বাংলাদেশের সর্ববৃহৎ একটি ড্রপশিপিং এবং রিসেলিং প্লাটফর্ম। কোন প্রকার পূঁজি বা ইনভেস্টমেন্ট ছারাই ঘরে বসে অসংখ্য ক্যাটেগরির প্রায় দশ হাজারেরও বেশি প্রোডাক্ট নিয়ে বিজনেস করতে পারবেন |
                            </p>
                            <div className="flex justify-center md:justify-start flex-wrap gap-2 p-2 md:p-0 md:pr-3">
                                <Button className="w-full md:flex-1 lg:max-w-[210px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold tracking-wide border-none hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl text-lg cursor-pointer">
                                    Shop Now
                                </Button>
                                <Button variant="outline" className="w-full md:flex-1 lg:max-w-[210px] border-2 border-white/80 text-black text-base font-semibold cursor-pointer backdrop-blur-sm hover:bg-white/20 hover:border-white transform hover:scale-105 transition-all duration-300">
                                    View Categories
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-center w-full lg:w-3/5 px-2">
                            <div className="w-full h-full">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Happy shopping online"
                                    width={620}
                                    height={450}
                                    className="w-full h-full max-h-[200px] md:max-h-[250px] lg:max-h-[300px] rounded-md object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

export default HeroSection
