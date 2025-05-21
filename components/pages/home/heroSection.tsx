import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const HeroSection
    = () => {
        return (
            <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                <div className="container mx-auto px-4 py-10 md:py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-8 md:mb-0 md:w-1/2">
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                The Best Online Shopping Experience
                            </h2>
                            <p className="text-white/90 mb-6 md:text-lg">
                                Discover thousands of products with fast delivery and best prices. Shop now and experience
                                the future of online retail with reliable service and quality products.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold tracking-wide border-none hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl text-lg cursor-pointer">
                                    Shop Now
                                </Button>
                                <Button variant="outline" className="border-2 border-white/80 text-black text-base font-semibold cursor-pointer backdrop-blur-sm hover:bg-white/20 hover:border-white transform hover:scale-105 transition-all duration-300">
                                    View Categories
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Happy shopping online"
                                    width={620}
                                    height={450}
                                    className="w-full h-full max-h-[400px] rounded-md object-cover"
                                />
                                <div className="absolute -right-3 -top-3 bg-yellow-400 text-orange-800 rounded-full w-16 h-16 flex items-center justify-center font-bold shadow-lg animate-pulse text-center">
                                    50% OFF
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

export default HeroSection
