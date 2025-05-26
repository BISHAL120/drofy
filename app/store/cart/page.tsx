import React from 'react'

const Page = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange-300">
                <div className="text-lg text-gray-700 text-center">
                    অর্ডার করার জন্য আগে প্রোডাক্ট পেজে গিয়ে প্রোডাক্ট সিলেক্ট করুন
                </div>
                <div className="mt-4 flex justify-center">
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                        প্রোডাক্ট পেজে যান
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page