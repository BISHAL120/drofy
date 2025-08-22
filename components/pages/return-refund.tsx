import React from "react";
import { Package, Banknote, Truck } from "lucide-react";

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">রিটার্ন এন্ড রিফান্ড পলিসি</h1>
          <p className="text-lg text-gray-600">আপনার সুবিধার্থে আমাদের রিটার্ন এবং রিফান্ড নীতিমালা</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Package className="w-10 h-10 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-3">প্রোডাক্ট রিটার্ন</h2>
            <p className="text-gray-600">
              ডেলিভারি ম্যান উপস্থিত থাকা অবস্থায় প্রোডাক্ট চেক করে নিন। ত্রুটি পেলে তৎক্ষণাৎ রিটার্ন করুন।
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Banknote className="w-10 h-10 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-3">রিফান্ড প্রক্রিয়া</h2>
            <p className="text-gray-600">
              রিটার্ন এপ্রুভ হওয়ার ২৪ ঘন্টার মধ্যে আপনার অরিজিনাল পেমেন্ট মেথডে রিফান্ড করা হবে।
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Truck className="w-10 h-10 text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold mb-3">ডেলিভারি পলিসি</h2>
            <p className="text-gray-600">
              সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা উপলব্ধ রয়েছে।
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold mb-6">বিস্তারিত নীতিমালা</h3>
            
            <div className="space-y-6 text-gray-700">
              <p>
                আমরা ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশ হোম ডেলিভারি দিয়ে থাকি কুরিয়ারের মাধ্যমে। কাস্টমার প্রোডাক্ট হাতে পাওয়ার পর প্রোডাক্ট এর কোন ত্রুটি বের হলে প্রোডাক্টটি রিটার্ন করার সুযোগ রয়েছে।
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">রিটার্ন শর্তাবলী:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>প্রোডাক্টে ত্রুটি থাকলে সম্পূর্ণ টাকা ফেরত</li>
                  <li>অব্যবহৃত অবস্থায় রিটার্ন করতে হবে</li>
                  <li>মূল প্যাকেজিং সহ ফেরত দিতে হবে</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">রিফান্ড প্রক্রিয়া:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>২৪ ঘন্টার মধ্যে রিফান্ড প্রক্রিয়া সম্পন্ন</li>
                  <li>মূল পেমেন্ট একাউন্টে রিফান্ড</li>
                  <li>রিফান্ড না পেলে সাপোর্টে যোগাযোগ করুন</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            আরও তথ্যের জন্য আমাদের{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              সাপোর্ট টিমের
            </a>{" "}
            সাথে যোগাযোগ করুন
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
