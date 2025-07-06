import Link from "next/link";
import React from "react";

const ConditionPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#bbddd8] p-4 text-center border-b border-blue-500">
          <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center">
            <span className="text-pink-500 mr-2">★</span>
            শর্ত সমূহ
            <span className="text-pink-500 ml-2">★</span>
          </h1>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <p className="text-center mb-6 text-gray-700">
            রিটার্ন করাতে কাস্টমারের নাম্বারে অবশ্যই কল করে তাদের কনফার্ম করবেন।
            নাম্বার বন্ধ বা কল রিসিভ করে না ইচ্ছা বেড়ে চলেছে।
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="bg-[#bbddd8] text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                ১
              </span>
              <p className="text-gray-700">
                নতুন লেনদেনের ক্ষেত্রে প্রথম ২ টি অর্ডারের ডেলিভারি চার্জ অবশ্যই
                আগ্রিম প্রদান করিতে হবে।
              </p>
            </div>

            <div className="flex items-start">
              <span className="bg-[#bbddd8] text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                ২
              </span>
              <p className="text-gray-700">
                ডেলিভারি ম্যান নিচ্ছেন থাকার অবশ্যই প্রোডাক্টি চেক করে নিতে হবে,
                প্রোডাক্ট এর কোন ফল্ট বের হলে তখনই রিটার্ন করবেন।
              </p>
            </div>

            <div className="flex items-start">
              <span className="bg-[#bbddd8] text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                ৩
              </span>
              <p className="text-gray-700">
                ডেলিভারি ম্যান চলে যাওয়ার পর প্রোডাক্টটি রিটার্ন অথবা পরিবর্তন
                করে দিতে চাইলে অতিরিক্ত ডেলিভারি চার্জ প্রদান করতে হবে।
              </p>
            </div>

            <div className="flex items-start">
              <span className="bg-[#bbddd8] text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                ৪
              </span>
              <p className="text-gray-700">
                নিচের উল্লেখিত কারণগুলির প্রোডাক্টের জন্য অবশ্যই কাস্টমারের নিকট
                থেকে ডেলিভারি চার্জ আগ্রিম নিতে হবে এবং আমাদের পেমেন্ট করে
                অর্ডার প্লেস করতে হবে।
              </p>
            </div>

            <div className="ml-9 mt-2 p-3 bg-gray-50 rounded-md text-gray-600 text-sm">
              (হেলমেট, মাফ-স্কার্ফ, পাওয়ার-ব্যাংক, ক্যামেরা, স্পিকার, )
            </div>

            <div className="mt-6 p-4 bg-pink-50 rounded-md border border-pink-200 text-center">
              <p className="text-gray-700">
                সর্বোচ্চ এই প্রোডাক্ট গুলো রিটার্ন হবে আবার নাও হয়ে যায়।
                পরবর্তীতে বিক্রয় উপযুক্ত থাকে না। তাই অগ্রিম না আসে।
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#bbddd8] p-4 text-center border-t border-blue-500">
          <p className="text-gray-700">
            উপরোক্ত শর্তগুলো মানি চলবেন অর্ডার কনফার্ম করুন
          </p>
          <Link href="/store/cart/report">
            <button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-all duration-200">
              হ্যাঁ, রাজি আছি ≫
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConditionPage;
